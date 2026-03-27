'use client'

import { useSessionStore } from '@/stores/sessionStore'
import { useAuthStore } from '@/stores/authStore'
import { useSimulationStore } from '@/stores/simulationStore'
import { sessionService } from '@/services/sessionService'
import Link from 'next/link'
import { useUIStore } from '@/stores/uiStore'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const LiveClock = () => {
  const [time, setTime] = useState<Date | null>(null)
  useEffect(() => {
    setTime(new Date())
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!time) return null

  return (
    <div className="font-mono text-[10px] text-primary/80 uppercase tracking-widest mt-1">
      {time.toLocaleTimeString()} - {time.toLocaleDateString()}
    </div>
  )
}

export const TopBar = () => {
  const { activeSession, setSaving } = useSessionStore()
  const { user } = useAuthStore()
  const simulationState = useSimulationStore()
  const pathname = usePathname()

  const handleSave = async () => {
    if (!user) {
      alert('Please sign in to save sessions.')
      return
    }

    if (!activeSession?.projectId) {
      alert('Missing project context for session save.')
      return
    }

    try {
      setSaving(true)

      const sessionData = {
        id: activeSession?.id ?? undefined,
        project_id: activeSession.projectId,
        user_id: user.id,
        name: activeSession?.name || 'New Exploration',
        view_mode: simulationState.viewMode,
        active_preset_id: simulationState.activePreset?.id || null,
        correlation_mode: simulationState.correlationMode,
        simulation_state: {
          speed: simulationState.speed,
          intensity: simulationState.intensity,
        },
        ui_state: {},
        camera_state: {},
      }

      await sessionService.saveSession(sessionData)
      alert('Session saved!')
    } catch (error) {
      console.error(error)
      alert('Error saving session.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-[#050505] border-b border-[#98CBFF]/15 shadow-[0px_0px_40px_rgba(0,163,255,0.06)]">
      <div className="flex items-center gap-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">data_object</span>
              <span className="font-headline font-bold tracking-widest text-[#98CBFF]">COSMOS_BRAIN <span className="text-[#98CBFF]/40">/ V 1.0</span></span>
            </div>
            
            {/* View Switching Logic... */}
            <div className="h-6 w-px bg-outline-variant/20 mx-2"></div>
          </div>
          <LiveClock />
        </div>
        <nav className="hidden md:flex gap-6 items-center h-full">
          <Link href="/explorer" className={`font-headline tracking-tight uppercase text-sm ${pathname === '/explorer' ? 'text-[#00A3FF] border-b-2 border-[#00A3FF] pb-1' : 'text-[#98CBFF]/60 hover:text-[#98CBFF] transition-colors'}`}>
            3D Explorer
          </Link>
          <Link href="/datasets" className={`font-headline tracking-tight uppercase text-sm ${pathname === '/datasets' ? 'text-[#00A3FF] border-b-2 border-[#00A3FF] pb-1' : 'text-[#98CBFF]/60 hover:text-[#98CBFF] transition-colors'}`}>
            Data Explorer
          </Link>
          <Link href="/sessions" className={`font-headline tracking-tight uppercase text-sm ${pathname === '/sessions' ? 'text-[#00A3FF] border-b-2 border-[#00A3FF] pb-1' : 'text-[#98CBFF]/60 hover:text-[#98CBFF] transition-colors'}`}>
            Sessions
          </Link>
        </nav>
      </div>

      <div className="flex-1 max-w-xl px-12">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary/40 text-sm">search</span>
          <input className="w-full bg-surface-container-lowest border-l-2 border-transparent focus:border-primary outline-none py-2 pl-10 pr-4 text-xs font-label tracking-wider placeholder:text-outline/40 uppercase" placeholder="Session: Milky Way Scan | Search Universal Data..." type="text"/>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={handleSave} className="p-2 text-[#98CBFF]/60 hover:bg-[#98CBFF]/10 transition-all active:scale-95">
          <span className="material-symbols-outlined" data-icon="save">save</span>
        </button>
        <Link href="/sessions" className="p-2 text-[#98CBFF]/60 hover:bg-[#98CBFF]/10 transition-all active:scale-95">
          <span className="material-symbols-outlined" data-icon="folder_open">folder_open</span>
        </Link>
        <Link href="/settings" className="p-2 text-[#98CBFF]/60 hover:bg-[#98CBFF]/10 transition-all active:scale-95">
          <span className="material-symbols-outlined" data-icon="settings">settings</span>
        </Link>
        <div className="h-8 w-8 bg-surface-container-highest border border-outline-variant/30 ml-2 overflow-hidden flex items-center justify-center text-xs text-white">
          {user ? 'U' : 'IN'}
        </div>
      </div>
    </header>
  )
}

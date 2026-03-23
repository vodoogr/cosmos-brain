'use client'

import { useSessionStore } from '@/stores/sessionStore'
import { useAuthStore } from '@/stores/authStore'
import { useSimulationStore } from '@/stores/simulationStore'
import { sessionService } from '@/services/sessionService'
import { Save, Settings, User } from 'lucide-react'

export const TopBar = () => {
  const { activeSession, setSaving } = useSessionStore()
  const { user } = useAuthStore()
  const simulationState = useSimulationStore()

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
    <div className="absolute top-0 left-0 right-0 h-14 bg-black/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6 text-white font-sans">
      <div className="flex items-center space-x-4">
        <h1 className="text-sm font-semibold tracking-wider text-slate-200">
          COSMOS-BRAIN RESONANCE
        </h1>

        {activeSession && (
          <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded-sm border border-white/5">
            {activeSession.name}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-4 text-slate-300">
        <button
          onClick={handleSave}
          className="flex items-center space-x-1 hover:text-white transition group text-xs"
        >
          <Save size={14} className="group-hover:text-blue-400" />
          <span>Save Session</span>
        </button>

        <div className="w-px h-4 bg-white/20" />

        <button className="hover:text-white transition">
          <Settings size={16} />
        </button>

        <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 transition px-3 py-1 rounded-full text-xs">
          <User size={14} />
          <span>{user ? user.email : 'Sign In'}</span>
        </button>
      </div>
    </div>
  )
}

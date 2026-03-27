'use client'

import { TopBar } from '@/components/layout/TopBar'
import { LeftControlPanel } from '@/components/controls/LeftControlPanel'
import { Plus, Download, Trash } from 'lucide-react'

export default function SessionsPage() {
  return (
    <div className="relative w-full h-screen bg-[#050505] text-on-surface overflow-hidden flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <TopBar />
      <LeftControlPanel />

      <main className="ml-64 mt-16 p-8 min-h-screen relative overflow-y-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="font-headline text-4xl font-bold tracking-tight text-white mb-2 uppercase">Saved Exploration Sessions</h1>
            <p className="font-body text-sm text-on-surface-variant max-w-xl">Manage historical resonance telemetry and neural mapping protocols. Select a session to resume deep-space data visualization.</p>
          </div>
          <button className="flex items-center gap-3 px-6 py-4 bg-tertiary text-on-tertiary font-bold tracking-widest uppercase text-xs active:scale-95 transition-all">
            <Plus size={16} className="font-bold" />
            New Session
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-surface-container-low border-l-2 border-primary group hover:bg-surface-container transition-colors p-0 overflow-hidden">
              <div className="relative h-48 bg-surface-container-lowest overflow-hidden outline outline-1 outline-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-2 py-1 bg-tertiary/20 text-tertiary text-[9px] border border-tertiary/40">Universe + Brain</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-headline text-xl text-primary font-bold mb-1 uppercase tracking-tight">Alpha Centauri Neural Mapping</h3>
                <div className="flex gap-4 text-[10px] text-on-surface-variant uppercase tracking-wider mb-6">
                  <span>CREATED: 2024.03.12</span>
                  <span>ACCESS: 2H AGO</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-3 bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all">Load Exploration</button>
                  <button className="p-3 border border-outline-variant hover:bg-surface-container-highest transition-all"><Download size={14} /></button>
                  <button className="p-3 border border-error/30 text-error hover:bg-error/10 transition-all"><Trash size={14} /></button>
                </div>
              </div>
            </div>

            <div className="border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center p-8 group hover:border-primary/50 transition-colors cursor-pointer bg-surface-container-lowest/20">
              <span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-primary transition-colors mb-4">add_circle</span>
              <span className="text-xs font-bold text-outline-variant uppercase tracking-widest group-hover:text-primary">Create New Protocol</span>
            </div>
            
          </div>

          <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 mr-64">
            <div className="bg-surface-container p-6 border border-outline-variant/10">
              <h4 className="font-label text-[10px] font-black text-on-surface-variant mb-6 uppercase tracking-widest border-b border-outline-variant/20 pb-2">Storage Resource Usage</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-[10px] mb-2">
                    <span className="text-on-surface/60 uppercase">Cloud Uplink</span>
                    <span className="text-primary font-bold">78%</span>
                  </div>
                  <div className="h-1 bg-surface-container-highest w-full relative">
                    <div className="absolute left-0 top-0 h-full bg-primary" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-surface-container-lowest border border-outline-variant/20">
                <div className="text-[9px] text-on-surface/40 uppercase mb-1">Total Payload</div>
                <div className="text-xl font-headline font-bold text-white uppercase tracking-tight">14.22 TB</div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { TopBar } from '@/components/layout/TopBar'
import { LeftControlPanel } from '@/components/controls/LeftControlPanel'
import { useSetiStore } from '@/stores/setiStore'
import { setiCandidateService } from '@/services/setiCandidateService'

export default function DatasetsPage() {
  const { candidates, setCandidates } = useSetiStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setiCandidateService.getCandidates()
      .then(data => {
        setCandidates(data)
        setLoading(false)
      })
      .catch(console.error)
  }, [setCandidates])

  return (
    <div className="relative w-full h-screen bg-[#050505] text-on-surface overflow-hidden flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <TopBar />
      <LeftControlPanel />

      <main className="ml-64 mt-16 h-[calc(100vh-64px-80px)] overflow-hidden flex flex-col bg-[#050505] p-6 gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-baseline gap-4">
            <h1 className="font-headline text-4xl font-bold tracking-tighter text-on-surface">SETI EXPLORER <span className="text-primary">/ DATA_STREAM</span></h1>
            <span className="text-[10px] font-label uppercase tracking-[0.2rem] text-tertiary">Live Telemetry Active</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-outline-variant/10">
            <button className="px-6 py-2 bg-surface-container-low text-on-surface-variant font-label text-[10px] uppercase tracking-widest hover:text-primary transition-colors border-b border-transparent">SETI Targets</button>
            <button className="px-6 py-2 bg-[#98CBFF]/10 text-primary font-label text-[10px] uppercase tracking-widest border-b border-primary">SETI Candidates</button>
            <button className="px-6 py-2 bg-surface-container-low text-on-surface-variant font-label text-[10px] uppercase tracking-widest hover:text-primary transition-colors border-b border-transparent">Asteroids</button>
            <button className="px-6 py-2 bg-surface-container-low text-on-surface-variant font-label text-[10px] uppercase tracking-widest hover:text-primary transition-colors border-b border-transparent">Comets</button>
            <button className="px-6 py-2 bg-surface-container-low text-on-surface-variant font-label text-[10px] uppercase tracking-widest hover:text-primary transition-colors border-b border-transparent">Meteor Events</button>
          </div>
        </div>

        <div className="flex-1 flex gap-6 overflow-hidden">
          <div className="flex-1 bg-surface-container-lowest border border-outline-variant/10 flex flex-col overflow-hidden">
            <div className="overflow-x-auto overflow-y-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container text-on-surface-variant sticky top-0 z-10">
                    <th className="px-4 py-3 font-label text-[9px] uppercase tracking-widest border-b border-outline-variant/20 cursor-pointer hover:bg-surface-container-high transition-colors">
                      <div className="flex items-center gap-2">Signal Type <span className="material-symbols-outlined text-[12px]">filter_list</span></div>
                    </th>
                    <th className="px-4 py-3 font-label text-[9px] uppercase tracking-widest border-b border-outline-variant/20 cursor-pointer hover:bg-surface-container-high transition-colors">
                      <div className="flex items-center gap-2">Frequency <span className="material-symbols-outlined text-[12px]">swap_vert</span></div>
                    </th>
                    <th className="px-4 py-3 font-label text-[9px] uppercase tracking-widest border-b border-outline-variant/20">
                      <div className="flex items-center gap-2">SNR <span className="material-symbols-outlined text-[12px]">filter_list</span></div>
                    </th>
                    <th className="px-4 py-3 font-label text-[9px] uppercase tracking-widest border-b border-outline-variant/20">
                      <div className="flex items-center gap-2">ML Score <span className="material-symbols-outlined text-[12px]">swap_vert</span></div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {loading ? (
                    <tr><td colSpan={4} className="p-4 text-center text-xs text-slate-500">Loading...</td></tr>
                  ) : candidates.map(c => (
                    <tr key={c.id} className="hover:bg-surface-container-low transition-colors cursor-pointer">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary/20"></div>
                          <span className="font-label text-xs text-on-surface-variant">{c.hitType}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-headline text-sm">{(c.frequency ?? 0).toFixed(3)} <span className="text-[9px] text-outline">MHz</span></td>
                      <td className="px-4 py-4 font-label text-sm">{(c.snr ?? 0).toFixed(1)} <span className="text-[9px] text-outline">dB</span></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1 bg-surface-container-highest overflow-hidden">
                            <div className="bg-primary h-full" style={{ width: `${(c.mlScore || 0) * 100}%` }}></div>
                          </div>
                          <span className="text-[10px] font-bold text-primary/60">{(c.mlScore || 0).toFixed(3)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-auto p-4 border-t border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest">
              <div className="text-[10px] font-label text-outline uppercase tracking-widest">
                  Showing <span className="text-on-surface">{candidates.length > 0 ? 1 : 0} - {Math.min(50, candidates.length)}</span> of {candidates.length} Matches
              </div>
              <div className="flex gap-4">
                <button className="text-primary hover:bg-primary/10 px-3 py-1 text-[10px] font-label uppercase tracking-widest transition-all">Previous</button>
                <button className="text-primary border border-primary/20 hover:border-primary px-3 py-1 text-[10px] font-label uppercase tracking-widest transition-all">Next Cluster</button>
              </div>
            </div>
          </div>

          <div className="w-80 bg-[#131313] flex flex-col gap-6">
            <div className="bg-surface-container-low p-4 space-y-4 border border-outline-variant/10">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-label uppercase tracking-widest text-primary">Signal Resonance</span>
                <span className="text-[10px] font-label text-tertiary">LIVE</span>
              </div>
              <div className="h-32 w-full relative overflow-hidden bg-black/40 border border-[#98CBFF]/10">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-tertiary shadow-[0_0_10px_#00DBE9] z-10"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[9px] text-outline uppercase tracking-tight">Bandwidth</p>
                  <p className="font-headline text-lg font-bold">12.5 <span className="text-[10px] text-outline font-normal">Hz</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] text-outline uppercase tracking-tight">Drift Rate</p>
                  <p className="font-headline text-lg font-bold">-0.04 <span className="text-[10px] text-outline font-normal">Hz/s</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

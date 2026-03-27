'use client'

import { useSimulationStore } from '@/stores/simulationStore'

export const BottomTimeline = () => {
  const {
    isPlaying,
    togglePlay,
    intensity,
    setIntensity,
  } = useSimulationStore()

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center h-20 gap-12 bg-[#050505] border-t border-[#98CBFF]/15 shadow-[0_-10px_30px_rgba(0,163,255,0.03)] selection:bg-primary/30">
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center">
          <span className="text-primary font-headline text-lg font-bold tracking-widest leading-none">T-00:00:00</span>
          <span className="text-[9px] font-label text-outline/40 uppercase">System Time</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-[#98CBFF]/40 hover:text-[#00DBE9] active:scale-90 transition-all">
            <span className="material-symbols-outlined text-2xl">restart_alt</span>
            <span className="block text-[8px] font-bold text-center uppercase mt-1">Reset</span>
          </button>
          
          <button onClick={togglePlay} className="p-4 bg-primary/10 rounded-full text-[#00DBE9] scale-110 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-3xl">{isPlaying ? 'pause' : 'play_arrow'}</span>
            <span className="sr-only">Play</span>
          </button>
          
          <button onClick={() => { if(isPlaying) togglePlay() }} className="p-2 text-[#98CBFF]/40 hover:text-[#00DBE9] active:scale-90 transition-all">
            <span className="material-symbols-outlined text-2xl">pause</span>
            <span className="block text-[8px] font-bold text-center uppercase mt-1">Pause</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-12">
        <div className="w-48 space-y-1">
          <div className="flex justify-between items-center text-[9px] font-label uppercase text-outline/60">
            <span>Intensity</span>
            <span>{Math.round(intensity * 100)}%</span>
          </div>
          <div className="h-1 bg-surface-container-highest relative">
            <div className="absolute inset-y-0 left-0 bg-primary transition-all" style={{ width: `${intensity * 100}%` }}></div>
          </div>
        </div>
        
        <div className="flex flex-col items-center group cursor-pointer" onClick={() => setIntensity(Math.min(1, intensity + 0.1))}>
          <span className="material-symbols-outlined text-xl text-[#98CBFF]/40 group-hover:text-tertiary transition-colors">speed</span>
          <span className="text-[9px] font-bold text-[#98CBFF]/40 uppercase">Intensity</span>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useSimulationStore } from '@/stores/simulationStore'
import { Play, Pause, SkipBack, Settings2 } from 'lucide-react'

export const BottomTimeline = () => {
  const { isPlaying, togglePlay, speed, setSpeed, intensity, setIntensity } = useSimulationStore()

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-xl border-t border-white/10 z-50 flex items-center px-6 text-white font-sans">
      
      {/* Play Controls */}
      <div className="flex items-center space-x-3 mr-8">
        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition">
          <SkipBack size={16} />
        </button>
        <button 
          onClick={togglePlay}
          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition shadow-lg"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
        </button>
      </div>

      {/* Scrubber / Slider */}
      <div className="flex-1 flex flex-col justify-center px-4 space-y-2 group">
        <div className="flex justify-between text-[10px] text-slate-500 font-mono tracking-widest uppercase">
          <span>T-00:00:00</span>
          <span className="text-blue-400">Simulation Active</span>
          <span>T+01:00:00</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden relative cursor-pointer group-hover:h-1.5 transition-all">
          <div className="absolute top-0 left-0 bottom-0 bg-blue-500 w-1/3 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
        </div>
      </div>

      {/* Adjustments */}
      <div className="flex items-center space-x-6 ml-8 pl-8 border-l border-white/10">
        <div className="flex items-center space-x-3">
           <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold flex items-center"><Settings2 size={12} className="mr-1"/>Intensity</span>
           <input 
             type="range" 
             min="0" max="1" step="0.05"
             value={intensity}
             onChange={(e) => setIntensity(parseFloat(e.target.value))}
             className="w-24 accent-blue-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
           />
        </div>
        <div className="flex items-center space-x-3">
           <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Speed</span>
           <select 
             value={speed}
             onChange={(e) => setSpeed(parseFloat(e.target.value))}
             className="bg-transparent text-xs text-white border-0 outline-none cursor-pointer"
           >
             <option value="0.5" className="bg-black">0.5x</option>
             <option value="1.0" className="bg-black">1.0x</option>
             <option value="2.0" className="bg-black">2.0x</option>
           </select>
        </div>
      </div>

    </div>
  )
}

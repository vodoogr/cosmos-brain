'use client'

import { useSimulationStore, ViewMode, CorrelationMode } from '@/stores/simulationStore'
import { useUIStore } from '@/stores/uiStore'

export const LeftControlPanel = () => {
  const { isLeftPanelOpen } = useUIStore()
  const {
    setViewMode,
    setCorrelationMode,
    viewMode,
    correlationMode,
    setSpeed,
    setIntensity,
    intensity,
    speed,
    cameraFov,
    setCameraFov
  } = useSimulationStore()

  if (!isLeftPanelOpen) return null

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px-80px)] z-40 flex flex-col w-64 bg-[#131313]/90 backdrop-blur-xl border-r border-[#98CBFF]/15 overflow-y-auto">
      <div className="p-4 border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-primary/20 flex items-center justify-center border border-primary/30">
            <span className="material-symbols-outlined text-primary text-lg">radar</span>
          </div>
          <div>
            <h2 className="text-lg font-black text-[#98CBFF] leading-none font-headline">CONTROL</h2>
            <p className="font-label text-[10px] tracking-[0.05rem] uppercase font-medium text-[#98CBFF]/40">V.2.4-BRAIN</p>
          </div>
        </div>
      </div>

      <section className="p-4 space-y-3">
        <h3 className="font-label text-[10px] tracking-[0.05rem] uppercase font-bold text-primary/70 flex items-center gap-2">
          <span className="material-symbols-outlined text-[14px]">visibility</span> View Mode
        </h3>
        <div className="space-y-1">
          <button onClick={() => setViewMode('universe')} className={`w-full text-left px-3 py-2 font-label text-[10px] tracking-wider uppercase transition-all ${viewMode === 'universe' ? 'bg-[#98CBFF]/10 text-[#98CBFF] border-l-2 border-[#98CBFF]' : 'text-[#98CBFF]/40 hover:text-[#98CBFF]/80 hover:bg-[#131313]'}`}>
            Universe
          </button>
          <button onClick={() => setViewMode('brain')} className={`w-full text-left px-3 py-2 font-label text-[10px] tracking-wider uppercase transition-all ${viewMode === 'brain' ? 'bg-[#98CBFF]/10 text-[#98CBFF] border-l-2 border-[#98CBFF]' : 'text-[#98CBFF]/40 hover:text-[#98CBFF]/80 hover:bg-[#131313]'}`}>
            Brain
          </button>
          <button onClick={() => setViewMode('both')} className={`w-full text-left px-3 py-2 font-label text-[10px] tracking-wider uppercase transition-all ${viewMode === 'both' ? 'bg-[#98CBFF]/10 text-[#98CBFF] border-l-2 border-[#98CBFF]' : 'text-[#98CBFF]/40 hover:text-[#98CBFF]/80 hover:bg-[#131313]'}`}>
            Universe + Brain
          </button>
        </div>
      </section>

      <section className="p-4 space-y-3 border-t border-outline-variant/10">
        <h3 className="font-label text-[10px] tracking-[0.05rem] uppercase font-bold text-primary/70 flex items-center gap-2">
          <span className="material-symbols-outlined text-[14px]">layers</span> Data Layers
        </h3>
        <div className="grid grid-cols-1 gap-2">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="font-label text-[10px] text-[#98CBFF]/60 group-hover:text-primary uppercase">Stars</span>
            <input type="checkbox" defaultChecked className="form-checkbox bg-surface-container-lowest border-outline-variant text-primary rounded-none h-3 w-3" />
          </label>
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="font-label text-[10px] text-[#98CBFF]/60 group-hover:text-primary uppercase">Asteroids (NEO)</span>
            <input type="checkbox" className="form-checkbox bg-surface-container-lowest border-outline-variant text-primary rounded-none h-3 w-3" />
          </label>
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="font-label text-[10px] text-[#98CBFF]/60 group-hover:text-primary uppercase">SETI Targets</span>
            <input type="checkbox" defaultChecked className="form-checkbox bg-surface-container-lowest border-outline-variant text-primary rounded-none h-3 w-3" />
          </label>
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="font-label text-[10px] text-[#98CBFF]/60 group-hover:text-primary uppercase">Neural Networks</span>
            <input type="checkbox" className="form-checkbox bg-surface-container-lowest border-outline-variant text-primary rounded-none h-3 w-3" />
          </label>
        </div>
      </section>

      <section className="p-4 space-y-3 border-t border-outline-variant/10">
        <h3 className="font-label text-[10px] tracking-[0.05rem] uppercase font-bold text-primary/70 flex items-center gap-2">
          <span className="material-symbols-outlined text-[14px]">settings_input_component</span> Search Mode
        </h3>
        <select 
          value={correlationMode}
          onChange={(e) => setCorrelationMode(e.target.value as CorrelationMode)}
          className="w-full bg-surface-container-lowest border-l-2 border-primary/40 text-[10px] text-primary/80 uppercase p-2 outline-none font-label">
          <option value="density_to_power">Density to Power</option>
          <option value="cluster_to_region">Cluster to Region</option>
          <option value="frequency_color_mapping">Frequency Color Mapping</option>
          <option value="custom">Custom</option>
        </select>
      </section>

      <section className="p-4 space-y-4 border-t border-outline-variant/10">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-label text-[10px] text-[#98CBFF]/40 uppercase">Resonance Strength</span>
            <span className="font-label text-[10px] text-tertiary">{Math.round((speed / 2) * 100)}%</span>
          </div>
          <input type="range" min="0.1" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-tertiary h-1 bg-surface-container-highest" />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-label text-[10px] text-[#98CBFF]/40 uppercase">Scan Intensity</span>
            <span className="font-label text-[10px] text-tertiary">{intensity.toFixed(2)}</span>
          </div>
          <input type="range" min="0" max="1" step="0.05" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} className="w-full accent-tertiary h-1 bg-surface-container-highest" />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-label text-[10px] text-[#98CBFF]/40 uppercase flex gap-1 items-center"><span className="material-symbols-outlined text-[10px]">zoom_in</span> Magnifier</span>
            <span className="font-label text-[10px] text-tertiary">{Math.round((60/cameraFov)*100)}%</span>
          </div>
          <input type="range" min="10" max="100" step="1" value={110 - cameraFov} onChange={(e) => setCameraFov(110 - Number(e.target.value))} className="w-full accent-tertiary h-1 bg-surface-container-highest" />
        </div>
      </section>

      <div className="mt-auto p-4 border-t border-outline-variant/10">
        <button className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-[10px] uppercase tracking-widest active:scale-95 transition-transform">
          INITIALIZE SCAN
        </button>
      </div>
    </aside>
  )
}

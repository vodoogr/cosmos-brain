import { useSimulationStore, ViewMode, CorrelationMode } from '@/stores/simulationStore'
import { useUIStore } from '@/stores/uiStore'
import { presetService } from '@/services/presetService'
import { useEffect, useState } from 'react'

export const LeftControlPanel = () => {
  const { isLeftPanelOpen } = useUIStore()
  const { setActivePreset, setViewMode, setCorrelationMode, viewMode, correlationMode, setSpeed, setIntensity } = useSimulationStore()
  const [presets, setPresets] = useState<any[]>([])

  useEffect(() => {
    presetService.getAvailablePresets().then(data => setPresets(data || [])).catch(console.error)
  }, [])

  const applyPreset = (preset: any) => {
    setActivePreset(preset)
    if (preset.correlationConfig?.mode) setCorrelationMode(preset.correlationConfig.mode)
    if (preset.visualConfig) {
      if (preset.visualConfig.speed !== undefined) setSpeed(preset.visualConfig.speed)
      if (preset.visualConfig.intensity !== undefined) setIntensity(preset.visualConfig.intensity)
    }
  }

  if (!isLeftPanelOpen) return null

  return (
    <div className="absolute left-0 top-14 bottom-16 w-80 bg-black/70 backdrop-blur-md border-r border-white/5 z-40 p-6 overflow-y-auto text-white font-sans scrollbar-hide">
      <h2 className="text-xs font-bold tracking-widest text-slate-500 mb-6 uppercase">Controls</h2>
      
      <div className="space-y-8">
        {/* View Mode */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">View Mode</label>
          <div className="flex p-1 bg-white/5 rounded-md border border-white/10">
            {(['universe', 'both', 'brain'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex-1 text-xs py-1.5 rounded transition ${viewMode === mode ? 'bg-white/20 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Correlation Mode */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Correlation Layer</label>
          <select 
            value={correlationMode}
            onChange={(e) => setCorrelationMode(e.target.value as CorrelationMode)}
            className="w-full bg-white/5 border border-white/10 text-xs px-3 py-2 rounded focus:outline-none focus:border-blue-500/50"
          >
            <option value="custom">Custom Density</option>
            <option value="density_to_power">Density to Power</option>
            <option value="cluster_to_region">Cluster to Region</option>
            <option value="network_similarity">Network Similarity</option>
          </select>
        </div>

        {/* Presets placeholder */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Presets</label>
          <div className="grid grid-cols-2 gap-2">
            {presets.length > 0 ? presets.map(p => (
              <button 
                key={p.id} 
                onClick={() => applyPreset(p)}
                className="bg-white/5 border border-white/10 hover:border-blue-500/30 text-xs py-3 rounded text-slate-300 transition text-left px-3 block w-full truncate"
              >
                {p.name}
              </button>
            )) : (
              <div className="text-xs text-slate-500 col-span-2">No presets loaded</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

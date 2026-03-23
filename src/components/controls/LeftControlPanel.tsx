'use client'

import { useEffect, useState } from 'react'
import {
  useSimulationStore,
  ViewMode,
  CorrelationMode,
} from '@/stores/simulationStore'
import { useUIStore } from '@/stores/uiStore'
import { presetService } from '@/services/presetService'
import { SimulationPreset } from '@/types/domain'

export const LeftControlPanel = () => {
  const { isLeftPanelOpen } = useUIStore()
  const {
    setActivePreset,
    setViewMode,
    setCorrelationMode,
    viewMode,
    correlationMode,
    setSpeed,
    setIntensity,
    activePreset,
    individualsCount,
    setIndividualsCount,
  } = useSimulationStore()

  const [presets, setPresets] = useState<SimulationPreset[]>([])

  useEffect(() => {
    presetService
      .getAvailablePresets()
      .then((data) => setPresets(data ?? []))
      .catch(console.error)
  }, [])

  const applyPreset = (preset: SimulationPreset) => {
    setActivePreset(preset)

    const presetMode = preset.correlationConfig?.mode
    if (typeof presetMode === 'string') {
      setCorrelationMode(presetMode as CorrelationMode)
    }

    const speed = preset.simulationConfig?.speed
    if (typeof speed === 'number') {
      setSpeed(speed)
    }

    const intensity = preset.correlationConfig?.intensity
    if (typeof intensity === 'number') {
      setIntensity(intensity)
    }
  }

  if (!isLeftPanelOpen) return null

  return (
    <div className="absolute left-0 top-14 bottom-16 w-80 bg-black/70 backdrop-blur-md border-r border-white/5 z-40 p-6 overflow-y-auto text-white font-sans">
      <h2 className="text-xs font-bold tracking-widest text-slate-500 mb-6 uppercase">
        Controls
      </h2>

      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            View Mode
          </label>
          <div className="flex p-1 bg-white/5 rounded-md border border-white/10">
            {(['universe', 'both', 'brain'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex-1 text-xs py-1.5 rounded transition ${
                  viewMode === mode
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Correlation Layer
          </label>
          <select
            value={correlationMode}
            onChange={(e) =>
              setCorrelationMode(e.target.value as CorrelationMode)
            }
            className="w-full bg-white/5 border border-white/10 text-xs px-3 py-2 rounded focus:outline-none focus:border-blue-500/50"
          >
            <option value="custom">Custom</option>
            <option value="density_to_power">Density to Power</option>
            <option value="cluster_to_region">Cluster to Region</option>
            <option value="frequency_color_mapping">
              Frequency Color Mapping
            </option>
            <option value="network_similarity">Network Similarity</option>
          </select>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <span>Individuals</span>
            <span className="text-blue-400">{individualsCount}</span>
          </div>
          <input
            type="range"
            min="1"
            max="1000"
            step="1"
            value={individualsCount}
            onChange={(e) => setIndividualsCount(Number(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Presets
          </label>
          <div className="grid grid-cols-2 gap-2">
            {presets.length > 0 ? (
              presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className={`border text-xs py-3 rounded text-left px-3 block w-full truncate transition ${
                    activePreset?.id === preset.id
                      ? 'bg-blue-500/20 border-blue-400/40 text-white'
                      : 'bg-white/5 border-white/10 hover:border-blue-500/30 text-slate-300'
                  }`}
                >
                  {preset.name}
                </button>
              ))
            ) : (
              <div className="text-xs text-slate-500 col-span-2">
                No presets loaded
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

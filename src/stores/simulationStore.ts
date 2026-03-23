import { create } from 'zustand'
import { SimulationPreset } from '@/types/domain'

export type ViewMode = 'universe' | 'brain' | 'both'
export type CorrelationMode =
  | 'density_to_power'
  | 'cluster_to_region'
  | 'frequency_color_mapping'
  | 'network_similarity'
  | 'custom'

interface SimulationState {
  speed: number
  intensity: number
  viewMode: ViewMode
  correlationMode: CorrelationMode
  presets: SimulationPreset[]
  activePreset: SimulationPreset | null

  setSpeed: (speed: number) => void
  setIntensity: (intensity: number) => void
  setViewMode: (mode: ViewMode) => void
  setCorrelationMode: (mode: CorrelationMode) => void
  setPresets: (presets: SimulationPreset[]) => void
  setActivePreset: (preset: SimulationPreset | null) => void
}

export const useSimulationStore = create<SimulationState>((set) => ({
  speed: 1,
  intensity: 0.7,
  viewMode: 'both',
  correlationMode: 'density_to_power',
  presets: [],
  activePreset: null,

  setSpeed: (speed) => set({ speed }),
  setIntensity: (intensity) => set({ intensity }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setCorrelationMode: (mode) => set({ correlationMode: mode }),
  setPresets: (presets) => set({ presets }),
  setActivePreset: (preset) => set({ activePreset: preset }),
}))

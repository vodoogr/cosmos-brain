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
  isPlaying: boolean
  speed: number
  intensity: number
  individualsCount: number
  viewMode: ViewMode
  correlationMode: CorrelationMode
  presets: SimulationPreset[]
  activePreset: SimulationPreset | null

  togglePlay: () => void
  setPlaying: (playing: boolean) => void
  setSpeed: (speed: number) => void
  setIntensity: (intensity: number) => void
  setIndividualsCount: (count: number) => void
  setViewMode: (mode: ViewMode) => void
  setCorrelationMode: (mode: CorrelationMode) => void
  setPresets: (presets: SimulationPreset[]) => void
  setActivePreset: (preset: SimulationPreset | null) => void
}

export const useSimulationStore = create<SimulationState>((set) => ({
  isPlaying: false,
  speed: 1,
  intensity: 0.7,
  individualsCount: 1,
  viewMode: 'both',
  correlationMode: 'density_to_power',
  presets: [],
  activePreset: null,

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlaying: (playing) => set({ isPlaying: playing }),
  setSpeed: (speed) => set({ speed }),
  setIntensity: (intensity) => set({ intensity }),
  setIndividualsCount: (count) => set({ individualsCount: count }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setCorrelationMode: (mode) => set({ correlationMode: mode }),
  setPresets: (presets) => set({ presets }),
  setActivePreset: (preset) => set({ activePreset: preset }),
}))

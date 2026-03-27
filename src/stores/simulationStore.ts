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
  cameraFov: number

  // ML / Cognitive Parameters
  positiveThoughts: number
  negativeThoughts: number
  meditationLevel: number
  synchronicity: number

  viewMode: ViewMode
  correlationMode: CorrelationMode
  presets: SimulationPreset[]
  activePreset: SimulationPreset | null

  togglePlay: () => void
  setPlaying: (playing: boolean) => void
  setSpeed: (speed: number) => void
  setIntensity: (intensity: number) => void
  setIndividualsCount: (count: number) => void

  setCameraFov: (val: number) => void

  setPositiveThoughts: (val: number) => void
  setNegativeThoughts: (val: number) => void
  setMeditationLevel: (val: number) => void
  setSynchronicity: (val: number) => void

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
  
  cameraFov: 60,
  
  positiveThoughts: 0.5,
  negativeThoughts: 0.1,
  meditationLevel: 0.5,
  synchronicity: 0.5,

  viewMode: 'both',
  correlationMode: 'density_to_power',
  presets: [],
  activePreset: null,

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlaying: (playing) => set({ isPlaying: playing }),
  setSpeed: (speed) => set({ speed }),
  setIntensity: (intensity) => set({ intensity }),
  setIndividualsCount: (count) => set({ individualsCount: count }),

  setCameraFov: (val) => set({ cameraFov: val }),

  setPositiveThoughts: (val) => set({ positiveThoughts: val }),
  setNegativeThoughts: (val) => set({ negativeThoughts: val }),
  setMeditationLevel: (val) => set({ meditationLevel: val }),
  setSynchronicity: (val) => set({ synchronicity: val }),

  setViewMode: (mode) => set({ viewMode: mode }),
  setCorrelationMode: (mode) => set({ correlationMode: mode }),
  setPresets: (presets) => set({ presets }),
  setActivePreset: (preset) => set({ activePreset: preset }),
}))

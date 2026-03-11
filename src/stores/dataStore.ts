import { create } from 'zustand'
import { UniverseObject, BrainRegion, ViewMode, SimulationState } from '@/types/domain'

interface DataState {
    viewMode: ViewMode
    setViewMode: (mode: ViewMode) => void

    universeObjects: UniverseObject[]
    setUniverseObjects: (objects: UniverseObject[]) => void

    brainRegions: BrainRegion[]
    setBrainRegions: (regions: BrainRegion[]) => void

    selectedObjectId: string | null
    selectedDomain: 'universe' | 'brain' | null
    setSelectedObject: (id: string | null, domain: 'universe' | 'brain' | null) => void

    simulationState: SimulationState
    setSimulationState: (state: Partial<SimulationState>) => void
}

export const useDataStore = create<DataState>((set) => ({
    viewMode: 'universe',
    setViewMode: (mode) => set({ viewMode: mode }),

    universeObjects: [],
    setUniverseObjects: (objects) => set({ universeObjects: objects }),

    brainRegions: [],
    setBrainRegions: (regions) => set({ brainRegions: regions }),

    selectedObjectId: null,
    selectedDomain: null,
    setSelectedObject: (id, domain) => set({ selectedObjectId: id, selectedDomain: domain }),

    simulationState: {
        isPlaying: false,
        speed: 1,
        currentTime: 0,
        intensity: 50,
        density: 50
    },
    setSimulationState: (state) => set((prev) => ({ simulationState: { ...prev.simulationState, ...state } }))
}))

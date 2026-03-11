import { Database } from './database'

export type UniverseObject = {
    id: string
    name: string
    type: 'star' | 'galaxy' | 'cluster' | 'phenomenon'
    coordinates: { x: number; y: number; z: number }
    metadata: Record<string, any>
}

export type BrainRegion = {
    id: string
    name: string
    coordinates: { x: number; y: number; z: number }
    metadata: Record<string, any>
}

export type ViewMode = 'universe' | 'brain' | 'both'

export type CorrelationMode = 'density_to_power' | 'cluster_to_region' | 'frequency_color_mapping' | 'network_similarity' | 'custom'

export type CameraState = {
    position: [number, number, number]
    target: [number, number, number]
    zoom: number
}

export type UIState = {
    isLeftPanelOpen: boolean
    isRightPanelOpen: boolean
    activeTab: string
}

export type SimulationState = {
    isPlaying: boolean
    speed: number
    currentTime: number
    intensity: number
    density: number
}

export type SessionState = {
    id?: string
    name: string
    viewMode: ViewMode
    correlationMode: CorrelationMode
    activePresetId: string | null
    uiState: UIState
    cameraState: CameraState
    simulationState: SimulationState
}

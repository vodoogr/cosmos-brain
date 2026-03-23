export type DatasetKind =
  | 'universe_catalog'
  | 'brain_atlas'
  | 'eeg_template'
  | 'story_pack'
  | 'correlation_profile'

export type AstronomyObjectType =
  | 'star'
  | 'planetary_system'
  | 'nebula'
  | 'galaxy'
  | 'cluster'
  | 'supercluster'
  | 'filament_node'
  | 'void'

export type HemisphereType = 'left' | 'right' | 'midline'

export type PresetType =
  | 'meditation'
  | 'focus'
  | 'deep_sleep'
  | 'creative_state'
  | 'custom'

export interface DatasetRelease {
  id: string
  kind: DatasetKind
  version: string
  label: string
  isActive: boolean
  metadata: Record<string, unknown>
  publishedAt?: string | null
}

export interface UniverseObject {
  id: string
  name: string | null
  objectType: AstronomyObjectType
  x: number
  y: number
  z: number
  rightAscension?: number | null
  declination?: number | null
  distanceLy?: number | null
  magnitude?: number | null
  constellation?: string | null
  metadata: Record<string, unknown>
}

export interface AstronomyRelationship {
  id: string
  sourceObjectId: string
  targetObjectId: string
  relationshipType: string
  weight: number
  metadata: Record<string, unknown>
}

export interface BrainRegion {
  id: string
  name: string
  hemisphere: HemisphereType
  functionalCategory?: string | null
  x: number
  y: number
  z: number
  meshRef?: string | null
  metadata: Record<string, unknown>
}

export interface BrainRegionRelationship {
  id: string
  sourceRegionId: string
  targetRegionId: string
  relationshipType: string
  weight: number
  metadata: Record<string, unknown>
}

export interface SimulationPreset {
  id: string
  name: string
  presetType: PresetType
  brainBandConfig: Record<string, unknown>
  visualConfig: Record<string, unknown>
  correlationConfig: Record<string, unknown>
  simulationConfig: Record<string, unknown>
  cameraConfig: Record<string, unknown>
  isSystem: boolean
  isPublic: boolean
}

export interface SessionState {
  id: string
  name: string
  projectId: string
  userId: string
  viewMode: 'universe' | 'brain' | 'both'
  correlationMode: string
  cameraState: Record<string, unknown>
  uiState: Record<string, unknown>
  simulationState: Record<string, unknown>
}

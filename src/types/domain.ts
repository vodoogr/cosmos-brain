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

export interface SetiInstrument {
  id: string
  name: string
  type: string
  location?: string | null
  metadata: Record<string, unknown>
}

export interface SetiTarget {
  id: string
  name: string
  rightAscension: number
  declination: number
  distanceLy?: number | null
  priorityScore: number
  metadata: Record<string, unknown>
}

export interface SetiObservation {
  id: string
  targetId: string
  instrumentId: string
  startTime: string
  endTime: string
  frequencyStart: number
  frequencyEnd: number
  metadata: Record<string, unknown>
}

export interface SetiCandidate {
  id: string
  observationId: string
  frequency: number
  snr: number
  driftRate: number
  mlScore?: number | null
  hitType: string
  status: string
  metadata: Record<string, unknown>
}

export interface SetiMlRun {
  id: string
  candidateId: string
  modelName: string
  modelConfig: Record<string, unknown>
  confidenceScore: number
  extractedFeatures: Record<string, unknown>
  runTime: string
}

export interface SmallBody {
  id: string
  name: string
  designation: string
  classification: string
  isNeo: boolean
  isPha: boolean
  absoluteMagnitude?: number | null
  diameter?: number | null
  metadata: Record<string, unknown>
}

export interface SmallBodyEphemerisAsset {
  id: string
  smallBodyId: string
  epoch: number
  eccentricity: number
  semiMajorAxis: number
  inclination: number
  ascendingNode: number
  perihelionArgument: number
  meanAnomaly: number
  metadata: Record<string, unknown>
}

export interface MeteorEvent {
  id: string
  eventName: string
  peakTime: string
  energy: number
  latitude?: number | null
  longitude?: number | null
  altitude?: number | null
  velocity?: number | null
  metadata: Record<string, unknown>
}

export interface MeteorEventAsset {
  id: string
  eventId: string
  assetType: string
  url: string
  metadata: Record<string, unknown>
}

import { create } from 'zustand'
import { UniverseObject, AstronomyRelationship } from '@/types/domain'

interface UniverseState {
  objects: UniverseObject[]
  relationships: AstronomyRelationship[]
  isLoading: boolean

  setObjects: (objects: UniverseObject[]) => void
  setRelationships: (relationships: AstronomyRelationship[]) => void
  setLoading: (loading: boolean) => void
}

export const useUniverseStore = create<UniverseState>((set) => ({
  objects: [],
  relationships: [],
  isLoading: false,

  setObjects: (objects) => set({ objects }),
  setRelationships: (relationships) => set({ relationships }),
  setLoading: (loading) => set({ isLoading: loading }),
}))

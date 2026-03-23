import { create } from 'zustand'
import { BrainRegion, BrainRegionRelationship } from '@/types/domain'

interface BrainState {
  regions: BrainRegion[]
  relationships: BrainRegionRelationship[]
  isLoading: boolean

  setRegions: (regions: BrainRegion[]) => void
  setRelationships: (relationships: BrainRegionRelationship[]) => void
  setLoading: (loading: boolean) => void
}

export const useBrainStore = create<BrainState>((set) => ({
  regions: [],
  relationships: [],
  isLoading: false,

  setRegions: (regions) => set({ regions }),
  setRelationships: (relationships) => set({ relationships }),
  setLoading: (loading) => set({ isLoading: loading }),
}))

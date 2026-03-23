import { create } from 'zustand'
import { DatasetRelease } from '@/types/domain'

interface DatasetState {
  activeUniverseRelease: DatasetRelease | null
  activeBrainRelease: DatasetRelease | null
  isLoading: boolean

  setActiveReleases: (
    universeRelease: DatasetRelease | null,
    brainRelease: DatasetRelease | null
  ) => void

  setLoading: (loading: boolean) => void
}

export const useDatasetStore = create<DatasetState>((set) => ({
  activeUniverseRelease: null,
  activeBrainRelease: null,
  isLoading: false,

  setActiveReleases: (universeRelease, brainRelease) =>
    set({
      activeUniverseRelease: universeRelease,
      activeBrainRelease: brainRelease,
    }),

  setLoading: (loading) => set({ isLoading: loading }),
}))

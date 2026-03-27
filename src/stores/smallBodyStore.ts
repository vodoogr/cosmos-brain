import { create } from 'zustand'
import { SmallBody, SmallBodyEphemerisAsset } from '@/types/domain'

interface SmallBodyFilters {
  showNeoOnly: boolean
  showPhaOnly: boolean
  minDiameter?: number
}

interface SmallBodyState {
  smallBodies: SmallBody[]
  ephemerisMap: Record<string, SmallBodyEphemerisAsset[]>
  isLoading: boolean
  filters: SmallBodyFilters

  setSmallBodies: (bodies: SmallBody[]) => void
  setEphemeris: (bodyId: string, assets: SmallBodyEphemerisAsset[]) => void
  setFilters: (filters: Partial<SmallBodyFilters>) => void
  setLoading: (loading: boolean) => void
}

export const useSmallBodyStore = create<SmallBodyState>((set) => ({
  smallBodies: [],
  ephemerisMap: {},
  isLoading: false,
  filters: {
    showNeoOnly: false,
    showPhaOnly: false,
  },

  setSmallBodies: (bodies) => set({ smallBodies: bodies }),
  setEphemeris: (bodyId, assets) => set((state) => ({
    ephemerisMap: { ...state.ephemerisMap, [bodyId]: assets }
  })),
  setFilters: (newFilters) => set((state) => ({ 
    filters: { ...state.filters, ...newFilters } 
  })),
  setLoading: (loading) => set({ isLoading: loading }),
}))

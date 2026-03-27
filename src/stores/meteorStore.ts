import { create } from 'zustand'
import { MeteorEvent, MeteorEventAsset } from '@/types/domain'

interface MeteorState {
  events: MeteorEvent[]
  assetMap: Record<string, MeteorEventAsset[]>
  isLoading: boolean

  setEvents: (events: MeteorEvent[]) => void
  setAssets: (eventId: string, assets: MeteorEventAsset[]) => void
  setLoading: (loading: boolean) => void
}

export const useMeteorStore = create<MeteorState>((set) => ({
  events: [],
  assetMap: {},
  isLoading: false,

  setEvents: (events) => set({ events }),
  setAssets: (eventId, assets) => set((state) => ({
    assetMap: { ...state.assetMap, [eventId]: assets }
  })),
  setLoading: (loading) => set({ isLoading: loading }),
}))

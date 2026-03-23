import { create } from 'zustand'

export type QualityMode = 'low' | 'medium' | 'high'

export interface UIState {
  isLeftPanelOpen: boolean
  isRightPanelOpen: boolean
  activeTab: string
  qualityMode: QualityMode
  showLabels: boolean

  toggleLeftPanel: () => void
  toggleRightPanel: () => void
  setActiveTab: (tab: string) => void
  setQualityMode: (mode: QualityMode) => void
  setShowLabels: (value: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isLeftPanelOpen: true,
  isRightPanelOpen: false,
  activeTab: 'main',
  qualityMode: 'high',
  showLabels: true,

  toggleLeftPanel: () =>
    set((state) => ({ isLeftPanelOpen: !state.isLeftPanelOpen })),

  toggleRightPanel: () =>
    set((state) => ({ isRightPanelOpen: !state.isRightPanelOpen })),

  setActiveTab: (tab) => set({ activeTab: tab }),
  setQualityMode: (mode) => set({ qualityMode: mode }),
  setShowLabels: (value) => set({ showLabels: value }),
}))

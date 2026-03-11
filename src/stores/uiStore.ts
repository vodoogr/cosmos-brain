import { create } from 'zustand'

interface UIState {
    isLeftPanelOpen: boolean
    isRightPanelOpen: boolean
    qualityMode: 'low' | 'high'
    labelsEnabled: boolean
    toggleLeftPanel: () => void
    toggleRightPanel: () => void
    setQualityMode: (mode: 'low' | 'high') => void
    setLabelsEnabled: (enabled: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
    isLeftPanelOpen: true,
    isRightPanelOpen: false,
    qualityMode: 'high',
    labelsEnabled: true,
    toggleLeftPanel: () => set((state) => ({ isLeftPanelOpen: !state.isLeftPanelOpen })),
    toggleRightPanel: () => set((state) => ({ isRightPanelOpen: !state.isRightPanelOpen })),
    setQualityMode: (mode) => set({ qualityMode: mode }),
    setLabelsEnabled: (enabled) => set({ labelsEnabled: enabled })
}))

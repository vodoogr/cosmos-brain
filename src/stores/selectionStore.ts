import { create } from 'zustand'

export type SelectionDomain = 'universe' | 'brain' | 'setiTarget' | 'setiCandidate' | 'smallBody' | 'meteorEvent' | null

interface SelectionState {
  selectedDomain: SelectionDomain
  selectedId: string | null
  selectedPayload: unknown | null

  setSelection: (
    domain: Exclude<SelectionDomain, null>,
    id: string,
    payload: unknown
  ) => void

  clearSelection: () => void
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedDomain: null,
  selectedId: null,
  selectedPayload: null,

  setSelection: (domain, id, payload) =>
    set({
      selectedDomain: domain,
      selectedId: id,
      selectedPayload: payload,
    }),

  clearSelection: () =>
    set({
      selectedDomain: null,
      selectedId: null,
      selectedPayload: null,
    }),
}))

import { create } from 'zustand'
import { SetiTarget, SetiObservation, SetiCandidate, SetiMlRun } from '@/types/domain'

export interface CandidateFilters {
  minSnr?: number
  minMlScore?: number
  hitTypes?: string[]
}

interface SetiState {
  targets: SetiTarget[]
  observations: SetiObservation[]
  candidates: SetiCandidate[]
  mlRuns: Record<string, SetiMlRun>
  isLoading: boolean
  filters: CandidateFilters

  setTargets: (targets: SetiTarget[]) => void
  setObservations: (observations: SetiObservation[]) => void
  setCandidates: (candidates: SetiCandidate[]) => void
  setMlRuns: (candidateId: string, run: SetiMlRun) => void
  setFilters: (filters: Partial<CandidateFilters>) => void
  setLoading: (loading: boolean) => void
}

export const useSetiStore = create<SetiState>((set) => ({
  targets: [],
  observations: [],
  candidates: [],
  mlRuns: {},
  isLoading: false,
  filters: {},

  setTargets: (targets) => set({ targets }),
  setObservations: (observations) => set({ observations }),
  setCandidates: (candidates) => set({ candidates }),
  setMlRuns: (candidateId, run) => set((state) => ({ mlRuns: { ...state.mlRuns, [candidateId]: run } })),
  setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  setLoading: (loading) => set({ isLoading: loading }),
}))

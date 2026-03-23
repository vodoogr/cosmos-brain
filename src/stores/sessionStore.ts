import { create } from 'zustand'
import { SessionState as SessionDomainState } from '@/types/domain'

interface SessionStoreState {
  activeSession: SessionDomainState | null
  isSaving: boolean
  setSession: (session: SessionDomainState | null) => void
  setSaving: (saving: boolean) => void
}

export const useSessionStore = create<SessionStoreState>((set) => ({
  activeSession: null,
  isSaving: false,
  setSession: (session) => set({ activeSession: session }),
  setSaving: (saving) => set({ isSaving: saving })
}))

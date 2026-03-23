import { supabase } from '@/lib/supabase/client'
import { SessionState } from '@/types/domain'

type ExplorationSessionRow = {
  id: string
  project_id: string
  user_id: string
  name: string
  view_mode: 'universe' | 'brain' | 'both'
  correlation_mode: string
  camera_state: Record<string, unknown> | null
  ui_state: Record<string, unknown> | null
  simulation_state: Record<string, unknown> | null
}

export type SaveSessionInput = {
  id?: string
  project_id: string
  user_id: string
  name: string
  view_mode: 'universe' | 'brain' | 'both'
  correlation_mode: string
  active_preset_id?: string | null
  camera_state: Record<string, unknown>
  ui_state: Record<string, unknown>
  simulation_state: Record<string, unknown>
}

const mapSessionRow = (row: ExplorationSessionRow): SessionState => ({
  id: row.id,
  projectId: row.project_id,
  userId: row.user_id,
  name: row.name,
  viewMode: row.view_mode,
  correlationMode: row.correlation_mode,
  cameraState: row.camera_state ?? {},
  uiState: row.ui_state ?? {},
  simulationState: row.simulation_state ?? {},
})

export const sessionService = {
  async getSession(id: string): Promise<SessionState | null> {
    const { data, error } = await supabase
      .from('exploration_sessions')
      .select(
        'id, project_id, user_id, name, view_mode, correlation_mode, camera_state, ui_state, simulation_state'
      )
      .eq('id', id)
      .single()

    if (error) throw error
    return data ? mapSessionRow(data) : null
  },

  async saveSession(sessionData: SaveSessionInput): Promise<SessionState> {
    if (sessionData.id) {
      const { data, error } = await supabase
        .from('exploration_sessions')
        .update({
          project_id: sessionData.project_id,
          user_id: sessionData.user_id,
          name: sessionData.name,
          view_mode: sessionData.view_mode,
          correlation_mode: sessionData.correlation_mode,
          active_preset_id: sessionData.active_preset_id ?? null,
          camera_state: sessionData.camera_state,
          ui_state: sessionData.ui_state,
          simulation_state: sessionData.simulation_state,
        })
        .eq('id', sessionData.id)
        .select(
          'id, project_id, user_id, name, view_mode, correlation_mode, camera_state, ui_state, simulation_state'
        )
        .single()

      if (error) throw error
      return mapSessionRow(data)
    }

    const { data, error } = await supabase
      .from('exploration_sessions')
      .insert({
        project_id: sessionData.project_id,
        user_id: sessionData.user_id,
        name: sessionData.name,
        view_mode: sessionData.view_mode,
        correlation_mode: sessionData.correlation_mode,
        active_preset_id: sessionData.active_preset_id ?? null,
        camera_state: sessionData.camera_state,
        ui_state: sessionData.ui_state,
        simulation_state: sessionData.simulation_state,
      })
      .select(
        'id, project_id, user_id, name, view_mode, correlation_mode, camera_state, ui_state, simulation_state'
      )
      .single()

    if (error) throw error
    return mapSessionRow(data)
  },
}

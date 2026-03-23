import { supabase } from '@/lib/supabase/client'
import { SimulationPreset } from '@/types/domain'

type SimulationPresetRow = {
  id: string
  name: string
  preset_type: SimulationPreset['presetType']
  brain_band_config: Record<string, unknown> | null
  visual_config: Record<string, unknown> | null
  correlation_config: Record<string, unknown> | null
  simulation_config: Record<string, unknown> | null
  camera_config: Record<string, unknown> | null
  is_system: boolean
  is_public: boolean
}

const mapSimulationPreset = (row: SimulationPresetRow): SimulationPreset => ({
  id: row.id,
  name: row.name,
  presetType: row.preset_type,
  brainBandConfig: row.brain_band_config ?? {},
  visualConfig: row.visual_config ?? {},
  correlationConfig: row.correlation_config ?? {},
  simulationConfig: row.simulation_config ?? {},
  cameraConfig: row.camera_config ?? {},
  isSystem: row.is_system,
  isPublic: row.is_public,
})

export const presetService = {
  async getAvailablePresets(): Promise<SimulationPreset[]> {
    const { data, error } = await supabase
      .from('simulation_presets')
      .select(
        'id, name, preset_type, brain_band_config, visual_config, correlation_config, simulation_config, camera_config, is_system, is_public'
      )
      .or('is_system.eq.true,is_public.eq.true')
      .order('name', { ascending: true })

    if (error) throw error
    return (data ?? []).map(mapSimulationPreset)
  },
}

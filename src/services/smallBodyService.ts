import { supabase } from '@/lib/supabase/client'
import { SmallBody, SmallBodyEphemerisAsset } from '@/types/domain'
import { mappers } from '@/lib/supabase/mappers'

export const smallBodyService = {
  async getSmallBodies(): Promise<SmallBody[]> {
    const { data, error } = await supabase
      .from('small_bodies')
      .select('*')
      .limit(2000)

    if (error) throw error
    return (data ?? []).map(mappers.mapSmallBody)
  },

  async getEphemerisAssets(smallBodyId: string): Promise<SmallBodyEphemerisAsset[]> {
    const { data, error } = await supabase
      .from('small_body_ephemeris_assets')
      .select('*')
      .eq('small_body_id', smallBodyId)

    if (error) throw error
    return (data ?? []).map(mappers.mapSmallBodyEphemerisAsset)
  }
}

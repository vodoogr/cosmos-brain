import { supabase } from '@/lib/supabase/client'
import { MeteorEvent, MeteorEventAsset } from '@/types/domain'
import { mappers } from '@/lib/supabase/mappers'

export const meteorEventService = {
  async getMeteorEvents(): Promise<MeteorEvent[]> {
    const { data, error } = await supabase
      .from('meteor_events')
      .select('*')
      .order('peak_time', { ascending: false })
      .limit(1000)

    if (error) throw error
    return (data ?? []).map(mappers.mapMeteorEvent)
  },

  async getEventAssets(eventId: string): Promise<MeteorEventAsset[]> {
    const { data, error } = await supabase
      .from('meteor_event_assets')
      .select('*')
      .eq('event_id', eventId)

    if (error) throw error
    return (data ?? []).map(mappers.mapMeteorEventAsset)
  }
}

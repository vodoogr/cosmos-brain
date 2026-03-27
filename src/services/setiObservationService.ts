import { supabase } from '@/lib/supabase/client'
import { SetiObservation } from '@/types/domain'
import { mappers } from '@/lib/supabase/mappers'

export const setiObservationService = {
  async getObservationsByTarget(targetId: string): Promise<SetiObservation[]> {
    const { data, error } = await supabase
      .from('seti_observations')
      .select('*')
      .eq('target_id', targetId)
      .order('start_time', { ascending: false })

    if (error) throw error
    return (data ?? []).map(mappers.mapSetiObservation)
  }
}

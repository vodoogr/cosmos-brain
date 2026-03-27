import { supabase } from '@/lib/supabase/client'
import { SetiCandidate } from '@/types/domain'
import { mappers } from '@/lib/supabase/mappers'

export const setiCandidateService = {
  async getCandidates(): Promise<SetiCandidate[]> {
    const { data, error } = await supabase
      .from('seti_candidates')
      .select('*')
      .order('snr', { ascending: false })
      .limit(500)

    if (error) throw error
    return (data ?? []).map(mappers.mapSetiCandidate)
  },

  async getCandidatesByObservation(observationId: string): Promise<SetiCandidate[]> {
    const { data, error } = await supabase
      .from('seti_candidates')
      .select('*')
      .eq('observation_id', observationId)
      .order('snr', { ascending: false })

    if (error) throw error
    return (data ?? []).map(mappers.mapSetiCandidate)
  }
}

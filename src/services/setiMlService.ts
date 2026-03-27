import { supabase } from '@/lib/supabase/client'
import { SetiMlRun } from '@/types/domain'
import { mappers } from '@/lib/supabase/mappers'

export const setiMlService = {
  async getMlRunsByCandidate(candidateId: string): Promise<SetiMlRun[]> {
    const { data, error } = await supabase
      .from('seti_ml_runs')
      .select('*')
      .eq('candidate_id', candidateId)
      .order('run_time', { ascending: false })

    if (error) throw error
    return (data ?? []).map(mappers.mapSetiMlRun)
  }
}

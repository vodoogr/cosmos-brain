import { supabase } from '@/lib/supabase/client'
import { SetiTarget } from '@/types/domain'
import { mappers } from '@/lib/supabase/mappers'

export const setiTargetService = {
  async getTargets(): Promise<SetiTarget[]> {
    const { data, error } = await supabase
      .from('seti_targets')
      .select('*')
      .order('priority_score', { ascending: false })
      .limit(1000)

    if (error) throw error
    return (data ?? []).map(mappers.mapSetiTarget)
  },

  async getTargetById(id: string): Promise<SetiTarget | null> {
    const { data, error } = await supabase
      .from('seti_targets')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data ? mappers.mapSetiTarget(data) : null
  }
}

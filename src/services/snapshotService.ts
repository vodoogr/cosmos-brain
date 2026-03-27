import { supabase } from '@/lib/supabase/client'

export const snapshotService = {
  async getSnapshots(sessionId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('session_snapshots')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data ?? []
  },

  async createSnapshot(sessionId: string, snapshotData: Record<string, any>): Promise<any> {
    const { data, error } = await supabase
      .from('session_snapshots')
      .insert({ session_id: sessionId, data: snapshotData } as any)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

import { supabase } from '@/lib/supabase/client'

export const sessionService = {
  async getSession(id: string) {
    const { data, error } = await supabase
      .from('exploration_sessions')
      .select('*')
      .eq('id', id)
      .single()
      
    if (error) throw error
    return data
  },

  async saveSession(sessionData: any) {
    if (sessionData.id) {
       const { data, error } = await supabase
         .from('exploration_sessions')
         .update(sessionData)
         .eq('id', sessionData.id)
         .select()
         .single()
       if (error) throw error
       return data
    } else {
       const { data, error } = await supabase
         .from('exploration_sessions')
         .insert(sessionData)
         .select()
         .single()
       if (error) throw error
       return data
    }
  }
}

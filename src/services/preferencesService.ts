import { supabase } from '@/lib/supabase/client'

export const preferencesService = {
  async getPreferences(userId: string) {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single()
      
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updatePreferences(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({ user_id: userId, ...updates })
      .select()
      .single()
      
    if (error) throw error
    return data
  }
}

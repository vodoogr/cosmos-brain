import { supabase } from '@/lib/supabase/client'

export const profileService = {
  async getProfile(userId: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
       console.error(error)
       return null
    }
    return data as any
  },

  async updateProfile(userId: string, updates: Partial<any>) {
    const client = supabase as any
    const { data, error } = await client
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data as any
  }
}

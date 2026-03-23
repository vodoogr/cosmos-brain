import { supabase } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export const authService = {
  async getUser(): Promise<User | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return null

      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) return null

      return user
    } catch {
      return null
    }
  },

  async signInWithOAuth() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) throw error
    return data
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },
}

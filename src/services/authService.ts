import { supabase } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export const authService = {
  async getUser(): Promise<User | null> {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) throw error
    return user
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

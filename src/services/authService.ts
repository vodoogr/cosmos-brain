import { supabase } from '@/lib/supabase/client'

export const authService = {
    async getUser() {
        return await supabase.auth.getUser()
    },
    async signOut() {
        return await supabase.auth.signOut()
    }
}

export const profileService = {
    async getPreferences(userId: string) {
        const { data, error } = await supabase.from('user_preferences').select('*').eq('user_id', userId).single()
        return { data, error }
    }
}

import { supabase } from '@/lib/supabase/client'

export const projectService = {
  async getUserProjects(userId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('owner_id', userId)
      
    if (error) throw error
    return data
  },

  async getProjectBySlug(slug: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()
      
    if (error) throw error
    return data
  }
}

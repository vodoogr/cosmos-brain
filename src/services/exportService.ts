import { supabase } from '@/lib/supabase/client'

export const exportService = {
  async getExports(projectId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('exports')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data ?? []
  },

  async createExport(projectId: string, exportConfig: Record<string, any>): Promise<any> {
    const { data, error } = await supabase
      .from('exports')
      .insert({ project_id: projectId, config: exportConfig, status: 'pending' } as any)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

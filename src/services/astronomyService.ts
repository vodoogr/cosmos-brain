import { supabase } from '@/lib/supabase/client'
import { UniverseObject, AstronomyRelationship } from '@/types/domain'

export const astronomyService = {
  async getObjectsByRelease(releaseId: string): Promise<UniverseObject[]> {
    const { data, error } = await supabase
      .from('astronomy_objects')
      .select('*')
      .eq('release_id', releaseId)
      
    if (error) throw error
    return data as unknown as UniverseObject[]
  },

  async searchObjects(query: string, releaseId: string): Promise<UniverseObject[]> {
    const { data, error } = await supabase
      .from('astronomy_objects')
      .select('*')
      .eq('release_id', releaseId)
      .ilike('name', `%${query}%`)
      .limit(50)
      
    if (error) throw error
    return data as unknown as UniverseObject[]
  },

  async getRelationshipsByRelease(releaseId: string): Promise<AstronomyRelationship[]> {
    const { data, error } = await supabase
      .from('astronomy_relationships')
      .select('*')
      
    if (error) throw error
    return data as unknown as AstronomyRelationship[]
  }
}

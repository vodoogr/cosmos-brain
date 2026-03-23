import { supabase } from '@/lib/supabase/client'
import { BrainRegion, BrainRegionRelationship } from '@/types/domain'

type BrainRegionRow = {
  id: string
  name: string
  hemisphere: BrainRegion['hemisphere']
  functional_category: string | null
  x: number
  y: number
  z: number
  mesh_ref: string | null
  metadata: Record<string, unknown> | null
}

type BrainRegionRelationshipRow = {
  id: string
  source_region_id: string
  target_region_id: string
  relationship_type: string
  weight: number
  metadata: Record<string, unknown> | null
}

const mapBrainRegion = (row: BrainRegionRow): BrainRegion => ({
  id: row.id,
  name: row.name,
  hemisphere: row.hemisphere,
  functionalCategory: row.functional_category,
  x: row.x,
  y: row.y,
  z: row.z,
  meshRef: row.mesh_ref,
  metadata: row.metadata ?? {},
})

const mapBrainRelationship = (
  row: BrainRegionRelationshipRow
): BrainRegionRelationship => ({
  id: row.id,
  sourceRegionId: row.source_region_id,
  targetRegionId: row.target_region_id,
  relationshipType: row.relationship_type,
  weight: row.weight,
  metadata: row.metadata ?? {},
})

export const brainAtlasService = {
  async getRegionsByRelease(releaseId: string): Promise<BrainRegion[]> {
    const { data, error } = await supabase
      .from('brain_regions')
      .select(
        'id, name, hemisphere, functional_category, x, y, z, mesh_ref, metadata'
      )
      .eq('dataset_release_id', releaseId)
      .order('name', { ascending: true })

    if (error) throw error
    return (data ?? []).map(mapBrainRegion)
  },

  async searchRegions(query: string, releaseId: string): Promise<BrainRegion[]> {
    const { data, error } = await supabase
      .from('brain_regions')
      .select(
        'id, name, hemisphere, functional_category, x, y, z, mesh_ref, metadata'
      )
      .eq('dataset_release_id', releaseId)
      .ilike('name', `%${query}%`)
      .limit(50)

    if (error) throw error
    return (data ?? []).map(mapBrainRegion)
  },

  async getRelationshipsByRelease(
    releaseId: string
  ): Promise<BrainRegionRelationship[]> {
    const { data, error } = await supabase
      .from('brain_region_relationships')
      .select(
        'id, source_region_id, target_region_id, relationship_type, weight, metadata'
      )
      .eq('dataset_release_id', releaseId)

    if (error) throw error
    return (data ?? []).map(mapBrainRelationship)
  },
}

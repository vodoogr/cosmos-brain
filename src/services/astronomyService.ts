import { supabase } from '@/lib/supabase/client'
import { UniverseObject, AstronomyRelationship } from '@/types/domain'

type AstronomyObjectRow = {
  id: string
  name: string | null
  object_type: UniverseObject['objectType']
  x: number
  y: number
  z: number
  right_ascension: number | null
  declination: number | null
  distance_ly: number | null
  magnitude: number | null
  constellation: string | null
  metadata: Record<string, unknown> | null
}

type AstronomyRelationshipRow = {
  id: string
  source_object_id: string
  target_object_id: string
  relationship_type: string
  weight: number
  metadata: Record<string, unknown> | null
}

const mapAstronomyObject = (row: AstronomyObjectRow): UniverseObject => ({
  id: row.id,
  name: row.name,
  objectType: row.object_type,
  x: row.x,
  y: row.y,
  z: row.z,
  rightAscension: row.right_ascension,
  declination: row.declination,
  distanceLy: row.distance_ly,
  magnitude: row.magnitude,
  constellation: row.constellation,
  metadata: row.metadata ?? {},
})

const mapAstronomyRelationship = (
  row: AstronomyRelationshipRow
): AstronomyRelationship => ({
  id: row.id,
  sourceObjectId: row.source_object_id,
  targetObjectId: row.target_object_id,
  relationshipType: row.relationship_type,
  weight: row.weight,
  metadata: row.metadata ?? {},
})

export const astronomyService = {
  async getObjectsByRelease(releaseId: string): Promise<UniverseObject[]> {
    const { data, error } = await supabase
      .from('astronomy_objects')
      .select(
        'id, name, object_type, x, y, z, right_ascension, declination, distance_ly, magnitude, constellation, metadata'
      )
      .eq('dataset_release_id', releaseId)
      .order('name', { ascending: true })

    if (error) throw error
    return (data ?? []).map(mapAstronomyObject)
  },

  async searchObjects(query: string, releaseId: string): Promise<UniverseObject[]> {
    const { data, error } = await supabase
      .from('astronomy_objects')
      .select(
        'id, name, object_type, x, y, z, right_ascension, declination, distance_ly, magnitude, constellation, metadata'
      )
      .eq('dataset_release_id', releaseId)
      .ilike('name', `%${query}%`)
      .limit(50)

    if (error) throw error
    return (data ?? []).map(mapAstronomyObject)
  },

  async getRelationshipsByRelease(
    releaseId: string
  ): Promise<AstronomyRelationship[]> {
    const { data, error } = await supabase
      .from('astronomy_relationships')
      .select(
        'id, source_object_id, target_object_id, relationship_type, weight, metadata'
      )
      .eq('dataset_release_id', releaseId)

    if (error) throw error
    return (data ?? []).map(mapAstronomyRelationship)
  },
}

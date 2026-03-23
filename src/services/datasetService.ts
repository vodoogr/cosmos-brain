import { supabase } from '@/lib/supabase/client'
import { DatasetRelease } from '@/types/domain'

type DatasetReleaseRow = {
  id: string
  kind: DatasetRelease['kind']
  version: string
  label: string
  is_active: boolean
  metadata: Record<string, unknown> | null
  published_at: string | null
}

const mapDatasetRelease = (row: DatasetReleaseRow): DatasetRelease => ({
  id: row.id,
  kind: row.kind,
  version: row.version,
  label: row.label,
  isActive: row.is_active,
  metadata: row.metadata ?? {},
  publishedAt: row.published_at,
})

export const datasetService = {
  async getActiveReleases(): Promise<DatasetRelease[]> {
    const { data, error } = await supabase
      .from('dataset_releases')
      .select('id, kind, version, label, is_active, metadata, published_at')
      .eq('is_active', true)

    if (error) throw error
    return (data ?? []).map(mapDatasetRelease)
  },

  async getReleaseMetadata(releaseId: string): Promise<DatasetRelease | null> {
    const { data, error } = await supabase
      .from('dataset_releases')
      .select('id, kind, version, label, is_active, metadata, published_at')
      .eq('id', releaseId)
      .single()

    if (error) throw error
    return data ? mapDatasetRelease(data) : null
  },
}

import { supabase } from '@/lib/supabase/client'

export const datasetService = {
    async getActiveReleases() {
        const { data, error } = await supabase.from('dataset_releases').select('*').eq('is_active', true)
        return { data, error }
    }
}

export const astronomyService = {
    async getObjectsByRelease(releaseId: string) {
        const { data, error } = await supabase.from('astronomy_objects').select('*').eq('release_id', releaseId)
        return { data, error }
    }
}

export const brainAtlasService = {
    async getRegionsByRelease(releaseId: string) {
        const { data, error } = await supabase.from('brain_regions').select('*').eq('release_id', releaseId)
        return { data, error }
    }
}

export const presetService = {
    async getPresets() {
        const { data, error } = await supabase.from('simulation_presets').select('*').eq('is_system', true)
        return { data, error }
    }
}

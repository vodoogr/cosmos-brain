export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    updated_at: string | null
                    full_name: string | null
                    avatar_url: string | null
                    website: string | null
                }
                Insert: {
                    id: string
                    updated_at?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    website?: string | null
                }
                Update: {
                    id?: string
                    updated_at?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    website?: string | null
                }
            }
            user_preferences: {
                Row: {
                    id: string
                    user_id: string
                    theme: string
                    quality_mode: string
                    labels_enabled: boolean
                    default_view_mode: string
                }
            }
            projects: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    created_at: string
                    owner_id: string
                }
            }
            exploration_sessions: {
                Row: {
                    id: string
                    project_id: string
                    user_id: string
                    name: string
                    created_at: string
                    updated_at: string
                    ui_state: Json
                    camera_state: Json
                    view_mode: string
                    correlation_mode: string
                    active_preset_id: string | null
                    simulation_state: Json
                }
            }
            astronomy_catalog_sources: { Row: { id: string, name: string, active: boolean } }
            brain_atlas_sources: { Row: { id: string, name: string, active: boolean } }
            dataset_releases: { Row: { id: string, domain: string, source_id: string, is_active: boolean } }
            astronomy_objects: { Row: { id: string, release_id: string, name: string, type: string, coordinates: Json, metadata: Json } }
            brain_regions: { Row: { id: string, release_id: string, name: string, coordinates: Json, metadata: Json } }
            simulation_presets: { Row: { id: string, name: string, is_system: boolean, parameters: Json } }
        }
    }
}

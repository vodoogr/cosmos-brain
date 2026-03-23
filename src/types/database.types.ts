export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: { /* ... */ };
        Update: { /* ... */ };
      };
      user_preferences: {
        Row: {
          user_id: string;
          theme: string;
          quality_mode: string;
          labels_enabled: boolean;
          default_view_mode: string;
        };
        Insert: { /* ... */ };
        Update: { /* ... */ };
      };
      dataset_releases: {
        Row: {
          id: string;
          domain: 'universe' | 'brain';
          name: string;
          version: string;
          is_active: boolean;
          metadata: Json | null;
        };
        Insert: { /* ... */ };
        Update: { /* ... */ };
      };
      astronomy_objects: {
        Row: {
          id: string;
          release_id: string;
          name: string;
          type: string;
          x: number;
          y: number;
          z: number;
          mass?: number;
          radius?: number;
          metadata: Json | null;
        };
        Insert: { /* ... */ };
        Update: { /* ... */ };
      };
      brain_regions: {
        Row: {
          id: string;
          release_id: string;
          name: string;
          acronym: string;
          hemisphere: 'left' | 'right' | 'both';
          x: number;
          y: number;
          z: number;
          volume?: number;
          metadata: Json | null;
        };
        Insert: { /* ... */ };
        Update: { /* ... */ };
      };
      simulation_presets: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          correlation_mode: string;
          visual_parameters: Json;
          is_system: boolean;
          owner_id: string | null;
        };
        Insert: { /* ... */ };
        Update: { /* ... */ };
      };
      exploration_sessions: {
        Row: {
          id: string;
          project_id: string | null;
          owner_id: string;
          name: string;
          view_mode: string;
          camera_state: Json;
          active_preset_id: string | null;
          ui_state: Json;
          simulation_state: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: { /* ... */ };
        Update: { /* ... */ };
      };
      astronomy_relationships: {
        Row: {
          id: string;
          source_id: string;
          target_id: string;
          type: string;
          strength: number;
        };
      };
      brain_region_relationships: {
        Row: {
          id: string;
          source_id: string;
          target_id: string;
          type: string;
          strength: number;
        };
      };
    };
  };
}

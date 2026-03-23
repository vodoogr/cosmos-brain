'use client'

import { useEffect, useRef } from 'react'
import { authService } from '@/services/authService'
import { datasetService } from '@/services/datasetService'
import { astronomyService } from '@/services/astronomyService'
import { brainAtlasService } from '@/services/brainAtlasService'
import { presetService } from '@/services/presetService'
import { useAuthStore } from '@/stores/authStore'
import { useDatasetStore } from '@/stores/datasetStore'
import { useUniverseStore } from '@/stores/universeStore'
import { useBrainStore } from '@/stores/brainStore'
import { useSimulationStore } from '@/stores/simulationStore'

export const AppInitializer = () => {
  const { setUser } = useAuthStore()
  const { setActiveReleases, setLoading } = useDatasetStore()
  const { setObjects, setRelationships: setUniverseRelationships } = useUniverseStore()
  const { setRegions, setRelationships: setBrainRelationships } = useBrainStore()
  const { setSpeed, setPresets, setActivePreset } = useSimulationStore()

  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const initializeApp = async () => {
      try {
        setLoading(true)

        // 1. Auth
        const user = await authService.getUser()
        setUser(user)

        // 2. Active releases
        const releases = await datasetService.getActiveReleases()

        const universeRelease =
          releases?.find((r) => r.kind === 'universe_catalog') ?? null

        const brainRelease =
          releases?.find((r) => r.kind === 'brain_atlas') ?? null

        setActiveReleases(universeRelease, brainRelease)

        // 3. Core datasets
        const [
          universeObjects,
          universeRelationships,
          brainRegions,
          brainRelationships,
          presets,
        ] = await Promise.all([
          universeRelease
            ? astronomyService.getObjectsByRelease(universeRelease.id)
            : Promise.resolve([]),

          universeRelease
            ? astronomyService.getRelationshipsByRelease(universeRelease.id)
            : Promise.resolve([]),

          brainRelease
            ? brainAtlasService.getRegionsByRelease(brainRelease.id)
            : Promise.resolve([]),

          brainRelease
            ? brainAtlasService.getRelationshipsByRelease(brainRelease.id)
            : Promise.resolve([]),

          presetService.getAvailablePresets(),
        ])

        setObjects(universeObjects ?? [])
        setUniverseRelationships(universeRelationships ?? [])

        setRegions(brainRegions ?? [])
        setBrainRelationships(brainRelationships ?? [])

        setPresets(presets ?? [])

        const defaultPreset =
          presets?.find((preset) => preset.presetType === 'focus') ??
          presets?.[0] ??
          null

        if (defaultPreset) {
          setActivePreset(defaultPreset)
        }

        setSpeed(1.0)
      } catch (error) {
        console.error('Failed to initialize app data', error)
      } finally {
        setLoading(false)
      }
    }

    void initializeApp()
  }, [
    setUser,
    setActiveReleases,
    setLoading,
    setObjects,
    setUniverseRelationships,
    setRegions,
    setBrainRelationships,
    setPresets,
    setActivePreset,
    setSpeed,
  ])

  return null
}

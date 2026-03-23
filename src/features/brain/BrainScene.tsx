import { useMemo } from 'react'
import { useBrainStore } from '@/stores/brainStore'
import { useSimulationStore } from '@/stores/simulationStore'
import { useSelectionStore } from '@/stores/selectionStore'

const BRAIN_SCALE = 0.08

export const BrainScene = () => {
  const { regions } = useBrainStore()
  const { viewMode } = useSimulationStore()
  const { setSelection, selectedId, selectedDomain } = useSelectionStore()

  const offset = useMemo(
    () => (viewMode === 'both' ? ([20, 0, 0] as const) : ([0, 0, 0] as const)),
    [viewMode]
  )

  if (viewMode !== 'brain' && viewMode !== 'both') return null

  return (
    <group position={offset}>
      {regions.map((region) => {
        const isSelected =
          selectedDomain === 'brain' && selectedId === region.id

        return (
          <mesh
            key={region.id}
            position={[
              region.x * BRAIN_SCALE,
              region.y * BRAIN_SCALE,
              region.z * BRAIN_SCALE,
            ]}
            onClick={(e) => {
              e.stopPropagation()
              setSelection('brain', region.id, region)
            }}
          >
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial
              color={isSelected ? '#ffffff' : '#f43f5e'}
              wireframe
            />
          </mesh>
        )
      })}
    </group>
  )
}

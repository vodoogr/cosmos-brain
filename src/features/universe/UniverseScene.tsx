import { useMemo } from 'react'
import { useUniverseStore } from '@/stores/universeStore'
import { useSimulationStore } from '@/stores/simulationStore'
import { useSelectionStore } from '@/stores/selectionStore'

const UNIVERSE_SCALE = 0.0025

export const UniverseScene = () => {
  const { objects } = useUniverseStore()
  const { viewMode } = useSimulationStore()
  const { setSelection, selectedId, selectedDomain } = useSelectionStore()

  const scaledObjects = useMemo(
    () =>
      objects.map((obj) => ({
        ...obj,
        scaledX: obj.x * UNIVERSE_SCALE,
        scaledY: obj.y * UNIVERSE_SCALE,
        scaledZ: obj.z * UNIVERSE_SCALE,
      })),
    [objects]
  )

  if (viewMode !== 'universe' && viewMode !== 'both') return null

  return (
    <group>
      {scaledObjects.map((obj) => {
        const isSelected =
          selectedDomain === 'universe' && selectedId === obj.id

        const radius =
          obj.objectType === 'galaxy'
            ? 0.35
            : obj.objectType === 'cluster'
            ? 0.5
            : obj.objectType === 'filament_node'
            ? 0.2
            : 0.12

        const color =
          obj.objectType === 'galaxy'
            ? '#3b82f6'
            : obj.objectType === 'cluster'
            ? '#8b5cf6'
            : obj.objectType === 'filament_node'
            ? '#38bdf8'
            : '#60a5fa'

        return (
          <mesh
            key={obj.id}
            position={[obj.scaledX, obj.scaledY, obj.scaledZ]}
            onClick={(e) => {
              e.stopPropagation()
              setSelection('universe', obj.id, obj)
            }}
          >
            <sphereGeometry args={[radius, 16, 16]} />
            <meshStandardMaterial
              color={isSelected ? '#ffffff' : color}
              emissive={isSelected ? '#ffffff' : '#000000'}
              emissiveIntensity={isSelected ? 1.8 : 0}
            />
          </mesh>
        )
      })}
    </group>
  )
}

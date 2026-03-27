import { useMemo } from 'react'
import { useMeteorStore } from '@/stores/meteorStore'
import { useSelectionStore } from '@/stores/selectionStore'
import { useSimulationStore } from '@/stores/simulationStore'
import * as THREE from 'three'
import { Line } from '@react-three/drei'

export const MeteorEventLayer = () => {
  const { events } = useMeteorStore()
  const { setSelection, selectedId, selectedDomain } = useSelectionStore()
  const { viewMode } = useSimulationStore()

  const renderedEvents = useMemo(() => {
    return events.map((ev, i) => {
      // Mock meteor trail
      const startX = -20 + (i % 10) * 4
      const startZ = -20 + ((i*3) % 10) * 4
      const startY = 10 + (ev.energy % 5)

      // end is towards surface/earth
      const endPos = new THREE.Vector3(startX + 2, 0, startZ + 2)
      const startPos = new THREE.Vector3(startX, startY, startZ)
      
      const midPos = new THREE.Vector3().lerpVectors(startPos, endPos, 0.5)

      return { ...ev, startPos, endPos, midPos }
    })
  }, [events])

  if (viewMode !== 'universe' && viewMode !== 'both') return null

  return (
    <group>
      {renderedEvents.map(ev => {
        const isSelected = selectedDomain === 'meteorEvent' && selectedId === ev.id
        const color = '#fbbf24' // Yellow-ish fireball

        return (
          <group key={ev.id}>
             <Line
              points={[ev.startPos, ev.endPos]}
              color={isSelected ? '#ffffff' : color}
              lineWidth={isSelected ? 3 : 1.5}
              transparent
              opacity={isSelected ? 1 : 0.6}
              onClick={(e) => {
                e.stopPropagation()
                setSelection('meteorEvent', ev.id, ev)
              }}
            />
            {isSelected && (
              <mesh position={ev.midPos}>
                <sphereGeometry args={[0.3, 8, 8]} />
                <meshBasicMaterial color={color} />
              </mesh>
            )}
          </group>
        )
      })}
    </group>
  )
}

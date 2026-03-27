import { useMemo } from 'react'
import { useSmallBodyStore } from '@/stores/smallBodyStore'
import { useSelectionStore } from '@/stores/selectionStore'
import { useSimulationStore } from '@/stores/simulationStore'
import { OrbitRenderer } from './OrbitRenderer'
import * as THREE from 'three'

export const SmallBodyLayer = () => {
  const { smallBodies, filters } = useSmallBodyStore()
  const { setSelection, selectedId, selectedDomain } = useSelectionStore()
  const { viewMode } = useSimulationStore()

  const renderedBodies = useMemo(() => {
    // Falls back to a procedurally generated asteroid belt if DB yields zero bodies
    let targetDataset = smallBodies
    if (smallBodies.length === 0) {
      targetDataset = Array.from({ length: 400 }).map((_, i) => ({
        id: `ast-${i}`,
        name: `Asteroid ${i}`,
        isNeo: Math.random() > 0.8,
        isPha: Math.random() > 0.95,
        orbit: {
          radiusX: 16 + Math.random() * 4,
          radiusZ: 15 + Math.random() * 4,
          rotation: Math.random() * Math.PI * 2
        }
      })) as any
    }

    return targetDataset.filter(sb => {
      if (filters.showNeoOnly && !sb.isNeo) return false
      if (filters.showPhaOnly && !sb.isPha) return false
      return true
    }).map((sb, i) => {
      // Map procedural orbits or use saved
      const orbitObj = (sb as any).orbit
      const radiusX = orbitObj?.radiusX ?? (20 + (i % 20) * 2.5)
      const radiusZ = orbitObj?.radiusZ ?? (radiusX * (0.8 + (i % 5)*0.1))
      const rot = orbitObj?.rotation ?? (i * 0.1)
      
      // Current point on orbit
      const theta = Math.PI * 0.5 // simulated position
      const cx = Math.cos(theta) * radiusX
      const cz = Math.sin(theta) * radiusZ
      
      const x = cx * Math.cos(rot) - cz * Math.sin(rot)
      const z = cx * Math.sin(rot) + cz * Math.cos(rot)
      return { ...sb, pos: [x, 0, z] as [number, number, number], orbit: { radiusX, radiusZ, rotation: rot } }
    })
  }, [smallBodies, filters])

  if (viewMode !== 'universe' && viewMode !== 'both') return null

  return (
    <group>
      {renderedBodies.map(sb => {
        const isSelected = selectedDomain === 'smallBody' && selectedId === sb.id
        // Dangerous PHA are red, normal asteroids are dim grey/blue
        const color = sb.isPha ? '#ffb4ab' : '#bec7d4'

        return (
          <group key={sb.id}>
            <OrbitRenderer 
              color={color} 
              radiusX={sb.orbit.radiusX} 
              radiusZ={sb.orbit.radiusZ} 
              rotation={sb.orbit.rotation} 
              isSelected={isSelected} 
            />
            <mesh
              position={sb.pos}
              onClick={(e) => {
                e.stopPropagation()
                setSelection('smallBody', sb.id, sb)
              }}
            >
              <sphereGeometry args={[isSelected ? 0.3 : 0.1, 16, 16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={sb.isPha ? 2 : 0} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

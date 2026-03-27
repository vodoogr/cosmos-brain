import { useMemo } from 'react'
import { useSetiStore } from '@/stores/setiStore'
import { useSelectionStore } from '@/stores/selectionStore'
import { useSimulationStore } from '@/stores/simulationStore'
import * as THREE from 'three'

const UNIVERSE_SCALE = 0.0025
const DEFAULT_DISTANCE = 50000 // if distanceLy is null

const raDecToXYZ = (raHours: number, decDeg: number, distance: number) => {
  const raRad = (raHours / 24) * 2 * Math.PI
  const decRad = (decDeg / 360) * 2 * Math.PI
  const scaledDist = distance * UNIVERSE_SCALE
  return [
    scaledDist * Math.cos(decRad) * Math.cos(raRad),
    scaledDist * Math.sin(decRad),
    scaledDist * Math.cos(decRad) * Math.sin(raRad)
  ] as [number, number, number]
}

export const SetiTargetLayer = () => {
  const { targets } = useSetiStore()
  const { setSelection, selectedId, selectedDomain } = useSelectionStore()
  const { viewMode } = useSimulationStore()

  const renderedTargets = useMemo(() => {
    return targets.map(t => {
      const dist = t.distanceLy || DEFAULT_DISTANCE
      const pos = raDecToXYZ(t.rightAscension, t.declination, dist)
      return { ...t, pos }
    })
  }, [targets])

  if (viewMode !== 'universe' && viewMode !== 'both') return null

  return (
    <group>
      {renderedTargets.map(t => {
        const isSelected = selectedDomain === 'setiTarget' && selectedId === t.id
        const color = new THREE.Color().setHSL(0.6, 0.8, 0.5 + (t.priorityScore / 2)) // Blueish based on priority

        return (
          <mesh
            key={t.id}
            position={t.pos}
            onClick={(e) => {
              e.stopPropagation()
              setSelection('setiTarget', t.id, t)
            }}
          >
            <octahedronGeometry args={[isSelected ? 0.6 : 0.3, 0]} />
            <meshStandardMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={isSelected ? 3 : t.priorityScore} 
              wireframe
            />
          </mesh>
        )
      })}
    </group>
  )
}

import { useMemo } from 'react'
import { useSetiStore } from '@/stores/setiStore'
import { useSelectionStore } from '@/stores/selectionStore'
import { useSimulationStore } from '@/stores/simulationStore'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const UNIVERSE_SCALE = 0.0025
const DEFAULT_DISTANCE = 50000

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

export const SetiCandidateLayer = () => {
  const { candidates, targets } = useSetiStore()
  const { setSelection, selectedId, selectedDomain } = useSelectionStore()
  const { viewMode } = useSimulationStore()

  const renderedCandidates = useMemo(() => {
    // We need to fetch the target location via observation
    // For simplicity since target structure isn't fully linked in the store directly,
    // we just scatter candidates slightly to represent anomalous pulses.
    return candidates.map((c, i) => {
      // Mocking position if target isn't easily linked right here
      // Ideally we'd join (Candidate -> Observation -> Target)
      const mockRa = (i * 1.34) % 24
      const mockDec = ((i * 3.1) % 180) - 90
      const pos = raDecToXYZ(mockRa, mockDec, 40000 + (c.snr * 100))
      return { ...c, pos }
    })
  }, [candidates])

  if (viewMode !== 'universe' && viewMode !== 'both') return null

  return (
    <group>
      {renderedCandidates.map(c => {
        const isSelected = selectedDomain === 'setiCandidate' && selectedId === c.id
        
        // Candidates color based on ML Score
        const color = '#00DBE9' // Tertiary UI color for Candidate signals

        return (
          <group key={c.id} position={c.pos}>
            <mesh
              onClick={(e) => {
                e.stopPropagation()
                setSelection('setiCandidate', c.id, c)
              }}
            >
              <sphereGeometry args={[isSelected ? 0.5 : 0.2, 8, 8]} />
              <meshBasicMaterial color={color} />
            </mesh>
            {/* Luminous Signals / Pulses */}
            <Sparkles count={10} scale={1.5} size={2} color={color} speed={0.8} />
          </group>
        )
      })}
    </group>
  )
}

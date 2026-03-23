import { useMemo } from 'react'
import { useSimulationStore } from '@/stores/simulationStore'

export const CorrelationLayer = () => {
  const { viewMode, correlationMode, intensity } = useSimulationStore()

  const opacity = useMemo(() => {
    const clamped = Math.max(0, Math.min(intensity, 1))
    return clamped * 0.12
  }, [intensity])

  if (viewMode !== 'both') return null

  return (
    <group>
      <mesh position={[10, 0, 0]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={opacity}
          wireframe
        />
      </mesh>

      {correlationMode === 'network_similarity' && (
        <mesh position={[10, 0, 0]}>
          <sphereGeometry args={[18, 24, 24]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={opacity * 0.6}
            wireframe
          />
        </mesh>
      )}
    </group>
  )
}

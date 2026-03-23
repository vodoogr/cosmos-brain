import { useMemo } from 'react'
import { useUniverseStore } from '@/stores/universeStore'
import { useBrainStore } from '@/stores/brainStore'
import { useSimulationStore } from '@/stores/simulationStore'
import * as THREE from 'three'

const UNIVERSE_SCALE = 0.0025
const BRAIN_SCALE = 0.015

export const CorrelationLayer = () => {
  const { viewMode, correlationMode, intensity } = useSimulationStore()
  const { objects } = useUniverseStore()
  const { regions } = useBrainStore()

  // Generador de Rayos de Correlación Matemáticos
  const correlationLines = useMemo(() => {
    if (viewMode !== 'both') return new Float32Array(0)
    if (objects.length === 0 || regions.length === 0) return new Float32Array(0)

    // Simularemos conexiones directas basadas en la intensidad de correlación
    // En una iteración científica más profunda, esto usaría grafos semánticos.
    const numLines = Math.floor(intensity * 400) // max 400 haces resonantes
    const arr = new Float32Array(numLines * 6)
    
    let index = 0
    // Usamos semilla pseudoaleatoria por ahora para crear los "Rayos de Influencia"
    for(let i=0; i < numLines; i++) {
       // Toma una región aleatoria del Cerebro "Maestro" (Individuo matriz 0)
       const br = regions[Math.floor(Math.random() * regions.length)]
       // Toma un astro/galaxia aleatorio
       const uObj = objects[Math.floor(Math.random() * objects.length)]
       
       if (!br || !uObj) continue;

       // Debemos aplicar los mismos offsets visuales que usan sus escenas padre
       const bx = br.x * BRAIN_SCALE
       const by = (br.y * BRAIN_SCALE) - 3.5 // Offset del BrainScene
       const bz = br.z * BRAIN_SCALE
       
       const ux = uObj.x * UNIVERSE_SCALE
       const uy = (uObj.y * UNIVERSE_SCALE) + 1.5 // Offset del UniverseScene
       const uz = uObj.z * UNIVERSE_SCALE
       
       // Origen: Nodo Neuronal
       arr[index++] = bx
       arr[index++] = by
       arr[index++] = bz
       
       // Destino: Nodo Estelar
       arr[index++] = ux
       arr[index++] = uy
       arr[index++] = uz
    }
    
    return arr.slice(0, index)
  }, [objects, regions, viewMode, intensity])

  if (viewMode !== 'both' || correlationLines.length === 0) return null

  // Colores termodinámicos basados en la topología de la correlación elegida en la UI
  const color = correlationMode === 'cluster_to_region' ? '#3b82f6' : 
                correlationMode === 'frequency_color_mapping' ? '#8b5cf6' : 
                correlationMode === 'network_similarity' ? '#f43f5e' :
                '#10b981' // emerald by default

  return (
    <group>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={correlationLines.length / 3}
            array={correlationLines}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color={color} 
          transparent 
          opacity={0.15 + (intensity * 0.3)} 
          linewidth={1}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}

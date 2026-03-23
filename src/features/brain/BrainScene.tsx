import { useMemo, useRef, useEffect } from 'react'
import { useBrainStore } from '@/stores/brainStore'
import { useSimulationStore } from '@/stores/simulationStore'
import { useSelectionStore } from '@/stores/selectionStore'
import * as THREE from 'three'

// Escala minúscula para que quepa perfectamente en la pantalla conjunta
const BRAIN_SCALE = 0.015

export const BrainScene = () => {
  const { regions, relationships } = useBrainStore()
  const { viewMode, individualsCount } = useSimulationStore()
  const { setSelection, selectedId, selectedDomain } = useSelectionStore()

  // Posicionamos la "colmena" visiblemente abajo (pero dentro de la cámara principal)
  // El Y=-3.5 deja un enorme hueco en la parte superior para que el Cosmos fluya libremente.
  const offset = useMemo(
    () => (viewMode === 'both' ? ([0, -3.5, 0] as const) : ([0, 0, 0] as const)),
    [viewMode]
  )

  const regionMap = useMemo(() => {
    const map = new Map()
    regions.forEach(r => map.set(r.id, r))
    return map
  }, [regions])

  if (viewMode !== 'brain' && viewMode !== 'both') return null
  if (regions.length === 0) return null

  return (
    <group position={offset}>
      <group>
        {regions.map((region) => {
          const isSelected = selectedDomain === 'brain' && selectedId === region.id
          return (
            <RegionInstances
              key={region.id}
              region={region}
              isSelected={isSelected}
              individualsCount={individualsCount}
              onClick={() => setSelection('brain', region.id, region)}
            />
          )
        })}

        <NetworkLines 
          relationships={relationships} 
          individualsCount={individualsCount} 
          regionMap={regionMap}
        />
      </group>
    </group>
  )
}

// -----------------------------------------------------------------------------------------
// Subcomponente encapsulado para la malla instanciada de UNA región a lo largo de N individuos
// -----------------------------------------------------------------------------------------
const RegionInstances = ({ region, isSelected, individualsCount, onClick }: any) => {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    if (!meshRef.current) return
    
    // Algoritmo matemático para organizar los individuos en una cuadrícula plana bajo el Universo
    const cols = Math.ceil(Math.sqrt(individualsCount))
    const spacing = 4.0

    const dummy = new THREE.Object3D()
    for (let i = 0; i < individualsCount; i++) {
      const row = Math.floor(i / cols)
      const col = i % cols
      // Centramos la matriz de la colmena entorno al 0,0
      const offsetX = (col - cols / 2) * spacing
      const offsetZ = (row - cols / 2) * spacing

      dummy.position.set(
        (region.x * BRAIN_SCALE) + offsetX,
        (region.y * BRAIN_SCALE),
        (region.z * BRAIN_SCALE) + offsetZ
      )
      
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [individualsCount, region])

  return (
    <instancedMesh 
       ref={meshRef} 
       args={[undefined, undefined, individualsCount]}
       onClick={(e) => { 
         e.stopPropagation(); 
         onClick();
       }}
    >
      {/* 1 malla central por cada Nodo, replicada N veces gracias a la GPU */}
      <sphereGeometry args={[isSelected ? 0.3 : 0.1, 16, 16]} />
      <meshStandardMaterial
        color={isSelected ? '#ffffff' : '#f43f5e'}
        emissive={isSelected ? '#ffffff' : '#e11d48'}
        emissiveIntensity={isSelected ? 1.5 : 0.6}
        wireframe={!isSelected}
      />
    </instancedMesh>
  )
}

// -----------------------------------------------------------------------------------------
// Generador de la Red Neuronal Masiva (LineSegments) para todos los $N$ individuos
// -----------------------------------------------------------------------------------------
const NetworkLines = ({ relationships, individualsCount, regionMap }: any) => {
  const points = useMemo(() => {
    if (!relationships || relationships.length === 0) return new Float32Array(0)

    const cols = Math.ceil(Math.sqrt(individualsCount))
    const spacing = 4.0

    // Relaciones (líneas) = 2 vértices * 3 coordenadas * N individuos
    const totalLines = relationships.length
    const arr = new Float32Array(totalLines * 6 * individualsCount)
    
    let index = 0
    for (let i = 0; i < individualsCount; i++) {
      const row = Math.floor(i / cols)
      const col = i % cols
      const offsetX = (col - cols / 2) * spacing
      const offsetZ = (row - cols / 2) * spacing

      relationships.forEach((rel: any) => {
         const source = regionMap.get(rel.sourceRegionId)
         const target = regionMap.get(rel.targetRegionId)
         if (!source || !target) return

         arr[index++] = (source.x * BRAIN_SCALE) + offsetX
         arr[index++] = (source.y * BRAIN_SCALE)
         arr[index++] = (source.z * BRAIN_SCALE) + offsetZ

         arr[index++] = (target.x * BRAIN_SCALE) + offsetX
         arr[index++] = (target.y * BRAIN_SCALE)
         arr[index++] = (target.z * BRAIN_SCALE) + offsetZ
      })
    }
    
    // Devolvemos solo el corte usado en memoria por si hay nodos huérfanos
    return arr.slice(0, index)
  }, [relationships, individualsCount, regionMap])

  if (points.length === 0) return null

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      {/* Se utiliza un lineBasicMaterial ultra-optimizado */}
      <lineBasicMaterial 
        color="#f43f5e" 
        transparent 
        opacity={0.15} 
      />
    </lineSegments>
  )
}

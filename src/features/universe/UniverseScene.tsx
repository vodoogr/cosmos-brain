import { useMemo, useRef } from 'react'
import { useUniverseStore } from '@/stores/universeStore'
import { useSimulationStore } from '@/stores/simulationStore'
import { useSelectionStore } from '@/stores/selectionStore'
import { useFrame } from '@react-three/fiber'
import { OrbitRenderer } from './OrbitRenderer'
import * as THREE from 'three'
import { Stars, Sparkles } from '@react-three/drei'

const UNIVERSE_SCALE = 0.04

export const UniverseScene = () => {
  const { objects } = useUniverseStore()
  const { 
    viewMode, 
    isPlaying, 
    speed, 
    positiveThoughts, 
    negativeThoughts, 
    meditationLevel, 
    synchronicity
  } = useSimulationStore()
  
  const { setSelection, selectedId, selectedDomain } = useSelectionStore()
  const groupRef = useRef<THREE.Group>(null)

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

  const offset = useMemo(
    () => (viewMode === 'both' ? ([0, 1.5, 0] as const) : ([0, 0, 0] as const)),
    [viewMode]
  )

  // -------------------------------------------------------------
  // Dynamic ML Physics Hook
  // Alteraremos todo el clúster estelar/universo en tiempo real
  // dependiendo de los ritmos cognitivos que se emulen.
  // -------------------------------------------------------------
  useFrame((state, delta) => {
    if (!groupRef.current) return
    if (!isPlaying) return

    const timeDelta = delta * speed

    // 1. Sincronicidad hace que el universo rote ordenada/armoniosamente más rápido
    groupRef.current.rotation.y += timeDelta * (0.02 + synchronicity * 0.15)
    groupRef.current.rotation.x += timeDelta * (0.005 + synchronicity * 0.05)
    
    // 2. Meditación causa un efecto de respiración lenta (breathing/pulsation)
    const breathe = Math.sin(state.clock.elapsedTime * (0.3 * speed)) * meditationLevel * 0.15 // Scale delta
    
    // 3. Pensamientos Positivos inflan y dan luminosidad volumétrica expansiva
    const scaleBase = 1 + (positiveThoughts * 0.3) + breathe
    groupRef.current.scale.lerp(new THREE.Vector3(scaleBase, scaleBase, scaleBase), 0.05)

    // 4. Pensamientos Negativos introducen caos, jitter y vibración browniana
    if (negativeThoughts > 0.1) {
      const jitter = (negativeThoughts - 0.1) * 0.4
      groupRef.current.position.x = offset[0] + (Math.random() - 0.5) * jitter
      groupRef.current.position.y = offset[1] + (Math.random() - 0.5) * jitter
      groupRef.current.position.z = offset[2] + (Math.random() - 0.5) * jitter
    } else {
      // Regresión a la estabilidad (centro original)
      groupRef.current.position.lerp(new THREE.Vector3(...offset), 0.1)
    }
  })

  if (viewMode !== 'universe' && viewMode !== 'both') return null

  return (
    <group position={offset} ref={groupRef}>
      {/* Fondo de Estrellas Profundo e Infinito */}
      {viewMode === 'universe' || viewMode === 'both' ? (
        <Stars radius={150} depth={50} count={7000} factor={4} saturation={0.8} fade speed={speed} />
      ) : null}

      {scaledObjects.map((obj) => {
        const isSelected =
          selectedDomain === 'universe' && selectedId === obj.id

        // Tamaños basados en el tipo de astro
        const radius =
          obj.objectType === 'galaxy'
            ? 0.5
            : obj.objectType === 'cluster'
            ? 0.7
            : obj.objectType === 'nebula'
            ? 0.1
            : obj.objectType === 'star'
            ? 0.2
            : 0.15

        // Colores y Emisiones físicas diferenciadas
        const color =
          obj.objectType === 'galaxy'
            ? '#60a5fa' // azul galáctico
            : obj.objectType === 'cluster'
            ? '#c084fc' // púrpura radiante
            : obj.objectType === 'nebula'
            ? '#10b981' // verde exoplanetario / nebula
            : '#fbbf24' // estrella amarilla/dorada

        return (
          <mesh
            key={obj.id}
            position={[obj.scaledX, obj.scaledY, obj.scaledZ]}
            onClick={(e) => {
              e.stopPropagation()
              setSelection('universe', obj.id, obj)
            }}
          >
            {/* Morfología Condicional del Objeto Cósmico */}
            {obj.objectType === 'galaxy' ? (
              <sphereGeometry args={[radius, 16, 8]} /> // Galaxia algo aplanada
            ) : obj.objectType === 'star' ? (
              <icosahedronGeometry args={[radius, 0]} /> // Estrella (facetada y brillante)
            ) : (
              <sphereGeometry args={[radius, 16, 16]} /> // Nebulas y Clusters esféricos perfectos
            )}
            
            <meshStandardMaterial
              color={isSelected ? '#ffffff' : color}
              emissive={isSelected ? '#ffffff' : color}
              emissiveIntensity={isSelected ? 2 : obj.objectType === 'star' ? 1.2 : 0.4}
              wireframe={obj.objectType === 'galaxy' && !isSelected}
            />

            {/* Añadimos polvo estelar vibrante a las galaxias */}
            {obj.objectType === 'galaxy' && !isSelected && (
              <Sparkles count={15} scale={radius * 4} size={1} color={color} speed={0.4} />
            )}
            
            {/* Órbitas Elípticas */}
            <OrbitRenderer 
              color={color} 
              radiusX={Math.sqrt(obj.scaledX*obj.scaledX + obj.scaledZ*obj.scaledZ)} 
              radiusZ={Math.sqrt(obj.scaledX*obj.scaledX + obj.scaledZ*obj.scaledZ)} 
              rotation={0} 
              isSelected={isSelected} 
              isBackground={true}
            />
          </mesh>
        )
      })}
    </group>
  )
}

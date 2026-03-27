import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { OrbitRenderer } from './OrbitRenderer'
import { useSelectionStore } from '@/stores/selectionStore'
import { useSimulationStore } from '@/stores/simulationStore'

const PLANETS = [
  { id: 'sol-mercury', name: 'Mercury', radius: 0.2, color: '#888888', distance: 4, speed: 1.5 },
  { id: 'sol-venus', name: 'Venus', radius: 0.4, color: '#e3bb76', distance: 7, speed: 1.2 },
  { id: 'sol-earth', name: 'Earth', radius: 0.45, color: '#2b82c9', distance: 10, speed: 1.0 },
  { id: 'sol-mars', name: 'Mars', radius: 0.3, color: '#c1440e', distance: 14, speed: 0.8 },
  { id: 'sol-jupiter', name: 'Jupiter', radius: 1.2, color: '#d39c7e', distance: 22, speed: 0.4 },
  { id: 'sol-saturn', name: 'Saturn', radius: 1.0, color: '#c5ab6e', distance: 30, speed: 0.3 },
  { id: 'sol-uranus', name: 'Uranus', radius: 0.8, color: '#d5fbff', distance: 38, speed: 0.2 },
  { id: 'sol-neptune', name: 'Neptune', radius: 0.75, color: '#3e66f9', distance: 46, speed: 0.1 }
]

export const SolarSystemLayer = () => {
  const { setSelection, selectedId, selectedDomain } = useSelectionStore()
  const { viewMode, isPlaying, speed: simSpeed } = useSimulationStore()
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!groupRef.current || !isPlaying) return
    const timeDelta = delta * simSpeed * 0.2
    
    groupRef.current.children.forEach((child) => {
      if (child.userData.speed) {
        child.rotation.y -= timeDelta * child.userData.speed
      }
    })
  })

  // Offset slightly if entering multi-view mode
  const offset = viewMode === 'both' ? ([0, 1.5, 0] as const) : ([0, 0, 0] as const)

  if (viewMode !== 'universe' && viewMode !== 'both') return null

  return (
    <group position={offset}>
      <ambientLight intensity={0.05} color="#445588" />
      {/* Sun + Light */}
      <mesh 
        onClick={(e) => { 
          e.stopPropagation(); 
          setSelection('universe', 'sol-sun', { name: 'Sun', objectType: 'star', x: 0, y: 0, z: 0 }) 
        }}
      >
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#ffcc00" emissive="#ffaa00" emissiveIntensity={2} />
        <pointLight intensity={100} distance={150} decay={1.5} color="#ffffff" />
        <Html center distanceFactor={25} position={[0, -2.5, 0]}>
          <div className="text-[10px] text-white/90 font-label pointer-events-none uppercase tracking-widest drop-shadow-md bg-black/40 px-2 py-1 rounded">
            Sun
          </div>
        </Html>
      </mesh>

      {/* Planets and Orbits */}
      <group ref={groupRef}>
        {PLANETS.map((planet) => {
          const isSelected = selectedDomain === 'universe' && selectedId === planet.id
          return (
            <group key={planet.id} userData={{ speed: planet.speed }}>
              <OrbitRenderer 
                color={planet.color} 
                radiusX={planet.distance} 
                radiusZ={planet.distance} 
                rotation={0} 
                isSelected={isSelected} 
              />
              <mesh
                position={[planet.distance, 0, 0]}
                onClick={(e) => {
                  e.stopPropagation()
                  // Provide normalized spatial data directly for camera locking
                  setSelection('universe', planet.id, { 
                    ...planet, 
                    objectType: 'planet',
                    x: planet.distance / 0.04, 
                    y: 0, 
                    z: 0 
                  })
                }}
              >
                <sphereGeometry args={[planet.radius, 32, 32]} />
                {/* Lit by point light, no natural emissive unless selected! */}
                <meshStandardMaterial 
                  color={planet.color} 
                  emissive={isSelected ? planet.color : '#000000'}
                  emissiveIntensity={isSelected ? 1.5 : 0} 
                  roughness={0.7}
                  metalness={0.1}
                  wireframe={isSelected} 
                />

                {/* Etiquetas 3D HTML flotantes */}
                <Html center distanceFactor={25} position={[0, -planet.radius - 0.5, 0]}>
                  <div className="text-[8px] text-white/80 font-label pointer-events-none uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap">
                    {planet.name}
                  </div>
                </Html>

                {/* Anillos de Saturno Especiales */}
                {planet.id === 'sol-saturn' && (
                  <mesh rotation={[Math.PI / 2.2, 0, 0]}>
                    <ringGeometry args={[planet.radius * 1.3, planet.radius * 2.2, 64]} />
                    <meshStandardMaterial 
                      color="#c5ab6e" 
                      side={THREE.DoubleSide} 
                      transparent 
                      opacity={0.6}
                      roughness={0.8}
                    />
                  </mesh>
                )}
              </mesh>
            </group>
          )
        })}
      </group>
    </group>
  )
}

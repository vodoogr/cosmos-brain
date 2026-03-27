import { useFrame } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'
import { Html, useTexture } from '@react-three/drei'
import { OrbitRenderer } from './OrbitRenderer'
import { useSelectionStore } from '@/stores/selectionStore'
import { useSimulationStore } from '@/stores/simulationStore'

const PLANETS = [
  { id: 'sol-mercury', name: 'Mercury', radius: 0.2, textureMap: '/textures/2k_mercury.jpg', color: '#888888', distance: 4, speed: 1.5 },
  { id: 'sol-venus', name: 'Venus', radius: 0.4, textureMap: '/textures/2k_venus_surface.jpg', color: '#e3bb76', distance: 7, speed: 1.2 },
  { id: 'sol-earth', name: 'Earth', radius: 0.45, textureMap: '/textures/2k_earth_daymap.jpg', color: '#ffffff', distance: 10, speed: 1.0, moons: [
    { id: 'sol-luna', name: 'Luna', radius: 0.1, textureMap: '/textures/2k_moon.jpg', color: '#aaaaaa', distance: 0.8, speed: 4.0 }
  ]},
  { id: 'sol-mars', name: 'Mars', radius: 0.3, textureMap: '/textures/2k_mars.jpg', color: '#c1440e', distance: 14, speed: 0.8 },
  { id: 'sol-jupiter', name: 'Jupiter', radius: 1.2, textureMap: '/textures/2k_jupiter.jpg', color: '#d39c7e', distance: 22, speed: 0.4 },
  { id: 'sol-saturn', name: 'Saturn', radius: 1.0, textureMap: '/textures/2k_saturn.jpg', ringMap: '/textures/2k_saturn_ring_alpha.png', color: '#c5ab6e', distance: 30, speed: 0.3 },
  { id: 'sol-uranus', name: 'Uranus', radius: 0.8, textureMap: '/textures/2k_uranus.jpg', color: '#d5fbff', distance: 38, speed: 0.2 },
  { id: 'sol-neptune', name: 'Neptune', radius: 0.75, textureMap: '/textures/2k_neptune.jpg', color: '#3e66f9', distance: 46, speed: 0.1 }
]

const PlanetMesh = ({ planet }: { planet: any }) => {
  const { setSelection, selectedId, selectedDomain } = useSelectionStore()
  const texture = useTexture(planet.textureMap)
  const ringTexture = planet.ringMap ? useTexture(planet.ringMap) : null
  
  const isSelected = selectedDomain === 'universe' && selectedId === planet.id
  const moonGroupRef = useRef<THREE.Group>(null)
  const { isPlaying, speed: simSpeed } = useSimulationStore()

  useFrame((state, delta) => {
    if (moonGroupRef.current && isPlaying) {
      const timeDelta = delta * simSpeed * 0.2
      moonGroupRef.current.children.forEach(child => {
        if (child.userData.speed) child.rotation.y += timeDelta * child.userData.speed
      })
    }
  })

  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state, delta) => {
    if (meshRef.current && isPlaying) {
      meshRef.current.rotation.y += delta * simSpeed * 0.5
    }
  })

  return (
    <mesh
      ref={meshRef}
      name={planet.id}
      position={[planet.distance, 0, 0]}
      onClick={(e) => {
        e.stopPropagation()
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
      <meshStandardMaterial 
        map={texture}
        color="#ffffff"
        emissive={isSelected ? planet.color : '#000000'}
        emissiveIntensity={isSelected ? 1.5 : 0} 
        roughness={planet.id === 'sol-earth' ? 0.3 : 0.8}
        metalness={0.1}
        wireframe={isSelected} 
      />

      <Html center distanceFactor={25} position={[0, -planet.radius - 0.5, 0]}>
        <div className="text-[8px] text-white/80 font-label pointer-events-none uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap">
          {planet.name}
        </div>
      </Html>

      {planet.id === 'sol-saturn' && ringTexture && (
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[planet.radius * 1.3, planet.radius * 2.5, 64]} />
          <meshStandardMaterial 
            map={ringTexture}
            transparent 
            opacity={0.9}
            side={THREE.DoubleSide}
            roughness={0.8}
            depthWrite={false}
          />
        </mesh>
      )}

      {planet.moons && (
        <group ref={moonGroupRef}>
          {planet.moons.map((moon: any) => (
            <group key={moon.id} userData={{ speed: moon.speed }}>
              <OrbitRenderer color={moon.color} radiusX={moon.distance} radiusZ={moon.distance} rotation={0} isSelected={selectedId === moon.id} isBackground />
              <MoonMesh moon={moon} parentDist={planet.distance} />
            </group>
          ))}
        </group>
      )}
    </mesh>
  )
}

const MoonMesh = ({ moon, parentDist }: { moon: any, parentDist: number }) => {
  const { setSelection, selectedId } = useSelectionStore()
  const texture = useTexture(moon.textureMap)
  const isSelected = selectedId === moon.id

  const meshRef = useRef<THREE.Mesh>(null)
  const { isPlaying, speed: simSpeed } = useSimulationStore()
  useFrame((state, delta) => {
    if (meshRef.current && isPlaying) {
      meshRef.current.rotation.y += delta * simSpeed * 0.2
    }
  })

  return (
    <mesh
      ref={meshRef}
      name={moon.id}
      position={[moon.distance, 0, 0]}
      onClick={(e) => {
        e.stopPropagation()
        setSelection('universe', moon.id, { 
          ...moon, 
          objectType: 'planet',
          x: (parentDist + moon.distance) / 0.04, 
          y: 0, 
          z: 0 
        })
      }}
    >
      <sphereGeometry args={[moon.radius, 32, 32]} />
      <meshStandardMaterial map={texture} roughness={1} emissive={isSelected ? moon.color : '#000000'} emissiveIntensity={isSelected ? 1.5 : 0} wireframe={isSelected} />
      <Html center distanceFactor={25} position={[0, -moon.radius - 0.3, 0]}>
        <div className="text-[6px] text-white/60 font-label pointer-events-none uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap">
          {moon.name}
        </div>
      </Html>
    </mesh>
  )
}

const SunMesh = () => {
  const texture = useTexture('/textures/2k_sun.jpg')
  const { setSelection } = useSelectionStore()
  return (
    <mesh 
      name={"sol-sun"}
      onClick={(e) => { 
        e.stopPropagation(); 
        setSelection('universe', 'sol-sun', { name: 'Sun', objectType: 'star', x: 0, y: 0, z: 0 }) 
      }}
    >
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial map={texture} emissiveMap={texture} emissive="#ffffff" emissiveIntensity={1} />
      <pointLight intensity={100} distance={200} decay={1.5} color="#ffffff" />
      <Html center distanceFactor={25} position={[0, -2.5, 0]}>
        <div className="text-[10px] text-white/90 font-label pointer-events-none uppercase tracking-widest drop-shadow-md bg-black/40 px-2 py-1 rounded">
          Sun
        </div>
      </Html>
    </mesh>
  )
}

export const SolarSystemLayer = () => {
  const { selectedId, selectedDomain } = useSelectionStore()
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
      <ambientLight intensity={0.1} color="#ffffff" />
      <Suspense fallback={null}>
        <SunMesh />
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
                <PlanetMesh planet={planet} />
              </group>
            )
          })}
        </group>
      </Suspense>
    </group>
  )
}

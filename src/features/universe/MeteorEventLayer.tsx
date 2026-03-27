import { useMemo } from 'react'
import { useMeteorStore } from '@/stores/meteorStore'
import { useSelectionStore } from '@/stores/selectionStore'
import { useSimulationStore } from '@/stores/simulationStore'
import * as THREE from 'three'
import { OrbitRenderer } from './OrbitRenderer'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Html } from '@react-three/drei'

export const MeteorEventLayer = () => {
  const { events } = useMeteorStore()
  const { setSelection, selectedId, selectedDomain } = useSelectionStore()
  const { viewMode, isPlaying, speed } = useSimulationStore()
  const groupRef = useRef<THREE.Group>(null)

  const renderedEvents = useMemo(() => {
    return events.map((ev, i) => {
      // Mock highly elliptical comet orbit
      const radiusX = 35 + (i % 5) * 15
      const radiusZ = radiusX * 0.3 // highly elliptical
      const rot = (i * 0.5)
      
      return { ...ev, orbit: { radiusX, radiusZ, rotation: rot }, speed: 0.05 + Math.random() * 0.1 }
    })
  }, [events])

  useFrame((state, delta) => {
    if (!groupRef.current || !isPlaying) return
    const timeDelta = delta * speed * 4
    
    groupRef.current.children.forEach((child) => {
      if (child.userData.speed) {
        child.rotation.y += timeDelta * child.userData.speed
      }
    })
  })

  if (viewMode !== 'universe' && viewMode !== 'both') return null

  return (
    <group ref={groupRef}>
      {renderedEvents.map(ev => {
        const isSelected = selectedDomain === 'meteorEvent' && selectedId === ev.id
        const color = '#38bdf8' // Ice blue comet

        return (
          <group key={ev.id} userData={{ speed: ev.speed }}>
             <OrbitRenderer
              color={color}
              radiusX={ev.orbit.radiusX}
              radiusZ={ev.orbit.radiusZ}
              rotation={ev.orbit.rotation}
              isSelected={isSelected}
            />
            <mesh
              name={ev.id}
              position={[ev.orbit.radiusX, 0, 0]}
              onClick={(e) => {
                e.stopPropagation()
                setSelection('meteorEvent', ev.id, ev)
              }}
            >
              <sphereGeometry args={[isSelected ? 0.6 : 0.3, 16, 16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} wireframe={isSelected} />
              <Html center distanceFactor={25} position={[0, -1, 0]}>
                <div className="text-[7px] text-white/50 font-label pointer-events-none uppercase">
                  {ev.eventName || `Comet-${ev.id.substring(0, 4)}`}
                </div>
              </Html>
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

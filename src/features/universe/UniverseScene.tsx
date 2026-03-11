"use client"
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { useDataStore } from '@/stores/dataStore'

export const UniverseScene = () => {
    const { universeObjects, setSelectedObject, viewMode } = useDataStore()
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current && viewMode !== 'brain') {
            groupRef.current.rotation.y += 0.0005
        }
    })

    if (viewMode === 'brain') return null

    // Fallback if no data is loaded yet
    const objectsToRender = universeObjects.length > 0 ? universeObjects : [
        { id: '1', name: 'Star A', type: 'star', coordinates: { x: 5, y: 2, z: -10 }, metadata: {} },
        { id: '2', name: 'Galaxy B', type: 'galaxy', coordinates: { x: -8, y: 5, z: -15 }, metadata: {} },
        { id: '3', name: 'Cluster C', type: 'cluster', coordinates: { x: 0, y: -5, z: -5 }, metadata: {} }
    ]

    return (
        <group ref={groupRef}>
            {objectsToRender.map((obj) => (
                <Sphere
                    key={obj.id}
                    position={[obj.coordinates.x, obj.coordinates.y, obj.coordinates.z]}
                    args={obj.type === 'galaxy' ? [0.6, 16, 16] : [0.2, 16, 16]}
                    onClick={(e) => {
                        e.stopPropagation()
                        setSelectedObject(obj.id, 'universe')
                    }}
                    onPointerOver={() => document.body.style.cursor = 'pointer'}
                    onPointerOut={() => document.body.style.cursor = 'auto'}
                >
                    <meshStandardMaterial
                        color={obj.type === 'galaxy' ? '#3b82f6' : '#ffffff'}
                        emissive={obj.type === 'galaxy' ? '#3b82f6' : '#ffffff'}
                        emissiveIntensity={0.8}
                    />
                </Sphere>
            ))}

            {/* Background Grid/Particles to represent deep space */}
            <points>
                <sphereGeometry args={[50, 32, 32]} />
                <pointsMaterial color="#ffffff" size={0.05} sizeAttenuation transparent opacity={0.1} />
            </points>
        </group>
    )
}

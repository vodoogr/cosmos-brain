"use client"
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'
import { useDataStore } from '@/stores/dataStore'

export const BrainScene = () => {
    const { brainRegions, setSelectedObject, viewMode } = useDataStore()
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current && viewMode !== 'universe') {
            // Add subtle floating effect instead of constant rotation when in brain mode
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        }
    })

    if (viewMode === 'universe') return null

    // Fallback if no data is loaded yet
    const regionsToRender = brainRegions.length > 0 ? brainRegions : [
        { id: '10', name: 'Frontal Lobe', coordinates: { x: 0, y: 2, z: 2 }, metadata: {} },
        { id: '11', name: 'Parietal Lobe', coordinates: { x: 0, y: 4, z: -1 }, metadata: {} },
        { id: '12', name: 'Occipital Lobe', coordinates: { x: 0, y: 1, z: -4 }, metadata: {} },
        { id: '13', name: 'Temporal Lobe L', coordinates: { x: -3, y: 1, z: 0 }, metadata: {} },
        { id: '14', name: 'Temporal Lobe R', coordinates: { x: 3, y: 1, z: 0 }, metadata: {} }
    ]

    return (
        <group ref={groupRef}>
            {/* Outline/Placeholder for the whole brain volume */}
            <mesh>
                <sphereGeometry args={[6, 32, 32]} />
                <meshBasicMaterial color="#ec4899" transparent opacity={0.05} wireframe />
            </mesh>

            {regionsToRender.map((region) => (
                <Box
                    key={region.id}
                    position={[region.coordinates.x, region.coordinates.y, region.coordinates.z]}
                    args={[1.2, 1.2, 1.2]}
                    onClick={(e) => {
                        e.stopPropagation()
                        setSelectedObject(region.id, 'brain')
                    }}
                    onPointerOver={() => document.body.style.cursor = 'pointer'}
                    onPointerOut={() => document.body.style.cursor = 'auto'}
                >
                    <meshStandardMaterial
                        color="#ec4899"
                        emissive="#be185d"
                        roughness={0.2}
                        metalness={0.8}
                        transparent
                        opacity={0.8}
                    />
                </Box>
            ))}
        </group>
    )
}

"use client"
import { OrbitControls } from '@react-three/drei'
import { useDataStore } from '@/stores/dataStore'
import { useRef, useEffect } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

export const CameraController = () => {
    const { viewMode } = useDataStore()
    const controlsRef = useRef<OrbitControlsImpl>(null)

    // Adjust camera defaults based on what we are looking at initially
    useEffect(() => {
        if (!controlsRef.current) return

        switch (viewMode) {
            case 'universe':
                controlsRef.current.minDistance = 5
                controlsRef.current.maxDistance = 100
                break
            case 'brain':
                controlsRef.current.minDistance = 2
                controlsRef.current.maxDistance = 30
                break
            case 'both':
                controlsRef.current.minDistance = 10
                controlsRef.current.maxDistance = 150
                break
        }
    }, [viewMode])

    return (
        <OrbitControls
            ref={controlsRef}
            makeDefault
            enableDamping
            dampingFactor={0.05}
            // default camera pos
            camera-position={[0, 10, 30]}
        />
    )
}

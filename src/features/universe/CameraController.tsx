import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const CameraController = () => {
    const { camera } = useThree()
    const targetRef = useRef(new THREE.Vector3(0, 0, 0))

    useEffect(() => {
        // Here we could subscribe to useSimulationStore's camera state
        // and tween the camera position smoothly.
    }, [])

    useFrame(() => {
        // Optional camera idle rotation or specific interpolations
        camera.lookAt(targetRef.current)
    })

    return null
}

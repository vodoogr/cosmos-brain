import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useSelectionStore } from '@/stores/selectionStore'
import { useSimulationStore } from '@/stores/simulationStore'

const UNIVERSE_SCALE = 0.0025

export const CameraController = () => {
    const { selectedDomain, selectedPayload, selectedId } = useSelectionStore()
    const { viewMode, cameraFov } = useSimulationStore()
    const { camera } = useThree()
    
    // Referencia al componente OrbitControls interactivo
    const controlsRef = useRef<any>(null)
    
    // Vectores matemáticos para interpolar fluidamente la cámara (fly-to / zoom)
    const targetVec = useRef(new THREE.Vector3(0, 0, 0))
    const cameraDest = useRef(new THREE.Vector3(0, 10, 40))
    const isZooming = useRef(false)
    const isTracking = useRef(false)

    // Dynamic FOV for magnifying glass UI
    useEffect(() => {
        if (camera instanceof THREE.PerspectiveCamera) {
            camera.fov = cameraFov
            camera.updateProjectionMatrix()
        }
    }, [cameraFov, camera])

    // Zoom trigger on selection
    useEffect(() => {
        if (selectedDomain && selectedPayload) {
            isTracking.current = true
            isZooming.current = true
        } else {
            const offsetY = viewMode === 'both' ? 1.5 : 0
            targetVec.current.set(0, offsetY, 0)
            cameraDest.current.set(0, 10, 40)
            isTracking.current = false
            isZooming.current = true
        }
    }, [selectedDomain, selectedPayload, viewMode])

    useFrame((state) => {
        if (controlsRef.current) {
            if (isTracking.current && selectedDomain && selectedId) {
                const targetObj = state.scene.getObjectByName(selectedId)
                if (targetObj) {
                    targetObj.getWorldPosition(targetVec.current)
                    
                    if (isZooming.current) {
                        const dir = targetVec.current.clone().normalize()
                        if (dir.lengthSq() === 0) dir.set(0, 0, 1)
                        cameraDest.current.copy(targetVec.current)
                            .add(dir.multiplyScalar(4))
                            .add(new THREE.Vector3(0, 1, 4))
                    }
                }
            }

            // Suavizamos el target del OrbitControls si viaja, pero si hace tracking perfecto lo copiamos directo para evitar jitters
            if (isTracking.current) {
                if (isZooming.current) {
                    controlsRef.current.target.lerp(targetVec.current, 0.1)
                } else {
                    controlsRef.current.target.copy(targetVec.current)
                }
            } else if (isZooming.current) {
                // Return to origin transition
                controlsRef.current.target.lerp(targetVec.current, 0.1)
            }
            
            if (isZooming.current) {
                // Hacemos un "lerp" puramente a la posición física de la lente
                state.camera.position.lerp(cameraDest.current, 0.05)
                
                // Cuando estamos matemáticamente casi encima de él, paramos el lock automático
                if (state.camera.position.distanceTo(cameraDest.current) < 0.2) {
                    isZooming.current = false
                }
            }
            controlsRef.current.update()
        }
    })

    return (
        <OrbitControls 
            ref={controlsRef}
            makeDefault 
            enableDamping 
            dampingFactor={0.05} 
            maxDistance={4000} 
            minDistance={0.5} 
            enablePan={true}
        />
    )
}

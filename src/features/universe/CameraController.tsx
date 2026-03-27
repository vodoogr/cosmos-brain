import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useSelectionStore } from '@/stores/selectionStore'
import { useSimulationStore } from '@/stores/simulationStore'

const UNIVERSE_SCALE = 0.0025

export const CameraController = () => {
    const { selectedDomain, selectedPayload } = useSelectionStore()
    const { viewMode, cameraFov } = useSimulationStore()
    const { camera } = useThree()
    
    // Referencia al componente OrbitControls interactivo
    const controlsRef = useRef<any>(null)
    
    // Vectores matemáticos para interpolar fluidamente la cámara (fly-to / zoom)
    const targetVec = useRef(new THREE.Vector3(0, 0, 0))
    const cameraDest = useRef(new THREE.Vector3(0, 10, 40))
    const isZooming = useRef(false)

    // Dynamic FOV for magnifying glass UI
    useEffect(() => {
        if (camera instanceof THREE.PerspectiveCamera) {
            camera.fov = cameraFov
            camera.updateProjectionMatrix()
        }
    }, [cameraFov, camera])

    useEffect(() => {
        if (selectedDomain === 'universe' && selectedPayload) {
            // Aplicamos manualmente el posible offset Y del grupo Universo
            const offsetY = viewMode === 'both' ? 1.5 : 0
            
            // Coordenada exacta del astro seleccionado
            const payload = selectedPayload as any
            const targetX = payload.x * UNIVERSE_SCALE
            const targetY = (payload.y * UNIVERSE_SCALE) + offsetY
            const targetZ = payload.z * UNIVERSE_SCALE
            
            targetVec.current.set(targetX, targetY, targetZ)
            
            // Vector direccional. Lo usamos para dejar la cámara colgada "cerca" del astro
            const dir = new THREE.Vector3(targetX, targetY, targetZ).normalize()
            if (dir.lengthSq() === 0) dir.set(0, 0, 1) // fallback de origen
            
            // Acercamos el encuadre restando/sumando en base al origen
            // Nos ponemos a una distancia corta visualizando en detalle la galaxia/estrella
            cameraDest.current.set(
                targetX + dir.x * 4,
                targetY + dir.y * 4 + 1,
                targetZ + dir.z * 4 + 4
            )
            
            isZooming.current = true
        } else {
            // Regresamos a la vista general inicial de la cámara
            const offsetY = viewMode === 'both' ? 1.5 : 0
            targetVec.current.set(0, offsetY, 0)
            cameraDest.current.set(0, 10, 40)
            isZooming.current = true
        }
    }, [selectedDomain, selectedPayload, viewMode])

    useFrame((state) => {
        if (controlsRef.current) {
            // Suavizamos primero adonde mira el jugador (target del OrbitControls)
            controlsRef.current.target.lerp(targetVec.current, 0.05)
            
            if (isZooming.current) {
                // Hacemos un "lerp" puramente a la posición física de la lente
                state.camera.position.lerp(cameraDest.current, 0.05)
                
                // Cuando estamos matemáticamente casi encima de él, paramos el lock automático
                // Dejamos al usuario rotar/zoomear libremente con el ratón
                if (state.camera.position.distanceTo(cameraDest.current) < 0.1) {
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
            maxDistance={150} 
            minDistance={1.5} 
        />
    )
}

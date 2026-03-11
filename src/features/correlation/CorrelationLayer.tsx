"use client"
import { useDataStore } from '@/stores/dataStore'

export const CorrelationLayer = () => {
    const { viewMode } = useDataStore()

    // Correlation layer is only visible in 'both' view mode
    if (viewMode !== 'both') return null

    return (
        <group>
            {/* Visual experimental lines/energy connecting Universe and Brain */}
            {/* Hardcoded placeholder for now since we don't have complex relationship data fetching implemented yet */}
            <line>
                <bufferGeometry>
                    <float32BufferAttribute attach="attributes-position" count={2} array={new Float32Array([
                        5, 2, -10, // Star A from UniverseScene
                        0, 2, 2   // Frontal Lobe from BrainScene
                    ])} />
                </bufferGeometry>
                <lineBasicMaterial color="#a855f7" vertexColors={false} linewidth={2} transparent opacity={0.4} />
            </line>
            <line>
                <bufferGeometry>
                    <float32BufferAttribute attach="attributes-position" count={2} array={new Float32Array([
                        -8, 5, -15, // Galaxy B
                        0, 4, -1   // Parietal Lobe
                    ])} />
                </bufferGeometry>
                <lineBasicMaterial color="#a855f7" vertexColors={false} linewidth={2} transparent opacity={0.4} />
            </line>
        </group>
    )
}

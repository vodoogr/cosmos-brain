"use client"
import { TopBar } from '@/components/layout/TopBar'
import { ControlPanel } from '@/components/controls/ControlPanel'
import { InspectorPanel } from '@/components/inspector/InspectorPanel'
import { TimelineBar } from '@/components/timeline/TimelineBar'
import { Canvas } from '@react-three/fiber'
import { CameraController } from '@/features/universe/CameraController'
import { UniverseScene } from '@/features/universe/UniverseScene'
import { BrainScene } from '@/features/brain/BrainScene'
import { CorrelationLayer } from '@/features/correlation/CorrelationLayer'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useUIStore } from '@/stores/uiStore'

export default function ExplorerPage() {
    const { qualityMode } = useUIStore()

    return (
        <div className="relative w-full h-full bg-[#030305] text-white">
            <TopBar />
            <ControlPanel />
            <InspectorPanel />
            <TimelineBar />

            {/* Main 3D Viewport */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Canvas camera={{ position: [0, 10, 40], fov: 45 }}>
                    <color attach="background" args={['#030305']} />
                    <ambientLight intensity={0.2} />
                    <pointLight position={[100, 100, 100]} intensity={0.8} />
                    <spotLight position={[-50, 50, -50]} intensity={1.5} color="#3b82f6" />

                    <CameraController />

                    {/* Domain Modules */}
                    <UniverseScene />
                    <BrainScene />
                    <CorrelationLayer />

                    {/* Post Processing Effects */}
                    {qualityMode === 'high' && (
                        <EffectComposer disableNormalPass>
                            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
                            <Vignette eskil={false} offset={0.1} darkness={1.1} />
                        </EffectComposer>
                    )}
                </Canvas>
            </div>
        </div>
    )
}

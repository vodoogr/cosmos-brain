"use client"
import { useDataStore } from '@/stores/dataStore'
import { Play, Pause, RotateCcw } from 'lucide-react'

export const TimelineBar = () => {
    const { simulationState, setSimulationState } = useDataStore()
    const { isPlaying, currentTime } = simulationState

    const togglePlay = () => setSimulationState({ isPlaying: !isPlaying })
    const reset = () => setSimulationState({ currentTime: 0, isPlaying: false })

    return (
        <div className="absolute bottom-0 left-0 w-full h-16 bg-surfaceOverlay backdrop-blur-md border-t border-border z-50 flex items-center justify-center px-4">

            <div className="flex items-center space-x-6 w-full max-w-3xl">
                <div className="flex items-center space-x-2">
                    <button onClick={reset} className="p-2 text-gray-400 hover:text-white hover:bg-surface rounded-full transition-colors">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button onClick={togglePlay} className="p-2 bg-white text-black hover:bg-gray-200 rounded-full transition-colors">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                </div>

                <div className="flex-1 flex items-center space-x-4">
                    <span className="text-xs font-mono text-gray-400 w-12 text-right">T-{currentTime}</span>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={currentTime}
                        onChange={(e) => setSimulationState({ currentTime: parseInt(e.target.value) })}
                        className="w-full accent-white bg-border h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs font-mono text-gray-400 w-12">MAX</span>
                </div>
            </div>

        </div>
    )
}

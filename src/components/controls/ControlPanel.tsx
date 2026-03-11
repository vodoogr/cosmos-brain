"use client"
import { useUIStore } from '@/stores/uiStore'
import { useDataStore } from '@/stores/dataStore'
import { SlidersHorizontal, Eye, Box, Activity, ChevronLeft, ChevronRight } from 'lucide-react'

export const ControlPanel = () => {
    const { isLeftPanelOpen, toggleLeftPanel } = useUIStore()
    const { viewMode, setViewMode } = useDataStore()

    if (!isLeftPanelOpen) {
        return (
            <button
                onClick={toggleLeftPanel}
                className="absolute top-20 left-0 bg-surfaceOverlay backdrop-blur-md p-2 rounded-r-md border border-l-0 border-border z-40 hover:bg-surface transition-colors">
                <ChevronRight className="w-5 h-5" />
            </button>
        )
    }

    return (
        <div className="absolute top-14 left-0 h-[calc(100vh-3.5rem)] w-72 bg-surfaceOverlay backdrop-blur-md border-r border-border z-40 flex flex-col p-4 transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold tracking-wider flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> CONTROLS
                </h2>
                <button onClick={toggleLeftPanel} className="text-gray-400 hover:text-white">
                    <ChevronLeft className="w-5 h-5" />
                </button>
            </div>

            <div className="mb-8">
                <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Eye className="w-3 h-3" /> View Mode
                </h3>
                <div className="grid grid-cols-3 gap-1 bg-[#0f0f11] p-1 rounded-md border border-border">
                    {(['universe', 'both', 'brain'] as const).map(mode => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={`text-xs py-1.5 rounded capitalize transition-all ${viewMode === mode ? 'bg-surface shadow text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Box className="w-3 h-3" /> Presets
                    </h3>
                    <select className="w-full bg-[#0f0f11] border border-border rounded p-2 text-sm text-gray-300 outline-none focus:border-accent">
                        <option>Default System Preset</option>
                        <option>High Resonance</option>
                        <option>Synaptic Clusters</option>
                    </select>
                </div>

                <div>
                    <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Visual Parameters
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Intensity</span>
                                <span>50%</span>
                            </div>
                            <input type="range" className="w-full accent-accent bg-border h-1 rounded-lg appearance-none cursor-pointer" />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Density</span>
                                <span>75%</span>
                            </div>
                            <input type="range" className="w-full accent-accent bg-border h-1 rounded-lg appearance-none cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

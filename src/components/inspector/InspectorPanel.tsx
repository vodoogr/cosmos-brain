"use client"
import { useDataStore } from '@/stores/dataStore'
import { Info, X, ExternalLink, Network } from 'lucide-react'

export const InspectorPanel = () => {
    const { selectedObjectId, selectedDomain, setSelectedObject } = useDataStore()

    if (!selectedObjectId) return null

    return (
        <div className="absolute top-14 right-0 h-[calc(100vh-3.5rem)] w-80 bg-surfaceOverlay backdrop-blur-md border-l border-border z-40 flex flex-col transform transition-transform duration-300">
            <div className="p-4 border-b border-border flex justify-between items-center bg-surface/50">
                <h2 className="text-sm font-bold tracking-wider flex items-center gap-2">
                    <Info className="w-4 h-4 text-accent" /> INSPECTOR
                </h2>
                <button onClick={() => setSelectedObject(null, null)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="p-5 flex-1 overflow-y-auto space-y-6">
                <div>
                    <div className="inline-block px-2 py-1 bg-accent/20 text-accent border border-accent/30 rounded text-[10px] uppercase tracking-widest font-semibold mb-2">
                        {selectedDomain} Object
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">Object #{selectedObjectId.substring(0, 8)}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Selected item metadata and properties will be displayed here based on database info.
                    </p>
                </div>

                <div className="bg-[#0f0f11] rounded-md border border-border p-3 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Coordinates</span>
                        <span className="font-mono text-gray-300">X:12 Y:34 Z:56</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Classification</span>
                        <span className="text-gray-300">Alpha Region</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Signal Str</span>
                        <span className="text-green-400">94.2%</span>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Network className="w-3 h-3" /> Correlated Nodes
                    </h4>
                    <div className="space-y-2">
                        <button className="w-full text-left p-2 rounded bg-surface border border-border text-sm hover:border-accent transition-colors flex justify-between items-center">
                            <span>Node #A7F9</span>
                            <ExternalLink className="w-3 h-3 text-gray-500" />
                        </button>
                        <button className="w-full text-left p-2 rounded bg-surface border border-border text-sm hover:border-accent transition-colors flex justify-between items-center">
                            <span>Node #B2E1</span>
                            <ExternalLink className="w-3 h-3 text-gray-500" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

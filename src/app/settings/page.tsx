"use client"
import Link from 'next/link'
import { ArrowLeft, Settings as SettingsIcon, Monitor, Image as ImageIcon, Tags } from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'
import { useDataStore } from '@/stores/dataStore'

export default function SettingsPage() {
    const { qualityMode, setQualityMode, labelsEnabled, setLabelsEnabled } = useUIStore()
    const { viewMode, setViewMode } = useDataStore()

    return (
        <div className="min-h-screen bg-background text-foreground p-8 md:p-16 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-8">

                <Link href="/explorer" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Explorer
                </Link>

                <div className="flex items-center text-3xl font-bold tracking-tight mb-8">
                    <SettingsIcon className="w-8 h-8 mr-3 text-accent" /> Preferences
                </div>

                <div className="space-y-6">
                    {/* Visual Quality */}
                    <div className="bg-surface border border-border rounded-lg p-6">
                        <h2 className="text-lg font-semibold flex items-center mb-4">
                            <Monitor className="w-5 h-5 mr-2 text-gray-400" /> Rendering Quality
                        </h2>
                        <div className="flex space-x-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="quality"
                                    className="accent-accent"
                                    checked={qualityMode === 'low'}
                                    onChange={() => setQualityMode('low')}
                                />
                                <span>Performance (Low)</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="quality"
                                    className="accent-accent"
                                    checked={qualityMode === 'high'}
                                    onChange={() => setQualityMode('high')}
                                />
                                <span>Cinematic (High)</span>
                            </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Cinematic mode enables bloom, vignette and advanced post-processing.</p>
                    </div>

                    {/* View Mode */}
                    <div className="bg-surface border border-border rounded-lg p-6">
                        <h2 className="text-lg font-semibold flex items-center mb-4">
                            <ImageIcon className="w-5 h-5 mr-2 text-gray-400" /> Default View
                        </h2>
                        <div className="flex space-x-4">
                            {(['universe', 'both', 'brain'] as const).map(mode => (
                                <label key={mode} className="flex items-center space-x-2 cursor-pointer capitalize">
                                    <input
                                        type="radio"
                                        name="viewmode"
                                        className="accent-accent"
                                        checked={viewMode === mode}
                                        onChange={() => setViewMode(mode)}
                                    />
                                    <span>{mode}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Labels */}
                    <div className="bg-surface border border-border rounded-lg p-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold flex items-center mb-1">
                                <Tags className="w-5 h-5 mr-2 text-gray-400" /> Object Labels
                            </h2>
                            <p className="text-xs text-gray-500">Show floating labels in 3D viewport</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={labelsEnabled}
                                onChange={(e) => setLabelsEnabled(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                        </label>
                    </div>

                    <p className="text-xs text-gray-500 text-center pt-8">
                        Preferences are saved automatically to your profile when logged in.
                    </p>
                </div>
            </div>
        </div>
    )
}

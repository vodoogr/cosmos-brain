'use client'

import { TopBar } from '@/components/layout/TopBar'
import { useDatasetStore } from '@/stores/datasetStore'
import { useEffect, useState } from 'react'
import { datasetService } from '@/services/datasetService'

export default function DatasetsPage() {
    const { activeUniverseRelease, activeBrainRelease } = useDatasetStore()
    const [releases, setReleases] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        datasetService.getActiveReleases().then(data => {
            setReleases(data || [])
            setLoading(false)
        }).catch(err => {
            console.error(err)
            setLoading(false)
        })
    }, [])

    return (
        <div className="min-h-screen bg-[#030305] text-white">
            <TopBar />
            <div className="pt-24 max-w-6xl mx-auto px-6">
                <h1 className="text-3xl font-light mb-8">Dataset Explorer</h1>
                
                {loading ? (
                    <div className="text-slate-500">Loading datasets...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {releases.map(release => (
                            <div key={release.id} className="p-6 bg-white/5 border border-white/10 rounded-lg">
                                <div className="text-xs text-blue-400 tracking-widest uppercase mb-2">{release.domain}</div>
                                <h2 className="text-xl font-medium mb-4">{release.name}</h2>
                                <div className="text-sm text-slate-400 mb-6">Version: {release.version}</div>
                                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm transition">
                                    Browse Objects
                                </button>
                            </div>
                        ))}
                        {releases.length === 0 && (
                            <div className="text-slate-500 col-span-2">No active dataset releases found.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

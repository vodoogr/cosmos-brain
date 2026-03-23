'use client'

import { TopBar } from '@/components/layout/TopBar'
import { useUIStore } from '@/stores/uiStore'

export default function SettingsPage() {
    // We would typically load and save these through preferencesService to Supabase
    // But for now we just reflect the local UI store equivalent flags if needed
    
    return (
        <div className="min-h-screen bg-[#030305] text-white">
            <TopBar />
            <div className="pt-24 max-w-2xl mx-auto px-6">
                <h1 className="text-3xl font-light mb-8">Preferences</h1>
                
                <div className="space-y-8 bg-white/5 border border-white/10 p-8 rounded-lg">
                    
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-white mb-1">Quality Mode</div>
                            <div className="text-sm text-slate-400">Higher settings enable bloom and post-processing.</div>
                        </div>
                        <select className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm outline-none w-32">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-8">
                        <div>
                            <div className="font-medium text-white mb-1">Label Visibility</div>
                            <div className="text-sm text-slate-400">Show names on 3D objects.</div>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-500 bg-black/50 border-white/10" />
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-8">
                        <div>
                            <div className="font-medium text-white mb-1">Default View Mode</div>
                            <div className="text-sm text-slate-400">Initial state when loading the explorer.</div>
                        </div>
                        <select className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm outline-none w-32">
                            <option value="universe">Universe</option>
                            <option value="brain">Brain Atlas</option>
                            <option value="both">Both</option>
                        </select>
                    </div>

                    <div className="pt-8 border-t border-white/10 flex justify-end">
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded shadow-lg transition">
                            Save Preferences
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

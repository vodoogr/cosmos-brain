import Link from 'next/link'
import { ArrowLeft, Database, Search } from 'lucide-react'

export default function DatasetsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-8 md:p-16 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8">

                <Link href="/explorer" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Explorer
                </Link>

                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Dataset Registry</h1>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search regions or objects..."
                            className="pl-10 pr-4 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:border-accent w-64 text-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/* Universe Column */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold flex items-center text-blue-400">
                            <Database className="w-4 h-4 mr-2" />
                            Active Universe Release
                        </h2>
                        <div className="bg-surface border border-border rounded-lg overflow-hidden">
                            <div className="p-4 border-b border-border hover:bg-surfaceOverlay transition-colors cursor-pointer block">
                                <h3 className="font-semibold text-white">Milky Way Sub-cluster Alpha</h3>
                                <p className="text-xs text-gray-400 mt-1">Type: Spiral Galaxy • ID: MS-A-01</p>
                            </div>
                            <div className="p-4 border-b border-border hover:bg-surfaceOverlay transition-colors cursor-pointer block">
                                <h3 className="font-semibold text-white">Andromeda Proximal</h3>
                                <p className="text-xs text-gray-400 mt-1">Type: Galaxy • ID: AND-02</p>
                            </div>
                        </div>
                    </div>

                    {/* Brain Column */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold flex items-center text-pink-400">
                            <Database className="w-4 h-4 mr-2" />
                            Active Brain Atlas Release
                        </h2>
                        <div className="bg-surface border border-border rounded-lg overflow-hidden">
                            <div className="p-4 border-b border-border hover:bg-surfaceOverlay transition-colors cursor-pointer block">
                                <h3 className="font-semibold text-white">Prefrontal Cortex (dlPFC)</h3>
                                <p className="text-xs text-gray-400 mt-1">Region: Frontal • ID: BR-01</p>
                            </div>
                            <div className="p-4 border-b border-border hover:bg-surfaceOverlay transition-colors cursor-pointer block">
                                <h3 className="font-semibold text-white">Visual Cortex (V1)</h3>
                                <p className="text-xs text-gray-400 mt-1">Region: Occipital • ID: BR-02</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

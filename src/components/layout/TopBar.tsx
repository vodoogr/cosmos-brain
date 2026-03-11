import Link from 'next/link'
import { Settings, User, Save, Layers } from 'lucide-react'

export const TopBar = () => {
    return (
        <header className="absolute top-0 left-0 w-full h-14 bg-surfaceOverlay backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
                <Layers className="w-5 h-5 text-accent" />
                <h1 className="text-sm font-semibold tracking-wide">COSMOS-BRAIN RESONANCE EXPLORER</h1>
                <div className="h-4 w-[1px] bg-border mx-2" />
                <span className="text-xs text-gray-400">Default Session</span>
            </div>

            <div className="flex items-center space-x-3 text-gray-400">
                <button className="flex items-center space-x-2 text-xs hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-surface">
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                </button>
                <Link href="/dataset" className="text-xs hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-surface">
                    Datasets
                </Link>
                <Link href="/settings" className="p-2 hover:text-white hover:bg-surface rounded-full transition-colors">
                    <Settings className="w-4 h-4" />
                </Link>
                <Link href="/auth" className="p-2 hover:text-white hover:bg-surface rounded-full transition-colors">
                    <User className="w-4 h-4" />
                </Link>
            </div>
        </header>
    )
}

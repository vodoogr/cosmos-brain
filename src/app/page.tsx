import Link from 'next/link'
import { Layers } from 'lucide-react'

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#030305] text-white p-6 relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />

            <div className="relative z-10 max-w-4xl w-full text-center space-y-12">
                <div className="space-y-6">
                    <div className="flex justify-center mb-8">
                        <Layers className="w-16 h-16 text-accent" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                        Cosmos-Brain
                        <span className="block text-accent mt-2">Resonance Explorer</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        An interactive scientific platform visualizing morphological and conceptual
                        correlations between vast astronomical structures and neural network topologies.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/explorer"
                        className="px-8 py-4 bg-accent hover:bg-accentHover text-white rounded-lg font-semibold tracking-wide transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                    >
                        Launch Explorer
                    </Link>
                    <Link
                        href="/about"
                        className="px-8 py-4 bg-surface border border-border hover:border-gray-500 text-white rounded-lg font-semibold tracking-wide transition-all"
                    >
                        Read Methodology
                    </Link>
                </div>

                <div className="pt-16 max-w-3xl mx-auto">
                    <div className="p-4 bg-surfaceOverlay border border-border rounded-lg text-sm text-gray-400 text-left">
                        <strong className="text-gray-200 block mb-2">Scientific Disclaimer</strong>
                        This platform is an exploratory visual and conceptual tool. It does not claim a scientifically
                        proven direct physical interaction between cosmic structures and human neural frequencies.
                        The visualizations serve as a bridge for hypothetical modeling and structural comparison.
                    </div>
                </div>
            </div>
        </div>
    )
}

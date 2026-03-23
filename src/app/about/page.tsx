import { TopBar } from '@/components/layout/TopBar'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#030305] text-white">
            <TopBar />
            <div className="pt-24 max-w-3xl mx-auto px-6 pb-20">
                <h1 className="text-4xl font-light mb-12">Methodology</h1>
                
                <div className="space-y-8 text-slate-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-medium text-white mb-4">Scientific Disclaimer</h2>
                        <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-blue-200">
                            This platform is an exploratory visual and conceptual tool. It does not claim a scientifically proven direct physical interaction between cosmic structures and human neural frequencies. The visualizations serve as a bridge for hypothetical modeling and structural comparison.
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-white mb-4">Cosmological Data</h2>
                        <p>
                            The universe map relies on macroscopic cluster metadata, positioning galaxies and simulation nodes in a true 3D coordinate system. Visual scales map density parameters into varied glow intensities.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-white mb-4">Neural Topology</h2>
                        <p>
                            Brain regions are rendered based on reference atlas coordinate systems. The connections mapped between regions represent theoretical functional or structural similarity.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}

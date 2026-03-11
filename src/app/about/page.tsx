import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-8 md:p-16 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-8">

                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <h1 className="text-4xl font-bold tracking-tight mb-8">Methodology & Disclaimers</h1>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-accent">Scientific Premise</h2>
                    <p className="text-gray-300 leading-relaxed">
                        The Cosmos-Brain Resonance Explorer was developed to visualize structural similarities
                        found across vastly different scales in nature—specifically the cosmic web of galaxy clusters
                        and the neural networks of the human brain.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        While these domains operate on completely distinct physical principles, their morphological
                        resemblance presents a unique opportunity for visual and statistical comparative analysis.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-accent">Data Sources</h2>
                    <p className="text-gray-300 leading-relaxed">
                        <strong>Universe Data:</strong> Seeded datasets represent mapped coordinates of
                        known galactic phenomena, processed from standard astronomical catalogs.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        <strong>Brain Atlas:</strong> Structural regions are mapped based on generalized neurological
                        parcellations used in standard fMRI studies.
                    </p>
                </section>

                <section className="space-y-4 bg-surface p-6 rounded-lg border border-border mt-12">
                    <h2 className="text-xl font-semibold text-white mb-2">Important Disclaimer</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        This platform is an exploratory visual and conceptual tool. It does not claim a scientifically
                        proven direct physical interaction between cosmic structures and human neural frequencies.
                        The application of EEG data or astronomical telemetry within this software is intended for
                        experimental mapping and artistic/conceptual visualization only.
                    </p>
                </section>

            </div>
        </div>
    )
}

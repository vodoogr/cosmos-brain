import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Cosmos-Brain Resonance Explorer',
    description: 'A scientific interactive web platform visualizing a 3D universe map and neural activity map.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className="antialiased h-screen w-screen overflow-hidden bg-background text-foreground">
                {children}
            </body>
        </html>
    )
}

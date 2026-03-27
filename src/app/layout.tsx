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
            <head>
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
            </head>
            <body className="antialiased h-screen w-screen overflow-hidden bg-background text-foreground">
                {children}
            </body>
        </html>
    )
}

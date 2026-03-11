"use client"
import Link from 'next/link'
import { ArrowLeft, User, Mail, Lock } from 'lucide-react'

export default function AuthPage() {
    // Scaffold UI for Supabase Auth flow
    return (
        <div className="min-h-screen bg-[#030305] flex flex-col justify-center items-center p-4">
            <Link href="/" className="absolute top-8 left-8 inline-flex items-center text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Home
            </Link>

            <div className="w-full max-w-md bg-surface border border-border rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="mx-auto w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                        <User className="w-6 h-6 text-accent" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Researcher Access</h1>
                    <p className="text-sm text-gray-400 mt-2">Sign in to sync your exploration sessions.</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="email"
                                className="w-full bg-[#0f0f11] border border-border rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-accent"
                                placeholder="doc@institute.edu"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="password"
                                className="w-full bg-[#0f0f11] border border-border rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-accent"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-accent hover:bg-accentHover text-white rounded-lg font-semibold tracking-wide transition-colors mt-6"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account? <a href="#" className="text-accent hover:underline">Request access</a>
                </div>
            </div>
        </div>
    )
}

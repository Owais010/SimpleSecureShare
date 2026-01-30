'use client';

import { useState, useEffect, use } from 'react';
import { getSupabase } from '@/lib/supabase';
import { ShieldCheck, Download, Lock, AlertTriangle, Clock, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface LinkData {
    id: string;
    token: string;
    password_hash: string | null;
    expires_at: string;
    is_active: boolean;
    file_id: string;
    files: {
        id: string;
        filename: string;
        size_bytes: number;
        mime_type: string;
        storage_path: string;
    };
}

type PageState = 'loading' | 'not_found' | 'expired' | 'password_required' | 'ready' | 'error';

// Simple hash for password verification (must match the one used in links.ts)
async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
}

export default function DownloadPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = use(params);
    const [pageState, setPageState] = useState<PageState>('loading');
    const [linkData, setLinkData] = useState<LinkData | null>(null);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState('');

    useEffect(() => {
        fetchLinkData();
    }, [token]);

    const fetchLinkData = async () => {
        const supabase = getSupabase();
        if (!supabase) {
            setPageState('error');
            return;
        }

        const { data, error } = await supabase
            .from('links')
            .select(`
                id,
                token,
                password_hash,
                expires_at,
                is_active,
                file_id,
                files (
                    id,
                    filename,
                    size_bytes,
                    mime_type,
                    storage_path
                )
            `)
            .eq('token', token)
            .single();

        if (error || !data) {
            setPageState('not_found');
            return;
        }

        // Check if active
        if (!data.is_active) {
            setPageState('not_found');
            return;
        }

        // Check if expired
        if (new Date(data.expires_at) < new Date()) {
            setPageState('expired');
            return;
        }

        setLinkData(data as unknown as LinkData);

        // Check if password protected
        if (data.password_hash) {
            setPageState('password_required');
        } else {
            // No password, generate download URL
            await generateDownloadUrl(data as unknown as LinkData);
        }
    };

    const generateDownloadUrl = async (data: LinkData) => {
        const supabase = getSupabase();
        if (!supabase) return;

        const { data: urlData } = supabase.storage
            .from('user_uploads')
            .getPublicUrl(data.files.storage_path);

        setDownloadUrl(urlData.publicUrl);
        setPageState('ready');
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!linkData) return;

        setIsVerifying(true);
        setPasswordError('');

        const hashedInput = await hashPassword(password);

        if (hashedInput === linkData.password_hash) {
            await generateDownloadUrl(linkData);
        } else {
            setPasswordError('Incorrect password');
        }

        setIsVerifying(false);
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-void to-void overflow-hidden relative p-6">
            {/* Background Elements */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-electric/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8 group">
                    <div className="p-2 rounded-lg bg-electric/10 group-hover:bg-electric/20 transition-colors">
                        <ShieldCheck className="w-6 h-6 text-electric" />
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight">Simple<span className="text-electric">Secure</span>Share</span>
                </Link>

                <div className="glass-card shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/5 min-h-[300px] flex flex-col items-center justify-center animate-fade-in">

                    {/* Loading State */}
                    {pageState === 'loading' && (
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="w-10 h-10 text-electric animate-spin" />
                            <p className="text-white/60">Loading...</p>
                        </div>
                    )}

                    {/* Not Found State */}
                    {pageState === 'not_found' && (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8 text-red-400" />
                            </div>
                            <h2 className="font-display text-2xl font-bold">Link Not Found</h2>
                            <p className="text-white/60 max-w-xs">
                                This link doesn't exist or has been deactivated.
                            </p>
                            <Link href="/" className="glass-button mt-4">
                                Go Home
                            </Link>
                        </div>
                    )}

                    {/* Expired State */}
                    {pageState === 'expired' && (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                <Clock className="w-8 h-8 text-yellow-400" />
                            </div>
                            <h2 className="font-display text-2xl font-bold">Link Expired</h2>
                            <p className="text-white/60 max-w-xs">
                                This link has expired and is no longer available.
                            </p>
                            <Link href="/" className="glass-button mt-4">
                                Go Home
                            </Link>
                        </div>
                    )}

                    {/* Password Required State */}
                    {pageState === 'password_required' && (
                        <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center gap-6 w-full">
                            <div className="w-16 h-16 rounded-full bg-electric/10 flex items-center justify-center animate-pulse-glow">
                                <Lock className="w-8 h-8 text-electric" />
                            </div>
                            <div className="text-center">
                                <h2 className="font-display text-2xl font-bold mb-2">Password Protected</h2>
                                <p className="text-white/60">Enter the password to access this file.</p>
                            </div>

                            <div className="w-full space-y-4">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="glass-input w-full text-center"
                                    autoFocus
                                />
                                {passwordError && (
                                    <p className="text-red-400 text-sm text-center">{passwordError}</p>
                                )}
                                <button
                                    type="submit"
                                    disabled={isVerifying || !password}
                                    className="glass-button w-full flex justify-center items-center gap-2 disabled:opacity-50"
                                >
                                    {isVerifying ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        'Unlock File'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Ready State */}
                    {pageState === 'ready' && linkData && (
                        <div className="flex flex-col items-center gap-6 w-full">
                            <div className="w-16 h-16 rounded-full bg-electric/10 flex items-center justify-center animate-pulse-glow">
                                <Download className="w-8 h-8 text-electric" />
                            </div>
                            <div className="text-center">
                                <h2 className="font-display text-2xl font-bold mb-2">Ready to Download</h2>
                                <p className="text-white/60">Your file is ready.</p>
                            </div>

                            <div className="w-full p-4 bg-white/5 rounded-xl border border-white/10">
                                <p className="font-mono text-sm text-electric truncate">{linkData.files.filename}</p>
                                <p className="text-white/40 text-xs mt-1">{formatFileSize(linkData.files.size_bytes)}</p>
                            </div>

                            <a
                                href={downloadUrl}
                                download={linkData.files.filename}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-button w-full flex justify-center items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download File
                            </a>
                        </div>
                    )}

                    {/* Error State */}
                    {pageState === 'error' && (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8 text-red-400" />
                            </div>
                            <h2 className="font-display text-2xl font-bold">Something went wrong</h2>
                            <p className="text-white/60 max-w-xs">
                                Unable to load this file. Please try again later.
                            </p>
                            <Link href="/" className="glass-button mt-4">
                                Go Home
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}

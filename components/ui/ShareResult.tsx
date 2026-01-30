'use client';

import { useState } from 'react';
import { Copy, Check, QrCode, UploadCloud } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

interface ShareResultProps {
    link: string;
    expiryLabel: string;
    onReset: () => void;
}

export default function ShareResult({ link, expiryLabel, onReset }: ShareResultProps) {
    const [copied, setCopied] = useState(false);
    const [showQR, setShowQR] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center w-full animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-electric/10 flex items-center justify-center mb-6 animate-pulse-glow">
                <Check className="w-8 h-8 text-electric" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-2">File Ready to Share</h3>
            <p className="text-white/60 mb-8 text-center max-w-sm">
                Your file is encrypted and ready. This link will expire in {expiryLabel}.
            </p>

            <div className="w-full relative group mb-6 hover:animate-hover-lift">
                <input
                    type="text"
                    value={link}
                    readOnly
                    className="w-full glass-input pr-28 font-mono text-sm text-electric cursor-pointer selection:bg-electric selection:text-void"
                    onClick={handleCopy}
                />
                <button
                    onClick={handleCopy}
                    className="absolute right-1 top-1 bottom-1 px-4 bg-white/5 hover:bg-white/10 rounded-md flex items-center gap-2 transition-colors border border-white/5"
                >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    <span className="text-xs font-medium">{copied ? 'Copied' : 'Copy'}</span>
                </button>
            </div>

            <button
                onClick={() => setShowQR(v => !v)}
                className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer group hover:animate-hover-lift"
            >
                <QrCode className="w-12 h-12 text-white/50 group-hover:text-electric transition-colors" />
                <span className="text-xs text-white/40 group-hover:text-white/80">{showQR ? 'Hide QR Code' : 'Show QR Code'}</span>
            </button>

            {showQR && (
                <div className="mt-6 p-4 bg-white rounded-xl animate-fade-in">
                    <QRCodeCanvas value={link} size={160} />
                </div>
            )}

            <button
                onClick={onReset}
                className="mt-8 flex items-center gap-2 text-white/50 hover:text-electric transition-colors text-sm"
            >
                <UploadCloud className="w-4 h-4" />
                Upload Another File
            </button>
        </div>
    );
}

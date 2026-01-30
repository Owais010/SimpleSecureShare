import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-void/50 backdrop-blur-md border-b border-white/5">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 rounded-lg bg-electric/10 group-hover:bg-electric/20 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-electric" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight">Simple<span className="text-electric">Secure</span>Share</span>
            </Link>
            <Link href="/upload" className="glass-button text-sm py-2 px-4 hover:animate-hover-lift">
                Upload File
            </Link>
        </nav>
    );
}

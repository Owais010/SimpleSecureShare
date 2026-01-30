'use client';
import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function PasswordInput({ value, onChange }: PasswordInputProps) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative group hover:animate-hover-lift">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-electric transition-colors">
                <Lock className="w-5 h-5" />
            </div>
            <input
                type={show ? 'text' : 'password'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Set a password (optional)"
                className="glass-input w-full pl-10 pr-10"
            />
            <button
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors cursor-pointer"
                type="button"
            >
                {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
        </div>
    );
}

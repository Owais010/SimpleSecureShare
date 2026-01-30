'use client';
import { Clock } from 'lucide-react';
import { clsx } from 'clsx';

const OPTIONS = [
    { label: '1 Hour', value: '1h' },
    { label: '1 Day', value: '24h' },
    { label: '7 Days', value: '7d' },
];

interface ExpiryPickerProps {
    value: string;
    onChange: (value: string) => void;
}

export default function ExpiryPicker({ value, onChange }: ExpiryPickerProps) {
    return (
        <div className="flex flex-col gap-2 hover:animate-hover-lift">
            <label className="text-sm text-white/60 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Expiry Time
            </label>
            <div className="flex gap-2 p-1 bg-white/5 border border-white/5 rounded-lg">
                {OPTIONS.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => onChange(opt.value)}
                        type="button"
                        className={clsx(
                            "flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 cursor-pointer",
                            value === opt.value
                                ? "bg-electric/20 text-electric shadow-[0_0_10px_rgba(79,209,255,0.2)]"
                                : "text-white/40 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

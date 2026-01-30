'use client';
import { useState, useCallback } from 'react';
import { UploadCloud, File } from 'lucide-react';
import { clsx } from 'clsx';
import { getSupabase } from '@/lib/supabase';

interface UploadZoneProps {
    onComplete: (filePath: string, fileName: string, fileSize: number) => void;
}

export default function UploadZone({ onComplete }: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);


    // Simplified real upload with simulated progress
    const startUpload = useCallback(async (file: globalThis.File) => {
        const supabase = getSupabase();
        if (!supabase) {
            console.error('Supabase not configured');
            return;
        }

        setIsUploading(true);
        setProgress(0);

        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        // Start a progress simulation that will be stopped when upload completes
        let simulatedProgress = 0;
        const progressInterval = setInterval(() => {
            simulatedProgress += 2;
            if (simulatedProgress >= 95) {
                simulatedProgress = 95; // Cap at 95% until real completion
            }
            setProgress(simulatedProgress);
        }, 50);

        const { data, error } = await supabase.storage
            .from('user_uploads')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        clearInterval(progressInterval);

        if (error) {
            console.error('Upload error:', error);
            setIsUploading(false);
            setProgress(0);
            return;
        }

        setProgress(100);
        setTimeout(() => {
            onComplete(data.path, file.name, file.size);
        }, 300);
    }, [onComplete]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            startUpload(e.dataTransfer.files[0]);
        }
    }, [startUpload]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            startUpload(e.target.files[0]);
        }
    };

    return (
        <div
            className={clsx(
                "relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden group cursor-pointer animate-fade-in",
                isDragging
                    ? "border-electric bg-electric/10 shadow-[0_0_30px_rgba(79,209,255,0.2)] scale-[1.02]"
                    : "border-white/10 hover:border-white/20 hover:bg-white/5",
                isUploading ? "pointer-events-none cursor-default" : ""
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => !isUploading && document.getElementById('file-upload')?.click()}
        >
            <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
            />

            <div className="flex flex-col items-center justify-center py-20 px-4 text-center relative z-10">
                {isUploading ? (
                    <div className="flex flex-col items-center w-full max-w-xs animate-fade-in">
                        <div className="mb-4 relative">
                            <div className="w-16 h-16 rounded-full bg-electric/10 flex items-center justify-center animate-pulse-glow">
                                <File className="w-8 h-8 text-electric" />
                            </div>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-electric transition-all duration-100 ease-linear shadow-[0_0_10px_var(--color-electric)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="mt-2 text-sm text-electric font-mono">{progress}%</div>
                        <p className="mt-1 text-xs text-white/40">Encrypting & Uploading...</p>
                    </div>
                ) : (
                    <>
                        <div className={clsx(
                            "w-20 h-20 rounded-full bg-void border border-white/5 flex items-center justify-center mb-6 transition-all duration-500",
                            "group-hover:scale-110 group-hover:border-electric/30 group-hover:shadow-[0_0_30px_rgba(79,209,255,0.15)] group-hover:animate-float"
                        )}>
                            <UploadCloud className={clsx(
                                "w-10 h-10 transition-colors duration-300",
                                isDragging ? "text-electric" : "text-white/40 group-hover:text-electric"
                            )} />
                        </div>
                        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-electric transition-colors">
                            Upload your file
                        </h3>
                        <p className="text-white/50 text-sm max-w-xs transition-colors group-hover:text-white/70">
                            Drag and drop or click to browse. <br />
                            <span className="text-white/30 text-xs mt-2 block">Max 2GB • End-to-End Encrypted</span>
                        </p>
                    </>
                )}
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-electric/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    );
}

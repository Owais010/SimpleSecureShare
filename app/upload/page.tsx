'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import UploadZone from '@/components/ui/UploadZone';
import PasswordInput from '@/components/ui/PasswordInput';
import ExpiryPicker from '@/components/ui/ExpiryPicker';
import ShareResult from '@/components/ui/ShareResult';
import { ChevronRight, Loader2 } from 'lucide-react';
import { createShareLink } from '@/lib/links';

interface UploadedFile {
    path: string;
    name: string;
    size: number;
}

export default function UploadPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [expiry, setExpiry] = useState('24h');
    const [password, setPassword] = useState('');
    const [shareLink, setShareLink] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleUploadComplete = (filePath: string, fileName: string, fileSize: number) => {
        setUploadedFile({ path: filePath, name: fileName, size: fileSize });
        setStep(2);
    };

    const handleGenerateLink = async () => {
        if (!uploadedFile) return;

        setIsGenerating(true);
        const result = await createShareLink({
            storagePath: uploadedFile.path,
            fileName: uploadedFile.name,
            fileSize: uploadedFile.size,
            password: password || undefined,
            expiryOption: expiry,
        });

        setIsGenerating(false);

        if (result.error) {
            console.error('Failed to generate link:', result.error);
            return;
        }

        // Construct the full link
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        setShareLink(`${baseUrl}/l/${result.token}`);
        setStep(3);
    };

    // Compute human-readable expiry label
    const expiryLabel =
        expiry === '1h' ? '1 hour' :
            expiry === '24h' ? '24 hours' :
                expiry === '7d' ? '7 days' : '24 hours';

    return (
        <main className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-void to-void overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-electric/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center p-6 pt-20 relative z-10">
                <div className="w-full max-w-md animate-slide-up">

                    {/* Steps Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-8 text-sm font-medium text-white/40">
                        <span className={step >= 1 ? "text-electric transition-colors duration-500" : "transition-colors duration-500"}>Upload</span>
                        <ChevronRight className="w-4 h-4 text-white/20" />
                        <span className={step >= 2 ? "text-electric transition-colors duration-500" : "transition-colors duration-500"}>Configure</span>
                        <ChevronRight className="w-4 h-4 text-white/20" />
                        <span className={step >= 3 ? "text-electric transition-colors duration-500" : "transition-colors duration-500"}>Share</span>
                    </div>

                    <div className="glass-card shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/5 relative overflow-hidden min-h-[400px] flex flex-col justify-center">

                        {/* Step 1: Upload */}
                        {step === 1 && (
                            <div className="animate-fade-in w-full">
                                <UploadZone onComplete={handleUploadComplete} />
                            </div>
                        )}

                        {/* Step 2: Configure */}
                        {step === 2 && (
                            <div className="animate-fade-in flex flex-col gap-6 w-full">
                                <div className="text-center mb-2">
                                    <h2 className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">File Uploaded</h2>
                                    <p className="text-white/50 text-sm">Configure your share link settings</p>
                                </div>

                                <div className="space-y-4">
                                    <ExpiryPicker value={expiry} onChange={setExpiry} />
                                    <div className="h-px bg-white/5 my-4" />
                                    <PasswordInput value={password} onChange={setPassword} />
                                </div>

                                <button
                                    onClick={handleGenerateLink}
                                    disabled={isGenerating}
                                    className="glass-button w-full mt-4 flex justify-center items-center gap-2 hover:animate-hover-lift group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            Generate Secure Link
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Step 3: Result */}
                        {step === 3 && (
                            <ShareResult
                                link={shareLink}
                                expiryLabel={expiryLabel}
                                onReset={() => {
                                    setStep(1);
                                    setUploadedFile(null);
                                    setPassword('');
                                    setExpiry('24h');
                                    setShareLink('');
                                }}
                            />
                        )}

                    </div>
                </div>
            </div>
        </main>
    );
}

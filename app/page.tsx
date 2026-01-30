'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import { Lock, Zap, EyeOff, X, Upload, Share2, Clock } from 'lucide-react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-electric/10 rounded-full blur-[100px] pointer-events-none" />

      <Navbar />

      {/* Hero */}
      <section className="w-full max-w-4xl mx-auto px-6 pt-40 pb-20 flex flex-col items-center text-center animate-fade-in relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-electric mb-6 animate-slide-up backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-electric animate-pulse-glow" />
          New: End-to-End Encryption
        </div>

        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Share files securely. <br />
          <span className="text-gradient">Leave no trace.</span>
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Simple Secure Share is the easiest way to send files to anyone, anywhere.
          Encrypted, private, and automatically expires.
        </p>

        <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link href="/upload" className="glass-button text-lg px-8 py-4 shadow-[0_0_30px_rgba(79,209,255,0.2)] hover:animate-hover-lift">
            Start Uploading
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 rounded-lg font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            How it works
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <FeatureCard
          icon={<Lock className="w-8 h-8 text-electric" />}
          title="End-to-End Encrypted"
          desc="Your files are encrypted in the browser before they ever leave your device."
          delay="0.4s"
        />
        <FeatureCard
          icon={<Zap className="w-8 h-8 text-electric" />}
          title="Lightning Fast"
          desc="Optimized for speed with a global edge network to ensure fast uploads and downloads."
          delay="0.5s"
        />
        <FeatureCard
          icon={<EyeOff className="w-8 h-8 text-electric" />}
          title="Zero Knowledge"
          desc="We can't see your files, and once they expire, they are gone forever."
          delay="0.6s"
        />
      </section>

      {/* How it Works Section (SEO Friendly) */}
      <section className="w-full max-w-4xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How Simple Secure Share works</h2>
          <div className="w-20 h-1 bg-electric rounded-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            number="1"
            title="Upload"
            desc="Your file is encrypted in the browser before upload."
            icon={<Upload className="w-6 h-6 text-electric" />}
          />
          <StepCard
            number="2"
            title="Share"
            desc="We generate a private link with optional password and expiry."
            icon={<Share2 className="w-6 h-6 text-electric" />}
          />
          <StepCard
            number="3"
            title="Expire"
            desc="Once expired, the link stops working. No access remains."
            icon={<Clock className="w-6 h-6 text-electric" />}
          />
        </div>
        <div className="text-center mt-12">
          <p className="text-white/30 text-sm">
            Files are Removed from the storage over time
          </p>
          <p className="text-electric/50 text-xs mt-2 uppercase tracking-widest font-medium">
            We Respect your privacy
          </p>
        </div>
      </section>

      <footer className="w-full py-10 text-center text-white/20 text-sm mt-auto relative z-10">
        &copy; 2026 Simple Secure Share.
      </footer>

      {/* How it Works Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-void/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowModal(false)}
          />
          <div className="glass-card w-full max-w-2xl relative z-10 animate-slide-up p-8 md:p-12 border-electric/20 shadow-[0_0_50px_rgba(79,209,255,0.1)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-display font-bold mb-8 text-center">How Simple Secure Share works</h2>

            <div className="grid grid-cols-1 gap-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-electric/10 flex items-center justify-center flex-shrink-0 border border-electric/20">
                  <span className="font-bold text-electric text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-electric" /> Upload
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    Your file is encrypted in the browser before upload.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-electric/10 flex items-center justify-center flex-shrink-0 border border-electric/20">
                  <span className="font-bold text-electric text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-electric" /> Share
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    We generate a private link with optional password and expiry.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-electric/10 flex items-center justify-center flex-shrink-0 border border-electric/20">
                  <span className="font-bold text-electric text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-electric" /> Expire
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    Once expired, the link stops working. No access remains.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-white/30 text-sm">
                Files are Removed from the storage over time
              </p>
              <p className="text-electric/50 text-xs mt-2 uppercase tracking-widest font-medium mb-6">
                We Respect your privacy
              </p>
              <Link
                href="/upload"
                className="glass-button w-full sm:w-auto px-8 inline-flex justify-center"
              >
                Start Uploading
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: string }) {
  return (
    <div
      className="glass-card flex flex-col items-start gap-4 hover:bg-white/5 hover:border-electric/30 hover:animate-hover-lift animate-slide-up cursor-default group"
      style={{ animationDelay: delay }}
    >
      <div className="p-3 rounded-lg bg-white/5 border border-white/5 group-hover:bg-electric/10 group-hover:border-electric/20 transition-colors">
        {icon}
      </div>
      <h3 className="font-display text-xl font-bold group-hover:text-electric transition-colors">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function StepCard({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="relative group">
      <div className="glass-card h-full p-8 hover:bg-white/5 transition-all duration-300 border-white/5 hover:border-electric/20">
        <div className="absolute top-6 right-6 text-6xl font-bold text-white/5 select-none font-display group-hover:text-electric/5 transition-colors">
          {number}
        </div>
        <div className="mb-6 p-3 bg-white/5 w-fit rounded-lg text-electric group-hover:bg-electric/10 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

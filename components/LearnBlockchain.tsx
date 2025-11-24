import React from 'react';
import { GraduationCap, ShieldCheck, Wallet, TrendingUp, Globe, Zap, Layers } from 'lucide-react';

export const LearnBlockchain = () => {
  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/20 rounded-lg"><GraduationCap className="text-blue-400 w-8 h-8" /></div>
        <div>
            <h2 className="text-2xl font-bold text-white">Learn Blockchain & XRP</h2>
            <p className="text-slate-400">Understand the technology behind your rewards.</p>
        </div>
      </div>

      {/* Intro Card */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-900/20 p-8 rounded-2xl border border-blue-500/30 relative overflow-hidden">
         <div className="absolute -right-10 -bottom-10 opacity-10"><Layers size={200} /></div>
         <h3 className="text-2xl font-bold text-white mb-4">What is the XRP Ledger?</h3>
         <p className="text-slate-300 leading-relaxed max-w-3xl">
            The XRP Ledger (XRPL) is a decentralized, public blockchain led by a global community of developers. 
            It is fast, energy-efficient, and reliable. Unlike Bitcoin, which uses "mining" (consuming massive electricity), 
            XRP uses a consensus protocol, making it one of the greenest digital assets—perfect for our recycling mission.
         </p>
      </div>

      {/* 3 Columns Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:bg-slate-800/80 transition-colors">
            <Zap className="text-yellow-400 w-10 h-10 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Lightning Fast</h4>
            <p className="text-slate-400 text-sm">Transactions on the XRP Ledger settle in 3-5 seconds. No waiting for hours like traditional banks.</p>
         </div>
         <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:bg-slate-800/80 transition-colors">
            <Globe className="text-green-400 w-10 h-10 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Eco-Friendly</h4>
            <p className="text-slate-400 text-sm">XRPL is carbon-neutral. It consumes negligible energy compared to proof-of-work blockchains.</p>
         </div>
         <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:bg-slate-800/80 transition-colors">
            <ShieldCheck className="text-blue-400 w-10 h-10 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Secure & Proven</h4>
            <p className="text-slate-400 text-sm">Operating since 2012, the ledger has processed millions of transactions without failure.</p>
         </div>
      </div>

      {/* Wallet Guide */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
         <div className="p-6 border-b border-slate-700 bg-slate-800/50">
            <h3 className="text-xl font-bold text-white flex items-center gap-2"><Wallet /> Managing Your Assets</h3>
         </div>
         <div className="p-6 space-y-6">
            <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">1</div>
                <div>
                    <h4 className="font-bold text-white">Digital Wallets</h4>
                    <p className="text-slate-400 text-sm mt-1">Your XRP rewards are stored in a digital wallet managed by the project during the 24-month lock period. This ensures safety and prevents panic selling.</p>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">2</div>
                <div>
                    <h4 className="font-bold text-white">Self-Custody (After 24 Months)</h4>
                    <p className="text-slate-400 text-sm mt-1">Once the cycle completes, you can withdraw your assets to your own wallet (e.g., Xaman, Ledger) or convert them to BWP cash.</p>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">3</div>
                <div>
                    <h4 className="font-bold text-white">Value Fluctuation</h4>
                    <p className="text-slate-400 text-sm mt-1">Crypto assets change value daily. The 'Portfolio Value' you see on your dashboard is an estimate based on the current global market price.</p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};
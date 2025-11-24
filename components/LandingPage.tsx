import React, { useState, useEffect } from 'react';
import { User, SystemSettings, UserRole, UserRank } from '../types';
import { Trophy, Medal, TrendingUp, ChevronRight, Users, Star, Play, Globe, Leaf, Search, ArrowUpDown, Recycle, Target, ShieldCheck, Coins, Calendar, ChevronDown } from 'lucide-react';
import { getRank } from '../constants';

interface LandingPageProps {
  users: User[];
  settings: SystemSettings;
  onJoinClick: () => void;
  xrpPrices: { usd: number, bwp: number } | null;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const YEARS = ['2023', '2024', '2025'];

export const LandingPage: React.FC<LandingPageProps> = ({ users, settings, onJoinClick, xrpPrices }) => {
  // FILTER: Only Participants
  const participantUsers = users.filter(u => u.role === UserRole.PARTICIPANT);
  
  // Stats for Hero
  const totalBottles = participantUsers.reduce((acc, u) => acc + u.totalBottles, 0);
  const targetBottles = 100000;
  const progressPercentage = Math.min((totalBottles / targetBottles) * 100, 100);
  
  // Carousel Logic (Top 10)
  const sortedByBottles = [...participantUsers].sort((a, b) => b.totalBottles - a.totalBottles);
  const topTen = sortedByBottles.slice(0, 10);
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // Navigation & Sort State
  const [activeMonth, setActiveMonth] = useState<string>('October'); // Defaulting to current data month
  const [activeYear, setActiveYear] = useState<string>('2023');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  const liveXrpPrice = xrpPrices ? (settings.xrpDisplayCurrency === 'USD' ? xrpPrices.usd : xrpPrices.bwp) : 0;

  // Auto-rotate carousel
  useEffect(() => {
    if (topTen.length > 0) {
        const interval = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % topTen.length);
        }, 3500);
        return () => clearInterval(interval);
    }
  }, [topTen.length]);

  // Scroll Handler
  const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(id);
      }
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-slate-900 text-slate-100">
      
      {/* Custom Styles for Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.2); }
            50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.6); }
          }
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-delayed { animation: float 7s ease-in-out infinite 1s; }
          .animate-gradient { background-size: 200% 200%; animation: gradient-x 15s ease infinite; }
          .glass-card {
            background: rgba(30, 41, 59, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}
      </style>

      {/* LANDING TOP NAV */}
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center">
         <div className="flex gap-6 text-sm font-bold overflow-x-auto no-scrollbar">
            <button onClick={() => scrollToSection('hero')} className={`hover:text-brand-primary transition-colors ${activeSection === 'hero' ? 'text-brand-primary' : 'text-slate-400'}`}>Home</button>
            <button onClick={() => scrollToSection('goal')} className={`hover:text-brand-primary transition-colors ${activeSection === 'goal' ? 'text-brand-primary' : 'text-slate-400'}`}>The Goal</button>
            <button onClick={() => scrollToSection('rules')} className={`hover:text-brand-primary transition-colors ${activeSection === 'rules' ? 'text-brand-primary' : 'text-slate-400'}`}>Game Rules</button>
            <button onClick={() => scrollToSection('leaderboard')} className={`hover:text-brand-primary transition-colors ${activeSection === 'leaderboard' ? 'text-brand-primary' : 'text-slate-400'}`}>Leaderboard</button>
         </div>
         <div className="hidden md:flex items-center gap-2 text-xs font-mono text-green-400 bg-green-900/20 px-3 py-1 rounded-full border border-green-500/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            LIVE MARKET: 1 XRP = {settings.xrpDisplayCurrency === 'USD' ? '$' : 'P'}{liveXrpPrice.toFixed(4)}
         </div>
      </div>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 animate-gradient"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        {/* Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>

        <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/50 text-brand-primary font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                    <Recycle size={16} /> Revolutionizing Recycling
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight">
                    TURN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">TRASH</span> <br />
                    INTO <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">TREASURE</span>
                </h1>
                
                <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
                    Join 100 pioneers in Botswana. Collect bottles, earn BWP, and build a 24-month XRP crypto portfolio.
                </p>

                <div className="flex flex-wrap gap-4">
                    <button onClick={onJoinClick} className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] transform transition hover:scale-105 flex items-center gap-3">
                        START COLLECTING <ChevronRight />
                    </button>
                    <button onClick={() => scrollToSection('goal')} className="px-8 py-4 glass-card text-white font-bold rounded-xl hover:bg-white/10 transition flex items-center gap-3">
                        LEARN MORE
                    </button>
                </div>

                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700/50">
                    <div>
                        <p className="text-2xl font-bold text-white">{totalBottles.toLocaleString()}</p>
                        <p className="text-xs text-slate-400 uppercase">Bottles Recycled</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-400">100%</p>
                        <p className="text-xs text-slate-400 uppercase">Profit Share</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-purple-400">24 Mo</p>
                        <p className="text-xs text-slate-400 uppercase">Lock Period</p>
                    </div>
                </div>
            </div>

            {/* TOP 10 CAROUSEL */}
            <div className="relative h-[500px] flex items-center justify-center">
                {/* Decoration Circle */}
                <div className="absolute inset-0 border border-slate-700/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute inset-10 border border-slate-700/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                {topTen.length > 0 ? (
                    <div className="relative w-80 h-96 perspective-1000">
                         {topTen.map((user, idx) => {
                             const isActive = idx === carouselIndex;
                             return (
                                <div 
                                    key={user.id}
                                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                                        isActive 
                                        ? 'opacity-100 scale-100 translate-y-0 z-20 rotate-y-0' 
                                        : 'opacity-0 scale-90 translate-y-10 z-10 -rotate-y-12'
                                    }`}
                                >
                                    <div className="w-full h-full bg-slate-800/90 backdrop-blur-xl border border-slate-600 rounded-3xl p-6 flex flex-col items-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                                        {/* Card Header */}
                                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-cyan-900/50 to-transparent"></div>
                                        <div className="absolute top-4 right-4 z-30">
                                            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg">
                                                <span className="text-xl font-bold text-white">#{idx + 1}</span>
                                            </div>
                                        </div>

                                        {/* Avatar */}
                                        <div className="relative mt-8 mb-4 z-20">
                                            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-purple-500">
                                                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover border-4 border-slate-900" />
                                            </div>
                                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-slate-900 px-4 py-1 rounded-full border border-cyan-500/50 shadow-lg">
                                                <div className="flex items-center gap-1">
                                                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                                    <span className="text-xs font-bold text-white uppercase">{getRank(user.totalBottles)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="text-center z-20 mt-4 w-full">
                                            <h3 className="text-2xl font-bold text-white truncate">{user.name}</h3>
                                            <div className="grid grid-cols-2 gap-3 mt-6">
                                                <div className="bg-slate-900/60 p-3 rounded-xl">
                                                    <p className="text-xs text-slate-400 uppercase">Bottles</p>
                                                    <p className="text-lg font-bold text-cyan-400">{user.totalBottles.toLocaleString()}</p>
                                                </div>
                                                <div className="bg-slate-900/60 p-3 rounded-xl">
                                                    <p className="text-xs text-slate-400 uppercase">XRP</p>
                                                    <p className="text-lg font-bold text-purple-400">{user.totalXRP.toFixed(1)}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-slate-700/50">
                                                <p className="text-xs text-slate-500">Projected Value (24mo)</p>
                                                <p className="text-lg font-bold text-green-400 animate-pulse">P {(user.totalXRP * liveXrpPrice * 1.5).toFixed(0)}*</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             );
                         })}
                    </div>
                ) : (
                    <div className="text-white">Loading Top Participants...</div>
                )}
            </div>
        </div>
      </section>

      {/* THE GOAL SECTION */}
      <section id="goal" className="py-20 bg-slate-950 relative border-y border-slate-800">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl font-black text-white mb-6">THE 100K MISSION</h2>
                <p className="text-lg text-slate-400">
                    Our collective goal is simple but ambitious. We are gamifying recycling to build wealth for our community.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Step 1 */}
                <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all group relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity"><Recycle size={150} /></div>
                    <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
                        <Target size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">1. Collect</h3>
                    <p className="text-slate-400">The community target is <span className="text-white font-bold">100,000 bottles</span>. Each participant contributes to this massive cleanup effort.</p>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all group relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity"><Coins size={150} /></div>
                    <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                        <TrendingUp size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">2. Convert & Hold</h3>
                    <p className="text-slate-400">Recycling revenue is converted to <span className="text-white font-bold">XRP</span> and locked in a high-yield growth pool for <span className="text-white font-bold">24 Months</span>.</p>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-green-500/50 transition-all group relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity"><Users size={150} /></div>
                    <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform">
                        <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">3. Share Profits</h3>
                    <p className="text-slate-400">After maturation, the portfolio is unlocked and profits are shared among the <span className="text-white font-bold">100 Pioneers</span> based on contribution.</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-4xl mx-auto mt-16 bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-slate-400 uppercase text-sm font-bold tracking-wider">Community Progress</p>
                        <p className="text-3xl font-black text-white">{totalBottles.toLocaleString()} / {targetBottles.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-5xl font-black text-slate-800 stroke-text">{progressPercentage.toFixed(1)}%</p>
                    </div>
                </div>
                <div className="w-full h-6 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div 
                        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 relative" 
                        style={{ width: `${progressPercentage}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>
                <p className="text-center text-slate-500 mt-4 text-sm">Updated in real-time based on verified collections.</p>
            </div>
        </div>
      </section>

      {/* GAME RULES */}
      <section id="rules" className="py-20 bg-slate-900">
         <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl mx-auto">
                <div className="flex-1 space-y-6">
                    <h2 className="text-4xl font-black text-white">GAME RULES</h2>
                    <div className="space-y-4">
                        <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white mt-1">1</div>
                            <div>
                                <h4 className="text-xl font-bold text-white">Registration Fee</h4>
                                <p className="text-slate-400">P100.00 (Cash) or 100 Bottles required to join the roster.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white mt-1">2</div>
                            <div>
                                <h4 className="text-xl font-bold text-white">Monthly Quota</h4>
                                <p className="text-slate-400">Collect minimum <span className="text-brand-secondary font-bold">250 bottles</span> per month to stay active.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white mt-1">3</div>
                            <div>
                                <h4 className="text-xl font-bold text-white">5-Month Cycles</h4>
                                <p className="text-slate-400">The challenge runs in 5-month sprints. Consistent recyclers earn bonus XRP multipliers.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 relative">
                    {/* Abstract Visualization of Rules */}
                    <div className="relative bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                         <div className="space-y-4">
                             <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                                 <span className="text-white font-bold">Status</span>
                                 <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold uppercase">Active</span>
                             </div>
                             <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                                 <span className="text-white font-bold">Rank</span>
                                 <span className="text-purple-400 font-bold">XRP Whale</span>
                             </div>
                             <div className="flex justify-between items-center">
                                 <span className="text-white font-bold">Multiplier</span>
                                 <span className="text-yellow-400 font-bold">2.5x</span>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* LEADERBOARD SECTION WITH FILTER */}
      <section id="leaderboard" className="py-20 bg-slate-950 relative">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                <div>
                    <h2 className="text-4xl font-black text-white">LEADERBOARD</h2>
                    <p className="text-slate-400">Top performers for <span className="text-brand-primary font-bold">{activeMonth} {activeYear}</span></p>
                </div>

                {/* Month & Year & Search Filter */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto bg-slate-900 p-2 rounded-xl border border-slate-800">
                    {/* Year Selector */}
                    <div className="relative">
                        <select 
                            value={activeYear}
                            onChange={(e) => setActiveYear(e.target.value)}
                            className="appearance-none bg-slate-800 text-white pl-4 pr-10 py-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-brand-primary outline-none font-bold cursor-pointer w-full sm:w-28"
                        >
                            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={16} />
                    </div>

                    {/* Month Selector */}
                    <div className="relative">
                        <select 
                            value={activeMonth}
                            onChange={(e) => setActiveMonth(e.target.value)}
                            className="appearance-none bg-slate-800 text-white pl-4 pr-10 py-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-brand-primary outline-none font-bold cursor-pointer w-full sm:w-40"
                        >
                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={16} />
                    </div>
                    
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3.5 text-slate-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find participant..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 bg-slate-800 text-white pl-10 pr-4 py-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-brand-primary outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {participantUsers
                    .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .sort((a,b) => b.totalBottles - a.totalBottles) // Mock sort, real app would filter by selected month history
                    .slice(0, 12) // Show top 12
                    .map((user, index) => (
                    <div key={user.id} className="bg-slate-900 rounded-xl border border-slate-800 p-4 hover:border-brand-primary/50 transition-all group flex items-center gap-4 relative overflow-hidden">
                        {/* Rank Badge */}
                        <div className="absolute -left-1 -top-1 w-8 h-8 bg-slate-800 border border-slate-600 rounded-br-xl flex items-center justify-center z-10 font-bold text-xs text-slate-300">
                            {index + 1}
                        </div>

                        <img src={user.avatar} className="w-16 h-16 rounded-full border-2 border-slate-700 group-hover:border-brand-primary transition-colors object-cover" alt={user.name} />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white truncate">{user.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                    getRank(user.totalBottles) === UserRank.WHALE ? 'bg-purple-900/30 text-purple-400' : 'bg-slate-800 text-slate-400'
                                }`}>
                                    {getRank(user.totalBottles)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-800">
                                <span className="text-xs text-slate-500 font-mono">{user.totalBottles.toLocaleString()} Btls</span>
                                <span className="text-xs text-green-400 font-mono font-bold">{user.totalXRP.toFixed(0)} XRP</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="text-center mt-12">
                <button onClick={onJoinClick} className="px-8 py-3 border border-slate-700 hover:border-white text-white rounded-lg transition-colors uppercase font-bold tracking-widest text-sm">
                    View All Participants
                </button>
            </div>
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="py-8 bg-slate-950 text-center border-t border-slate-900 text-slate-600 text-sm">
        <p>© 2023 xrp.co.bw. Recycling for the Future.</p>
      </footer>
    </div>
  );
};
import React, { ReactNode } from 'react';
import { Recycle, LayoutDashboard, Trophy, Users, LogIn, LogOut, User as UserIcon, Book, Radio, TrendingUp, Video, GraduationCap } from 'lucide-react';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUser: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  xrpPrices: { usd: number, bwp: number } | null;
  displayCurrency: 'USD' | 'BWP';
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange, 
  currentUser,
  onLoginClick,
  onLogoutClick,
  xrpPrices,
  displayCurrency
}) => {
  // Updated Navigation Items
  const navItems = [
    { id: 'home', label: 'Home', icon: <Recycle className="w-5 h-5" /> },
    { id: 'dashboard', label: 'My Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'participants', label: 'All Participants', icon: <Users className="w-5 h-5" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-5 h-5" /> },
    { id: 'news', label: 'News', icon: <Radio className="w-5 h-5" /> },
    { id: 'videos', label: 'Videos', icon: <Video className="w-5 h-5" /> },
    { id: 'learn', label: 'Learn Blockchain', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'kb', label: 'Knowledge Base', icon: <Book className="w-5 h-5" /> },
  ];

  const priceDisplay = xrpPrices ? (
    <div className="flex items-center gap-2 text-xs font-mono font-bold px-3 py-2 bg-slate-900/50 rounded-lg border border-slate-700 text-green-400 w-full justify-center animate-pulse">
       <TrendingUp size={12} />
       <span>XRP: {displayCurrency === 'USD' ? '$' : 'P'}{xrpPrices[displayCurrency.toLowerCase() as 'usd'|'bwp'].toFixed(4)}</span>
    </div>
  ) : (
    <div className="flex items-center gap-2 text-xs font-mono font-bold px-3 py-2 bg-slate-900/50 rounded-lg border border-slate-700 text-slate-500 w-full justify-center">
       <TrendingUp size={12} />
       <span>XRP: ...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-2 font-bold text-xl text-brand-primary">
          <Recycle /> xrp.co.bw
        </div>
        <div className="flex gap-2 items-center">
            <div className="hidden sm:block">{priceDisplay}</div>
            {currentUser ? (
                <button onClick={onLogoutClick} className="p-2 text-slate-400 hover:text-white">
                    <LogOut size={20} />
                </button>
            ) : (
                <button onClick={onLoginClick} className="p-2 text-brand-secondary font-bold text-sm">
                    Login
                </button>
            )}
        </div>
      </div>

      {/* Mobile Nav Bar (Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 flex justify-around p-2 z-50 overflow-x-auto no-scrollbar shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]">
        {navItems.slice(0, 5).map(item => (
             <button 
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center p-2 min-w-[60px] ${activeTab === item.id ? 'text-brand-secondary' : 'text-slate-500'}`}
            >
                {item.icon}
                <span className="text-[9px] mt-1">{item.label.split(' ')[0]}</span>
            </button>
        ))}
        <button 
            onClick={() => onTabChange('videos')}
            className={`flex flex-col items-center p-2 min-w-[60px] ${activeTab === 'videos' ? 'text-brand-secondary' : 'text-slate-500'}`}
        >
            <Video className="w-5 h-5" />
            <span className="text-[9px] mt-1">Videos</span>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-800 border-r border-slate-700 sticky top-0 h-screen shadow-xl z-40">
        <div className="p-6 flex flex-col gap-4 border-b border-slate-700">
            <div className="flex items-center gap-2 font-bold text-2xl text-white">
               <span className="text-brand-primary"><Recycle /></span> xrp.co.bw
            </div>
            {priceDisplay}
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-4 scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/30 shadow-inner' 
                  : 'text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
            {currentUser ? (
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <img src={currentUser.avatar} alt="User" className="w-10 h-10 rounded-full border border-slate-500" />
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate">{currentUser.name}</p>
                            <div className="flex gap-1">
                                <p className="text-[10px] text-brand-secondary uppercase tracking-wider font-bold">{currentUser.role}</p>
                                {currentUser.role === UserRole.PARTICIPANT && (
                                    <p className={`text-[10px] uppercase tracking-wider font-bold ${currentUser.registrationStatus === 'PENDING' ? 'text-amber-500' : 'text-green-500'}`}>
                                        {currentUser.registrationStatus === 'PENDING' ? '(Pending)' : ''}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={onLogoutClick}
                        className="w-full flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded transition-colors"
                    >
                        <LogOut size={14} /> Sign Out
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                            <UserIcon size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Guest</p>
                            <p className="text-xs text-slate-500">Not logged in</p>
                        </div>
                    </div>
                    <button 
                        onClick={onLoginClick}
                        className="w-full bg-brand-primary hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/30"
                    >
                        <LogIn size={16} /> Login / Join
                    </button>
                </div>
            )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto h-[calc(100vh-80px)] md:h-screen bg-slate-900 pb-20 md:pb-0 ${activeTab === 'home' ? 'p-0' : 'p-4 md:p-8'}`}>
        {children}
      </main>
    </div>
  );
};
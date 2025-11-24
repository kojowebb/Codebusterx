import React, { useState } from 'react';
import { Radio, Video, Bell, Calendar, ChevronDown } from 'lucide-react';
import { MOCK_NEWS } from '../constants';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const YEARS = ['2023', '2024'];

export const NewsFeed = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('2023');

  // Helper to get month from date string (YYYY-MM-DD)
  const getMonthFromDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return MONTHS[date.getMonth()];
  };

  const getYearFromDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getFullYear().toString();
  };

  const filteredNews = MOCK_NEWS.filter(item => {
      const matchYear = getYearFromDate(item.datePublished) === selectedYear;
      const matchMonth = selectedMonth ? getMonthFromDate(item.datePublished) === selectedMonth : true;
      return matchYear && matchMonth;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-500/20 rounded-lg"><Radio className="text-pink-400 w-8 h-8" /></div>
                <div>
                    <h2 className="text-2xl font-bold text-white">News & Updates</h2>
                    <p className="text-slate-400">Latest announcements from the Xrp.co.bw team.</p>
                </div>
            </div>

            {/* Year Selector */}
            <div className="relative">
                <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="appearance-none bg-slate-800 text-white pl-4 pr-10 py-2 rounded-lg border border-slate-700 focus:ring-2 focus:ring-pink-500 outline-none font-bold cursor-pointer text-sm"
                >
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={16} />
            </div>
        </div>

        {/* Month Navigation Bar */}
        <div className="w-full overflow-x-auto pb-2 no-scrollbar">
            <div className="flex gap-2 min-w-max">
                <button
                    onClick={() => setSelectedMonth(null)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                        selectedMonth === null 
                        ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                >
                    All {selectedYear}
                </button>
                {MONTHS.map(month => (
                    <button
                        key={month}
                        onClick={() => setSelectedMonth(month)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                            selectedMonth === month 
                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' 
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                    >
                        {month}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNews.length > 0 ? (
            filteredNews.map(item => (
                <div key={item.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex gap-4 items-start hover:border-pink-500/30 transition-colors">
                    <div className={`p-3 rounded-full ${item.type === 'Video' ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-300'}`}>
                        {item.type === 'Video' ? <Video size={20} /> : <Bell size={20} />}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold bg-slate-900 text-slate-400 px-2 py-0.5 rounded uppercase">{item.type}</span>
                                <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar size={10} /> {item.datePublished}</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                        <p className="text-slate-400 mt-2 text-sm">{item.description}</p>
                        {item.mediaUrl && (
                            <div className="mt-3">
                                <a href={item.mediaUrl} target="_blank" rel="noreferrer" className="text-pink-400 text-sm hover:underline">View Attached Media &rarr;</a>
                            </div>
                        )}
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-800 border-dashed">
                <p className="text-slate-500">No news items found for {selectedMonth ? selectedMonth : 'any month'} in {selectedYear}.</p>
            </div>
        )}
      </div>
    </div>
  );
};
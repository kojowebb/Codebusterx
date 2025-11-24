import React, { useState } from 'react';
import { User, SystemSettings } from '../types';
import { Clock, FileText, Download, TrendingUp, Recycle, AlertCircle, Sparkles, Bot } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_XRP_PRICE_BWP } from '../constants';
import { getRecyclingInsights, getXRPForecast } from '../services/geminiService';

interface ParticipantDashboardProps {
  user: User;
  settings: SystemSettings;
}

export const ParticipantDashboard: React.FC<ParticipantDashboardProps> = ({ user, settings }) => {
  const [aiInsight, setAiInsight] = useState<string>('');
  const [aiForecast, setAiForecast] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  const handleGenerateAiInsights = async () => {
    setLoadingAi(true);
    try {
        const [insight, forecast] = await Promise.all([
            getRecyclingInsights(user.totalBottles, user.totalXRP),
            getXRPForecast()
        ]);
        setAiInsight(insight);
        setAiForecast(forecast);
    } catch (e) {
        setAiInsight("Unable to generate insights at this time.");
    } finally {
        setLoadingAi(false);
    }
  };
  
  // 1. PENDING STATE
  if (user.registrationStatus === 'PENDING') {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-fade-in">
            <div className="bg-slate-800 p-8 rounded-2xl border border-amber-500/30 max-w-lg w-full shadow-2xl">
                <div className="w-16 h-16 bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-amber-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Registration Pending</h2>
                <p className="text-slate-400 mb-6">
                    Your account is currently under review. An admin needs to verify your 
                    <span className="text-amber-400 font-bold"> {user.registrationPaymentMethod} </span> 
                    payment of P{settings.registrationFeeBWP}.
                </p>
                <div className="bg-slate-900 p-4 rounded-lg text-left text-sm text-slate-300 border border-slate-700">
                    <p className="font-bold mb-2 flex items-center gap-2"><AlertCircle size={16} /> Next Steps:</p>
                    {user.registrationPaymentMethod === 'CASH' ? (
                        <ul className="list-disc list-inside space-y-1 text-slate-400">
                            <li>Ensure you sent P{settings.registrationFeeBWP} to <b>{settings.paymentPhoneNumber}</b>.</li>
                            <li>Wait for admin approval (usually 24hrs).</li>
                        </ul>
                    ) : (
                        <ul className="list-disc list-inside space-y-1 text-slate-400">
                            <li>Drop off 100 bottles at a collection point.</li>
                            <li>Tell the agent it is for "Registration Fee".</li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
  }

  // 2. ACTIVE DASHBOARD
  // Calculate Stats
  const cycleProgress = (user.bottlesThisMonth / settings.minMonthlyTarget) * 100;
  const totalValue = user.totalXRP * MOCK_XRP_PRICE_BWP;

  return (
    <div className="space-y-8 animate-fade-in">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 p-4 opacity-10"><Recycle size={60} /></div>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Cycle Month {settings.cycleMonth} / {settings.totalCycleMonths}</p>
                <h3 className="text-3xl font-bold text-white mt-2">{user.bottlesThisMonth} <span className="text-lg text-slate-500">/ {settings.minMonthlyTarget}</span></h3>
                <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{Math.round(cycleProgress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full ${cycleProgress >= 100 ? 'bg-green-500' : 'bg-brand-secondary'}`} style={{width: `${Math.min(cycleProgress, 100)}%`}}></div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 p-4 opacity-10"><TrendingUp size={60} /></div>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">XRP Portfolio</p>
                <h3 className="text-3xl font-bold text-brand-primary mt-2">{user.totalXRP.toFixed(2)} XRP</h3>
                <p className="text-green-400 text-sm mt-1 font-bold flex items-center gap-1">
                    ≈ P {totalValue.toFixed(2)}
                </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Lifetime Bottles</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{user.totalBottles.toLocaleString()}</h3>
                </div>
                <div className="h-16 w-16 bg-brand-secondary/20 rounded-full flex items-center justify-center text-brand-secondary">
                    <Recycle size={32} />
                </div>
            </div>
        </div>

        {/* AI INSIGHTS SECTION - NEW */}
        <div className="bg-gradient-to-r from-slate-800 to-indigo-900/30 p-6 rounded-xl border border-indigo-500/30 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-20 text-indigo-400"><Bot size={80} /></div>
             <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="text-indigo-400" /> Gemini AI Analyst
             </h3>
             
             {!aiInsight && !loadingAi && (
                <div className="flex flex-col items-start gap-4">
                    <p className="text-slate-300 max-w-xl">
                        Unlock personalized environmental impact reports and crypto market forecasts powered by Google's Gemini 2.5 AI model.
                    </p>
                    <button 
                        onClick={handleGenerateAiInsights}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                    >
                        <Sparkles size={16} /> Generate AI Report
                    </button>
                </div>
             )}

             {loadingAi && (
                 <div className="flex items-center gap-3 text-indigo-300 animate-pulse">
                    <Sparkles size={20} className="animate-spin" />
                    <span className="font-mono">Processing recycling data & market trends...</span>
                 </div>
             )}

             {aiInsight && !loadingAi && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div className="bg-slate-900/60 p-5 rounded-lg border border-slate-700">
                        <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2">Environmental Impact</h4>
                        <p className="text-slate-200 text-sm leading-relaxed">{aiInsight}</p>
                    </div>
                    <div className="bg-slate-900/60 p-5 rounded-lg border border-slate-700">
                        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Market Forecast</h4>
                        <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">{aiForecast}</p>
                    </div>
                </div>
             )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Collection History / Receipts */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <FileText size={20} className="text-cyan-400" /> My Receipts
                    </h3>
                </div>
                <div className="overflow-y-auto max-h-[400px]">
                    {user.collectionRecords && user.collectionRecords.length > 0 ? (
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-900/50 text-slate-400">
                                <tr>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Verified By</th>
                                    <th className="p-4 text-right">Bottles</th>
                                    <th className="p-4 text-right">Value</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {user.collectionRecords.map(rec => (
                                    <tr key={rec.id} className="hover:bg-slate-700/30">
                                        <td className="p-4 text-slate-300">{rec.date}</td>
                                        <td className="p-4 text-slate-400">{rec.verifiedBy}</td>
                                        <td className="p-4 text-right font-bold text-white">{rec.amount}</td>
                                        <td className="p-4 text-right text-green-400">P {rec.valueBWP.toFixed(2)}</td>
                                        <td className="p-4 text-center">
                                            <button className="text-cyan-400 hover:text-cyan-300 p-1">
                                                <Download size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-8 text-center text-slate-500">No collection records found yet.</div>
                    )}
                </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                <h3 className="font-bold text-white mb-6">Projected Growth (24 Months)</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[{month: 'Start', val: 0}, ...user.history.map((h, i) => ({month: h.month, val: h.xrpEarned * (i+1)}))]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} />
                            <YAxis stroke="#94a3b8" fontSize={10} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                            <Line type="monotone" dataKey="val" stroke="#2563eb" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700 flex items-start gap-3">
                    <Lock className="text-slate-500 mt-1" size={16} />
                    <div>
                        <p className="text-xs font-bold text-slate-300 uppercase">Lock Period Active</p>
                        <p className="text-xs text-slate-500">Assets are locked for growth for 24 months. Unlock options available in Sep 2025.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
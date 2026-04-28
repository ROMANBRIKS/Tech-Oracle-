import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  ShieldAlert, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  BarChart, 
  Eye,
  Filter,
  Download,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analytics, TimeframeStats, AnalyticsMetrics } from '../services/analyticsService';
import { cn } from '../lib/utils';

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'reports'>('metrics');
  const [timeframe, setTimeframe] = useState<keyof TimeframeStats>('day');
  const stats = analytics.getAdminStats();
  
  const currentMetrics = stats[timeframe];

  // Mock reports for now
  const reports = [
    { id: '1', type: 'Missing Data', content: 'Seeking accurate PPD indices for South Asia nodes.', status: 'pending', date: '2026-04-27' },
    { id: '2', type: 'Correction', content: 'Trust index for e-04 pipeline seems high.', status: 'reviewed', date: '2026-04-26' },
    { id: '3', type: 'Feature Request', content: 'Requesting API access for institutional research.', status: 'pending', date: '2026-04-25' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 border-b oracle-border pb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-oracle-blue"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold uppercase tracking-[0.3em] font-mono">
                Institutional_Access_Portal <span className="text-oracle-blue text-sm ml-2">[ADMIN_01]</span>
              </h1>
              <p className="text-[10px] text-white/30 uppercase mt-1">Level 4 Clearance - Authorized Access Only</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex bg-white/5 p-1 oracle-border rounded">
                <button 
                  onClick={() => setActiveTab('metrics')}
                  className={cn(
                    "px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest transition-all",
                    activeTab === 'metrics' ? "bg-oracle-blue text-black" : "text-white/40 hover:text-white"
                  )}
                >
                  Metrics
                </button>
                <button 
                  onClick={() => setActiveTab('reports')}
                  className={cn(
                    "px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest transition-all",
                    activeTab === 'reports' ? "bg-oracle-blue text-black" : "text-white/40 hover:text-white"
                  )}
                >
                  Reports
                </button>
             </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'metrics' ? (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Metric Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 size={18} className="text-oracle-blue" />
                  <h2 className="text-sm font-bold uppercase tracking-widest">Traffic_Distribution</h2>
                </div>
                
                <div className="flex items-center gap-2">
                  {(['hour', 'day', 'week', 'month', 'year'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeframe(t)}
                      className={cn(
                        "px-3 py-1 text-[9px] font-mono uppercase border transition-all",
                        timeframe === t 
                          ? "border-oracle-blue text-oracle-blue bg-oracle-blue/10" 
                          : "border-white/10 text-white/30 hover:border-white/20"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Level Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Organic_Views', value: currentMetrics.organic, icon: Users, color: 'text-oracle-lime', desc: 'Real user interactions' },
                  { label: 'Generated_Views', value: currentMetrics.generated, icon: Eye, color: 'text-oracle-blue', desc: 'Fabricated system traffic' },
                  { label: 'Aggregate_Reach', value: currentMetrics.organic + currentMetrics.generated, icon: TrendingUp, color: 'text-white', desc: 'Combined global indexing' },
                ].map((card, i) => (
                  <div key={i} className="oracle-card p-6 relative group overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <div className={cn("p-2 bg-white/5 rounded", card.color.replace('text-', 'bg-').split(' ')[0] + '/10')}>
                         <card.icon size={18} className={card.color} />
                      </div>
                      <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">STABLE_FEED</div>
                    </div>
                    <div className="text-3xl font-mono mb-1 tabular-nums">
                      {card.value.toLocaleString()}
                    </div>
                    <div className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em]">
                      {card.label}
                    </div>
                    <div className="text-[8px] text-white/20 italic mt-2">
                      {card.desc}
                    </div>
                    
                    {/* Decorative graph line mock */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                       <div 
                         className={cn("h-full transition-all duration-1000", card.color.replace('text-', 'bg-'))} 
                         style={{ width: `${Math.min(100, (card.value / 10000) * 100)}%` }} 
                       />
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Visualization Mock */}
              <div className="oracle-card p-8 aspect-[21/9] flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px]" />
                 <div className="text-center z-10">
                   <BarChart size={32} className="text-oracle-blue/20 mx-auto mb-4" />
                   <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">Real_Time_Network_Graph_Standby</div>
                   <div className="text-[8px] text-white/10 mt-2 italic">[Connecting to Eurasia-West-03 Pipeline]</div>
                 </div>
                 
                 {/* Decorative chart elements */}
                 <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between h-32 opacity-20 group">
                    {[40, 70, 45, 90, 65, 30, 85, 55, 75, 40].map((h, i) => (
                      <div 
                        key={i} 
                        className="w-8 bg-oracle-blue/50 hover:bg-oracle-blue transition-all" 
                        style={{ height: `${h}%` }}
                      >
                         <div className="w-full h-1 bg-oracle-blue animate-pulse" />
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={18} className="text-oracle-blue" />
                  <h2 className="text-sm font-bold uppercase tracking-widest">Inbound_Intelligence_Reports</h2>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:bg-white/5 transition-colors text-[9px] uppercase font-bold tracking-widest">
                  <Filter size={12} /> Filter_Queue
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {reports.map((report) => (
                  <div key={report.id} className="oracle-card p-5 group flex items-start gap-6 hover:border-oracle-blue/30 transition-colors">
                    <div className="shrink-0">
                      {report.type === 'Correction' ? (
                        <div className="p-2 bg-red-500/10 rounded">
                           <AlertTriangle size={18} className="text-red-500" />
                        </div>
                      ) : (
                        <div className="p-2 bg-oracle-blue/10 rounded">
                           <MessageSquare size={18} className="text-oracle-blue" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{report.type}</span>
                        <span className="text-[8px] font-mono text-white/30">{report.date}</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed max-w-2xl">{report.content}</p>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-3">
                      <span className={cn(
                        "text-[8px] font-mono px-2 py-0.5 rounded-full uppercase font-bold",
                        report.status === 'pending' ? "bg-yellow-500/10 text-yellow-500" : "bg-oracle-lime/10 text-oracle-lime"
                      )}>
                        {report.status}
                      </span>
                      <button className="text-[9px] text-oracle-blue uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                         Initialize_Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                 <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em] mb-4">End_Of_Queue</div>
                 <button className="px-6 py-2 border border-white/10 text-[10px] uppercase tracking-widest hover:border-oracle-blue transition-colors">
                    Fetch_Older_Archives
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Ambience */}
      <div className="fixed inset-0 scanline-mask opacity-[0.03] pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-oracle-blue/20 to-transparent blur-sm" />
    </div>
  );
};

const TrendingUp = (props: any) => (
  <svg 
    {...props} 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

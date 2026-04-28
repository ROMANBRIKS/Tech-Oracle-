import React, { useEffect, useState } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { analytics, AnalyticsMetrics } from '../services/analyticsService';
import { cn } from '../lib/utils';

interface PageViewCounterProps {
  pageId: string;
  className?: string;
}

export const PageViewCounter: React.FC<PageViewCounterProps> = ({ pageId, className }) => {
  const [metrics, setMetrics] = useState<AnalyticsMetrics>({ organic: 0, generated: 0, total: 0 });

  useEffect(() => {
    // Track the view on mount
    analytics.trackView(pageId);
    
    // Get initial metrics
    setMetrics(analytics.getPageMetrics(pageId));

    // Refresh every minute to show "swinging" numbers if we had real-time
    const interval = setInterval(() => {
      setMetrics(analytics.getPageMetrics(pageId));
    }, 60000);

    return () => clearInterval(interval);
  }, [pageId]);

  return (
    <div className={cn(
      "inline-flex items-center gap-4 px-3 py-1.5 bg-black/40 border border-white/5 rounded-full overflow-hidden relative group",
      className
    )}>
       {/* Pulse indicator */}
      <div className="w-1 h-1 rounded-full bg-oracle-blue animate-pulse absolute left-3 top-1/2 -translate-y-1/2" />
      
      <div className="flex items-center gap-2 pl-4">
        <Users size={12} className="text-oracle-blue/60" />
        <span className="text-[10px] font-mono text-white/50 uppercase tracking-tighter">
          Intelligence_Access_Today:
        </span>
        <span className="text-[11px] font-mono font-bold text-oracle-blue">
          {metrics.total.toLocaleString()}
        </span>
      </div>

      <div className="h-3 w-px bg-white/10" />

      <div className="flex items-center gap-1.5">
        <TrendingUp size={10} className="text-oracle-lime/60" />
        <span className="text-[9px] font-mono text-white/30 uppercase">
          Live_Indexing
        </span>
      </div>

      {/* Decorative scanline */}
      <div className="absolute inset-0 scanline-mask opacity-[0.05] pointer-events-none" />
    </div>
  );
};

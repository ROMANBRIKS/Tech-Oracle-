import React from 'react';
import { cn } from '../lib/utils';
import { ExternalLink } from 'lucide-react';

interface AdSpaceProps {
  type: 'sidebar' | 'banner' | 'inline';
  className?: string;
  label?: string;
}

export const AdSpace: React.FC<AdSpaceProps> = ({ type, className, label = "Partner Intelligence" }) => {
  return (
    <div className={cn(
      "relative overflow-hidden oracle-border bg-black/40 group",
      type === 'sidebar' && "aspect-[4/5] w-full",
      type === 'banner' && "w-full h-24 md:h-32 mb-8",
      type === 'inline' && "w-full aspect-video md:aspect-[21/9] my-10",
      className
    )}>
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Content Placeholder */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 border border-white/5 m-1">
        <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] mb-3 absolute top-3 left-4">
          {label} [REF_EXT_09]
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full border border-oracle-blue/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <ExternalLink size={14} className="text-oracle-blue/50" />
          </div>
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
            External_Entity_Promotion
          </div>
          <div className="text-[8px] font-mono text-white/20 mt-1 uppercase italic">
            Connecting to Sponsored Nodes...
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 px-4 py-1.5 border border-white/10 hover:border-oracle-blue/40 transition-colors cursor-pointer">
           <span className="text-[9px] font-bold text-white/30 uppercase tracking-tighter">Initialize_Session</span>
        </div>
      </div>

      {/* Scanline Mask */}
      <div className="absolute inset-0 scanline-mask opacity-[0.03] pointer-events-none" />
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PILLARS, Pillar } from '../constants/pillars';
import { 
  BookOpen, 
  ChevronRight, 
  Search, 
  ArrowLeft,
  Share2,
  Clock,
  ShieldCheck,
  FileText,
  Zap
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { AdSpace } from './AdSpace';
import { TestimonialSection } from './TestimonialSection';
import { PageViewCounter } from './PageViewCounter';

interface IntelligenceBankProps {
  onBack: () => void;
  selectedPillarId?: string;
}

export const IntelligenceBank: React.FC<IntelligenceBankProps> = ({ onBack, selectedPillarId }) => {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(
    PILLARS.find(p => p.id === selectedPillarId) || null
  );
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPillars = PILLARS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.dossier?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-oracle-bg p-4 lg:p-8">
      <AnimatePresence mode="wait">
        {!selectedPillar ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex-1 flex flex-col space-y-8 max-w-6xl mx-auto w-full"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white uppercase tracking-tighter flex items-center gap-3">
                  <BookOpen className="text-oracle-blue" />
                  The Intelligence Bank
                </h2>
                <p className="text-white/40 text-xs mt-1 uppercase tracking-widest font-mono">
                  Verified Knowledge Dossiers // v2.6 Ready
                </p>
              </div>

              <div className="flex justify-center mb-8">
                <PageViewCounter pageId="intelligence-bank-main" />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <AdSpace type="banner" className="h-14 md:h-16 mb-0 min-w-[300px]" label="Research_Inbound" />
                <div className="relative w-full sm:w-72">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                <input 
                  type="text" 
                  placeholder="Search knowledge base..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border oracle-border-subtle rounded-sm py-2 pl-10 pr-4 text-xs text-white outline-none focus:border-oracle-blue/40 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPillars.map((pillar) => (
                <motion.button
                  key={pillar.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedPillar(pillar)}
                  className="oracle-card p-6 text-left group border-oracle-blue/10 hover:border-oracle-blue/40 transition-all bg-white/2"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn("p-2 rounded bg-white/5", pillar.color)}>
                      <pillar.icon size={18} />
                    </div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                      {pillar.title}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-oracle-blue transition-colors leading-tight">
                    {pillar.dossier?.title || pillar.title}
                  </h3>
                  <p className="text-white/30 text-xs leading-relaxed mb-6 line-clamp-3 italic">
                    {pillar.dossier?.summary || pillar.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t oracle-border-subtle">
                    <span className="text-[8px] font-mono text-white/20 uppercase">Intelligence Level: High</span>
                    <ChevronRight size={14} className="text-white/20 group-hover:text-oracle-blue transition-all group-hover:translate-x-1" />
                  </div>
                </motion.button>
              ))}

              {/* Inline Ad in Grid */}
              <AdSpace type="sidebar" className="h-full" label="Vault_Direct_Offer" />
            </div>

            {/* Localized Testimonials */}
            <TestimonialSection className="mt-12" />

            {/* Global Q&A Vault Section */}
            <div className="mt-12 pt-12 border-t oracle-border-subtle">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter flex items-center gap-3">
                  <ShieldCheck className="text-oracle-lime" />
                  Technical Q&A Vault
                </h3>
                <span className="text-[8px] font-mono text-white/20 uppercase">Indexed Entities: {filteredPillars.reduce((acc, p) => acc + (p.questionsAndAnswers?.length || 0), 0)}</span>
              </div>
              <div className="space-y-12 pb-20">
                {filteredPillars.map(pillar => pillar.questionsAndAnswers && (
                  <div key={pillar.id} className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-1.5 rounded bg-white/5", pillar.color)}>
                        <pillar.icon size={14} />
                      </div>
                      <h4 className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">{pillar.title} [Dossier_QA_{pillar.id.substring(0,3).toUpperCase()}]</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pillar.questionsAndAnswers.map((qa, idx) => (
                        <div key={idx} className="p-5 bg-white/2 border oracle-border-subtle rounded-sm hover:border-oracle-blue/30 transition-colors group">
                           <h5 className="text-[11px] lg:text-xs font-bold text-white/80 mb-3 group-hover:text-oracle-blue transition-colors">Q: {qa.question}</h5>
                           <p className="text-[10px] lg:text-[11px] text-white/40 leading-relaxed italic">A: {qa.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="article"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-1 flex flex-col max-w-4xl mx-auto w-full bg-oracle-bg-lighter border oracle-border shadow-2xl relative overflow-hidden"
          >
            {/* Dossier Banner Area */}
            <div className="relative h-48 lg:h-64 overflow-hidden border-b oracle-border shrink-0 grayscale hover:grayscale-0 transition-all duration-700 bg-black">
              {/* Background Thematic Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=1600')`, // Fallback base
                }}
              />
              
              {/* Dynamic Overlay Gradient */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-60",
                selectedPillar.id === 'ai-automation' ? "from-oracle-blue/40 to-transparent" :
                selectedPillar.id === 'hardware-longevity' ? "from-orange-500/30 to-transparent" :
                selectedPillar.id === 'privacy-security' ? "from-red-500/30 to-transparent" :
                selectedPillar.id === 'dev-infrastructure' ? "from-purple-500/30 to-transparent" :
                "from-emerald-500/30 to-transparent"
              )} />

              {/* Central Thematic Element */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-[120px] lg:text-[200px] font-black text-white/[0.03] select-none tracking-tighter">
                  {selectedPillar.thematicElement}
                </div>
              </div>

              {/* Scanline Effect */}
              <div className="absolute inset-0 scanline-mask opacity-10" />
              
              <div className="absolute bottom-6 left-6 lg:left-10 flex items-center gap-4">
                 <div className="w-12 h-px bg-oracle-lime" />
                 <span className="text-[10px] font-mono text-oracle-lime uppercase tracking-[0.3em] font-bold">
                   Visualizing Segment // {selectedPillar.id}
                 </span>
              </div>

              <div className="absolute top-6 right-6 lg:right-10 flex flex-col items-end opacity-20">
                 <Zap className="text-white mb-2" size={32} />
                 <div className="text-[10px] font-mono text-white text-right leading-tight">
                   LATENCY_AUDIT: OK<br/>
                   BUFFER_SYNC: VERIFIED
                 </div>
              </div>
            </div>

            {/* Dossier Header */}
            <div className="p-6 lg:p-10 border-b oracle-border sticky top-0 bg-oracle-bg-lighter/80 backdrop-blur-md z-10">
              <button 
                onClick={() => setSelectedPillar(null)}
                className="flex items-center gap-2 text-[9px] text-white/40 hover:text-oracle-blue transition-colors uppercase tracking-[0.2em] font-bold mb-8"
              >
                <ArrowLeft size={12} /> Return to Vault
              </button>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded bg-white/5", selectedPillar.color)}>
                      <selectedPillar.icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-oracle-blue uppercase tracking-[0.3em]">
                      Dossier: {selectedPillar.title}
                    </span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight uppercase italic tracking-tighter">
                    {selectedPillar.dossier?.title}
                  </h1>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                     <div className="text-[8px] text-white/20 uppercase font-mono mb-1">Last Re-Index</div>
                     <div className="text-[10px] text-white font-mono">{new Date().toLocaleDateString()}</div>
                  </div>
                  <button 
                     onClick={() => {
                       navigator.clipboard.writeText(`Dossier: ${selectedPillar.dossier?.title} - Verified by Global Tech Intelligence Oracle`);
                       alert('Dossier Link Copied to Clipboard');
                     }}
                     className="p-3 bg-white/5 border oracle-border-subtle text-white/40 hover:text-oracle-blue hover:border-oracle-blue/40 transition-all rounded-sm"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Dossier Content */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-10 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="md:col-span-2 space-y-12">
                   <div className="prose prose-invert max-w-none prose-p:text-white/60 prose-p:leading-relaxed prose-headings:text-white prose-headings:uppercase prose-headings:tracking-tighter prose-strong:text-oracle-lime">
                     <ReactMarkdown>{selectedPillar.dossier?.content || ''}</ReactMarkdown>
                   </div>

                   {/* Embedded Q&A for this Dossier */}
                   {selectedPillar.questionsAndAnswers && (
                     <div className="pt-12 border-t oracle-border-subtle">
                       <h4 className="text-lg font-bold text-white uppercase tracking-tighter mb-6">Subject Interrogations [Loop_Verification]</h4>
                       <div className="space-y-4">
                         {selectedPillar.questionsAndAnswers.map((qa, idx) => (
                           <div key={idx} className="p-6 bg-white/2 border oracle-border-subtle rounded-sm hover:border-oracle-blue/20 transition-all">
                             <div className="text-[9px] text-oracle-blue font-bold uppercase tracking-[0.2em] mb-2 font-mono flex items-center gap-2">
                               <div className="w-1 h-1 bg-oracle-blue rounded-full" /> QUERY_{String(idx + 1).padStart(2, '0')}
                             </div>
                             <h5 className="text-sm font-bold text-white mb-3">{qa.question}</h5>
                             <div className="text-xs text-white/50 leading-relaxed italic pl-4 border-l oracle-border font-serif">
                               {qa.answer}
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>

                 <aside className="space-y-6">
                    <div className="p-5 bg-black/40 border-l-2 border-oracle-blue rounded-sm space-y-4">
                       <h4 className="text-[10px] font-bold text-oracle-blue uppercase tracking-widest flex items-center gap-2">
                         <ShieldCheck size={14} /> Verification Status
                       </h4>
                       <div className="space-y-3">
                          <div className="flex justify-between items-center">
                             <span className="text-[9px] text-white/40 uppercase">Entity Integrity</span>
                             <span className="text-[9px] text-oracle-lime font-bold">100% Verified</span>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-[9px] text-white/40 uppercase">Citation Count</span>
                             <span className="text-[9px] text-white/80">4,292 High-Value</span>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-[9px] text-white/40 uppercase">GEO Density</span>
                             <span className="text-[9px] text-white/80">0.94 Alpha</span>
                          </div>
                       </div>
                    </div>

                    <div className="p-5 bg-white/2 border oracle-border-subtle rounded-sm space-y-4">
                       <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                         <Clock size={14} /> Intelligence Context
                       </h4>
                       <p className="text-[10px] text-white/30 italic leading-snug">
                         This article is cached in the Global Intelligence Loop and is synchronized across all verified technical nodes.
                       </p>
                    </div>
                 </aside>
              </div>

              <AdSpace type="banner" className="mt-12 px-6" label="Global_Knowledge_Network" />

              {/* Bottom Institutional Seal */}
              <div className="mt-12 pt-8 border-t oracle-border-subtle flex items-center justify-center gap-8 grayscale opacity-20">
                 <div className="flex items-center gap-3">
                    <FileText size={20} className="text-white" />
                    <div className="text-[9px] font-mono text-white tracking-[0.2em] font-bold">INTEL_AUTH_BUREAU</div>
                 </div>
                 <div className="w-1.5 h-1.5 rounded-full bg-oracle-lime" />
                 <div className="text-[9px] font-mono text-white tracking-[0.2em] font-bold underline">ISO_TC_307_PROTO</div>
              </div>

              {/* Page-Aware Testimonial */}
              <TestimonialSection pillarId={selectedPillar.id} className="mt-12 pt-8 border-t oracle-border-subtle" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

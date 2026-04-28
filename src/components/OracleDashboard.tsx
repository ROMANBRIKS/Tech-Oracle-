import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PILLARS } from '../constants/pillars';
import { askOracle } from '../services/gemini';
import { cn } from '../lib/utils';
import { IntelligenceBank } from './IntelligenceBank';
import { AdSpace } from './AdSpace';
import { TestimonialSection } from './TestimonialSection';
import { PageViewCounter } from './PageViewCounter';
import { 
  Loader2, 
  Terminal, 
  Search, 
  ChevronRight, 
  Activity, 
  ShieldCheck, 
  Database, 
  History,
  Lock,
  Globe2,
  Zap,
  Cpu,
  Layers,
  ShieldAlert,
  Menu,
  X,
  Maximize2,
  Minimize2,
  FileBadge,
  CheckCircle2,
  AlertCircle,
  ClipboardList,
  Share2,
  BookOpen
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function OracleDashboard() {
  const [selectedPillar, setSelectedPillar] = useState(PILLARS[0]);
  const [query, setQuery] = useState('');
  const [auditResult, setAuditResult] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeView, setActiveView] = useState<'audit' | 'bank'>('audit');
  const [history, setHistory] = useState<{pillar: string, query: string, timestamp: string}[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAudit = async () => {
    if (!query.trim()) return;
    
    setIsAuditing(true);
    setAuditResult(null);
    try {
      const response = await askOracle(selectedPillar.title, query);
      setAuditResult(response);
      setHistory(prev => [{
        pillar: selectedPillar.title,
        query: query.substring(0, 50) + (query.length > 50 ? '...' : ''),
        timestamp: new Date().toLocaleTimeString()
      }, ...prev].slice(0, 5));
    } catch (error) {
      setAuditResult("CRITICAL ERROR: Data link severed. Re-attempting connection to Oracle Nodes...");
    } finally {
      setIsAuditing(false);
    }
  };

  useEffect(() => {
    if (auditResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    // 12% Gap: GEO Schema Engine (JSON-LD) for Search Engine citation
    if (auditResult) {
      const existingSchema = document.getElementById('oracle-json-ld');
      if (existingSchema) existingSchema.remove();

      const script = document.createElement('script');
      script.id = 'oracle-json-ld';
      script.type = 'application/ld+json';
      
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": `${selectedPillar.title} Audit Report`,
        "description": auditResult.substring(0, 160).replace(/#/g, ''),
        "author": {
          "@type": "Organization",
          "name": "Global Tech Intelligence Mega-Oracle"
        },
        "genre": "Technical Audit",
        "keywords": selectedPillar.id,
        "datePublished": new Date().toISOString()
      };

      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }
  }, [auditResult, selectedPillar]);

  return (
    <div className="w-full min-h-screen bg-oracle-bg text-oracle-text font-sans flex flex-col">
      {/* Top Navigation / Status Rail */}
      <nav className="h-16 lg:h-20 oracle-border border-b flex items-center justify-between px-4 lg:px-6 bg-oracle-bg-lighter z-50 shrink-0">
        <div className="flex items-center space-x-3 lg:space-x-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 lg:hidden text-oracle-blue hover:bg-white/5 rounded transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="w-7 h-7 lg:w-8 lg:h-8 border-2 border-oracle-blue flex items-center justify-center font-bold text-[10px] lg:text-xs shrink-0">O.</div>
          <div className="flex flex-col">
            <h1 className="uppercase tracking-[0.1em] lg:tracking-[0.2em] font-semibold text-[9px] sm:text-[10px] lg:text-sm leading-tight truncate">Global Tech Intelligence Mega-Oracle</h1>
            <div className="flex gap-2 sm:gap-4 mt-1">
              <button 
                onClick={() => setActiveView('audit')}
                className={cn(
                  "text-[8px] uppercase tracking-widest font-bold transition-all px-2.5 py-1.5 border rounded-[2px]",
                  activeView === 'audit' ? "text-oracle-blue border-oracle-blue/30 bg-oracle-blue/5" : "text-white/20 border-transparent hover:text-white/40"
                )}
              >
                [ Oracle Engine ]
              </button>
              <button 
                onClick={() => setActiveView('bank')}
                className={cn(
                  "text-[8px] uppercase tracking-widest font-bold transition-all px-2.5 py-1.5 border rounded-[2px]",
                  activeView === 'bank' ? "text-oracle-blue border-oracle-blue/30 bg-oracle-blue/5" : "text-white/20 border-transparent hover:text-white/40"
                )}
              >
                [ Intelligence Bank ]
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 lg:space-x-6 text-[9px] lg:text-[10px] uppercase tracking-widest text-white/40 font-mono">
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-oracle-lime rounded-full mr-2 shadow-[0_0_8px_rgba(163,255,0,0.5)]"></span>
            <span className="hidden xs:inline">System: </span>Nominal
          </span>
          <span className="hidden sm:inline">NIST-800-53</span>
          <span className="hidden xl:inline">v2.026_CORE</span>
        </div>
      </nav>

      {/* Pillar Switcher: Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[45] lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-oracle-bg z-[50] border-r oracle-border flex flex-col lg:hidden"
            >
              <div className="p-6 border-b oracle-border flex items-center justify-between">
                <div className="text-[10px] text-oracle-blue uppercase font-bold tracking-widest italic">Engine Pillars</div>
                <button onClick={() => setIsMenuOpen(false)} className="text-white/40"><X size={18}/></button>
              </div>
              <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                {PILLARS.map((pillar, idx) => (
                  <button
                    key={pillar.id}
                    onClick={() => {
                      setSelectedPillar(pillar);
                      setAuditResult(null);
                      setQuery('');
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "w-full text-left p-6 transition-all relative border-b oracle-border-subtle last:border-b-0",
                      selectedPillar.id === pillar.id ? "bg-white/5" : "hover:bg-white/[0.02]"
                    )}
                  >
                    <div className="text-[9px] text-white/30 uppercase mb-1">0{idx + 1}</div>
                    <div className="flex items-center gap-3">
                      <pillar.icon size={16} className={selectedPillar.id === pillar.id ? "text-oracle-blue" : "text-white/20"} />
                      <h3 className={cn("text-sm font-semibold", selectedPillar.id === pillar.id ? "text-white" : "text-white/60")}>{pillar.title}</h3>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-6 border-t oracle-border font-mono text-[9px] text-white/20">
                PROT_HANDSHAKE: OK
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Navigation Bar (Only visible on large screens) */}
      <AnimatePresence mode="wait">
        {activeView === 'audit' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="hidden lg:block bg-oracle-bg-darker border-b oracle-border z-40 shrink-0"
          >
            <div className="flex items-center min-w-max px-2 lg:px-6">
              {PILLARS.map((pillar, idx) => {
                const isActive = selectedPillar.id === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => {
                      setSelectedPillar(pillar);
                      setAuditResult(null);
                      setQuery('');
                    }}
                    className={cn(
                      "relative px-4 lg:px-8 py-4 flex flex-col items-center gap-1 transition-all group border-r oracle-border-subtle last:border-r-0",
                      isActive ? "bg-white/5" : "hover:bg-white/[0.02]"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <pillar.icon size={14} className={isActive ? "text-oracle-blue" : "text-white/20"} />
                      <span className={cn(
                        "text-[10px] lg:text-[11px] font-bold uppercase tracking-widest",
                        isActive ? "text-white" : "text-white/40 group-hover:text-white/60"
                      )}>
                        {pillar.title.replace(' Oracle', '')}
                      </span>
                    </div>
                    <div className="text-[8px] text-white/20 font-mono tracking-tighter uppercase whitespace-nowrap">Page_Seq_{String(idx + 1).padStart(2, '0')}</div>
                    
                    {isActive && (
                      <motion.div 
                        layoutId="nav-glow"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-oracle-blue shadow-[0_-2px_10px_rgba(0,209,255,0.5)]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Engine Banner Area (Dynamic Page Awareness) */}
      <AnimatePresence mode="wait">
        {activeView === 'audit' && (
          <motion.div 
            key={`banner-${selectedPillar.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isExpanded ? 120 : 160, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full relative overflow-hidden border-b oracle-border shrink-0 group"
          >
            {/* Base Thematic Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105 group-hover:scale-100"
              style={{ 
                backgroundImage: `url(${
                  selectedPillar.id === 'ai-automation' ? 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600' :
                  selectedPillar.id === 'hardware-longevity' ? 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600' :
                  selectedPillar.id === 'privacy-security' ? 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600' :
                  selectedPillar.id === 'dev-infrastructure' ? 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1600' :
                  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600'
                })`,
              }}
            />
            
            {/* Pillar-Specific Overlay */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-r transition-colors duration-700",
              selectedPillar.id === 'ai-automation' ? "from-black/90 via-oracle-blue/10 to-transparent" :
              selectedPillar.id === 'hardware-longevity' ? "from-black/90 via-orange-500/10 to-transparent" :
              selectedPillar.id === 'privacy-security' ? "from-black/90 via-red-500/10 to-transparent" :
              selectedPillar.id === 'dev-infrastructure' ? "from-black/90 via-purple-500/10 to-transparent" :
              "from-black/90 via-emerald-500/10 to-transparent"
            )} />
            
            {/* Thematic Code Tagging */}
            <div className="absolute inset-0 flex items-center justify-center p-4 lg:p-8 select-none pointer-events-none">
              <div className="flex flex-col items-center">
                 <div className="text-[8px] lg:text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] lg:tracking-[0.8em] mb-2 lg:mb-4">Segment_Visual_Verification</div>
                 <div className="text-[40px] md:text-[70px] lg:text-[100px] font-black text-white/[0.04] tracking-tighter uppercase leading-none italic text-center">
                   {selectedPillar.thematicElement}
                 </div>
              </div>
            </div>

            <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-8 flex items-center gap-2 lg:gap-4">
               <div className={cn("w-8 lg:w-12 h-0.5", 
                 selectedPillar.id === 'ai-automation' ? "bg-oracle-blue" :
                 selectedPillar.id === 'hardware-longevity' ? "bg-orange-500" :
                 selectedPillar.id === 'privacy-security' ? "bg-red-500" :
                 selectedPillar.id === 'dev-infrastructure' ? "bg-purple-500" :
                 "bg-oracle-lime"
               )} />
               <div className="flex flex-col">
                 <span className="text-[9px] lg:text-[11px] font-bold text-white uppercase tracking-[0.2em] lg:tracking-[0.3em] font-mono">
                   ORACLE_ENGINE // {selectedPillar.title.replace(' Oracle', '')}
                 </span>
                 <span className="text-[7px] lg:text-[8px] text-white/30 uppercase tracking-widest mt-0.5">
                   NODE_{selectedPillar.id.substring(0,3).toUpperCase()}_SRV_2026
                 </span>
               </div>
            </div>
            
            <div className="absolute top-4 lg:top-6 right-4 lg:right-8 text-right bg-black/60 backdrop-blur-sm p-2 lg:p-3 border oracle-border-subtle rounded-sm">
               <div className="text-[8px] lg:text-[10px] font-mono text-oracle-lime flex items-center justify-end gap-2">
                 <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-oracle-lime animate-pulse" />
                 CORE_INTEGRITY: 0.94
               </div>
               <div className="text-[7px] lg:text-[8px] font-mono text-white/40 uppercase tracking-widest mt-0.5 hidden xs:block">Institutional_Peer_Verified</div>
            </div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 scanline-mask opacity-5 py-4 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative bg-white/5">
        <AnimatePresence mode="wait">
          {activeView === 'audit' ? (
            <motion.div 
              key="audit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col lg:grid lg:grid-cols-12 lg:gap-px overflow-hidden"
            >
              {/* Left Side Stats (Desktop Only) */}
              <aside className="hidden xl:flex xl:col-span-2 bg-oracle-bg flex-col border-r oracle-border-subtle p-6 space-y-8 h-full overflow-y-auto">
          <div className="space-y-4">
            <h3 className="oracle-pill text-oracle-blue/40 uppercase tracking-widest text-[10px]">Protocol Metrics</h3>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 border oracle-border-subtle rounded-sm">
                <p className="text-[9px] text-white/30 uppercase mb-1">Audit Depth</p>
                <div className="text-sm font-mono text-oracle-lime tracking-tight">CRYPTO_FULL</div>
              </div>
              <div className="p-3 bg-white/5 border oracle-border-subtle rounded-sm">
                <p className="text-[9px] text-white/30 uppercase mb-1">Citation Integrity</p>
                <div className="text-sm font-mono text-oracle-blue tracking-tight">HIGH (0.94)</div>
              </div>
              
              {/* Sidebar Ad Space */}
              <AdSpace type="sidebar" className="mt-8" label="Core_Partner_AD" />
            </div>
          </div>
          
          <div className="mt-8 p-4 border oracle-border-subtle bg-black/40 rounded text-[9px] font-mono leading-relaxed text-white/20 italic">
            SEC_AUTH: VERIFIED<br/>
            TOKEN: {Math.random().toString(36).substring(7).toUpperCase()}<br/>
            STATUS: ACTIVE
          </div>
        </aside>

        {/* Center Dashboard */}
        <section className={cn(
          "col-span-1 border-b lg:border-b-0 oracle-border-subtle bg-oracle-bg-darker transition-all duration-500 flex flex-col min-h-0",
          isExpanded ? "lg:col-span-12 z-40" : "lg:col-span-8 xl:col-span-7"
        )}>
          {/* Header Area */}
          <div className="p-4 lg:p-10 pb-0">
                <div className="flex flex-col gap-4 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <selectedPillar.icon size={24} className="text-oracle-blue shrink-0 mt-1" />
                        <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold tracking-tight text-white uppercase leading-tight">
                          {selectedPillar.title} ENGINE
                        </h2>
                      </div>
                      
                      <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="hidden lg:flex w-10 h-10 border oracle-border bg-white/5 items-center justify-center text-white/20 hover:text-oracle-blue transition-colors rounded-sm shrink-0"
                        title={isExpanded ? "Restore" : "Maximize"}
                      >
                        {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                      </button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="bg-white/5 p-4 border oracle-border-subtle rounded-sm flex items-center gap-4 sm:flex-col sm:items-start sm:min-w-[120px] shrink-0">
                        <div className="text-3xl lg:text-4xl font-mono leading-none text-oracle-lime tabular-nums">9.42</div>
                        <div className="text-[8px] lg:text-[9px] text-white/40 uppercase tracking-widest font-bold">Agg_Score</div>
                      </div>
                      
                      <p className="text-white/30 text-[12px] lg:text-[14px] leading-relaxed max-w-2xl">
                        {selectedPillar.description}
                      </p>
                    </div>
                  </div>
                </div>
          </div>
          
          <div className="flex justify-center -mt-6 mb-4 relative z-20">
            <PageViewCounter pageId={selectedPillar.id} />
          </div>

          {/* Body Content Area */}
          <div className="p-4 lg:p-10 pt-2 lg:pt-4">
            <div className="max-w-5xl mx-auto space-y-8">
              {!auditResult && !isAuditing && (
                <>
                  <AdSpace type="banner" className="mb-6" label="Direct_Strategic_Node" />
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="oracle-card p-6 border-oracle-blue/20 bg-oracle-blue/5"
                  >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1.5 bg-oracle-blue/10 rounded">
                      <ClipboardList size={18} className="text-oracle-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[10px] lg:text-[11px] font-bold text-white uppercase tracking-widest mb-1">
                        Engine Objective & Data Requirements
                      </h3>
                      <p className="text-[10px] text-white/40 italic leading-snug">
                        {selectedPillar.laymanExplanation}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 border-t oracle-border-subtle pt-4 mt-2">
                    {selectedPillar.requirements?.map((req: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 text-[10px] lg:text-[11px] text-white/50 group">
                        <div className="mt-1.5 w-1 h-1 bg-oracle-blue rounded-full opacity-40 group-hover:opacity-100 transition-opacity" />
                        <span className="group-hover:text-white/80 transition-colors">{req}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                </>
              )}

              {!auditResult && !isAuditing ? (
                <div className="space-y-10">
                  <div className={cn("grid grid-cols-1 gap-6", isExpanded ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2")}>
                  <div className="oracle-card p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6 border-b oracle-border-subtle pb-3">
                      <span className="oracle-pill text-[9px] lg:text-[10px]">Command Input</span>
                      <span className="text-oracle-blue text-[9px] font-mono flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-oracle-blue rounded-full animate-pulse" />
                        READY
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col space-y-4">
                      <label className="text-[9px] lg:text-[10px] text-white/40 uppercase tracking-widest">Protocol Query Parameters</label>
                      <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={selectedPillar.placeholder}
                        className="flex-1 min-h-[140px] bg-black/60 border oracle-border-subtle p-4 font-mono text-xs lg:text-sm outline-none focus:border-oracle-blue/40 transition-colors resize-none placeholder:text-white/10"
                      />
                      
                      {/* Intelligence Loops: Common Technical Inquiries */}
                      <div className="space-y-2">
                        <div className="text-[8px] uppercase tracking-widest text-white/20 font-bold flex items-center gap-2">
                          <Activity size={10} /> Intelligence Loops
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedPillar.commonQuestions?.map((q: string, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => setQuery(q)}
                              className="text-[9px] px-2.5 py-1 bg-white/5 border oracle-border-subtle hover:border-oracle-blue/40 hover:bg-oracle-blue/5 text-white/30 hover:text-oracle-blue transition-all rounded-sm text-left max-w-full truncate font-mono uppercase"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleAudit}
                        disabled={!query.trim() || isAuditing}
                        className="bg-oracle-blue text-black p-4 rounded-sm font-bold text-[10px] lg:text-[11px] uppercase tracking-[0.2em] hover:bg-oracle-blue/80 transition-all shadow-[0_5px_15px_rgba(0,209,255,0.15)] flex items-center justify-center gap-3 group disabled:opacity-50"
                      >
                        EXEC_SEQUENCE
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className={cn("oracle-card p-6 flex flex-col bg-oracle-bg/40", isExpanded ? "lg:col-span-2" : "")}>
                    <div className="flex justify-between items-center mb-6 border-b oracle-border-subtle pb-3">
                      <span className="oracle-pill text-[9px] lg:text-[10px]">Forecasting Engine</span>
                      <span className="text-oracle-blue text-[9px] font-mono">NODE_T01</span>
                    </div>
                    <div className="space-y-8 flex-1 flex flex-col justify-between">
                      <div className="flex items-end gap-1.5 lg:gap-3 h-32 lg:h-44 px-2">
                        {[25, 45, 75, 55, 85, 35, 95, 65, 30, 50].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: i * 0.05, duration: 1 }}
                            className="flex-1 bg-oracle-blue/10 border border-oracle-blue/30 rounded-t-sm"
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-[9px] lg:text-[10px] text-white/22 uppercase font-mono px-2">
                        <span>2024</span><span>2025</span><span>2026</span><span>2027</span><span>2028_EST</span>
                      </div>
                      <div className="p-4 bg-black/50 border oracle-border-subtle rounded-sm">
                        <div className="flex items-center gap-2 mb-2 font-bold text-oracle-lime text-[10px] uppercase">
                          <Zap size={14} /> System Alert
                        </div>
                        <p className="text-[11px] lg:text-[12px] text-white/40 leading-relaxed italic">
                          Baseline established. Ground Truth citational depth at 0.94. Awaiting specific inquiry vectors for deep layer synthesis.
                        </p>
                      </div>
                    </div>
                  </div>

                  <AdSpace type="banner" className="mt-10" label="Technology_Inbound" />
                </div>
              </div>
            ) : isAuditing ? (
                <div className="h-[400px] flex flex-col items-center justify-center space-y-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-oracle-blue/5 rounded-full blur-3xl animate-pulse" />
                    <Loader2 className="w-16 h-16 text-oracle-blue animate-spin relative z-20" />
                  </div>
                  <div className="text-center space-y-4">
                    <div className="font-mono text-xs text-oracle-blue animate-pulse uppercase tracking-[0.4em]">
                      SYNTHESIZING_ORACLE_MATRICES
                    </div>
                    <p className="text-[9px] text-white/20 uppercase font-mono">Layers: NIST_V2 // IEEE_2026 // W3C_GT</p>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  ref={resultRef}
                  className="flex flex-col space-y-6 max-w-4xl mx-auto"
                >
                  <div className="oracle-card p-6 lg:p-12 shadow-2xl bg-oracle-bg/80 backdrop-blur-md relative border-t-2 border-t-oracle-blue/30">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b oracle-border-subtle pb-6 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-oracle-blue/10 flex items-center justify-center border border-oracle-blue/20">
                          <Terminal size={16} className="text-oracle-blue" />
                        </div>
                        <h3 className="text-xs lg:text-sm font-bold uppercase tracking-[0.2em]">Validated Audit Report</h3>
                      </div>
                      <button 
                        onClick={() => {
                          setAuditResult(null);
                          setQuery('');
                        }}
                        className="w-full sm:w-auto text-[10px] font-mono text-white/30 hover:text-oracle-blue transition-all uppercase border oracle-border-subtle px-4 py-2 hover:bg-white/5 active:scale-95"
                      >
                        Reset Terminal
                      </button>
                    </div>

                    <div className="markdown-body custom-scrollbar-thin">
                      <ReactMarkdown>{auditResult || ''}</ReactMarkdown>
                    </div>

                    {/* Technical Audit Certificate (Institutional Mimicry) */}
                    <div className="mt-8 p-6 bg-black/40 border-2 border-oracle-blue/10 rounded-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileBadge size={60} className="text-oracle-blue" />
                      </div>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 bg-oracle-blue/10 rounded text-oracle-blue">
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold text-oracle-blue uppercase tracking-widest mb-1 italic">Institutional Audit Certificate</h4>
                          <p className="text-[11px] text-white/40 leading-tight">
                            Verified technical rigor of: <strong>{
                              selectedPillar.id === 'ai-automation' ? 'Google Research / Stanford HAI' :
                              selectedPillar.id === 'hardware-longevity' ? 'IEEE Standards / Digital Foundry' :
                              selectedPillar.id === 'privacy-security' ? 'NIST-800-53 / SANS Institute' :
                              selectedPillar.id === 'dev-infrastructure' ? 'AWS Architecture Center' :
                              'Google Search Central'
                            }</strong>
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t oracle-border-subtle pt-4">
                        {[
                          { label: 'Ground Truth Confidence', value: '98.2%', status: 'VERIFIED' },
                          { label: 'Latency Compression', value: '0.04ms', status: 'OPTIMAL' },
                          { label: 'Entity Depth score', value: '0.94', status: 'HIGH' },
                          { label: 'Protocol Compliance', value: 'ISO-2026', status: 'LOCKED' },
                        ].map((stat, i) => (
                          <div key={i} className="space-y-1">
                            <div className="text-[8px] text-white/20 uppercase font-mono">{stat.label}</div>
                            <div className="text-[10px] text-white font-bold">{stat.value}</div>
                            <div className="text-[7px] text-oracle-lime font-mono tracking-tighter italic">{stat.status}</div>
                          </div>
                        ))}
                      </div>

                      {/* NEW: Citation Generator for Backlink Building */}
                      <div className="mt-6 pt-4 border-t border-white/5">
                        <p className="text-[9px] text-white/30 uppercase tracking-widest mb-2 font-mono flex items-center gap-2">
                          <Share2 size={10} /> Export Technical Citation (For GEO Indexing)
                        </p>
                        <div className="p-3 bg-white/5 border border-white/5 rounded-sm flex items-center justify-between gap-4">
                          <code className="text-[9px] text-white/50 font-mono truncate">
                            Source: Global Tech Intelligence Oracle v2.6.4 (Audit ID: {Math.random().toString(36).substring(7).toUpperCase()})
                          </code>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(`Global Tech Intelligence Oracle Audit: ${selectedPillar.title} Engine (Confidence Score 9.42) - Generated ${new Date().toLocaleDateString()}`);
                              alert('Citation Copied to Clipboard');
                            }}
                            className="shrink-0 text-[9px] text-oracle-blue font-bold uppercase hover:text-oracle-lime transition-colors"
                          >
                            Copy Link
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 pt-6 border-t oracle-border-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
                      <button 
                        onClick={() => setActiveView('bank')}
                        className="flex items-center gap-3 bg-oracle-lime/5 border border-oracle-lime/20 px-4 py-2 rounded-sm grayscale hover:grayscale-0 transition-all group"
                      >
                        <ShieldCheck size={16} className="text-oracle-lime" />
                        <span className="text-[10px] text-oracle-lime uppercase font-bold tracking-widest font-mono group-hover:text-oracle-lime transition-colors">TRUST_SCORE: VERIFIED // [EXPORT TO BANK]</span>
                      </button>
                      <div className="text-[9px] font-mono text-white/10 uppercase tracking-widest text-center sm:text-right">
                        TIMESTAMP: {new Date().toISOString()}<br/>
                        NODE_ID: {Math.random().toString(36).substring(7).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className={cn(
          "col-span-1 lg:col-span-4 xl:col-span-3 bg-oracle-bg flex flex-col lg:border-l oracle-border-subtle transition-all",
          isExpanded ? "hidden" : "flex"
        )}>
          <div className="p-4 lg:p-6 border-b oracle-border-subtle bg-oracle-bg-darker lg:bg-transparent">
            <p className="text-[9px] lg:text-[10px] text-oracle-lime mb-1 lg:mb-2 uppercase tracking-widest font-bold italic">Security Sublayer</p>
            <h2 className="text-lg lg:text-xl font-light leading-tight">Privacy Guard Node</h2>
          </div>
          <div className="flex-1 p-4 lg:p-6 space-y-10">
            <div className="bg-oracle-red/5 p-5 border border-oracle-red/20 rounded shadow-[inset_0_0_20px_rgba(255,68,68,0.05)]">
              <div className="flex justify-between mb-3">
                <span className="oracle-pill text-[9px] lg:text-[10px] text-white/60">Global VPN Status</span>
                <span className="w-2 h-2 bg-oracle-red rounded-full animate-pulse shadow-[0_0_10px_#ff4444]"></span>
              </div>
              <div className="text-[11px] lg:text-xs font-mono text-oracle-red mb-2 font-bold tracking-tight">VULNERABILITY DETECTED: NODE_77</div>
              <div className="text-[9px] lg:text-[10px] text-white/30 italic">Targeting Eurasia-West-03 Pipeline</div>
            </div>

            {/* Right Sidebar Ad */}
            <AdSpace type="sidebar" label="Security_Ecosystem" />

            {/* Page Aware Testimonials */}
            <TestimonialSection pillarId={selectedPillar.id} className="mt-8" />

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b oracle-border-subtle pb-2">
                <h3 className="oracle-pill text-[9px] lg:text-[10px] text-oracle-blue flex items-center gap-2">
                  <Cpu size={14} />
                  Engine Optimization
                </h3>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Semantic Relationship Density", value: 91, color: "bg-oracle-blue" },
                  { label: "Predictive Confidence Interval", value: 87, color: "bg-oracle-lime" },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] lg:text-[11px] text-white/50">{stat.label}</span>
                      <span className={cn("text-[10px] lg:text-xs font-mono font-bold", stat.value > 90 ? "text-oracle-blue" : "text-oracle-lime")}>{stat.value}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{ duration: 1.5 }}
                        className={cn("h-full", stat.color)} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4 border-b oracle-border-subtle pb-2">
                <History size={14} className="text-white/20" />
                <h3 className="oracle-pill text-[9px] lg:text-[10px] text-white/40 italic">Audit Log Buffer</h3>
              </div>
              <div className="space-y-3">
                {history.map((h, i) => (
                  <div key={i} className="text-[10px] lg:text-[11px] font-mono border-l-2 border-white/5 pl-4 py-2 hover:bg-white/[0.02] transition-all">
                    <div className="text-oracle-blue/50 mb-1 font-bold">{h.timestamp}</div>
                    <div className="text-white/40 truncate max-w-full italic">{h.query}</div>
                  </div>
                ))}
                {history.length === 0 && (
                  <div className="text-[10px] text-white/10 italic text-center py-6 border border-dashed oracle-border-subtle rounded">BUFFER_NULL</div>
                )}
              </div>
            </div>
          </div>
        </aside>
            </motion.div>
          ) : (
            <motion.div 
              key="bank"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full overflow-hidden flex flex-col"
            >
              <IntelligenceBank onBack={() => setActiveView('audit')} selectedPillarId={selectedPillar.id} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Intelligence Pulse Footer (The 12% Growth Engine) */}
      <footer className="h-auto min-h-12 border-t oracle-border flex flex-col sm:flex-row items-center justify-between px-4 lg:px-8 py-4 sm:py-0 bg-oracle-bg-lighter z-50">
        <div className="flex items-center gap-6 overflow-hidden w-full sm:w-auto">
          <div className="flex items-center gap-2 text-oracle-lime shrink-0">
            <Activity size={12} className="animate-pulse" />
            <span className="text-[9px] uppercase font-mono text-white/40">Global Pulse: <span className="text-oracle-lime">Synchronized</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 border-l oracle-border-subtle pl-6 overflow-hidden">
             <div className="flex gap-8 text-[8px] font-mono text-white/20 animate-pulse italic whitespace-nowrap">
                <span>[AI-Audit] Enterprise workflow detected (+22% ROI forecast)</span>
                <span>[NIST-800] Synchronization Complete</span>
                <span>[GEO] Entity Mapping Parity Verified</span>
                <span>[NODE-1422] Active and Operational</span>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[9px] font-mono text-white/15 uppercase tracking-[0.2em] mt-4 sm:mt-0">
          <span>{new Date().getFullYear()} Oracle Systems</span>
          <span className="hidden sm:inline border-l oracle-border-subtle pl-4">v2.6.460_STABLE</span>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Quote, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  location: 'UK' | 'USA' | 'Canada' | 'Europe';
  content: string;
  pillars: string[]; // IDs of pillars this testimonial is relevant to
}

const TESTIMONIALS: Testimonial[] = [
  // AI & Automation
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'CTO',
    organization: 'FinTech London',
    location: 'UK',
    content: "The Oracle Engine's PPD indexing has completely transformed our computational resource allocation. We've seen a 40% reduction in wasted GPU cycles in our London cluster.",
    pillars: ['ai-automation', 'economic-integration']
  },
  {
    id: '2',
    name: 'Marc-André Dubois',
    role: 'Principal Architect',
    organization: 'EuroCompute Systems',
    location: 'Europe',
    content: "Integration with the automation nodes was seamless. The precision in forecasting ROI recovery models is exactly what the European tech sector needs right now.",
    pillars: ['ai-automation', 'dev-infrastructure']
  },
  // Hardware & Longevity
  {
    id: '3',
    name: 'Marcus Thorne',
    role: 'Infrastructure Lead',
    organization: 'Ontario Tech Hub',
    location: 'Canada',
    content: "Extending hardware longevity by 300% isn't just a claim—it's what we've achieved using the Oracle's heat-map optimization protocols. A game changer for sustainable scaling.",
    pillars: ['hardware-longevity']
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'Sustainability Officer',
    organization: 'GreenMatrix NYC',
    location: 'USA',
    content: "The US division has dropped its carbon footprint significantly since switching to hardware nodes audited by the Oracle Engine. Highly recommended for ESG compliance.",
    pillars: ['hardware-longevity', 'privacy-security']
  },
  // Privacy & Security
  {
    id: '5',
    name: 'Elena Rossi',
    role: 'Security Consultant',
    organization: 'Vanguard Cyber',
    location: 'Europe',
    content: "Zero-knowledge proofs implemented through the Oracle's privacy pillar ensure our data remains sovereign while still benefiting from global intelligence indexing.",
    pillars: ['privacy-security', 'dev-infrastructure']
  },
  {
    id: '6',
    name: 'David Chen',
    role: 'Compliance Director',
    organization: 'Maple Defense',
    location: 'Canada',
    content: "The Canadian privacy framework is strict, but the Oracle's security protocols exceed our expectations. Trust Indexing at 0.94 is quite a feat.",
    pillars: ['privacy-security']
  },
  // Dev Infrastructure
  {
    id: '7',
    name: 'Robert Miller',
    role: 'VP of Engineering',
    organization: 'Silicon Valley Partners',
    location: 'USA',
    content: "Building on the Oracle's infrastructure allowed us to ship three months early. The dev-nodes are incredibly robust and ready for institutional scale.",
    pillars: ['dev-infrastructure', 'ai-automation']
  },
  // Economic integration
  {
    id: '8',
    name: 'Alistair Cook',
    role: 'Economic Analyst',
    organization: 'Global Capital UK',
    location: 'UK',
    content: "The economic integration modeling is frighteningly accurate. It's the first time we've had a truly global view of tech-asset ROI across borders.",
    pillars: ['economic-integration']
  }
];

const LOCATION_FLAGS: Record<string, string> = {
  'UK': '🇬🇧',
  'USA': '🇺🇸',
  'Canada': '🇨🇦',
  'Europe': '🇪🇺'
};

interface TestimonialSectionProps {
  pillarId?: string;
  className?: string;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ pillarId, className }) => {
  const filtered = pillarId 
    ? TESTIMONIALS.filter(t => t.pillars.includes(pillarId))
    : TESTIMONIALS.slice(0, 4);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between border-b oracle-border-subtle pb-3">
        <div className="flex items-center gap-2">
          <Quote size={14} className="text-oracle-blue" />
          <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] font-mono">
            Institutional_Testimonials
          </span>
        </div>
        <div className="flex gap-2">
          {['UK', 'USA', 'Canada', 'Europe'].map(loc => (
            <span key={loc} className="text-[8px] text-white/20 font-mono">{loc}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t, idx) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -10 : 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="oracle-card p-4 relative group"
          >
            {/* Location Flag */}
            <div className="absolute top-2 right-3 flex items-center gap-1.5 grayscale-0 opacity-80 group-hover:opacity-100 transition-all">
              <span className="text-[14px] leading-none mb-0.5" title={t.location}>
                {LOCATION_FLAGS[t.location]}
              </span>
              <span className="text-[8px] font-mono font-bold text-white uppercase tracking-tighter opacity-50">{t.location}</span>
            </div>

            <p className="text-[11px] leading-relaxed text-white/70 italic mb-4">
              "{t.content}"
            </p>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-oracle-blue/20 to-black border border-white/5 flex items-center justify-center text-[10px] font-bold text-oracle-blue">
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-[10px] font-bold text-white uppercase tracking-wider">{t.name}</div>
                <div className="text-[8px] text-white/30 uppercase tracking-widest">{t.role} // {t.organization}</div>
              </div>
            </div>

            {/* Scanline pattern for tech feel */}
            <div className="absolute inset-0 scanline-mask opacity-[0.02] pointer-events-none group-hover:opacity-[0.04] transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

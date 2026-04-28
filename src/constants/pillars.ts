import { 
  Zap, 
  Cpu, 
  ShieldAlert, 
  Layers, 
  Globe2, 
  ChevronRight,
  Loader2,
  Terminal,
  Activity,
  Lock,
  Search,
  Timer
} from 'lucide-react';

export interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  borderColor: string;
  bgColor: string;
  placeholder: string;
  laymanExplanation: string;
  commonQuestions: string[];
  bannerPrompt: string;
  thematicElement: string;
  dossier?: {
    title: string;
    summary: string;
    content: string;
  };
  requirements: string[];
  questionsAndAnswers?: {
    question: string;
    answer: string;
  }[];
}

export const PILLARS: Pillar[] = [
  {
    id: 'ai-automation',
    title: 'AI & Automation Oracle',
    description: 'Audits automation workflows to calculate high-precision AI ROI and neural efficiency gains. It identifies time-recovery protocols and protocol gaps in manual enterprise implementation strategies.',
    icon: Zap,
    color: 'text-yellow-400',
    borderColor: 'border-yellow-400/20',
    bgColor: 'bg-yellow-400/5',
    placeholder: 'Input manual workflow details or deployment specs for recovery audit...',
    laymanExplanation: 'This engine analyzes your daily manual tasks to identify specifically where AI can save you time. It calculates how much money and focus you recover by switching to automated protocols.',
    commonQuestions: [
      'Will AI take my job in the next 24 months?',
      'How do I automate my email and calendar for free?',
      'Is ChatGPT better than Gemini for writing code?',
      'What are the best free AI tools for small business?'
    ],
    bannerPrompt: 'Abstract neural network architecture with glowing synaptic connections and crystalline data structures, deep space blue and lime neon accents, macro photography style.',
    thematicElement: 'NEURAL_NODE_ARRAY',
    questionsAndAnswers: [
      {
        question: 'Will AI take my job in the next 24 months?',
        answer: "AI is unlikely to \"take\" your job entirely, but it will fundamentally change the tasks you perform. The transition will favor those who learn to orchestrate AI agents. High-repetition cognitive tasks are at the most risk of automation."
      },
      {
        question: 'How do I automate my email and calendar for free?',
        answer: "You can use tools like Zapier (free tier), Make.com, or native integrations within Google Workspace and Outlook. Setting up \"If-This-Then-That\" (IFTTT) logic for incoming messages can save hours of manual sorting."
      },
      {
        question: 'Is ChatGPT better than Gemini for writing code?',
        answer: "As of early 2026, both are highly capable. Gemini tends to excel at large codebase analysis due to its massive context window, while ChatGPT often provides more concise, unit-testable snippets for logic puzzles."
      },
      {
        question: 'What are the best free AI tools for small business?',
        answer: "Top recommendations include Canva (AI design), Claude (complex reasoning), and Notion (AI-powered organization). For specialized tasks, many open-source models can be run locally using Ollama for zero cost."
      }
    ],
    dossier: {
      title: 'The AI Autonomy Blueprint',
      summary: 'Strategies for converting manual enterprise workflows into high-precision technical recovery protocols.',
      content: `### Achieving Operational Autonomy
Automation is no longer about simple scripts; it is about **Agentic Orchestration**. By mapping manual workflows into Intelligence Loops, enterprises can recover up to 40% of wasted focus-hours.

#### Key Recovery Metrics
- **Context Recovery**: Minimizing the time spent switching between non-integrated tools.
- **Decision Latency**: Using predictive models to handle low-risk approval cycles.
- **Error Mitigation**: Implementing self-correcting data entry protocols.

#### Implementation Strategy
Start with "High-Friction, Low-Complexity" tasks. These provide the highest ROI for initial AI integration.`
    },
    requirements: [
      'List of repetitive manual workflows',
      'Current software tools utilized',
      'Hours spent per week on these tasks',
      'Specific automation objectives'
    ]
  },
  {
    id: 'hardware-longevity',
    title: 'Hardware & Performance Oracle',
    description: 'Benchmarks system architecture against global processing indices to forecast hardware obsolescence. It provides PPD (Power/Performance Density) metrics for long-term infrastructure optimization.',
    icon: Cpu,
    color: 'text-blue-400',
    borderColor: 'border-blue-400/20',
    bgColor: 'bg-blue-400/5',
    placeholder: 'Enter hardware architecture specs (CPU/GPU/Storage) for performance auditing...',
    laymanExplanation: 'This engine benchmarks your computers physical parts against upcoming software demands. It tells you exactly how many years of peak performance you have left before the hardware becomes obsolete.',
    commonQuestions: [
      'Is 16GB of RAM enough for AI work in 2026?',
      'Should I buy a GPU now or wait for the next gen?',
      'Why is my laptop fan always loud when using AI?',
      'How long will a MacBook Pro M3 last before obsolescence?'
    ],
    bannerPrompt: 'Close-up of a futuristic 3nm silicon wafer with iridescent light refraction, intricate geometric circuits, and glowing amber electrical pulses.',
    thematicElement: 'SILICON_DIE_GEOMETRY',
    questionsAndAnswers: [
      {
        question: 'Is 16GB of RAM enough for AI work in 2026?',
        answer: "It is the absolute bare minimum for consumer use, but for professional AI development or running local LLMs, 32GB is becoming the standard. 16GB will cause significant swap usage (slowing down your SSD) under heavy AI inference."
      },
      {
        question: 'Should I buy a GPU now or wait for the next gen?',
        answer: "If you need high VRAM (16GB+) for local model training, current high-end cards are solid. However, next-gen architectures are focusing heavily on neural cache efficiency which will be a game-changer for inference speeds."
      },
      {
        question: 'Why is my laptop fan always loud when using AI?',
        answer: "AI processing (inference) is computationally expensive, putting heavy load on either your GPU or NPU. This generates heat rapidly. Adjusting your power profile to \"Efficiency\" can help, though it may slow down response times."
      },
      {
        question: 'How long will a MacBook Pro M3 last before obsolescence?',
        answer: "Apple Silicon's unified memory architecture gives it a longevity edge. An M3 Max with sufficient RAM should remain a top-tier \"Pro\" machine until at least 2029, especially as more software leverages the Neural Engine."
      }
    ],
    dossier: {
      title: 'Silicon Longevity: 2026 Edition',
      summary: 'A technical guide to maximizing hardware performance cycles in the era of pervasive edge-AI computing.',
      content: `### The Hardware Obsolescence Curve
As local LLMs become standard, the definition of "High Performance" hardware has shifted from raw clock speed to **VRAM Bandwidth** and **NPU Tensor-Ops**.

#### Survival Hardware Specs
1. **Memory Ceiling**: 32GB is the new minimum for fluid multi-agent workflows.
2. **Thermal Management**: Sustained load performance is more critical than burst speeds.
3. **Edge Optimization**: Hardware that supports native 4-bit quantization will last 2x longer.

#### Longevity Tactics
Maintaining peak silicon health requires active thermal auditing and periodic driver recalibration to align with new model architectures.`
    },
    requirements: [
      'Full CPU and GPU model names',
      'RAM and Storage specifications',
      'Power supply (PSU) and cooling details',
      'Primary system usage (rendering, dev, gaming)'
    ]
  },
  {
    id: 'privacy-security',
    title: 'Privacy & Cybersecurity Oracle',
    description: 'Evaluates data sovereignty and NIST-800-53 compliance to deliver Oracle Trust Scores. It audits VPN integrity and performs zero-trust vulnerability forecasting for sensitive network assets.',
    icon: ShieldAlert,
    color: 'text-red-400',
    borderColor: 'border-red-400/20',
    bgColor: 'bg-red-400/5',
    placeholder: 'Enter security protocols or network architecture for privacy auditing...',
    laymanExplanation: 'This engine audits your online safety net. It looks at your encryption and settings to predict if your data is at risk of being leaked or if your systems meet official safety standards.',
    commonQuestions: [
      'Is my home Wi-Fi actually safe from hackers?',
      'What is the best free VPN that doesn\'t steal data?',
      'How do I know if my email was leaked in a breach?',
      'Can AI hackers crack my passwords easily?'
    ],
    bannerPrompt: 'Complex 3D lattice of encrypted data particles forming a crystalline shield, dark obsidian background with sharp laser-red security beams.',
    thematicElement: 'CRYPTOGRAPHIC_SHIELD',
    questionsAndAnswers: [
      {
        question: 'Is my home Wi-Fi actually safe from hackers?',
        answer: "If you are using WPA3 encryption and a strong, unique password, it is relatively safe. However, many \"Smart Home\" (IoT) devices have vulnerabilities that can be used as a backdoor into your main network."
      },
      {
        question: 'What is the best free VPN that doesn\'t steal data?',
        answer: "In the VPN world, \"if you aren't paying, you are the product.\" However, Proton VPN offers a reputable free tier with no logs. Avoid \"Free Unlimited\" VPNs from unknown developers as they often sell your browsing data."
      },
      {
        question: 'How do I know if my email was leaked in a breach?',
        answer: "You can use services like \"Have I Been Pwned\" (HIBP). It is recommended to use a masked email redirector (like SimpleLogin or Apple's Hide My Email) to isolate your real address from individual site breaches."
      },
      {
        question: 'Can AI hackers crack my passwords easily?',
        answer: "AI has significantly improved \"brute force\" attacks by predicting common human patterns. Passphrases (4+ random words) are much more resilient against AI cracking than complex but short passwords."
      }
    ],
    requirements: [
      'Network encryption protocols (e.g., TLS, AES)',
      'Current firewall/VPN configuration',
      'Data residency locations',
      'Compliance frameworks required (NIST, ISO)'
    ]
  },
  {
    id: 'dev-infrastructure',
    title: 'SaaS Infrastructure Oracle',
    description: 'Models the global API economy and dependency health to visualize cloud scalability vectors. It identifies structural bottlenecks in distributed service architectures for maximum delivery uptime.',
    icon: Layers,
    color: 'text-purple-400',
    borderColor: 'border-purple-400/20',
    bgColor: 'bg-purple-400/5',
    placeholder: 'Describe your SaaS stack or API integration maps for scalability analysis...',
    laymanExplanation: 'This engine maps out how your different software tools talk to each other. It identifies "hidden gaps" that could cause your systems to crash or slow down as your business grows.',
    commonQuestions: [
      'What is the cheapest way to host a website in 2026?',
      'Is AWS or Google Cloud better for a new startup?',
      'How do I connect my app to a database safely?',
      'Why are my cloud costs so high and how do I cut them?'
    ],
    bannerPrompt: 'Hyper-detailed futuristic server farm with liquid cooling pipes, glowing purple fiber-optic cables, and floating holographic data meters.',
    thematicElement: 'CLOUD_DATACENTER_MATRIX',
    questionsAndAnswers: [
      {
        question: 'What is the cheapest way to host a website in 2026?',
        answer: "For static sites, GitHub Pages, Vercel, and Cloudflare Pages are still free and highly performant. For backend apps, \"Serverless\" options like Google Cloud Run or AWS Lambda are cost-effective as you only pay for actual usage."
      },
      {
        question: 'Is AWS or Google Cloud better for a new startup?',
        answer: "Both are excellent. AWS has a larger ecosystem and more specialized tools, while Google Cloud often provides a simpler developer experience and superior AI/Data tools integration out of the box."
      },
      {
        question: 'How do I connect my app to a database safely?',
        answer: "Never expose your database directly to the internet. Use \"Environment Variables\" to store sensitive credentials and implement a strict \"Least Privilege\" role-based access control (RBAC) system."
      },
      {
        question: 'Why are my cloud costs so high and how do I cut them?',
        answer: "Common culprits include idle virtual machines, unoptimized data egress, and over-provisioned databases. implementing \"Auto-scaling\" and using Spot Instances can reduce costs by up to 60%."
      }
    ],
    requirements: [
      'Core cloud service provider and region',
      'Architecture type (Microservices, Monolithic)',
      'Primary API dependencies',
      'Estimated monthly cloud consumption volume'
    ]
  },
  {
    id: 'geo-visibility',
    title: 'Geo-Visibility Oracle',
    description: 'Optimizes content for Generative Engine Optimization (GEO) through semantic relevance and entity mapping. It ensures technical data is prioritized and cited as the Ground Truth by LLM search engines.',
    icon: Globe2,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-400/20',
    bgColor: 'bg-emerald-400/5',
    placeholder: 'Enter content snippets or tech terms to optimize for engine discovery and citing...',
    laymanExplanation: 'This engine checks if your technical content is "AI-readable." It ensures that when people ask Gemini or ChatGPT about your specialty, your specific data is what they use and cite as the correct answer.',
    commonQuestions: [
      'How do I get my website to show up in Gemini answers?',
      'Does Google penalize AI-generated articles?',
      'What are the top keywords for AI and Tech right now?',
      'How can I get other websites to cite my data?'
    ],
    bannerPrompt: 'Abstract visualization of a multi-dimensional knowledge graph, interconnected floating spheres representing data entities with golden light ribbons.',
    thematicElement: 'ENTITY_GRAPH_TOPOLOGY',
    questionsAndAnswers: [
      {
        question: 'How do I get my website to show up in Gemini answers?',
        answer: "Focus on \"Entity Mapping.\" Use clear headings, provide unique facts that aren't in generic datasets, and ensure your site has high \"Technical Authority\" through structured data (Schema.org)."
      },
      {
        question: 'Does Google penalize AI-generated articles?',
        answer: "Google's official stance is that they reward \"helpful content\" regardless of how it was produced. However, generic AI spam is easily detected and filtered. \"High-value\" AI content remains effective."
      },
      {
        question: 'What are the top keywords for AI and Tech right now?',
        answer: 'Keywords have shifted to intent-based clusters: "Agentic Workflows," "Edge Inference," "Sustainability APIs," and "Neural Network Security" are seeing massive growth in 2026.'
      },
      {
        question: 'How can I get other websites to cite my data?',
        answer: 'By producing "Primary Research" or "Data Snapshots" that are unique. Technical audiences cite tools and benchmarks. Providing free API audits or open-source datasets is the fastest way to build domain citations.'
      }
    ],
    dossier: {
      title: 'GEO: The Future of Domain Authority',
      summary: 'A deep dive into Generative Engine Optimization and how to ensure your technical docs are the primary source for AI answers.',
      content: `### The Shift from SEO to GEO
In 2026, standard Search Engine Optimization is obsolete. The intelligence landscape is now dominated by **Generative Engine Optimization (GEO)**. Modern LLMs like Gemini and GPT-5 do not just look for keywords; they look for **Entity Density** and **Topological Relevance**.

#### Priority Citing Factors
1. **Semantic Uniqueness**: Providing data that cannot be found in generic sets.
2. **Structural Integrity**: Using JSON-LD schemas that explicitly define technical relationships.
3. **Citation Reciprocity**: Engaging with high-authority technical nodes.

#### Optimization Protocol
To be sighted by global intelligence engines, your content must be structured as a **Knowledge Graph Node**. This means every article should include explicit technical parameters and verifiable "Institutional Proof" markers.`
    },
    requirements: [
      'Target keywords or technical industry entities',
      'URLs of content to be optimized',
      'Competitor URLs mapping to similar entities',
      'Content samples for semantic density audit'
    ]
  }
];

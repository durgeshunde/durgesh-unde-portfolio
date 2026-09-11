import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleDot,
  Cpu,
  Database,
  Download,
  Layers,
  Mail,
  Menu,
  Network,
  ShieldCheck,
  Sliders,
  Sparkles,
  Terminal,
  X,
  Zap
} from 'lucide-react';
import './styles.css';

const assetBase = import.meta.env.BASE_URL;
const resumeHref = `${assetBase}assets/durgesh-unde-resume.pdf`;

const research = [
  {
    id: '01', date: 'August 2023', type: 'Research Study', title: 'Enhancing Cybersecurity with Machine Learning-Based Threat Detection',
    short: 'A study of intelligent threat detection systems that use supervised and unsupervised learning to identify malicious patterns, anomalies, and evolving attack vectors.',
    tags: ['Cybersecurity', 'Threat detection', 'Random Forest', 'Anomaly detection'], accent: 'cyan', pdf: `${assetBase}research/enhancing-cybersecurity-threat-detection.pdf`,
    question: 'How can machine learning strengthen threat detection beyond static, signature-based security?',
    objectives: ['Improve detection accuracy for known and unknown threats', 'Reduce false alarms and alert fatigue', 'Explore automated response and escalation', 'Evaluate supervised and unsupervised ML approaches'],
    method: 'Literature-led analysis of software-level threat detection, using network traffic, system logs, user behaviour, publicly available datasets, and discussion of practical enterprise implementation.',
    findings: 'The study concludes that machine-learning-based approaches can improve detection accuracy, reduce false positives, and support automated threat response when integrated with operational security infrastructure.',
    takeaway: 'Adaptive pattern recognition gives security teams a path beyond predefined signatures — while data, compute, and deployment context still matter.',
  },
  {
    id: '02', date: 'February 2024', type: 'Individual Research Report', title: 'AI in Healthcare Diagnostics: Beyond Human Accuracy',
    short: 'An exploration of deep learning, medical imaging, clinical decision support, and the conditions required for responsible, explainable diagnostic AI.',
    tags: ['Healthcare AI', 'Deep learning', 'Medical imaging', 'Explainability'], accent: 'amber', pdf: `${assetBase}research/ai-healthcare-diagnostics.pdf`,
    question: 'Where can AI-assisted diagnostics exceed average human performance, and what must accompany that capability?',
    objectives: ['Trace the evolution from rule-based systems to deep learning', 'Examine imaging, oncology, pathology, and clinical decision support', 'Consider bias, data quality, explainability, and regulation', 'Map future directions such as multimodal and federated learning'],
    method: 'Independent synthesis of the technical evolution and practical implications of AI diagnostics, with attention to deep neural networks, CNNs, foundation models, clinical workflow, and human oversight.',
    findings: 'The report presents targeted diagnostic tasks where AI can match or exceed average human performance, while emphasising that generalisation, trust, validation, fairness, and clinical integration determine real-world value.',
    takeaway: 'The strongest model is not the whole solution: reliable diagnostic AI depends on high-quality data, transparent reasoning, and collaborative clinical use.',
  },
  {
    id: '03', date: 'December 2022', type: 'Formal Academic Investigation', title: 'Fake News Detection Using Machine Learning Techniques',
    short: 'A methodology for identifying misinformation in text through NLP feature extraction, comparative modelling, and a hybrid CNN + SVM detection approach.',
    tags: ['Misinformation', 'NLP', 'CNN + SVM', 'Text classification'], accent: 'violet', pdf: `${assetBase}research/fake-news-detection-ml.pdf`,
    question: 'How can machine learning distinguish legitimate news from fabricated content at the speed and scale of online platforms?',
    objectives: ['Develop robust models for text classification', 'Compare content, source, and propagation feature sets', 'Benchmark accuracy, precision, recall, and F1-score', 'Propose a scalable framework for content credibility'],
    method: 'A reproducible pipeline covering data acquisition, preprocessing, TF-IDF or embeddings, deterministic splits, cross-validation, comparative model training, and evaluation on public text datasets.',
    findings: 'The paper reports that a hybrid approach combining CNN deep feature extraction with traditional SVM classification outperforms single-method systems in the presented framework.',
    takeaway: 'Detection quality is inseparable from semantic context, evolving deception, representative labels, and careful handling of false positives.',
  },
  {
    id: '04', date: 'December 2024', type: 'Independent Research Presentation', title: 'AI in Climate Change Prediction and Environmental Sustainability',
    short: 'A visual research presentation on AI for climate prediction, renewable energy optimisation, resource management, ecological conservation, and equitable deployment.',
    tags: ['Climate AI', 'Neural networks', 'Sustainability', 'Equity'], accent: 'green', pdf: `${assetBase}research/ai-climate-change-sustainability.pdf`,
    question: 'How can computational intelligence support climate action while remaining accessible, fair, and environmentally responsible?',
    objectives: ['Explore neural networks and deep learning for atmospheric and ocean modelling', 'Survey renewable energy, resource, and conservation applications', 'Critically examine compute, access, and algorithmic bias', 'Assess future implications for climate policy'],
    method: 'Structured research presentation synthesising climate science context, predictive modelling approaches, sustainability applications, ethical challenges, and future outlook.',
    findings: 'The presentation positions AI as a powerful tool for prediction and resource optimisation, while identifying computational cost, data accessibility, bias, and equitable deployment as central constraints.',
    takeaway: 'Climate intelligence is valuable only when its benefits can reach the communities most exposed to climate risk.',
  },
  {
    id: '05', date: 'September 2025', type: 'Independent Research', title: 'The Evolution of Generative AI Models: From Text to General Intelligence',
    short: 'A deep dive into the progression from transformer-based text generation to multimodal systems, reasoning, contextual awareness, and the still-theoretical horizon of AGI.',
    tags: ['Generative AI', 'Transformers', 'Multimodal', 'Human-AI collaboration'], accent: 'rose', pdf: `${assetBase}research/evolution-generative-ai-models.pdf`,
    question: 'What changes as generative models move from fluent text production toward broader, more general capabilities?',
    objectives: ['Trace the evolution from GPT-2 and GPT-3 to modern foundation models', 'Explain the transformer architecture and emergent capabilities', 'Compare task-specific ML with general-purpose generative systems', 'Explore safety, governance, and the human role in future AI'],
    method: 'Independent research synthesis spanning model history, architecture, multimodal systems, reasoning, regulation, projected milestones, and human-AI collaboration.',
    findings: 'The paper describes a staged evolution toward broader generalisation and multimodal reasoning, while clearly treating full AGI as aspirational and not yet achieved.',
    takeaway: 'Capability growth is inseparable from context, governance, and the uniquely human judgement that guides how systems are used.',
  },
];

const experience = [
  {
    period: 'Aug 2026 — Present',
    role: 'Applied GenAI & SLM Systems Developer',
    company: 'XYVERION AI',
    current: true,
    body: 'Architected, fine-tuned, and engineered XYVERION 3.0 — an autonomous desktop AI engine driven by a locally fine-tuned Small Language Model (SLM) with native Win32 OS integration and zero runtime adapter latency.',
    bullets: [
      'Quantized Fine-Tuning (4-bit QLoRA): Fine-tuned a causal LLM on consumer GPU hardware (GTX 1650 4GB) using NF4 quantization, gradient checkpointing, and LoRA (r=16, α=32), driving validation loss from 1.6048 to 1.2473 across 85 optimization steps.',
      'Proprietary Alignment Dataset Curation: Curated and audited a 1,749-pair multi-turn dataset covering deductive reasoning, tool schemas, and strict creator attribution guardrails.',
      'Direct Safetensors LoRA Weight Fusion: Developed an automated post-training pipeline fusing 112 LoRA adapter shards directly into base model weights, achieving zero runtime adapter overhead.',
      'Sub-0.3s Native Windows OS Voice Controller: Engineered an ultra-low latency Win32 controller supporting 55+ natural voice commands (app lifecycle, GDI screenshots, volume/media keys, and safe Recycle Bin deletion via SHFileOperationW).',
      'Desktop Client & Episodic Memory: Packaged as a frameless desktop app with Microsoft Edge WebView2, persistent SQLite episodic memory, and automatic GPU VRAM flush on exit.',
    ],
  },
  {
    period: 'Aug 2026 — Present',
    role: 'AI Data Annotation & Evaluation Contractor',
    company: 'Innodata India Pvt. Ltd.',
    current: true,
    body: 'Hands-on enterprise AI training data annotation, content moderation, dense grounding, and systematic model evaluation workflows under strict SLAs.',
    bullets: [
      'Execute advanced reference-expression and grounding workflows, including dense-structured grounding, CUA-general grounding, and high-resolution spatial annotations.',
      'Evaluate LLM-generated outputs for factual grounding, contextual consistency, alignment, safety, and strict guideline adherence.',
      'Apply project-specific rubrics to ensure benchmark training data output while consistently meeting assigned AHT and SLA targets.',
      'Conduct linguistic, grammatical, and semantic evaluations across multi-turn human-AI conversational datasets.',
    ],
  },
  {
    period: '2026 — July 2026',
    role: 'AI Training & Data Annotation Contributor',
    company: 'Outlier AI',
    body: 'Contributed structured human feedback and comparative ranking to frontier generative AI alignment and model evaluation workflows.',
    bullets: [
      'Contributed to frontier generative AI alignment workflows through structured comparative human feedback and model output ranking.',
      'Conducted multimodal data labeling, image annotation, and quality assurance under strict guideline rubrics.',
      'Curated multilingual speech and voice dataset components across English, Hindi, and Marathi prompts.',
    ],
  },
];

const xyverionMetrics = [
  {
    val: '1.6048 → 1.2473',
    lbl: 'Validation Loss',
    sub: '4-bit QLoRA fine-tuning (r=16, α=32) over 85 optimization steps on GTX 1650 4GB',
    highlight: true,
  },
  {
    val: '1,749 Pairs',
    lbl: 'Custom SFT Dataset',
    sub: 'Multi-turn deductive reasoning, tool-calling schemas & attribution guardrails',
    highlight: false,
  },
  {
    val: '112 Shards',
    lbl: 'Fused Safetensors',
    sub: 'Automated pipeline merging LoRA adapter weights directly into base FP16 tensors',
    highlight: false,
  },
  {
    val: '< 0.3s Latency',
    lbl: 'Win32 OS Automation',
    sub: 'Ultra-low latency Ctypes controller executing 55+ natural voice and system commands',
    highlight: true,
  },
];

const xyverionPillars = [
  {
    icon: <Cpu size={22} />,
    num: 'PILLAR 01',
    title: '4-Bit Quantized QLoRA Fine-Tuning',
    desc: 'Adapted causal open-source LLMs on consumer edge hardware (NVIDIA GTX 1650 4GB) using bitsandbytes NormalFloat4 (NF4) quantization, gradient checkpointing, and targeted LoRA projection matrices.',
    bullets: [
      'Targeted attention projection modules (q_proj, k_proj, v_proj, o_proj)',
      'Paged AdamW 8-bit optimizer preventing CUDA out-of-memory errors',
      'Validation loss reduced from 1.6048 to 1.2473 over 85 steps',
    ],
    tags: ['PEFT', '4-Bit QLoRA', 'bitsandbytes', 'PyTorch', 'Transformers'],
  },
  {
    icon: <Layers size={22} />,
    num: 'PILLAR 02',
    title: 'Automated Safetensors Weight Fusion',
    desc: 'Eliminated runtime PEFT adapter overhead by developing a standalone Python fusion script that directly merges 112 LoRA adapter shards into the base model weights with zero precision degradation.',
    bullets: [
      'Direct mathematical fusion into base safetensors architecture',
      'Zero adapter load latency at runtime with instant token streaming',
      'Deployable as a standalone native checkpoint without PEFT dependency',
    ],
    tags: ['Safetensors', 'Weight Fusion', 'Tensor Arithmetic', 'Zero Overhead'],
  },
  {
    icon: <Terminal size={22} />,
    num: 'PILLAR 03',
    title: 'Sub-0.3s Native Win32 OS Voice Controller',
    desc: 'Bridged language generation directly to the operating system via low-level Win32 C API bindings in Python ctypes, enabling autonomous desktop actions with sub-second voice latency.',
    bullets: [
      '55+ natural language voice actions: app lifecycle, volume, and media',
      'Fast GDI screenshot buffer capture and active window management',
      'Safe Recycle Bin deletion implemented through SHFileOperationW',
    ],
    tags: ['Win32 API', 'Python Ctypes', 'Voice Engine', 'Low-Latency OS Hooks'],
  },
  {
    icon: <Database size={22} />,
    num: 'PILLAR 04',
    title: 'Glassmorphic Client & Episodic Memory',
    desc: 'Engineered a frameless desktop client using Microsoft Edge WebView2, backed by SQLite episodic memory for multi-session conversational recall and automated GPU VRAM lifecycle management.',
    bullets: [
      'Persistent SQLite relational memory schema for conversational recall',
      'Frameless, modern UI built with Microsoft Edge WebView2',
      'Automatic GPU cache and VRAM flush on application exit',
    ],
    tags: ['Edge WebView2', 'SQLite', 'Episodic Memory', 'VRAM Lifecycle'],
  },
];

const skills = {
  'GenAI & Model Fine-Tuning': [
    '4-Bit QLoRA Fine-Tuning (PEFT)',
    'LoRA Adapter Weight Fusion',
    'Direct Safetensors Merging',
    'Alignment Dataset Curation (SFT)',
    'Small Language Models (SLMs)',
    'Hugging Face Transformers',
    'PyTorch Deep Learning',
    'NF4 / FP16 Quantization',
    'LLM Output Evaluation & RLHF',
    'Human-in-the-Loop (HITL) QA',
    'Dense Grounding & Ref-Expression',
    'Multimodal Annotation',
  ],
  'Systems & OS Automation': [
    'Python (PyTorch, Transformers, PEFT)',
    'Win32 API & OS Automation (ctypes)',
    'Microsoft Edge WebView2',
    'SQLite Database Engineering',
    'Consumer GPU VRAM Optimization',
    'HTML5 / CSS3 / Modern JavaScript',
    'RESTful API Engineering',
    'Git & GitHub Version Control',
  ],
  'Quality & Evaluation Standards': [
    'Systems & Pipeline Architecture',
    'Analytical & Deductive Reasoning',
    'Meticulous Quality & Guideline QA',
    'Fast Debugging & Root Cause Analysis',
    'AHT Optimization & SLA Delivery',
    'Benchmark Data Auditing',
    'Content Moderation Rubrics',
  ],
  'Languages & Certifications': [
    'IELTS Academic Band 7.5 (CEFR C1 Level)',
    'English (Advanced / Fluent)',
    'Hindi (Advanced / Professional)',
    'Marathi (Native / Fluent)',
  ],
};

function Reveal({ children, className = '', delay = 0, y = 24 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Mark() {
  return (
    <div className="mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function Header({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const nav = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'xyverion', label: 'XYVERION 3.0' },
    { id: 'pipeline', label: 'Fine-Tuning' },
    { id: 'skills', label: 'Capabilities' },
    { id: 'research', label: 'Research' },
    { id: 'contact', label: 'Contact' },
  ];

  const go = (id) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-wrap">
        <a
          className="brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go('top');
          }}
        >
          <Mark />
          <span>
            DURGESH
            <br />
            <em>UNDE</em>
          </span>
        </a>
        <nav className={open ? 'open' : ''}>
          {nav.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                go(item.id);
              }}
            >
              <span>0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-resume" href={resumeHref} download="Durgesh-Unde-Resume.pdf">
            Resume <Download size={14} />
          </a>
          <button
            className="menu-button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onNavigate }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" />
      <div className="hero-glow glow-one" />
      <div className="hero-glow glow-two" />
      <div className="hero-orbit orbit-one" />
      <div className="hero-orbit orbit-two" />
      <div className="hero-content page-width">
        <Reveal>
          <div className="eyebrow">
            <span className="status-dot" /> Open to Applied GenAI &amp; LLM Systems Roles{' '}
            <span className="eyebrow-line" />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="hero-name">DURGESH UNDE</div>
          <div className="hero-role">
            Applied GenAI &amp; LLM Systems Engineer <span>/</span> 4-Bit QLoRA Fine-Tuning{' '}
            <span>/</span> AI Evaluation &amp; Alignment
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1>
            Fine-tuning models.
            <br />
            <span>Engineering</span> autonomous AI.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="hero-copy">
            I fine-tune open-source causal LLMs, curate specialized multi-turn alignment datasets,
            fuse safetensors weights for edge hardware, and engineer native Win32 system
            controllers — backed by enterprise model evaluation and RLHF rigor.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => onNavigate('xyverion')}>
              Explore XYVERION 3.0 <ArrowDownRight size={17} />
            </button>
            <button className="button button-quiet" onClick={() => onNavigate('pipeline')}>
              Fine-Tuning Pipeline <ArrowUpRight size={17} />
            </button>
            <a className="button button-ghost" href={resumeHref} download="Durgesh-Unde-Resume.pdf">
              Download resume <Download size={16} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="hero-foot">
            <div>
              <span className="mini-label">CORE FOCUS</span>
              <strong>4-Bit QLoRA Fine-Tuning · Safetensors Weight Fusion · Local SLMs · RLHF</strong>
            </div>
            <div className="scroll-note">
              <span className="scroll-line" /> Scroll to explore
            </div>
          </div>
        </Reveal>
      </div>
      <div className="signal-panel" aria-hidden="true">
        <div className="signal-label">APPLIED GENAI / 4-BIT QLORA &amp; LOCAL SLMS</div>
        <div className="signal-canvas">
          <div className="signal-ring ring-a" />
          <div className="signal-ring ring-b" />
          <div className="signal-core">
            <BrainCircuit size={28} />
            <span>01</span>
          </div>
          {Array.from({ length: 14 }).map((_, i) => (
            <i className={`node node-${i}`} key={i} />
          ))}
          <svg viewBox="0 0 500 500">
            <path d="M90 148 C180 80 230 220 304 150 S430 130 416 286 290 420 192 350 98 310 90 148" />
            <path d="M56 270 C170 220 208 330 274 274 S365 170 444 252" />
            <path d="M156 62 C120 184 220 224 182 440" />
          </svg>
        </div>
        <div className="signal-meta">
          <span>1.2473 VAL LOSS</span>
          <span>112 FUSED SHARDS</span>
          <span>SUB-0.3S WIN32</span>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, copy, id }) {
  return (
    <div className="section-intro" id={id}>
      <div className="eyebrow">
        <span className="eyebrow-index">/</span>
        {eyebrow}
      </div>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {copy && <p>{copy}</p>}
    </div>
  );
}

function About() {
  return (
    <section className="about section page-width" id="about">
      <Reveal>
        <SectionIntro
          eyebrow="01 / PROFILE"
          title={'Beyond prompting — <em>engineering the model itself.</em>'}
          copy="Durgesh is an Applied GenAI & LLM Systems Engineer operating across the full lifecycle: from multi-turn alignment dataset curation and 4-bit QLoRA fine-tuning to direct safetensors weight fusion, native Win32 desktop automation, and enterprise-grade model evaluation."
        />
      </Reveal>
      <div className="about-layout">
        <Reveal delay={0.08} className="about-note">
          <div className="editorial-number">01</div>
          <p>
            I build at the intersection where fine-tuned model weights connect directly with local
            hardware, native system execution, and structured human feedback.
          </p>
          <span className="line-accent" />
        </Reveal>
        <Reveal delay={0.16} className="keyword-field">
          <div className="keyword-card keyword-main">
            <Sparkles size={18} />
            <span>
              Applied GenAI &amp;
              <br />
              <strong>Model Fine-Tuning</strong>
            </span>
          </div>
          {[
            '4-bit QLoRA Fine-Tuning',
            'LoRA Safetensors Fusion',
            'SLM System Architecture',
            '1,749 SFT Dataset Curation',
            'Win32 Native Automation',
            'Enterprise RLHF & QA',
          ].map((x, i) => (
            <span className={`keyword keyword-${i}`} key={x}>
              {x}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  const [active, setActive] = useState(0);
  return (
    <section className="experience section page-width" id="experience">
      <Reveal>
        <SectionIntro
          eyebrow="02 / TRACK RECORD"
          title={'Model engineering &amp; <em>enterprise rigor.</em>'}
          copy="Hands-on experience developing autonomous SLM engines, fine-tuning causal models on edge hardware, and conducting enterprise evaluation & data grounding for tier-1 pipelines."
        />
      </Reveal>
      <div className="experience-layout">
        <div className="timeline-list">
          {experience.map((item, i) => (
            <button
              className={`timeline-trigger ${active === i ? 'active' : ''}`}
              key={item.company}
              onClick={() => setActive(i)}
            >
              <span className="timeline-index">
                {item.current ? <span className="pulse" /> : item.period.split(' ')[0]}
              </span>
              <span>
                <b>{item.company}</b>
                <small>{item.role}</small>
              </span>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.article
            key={active}
            className="experience-detail"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div className="detail-top">
              <span>{experience[active].period}</span>
              {experience[active].current && <span className="current-pill">ACTIVE</span>}
            </div>
            <h3>{experience[active].role}</h3>
            <p className="company-name">{experience[active].company}</p>
            <p>{experience[active].body}</p>
            <ul>
              {experience[active].bullets.map((b) => (
                <li key={b}>
                  <Check size={15} />
                  {b}
                </li>
              ))}
            </ul>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}

function XyverionShowcase() {
  return (
    <section className="xyverion-section" id="xyverion">
      <div className="page-width">
        <Reveal>
          <div className="xyverion-head">
            <div className="xyverion-badge-row">
              <span className="badge-live">
                <span className="status-dot" /> PRODUCTION LIVE BUILD
              </span>
              <span className="badge-arch">AUTONOMOUS DESKTOP AI &amp; LOCAL SLM ENGINE</span>
            </div>
            <h2>
              XYVERION 3.0 —<br />
              <em>Autonomous Desktop AI &amp; Local SLM.</em>
            </h2>
            <p className="section-intro">
              A flagship applied AI system demonstrating open-source causal language model
              fine-tuning on consumer hardware, automated zero-latency safetensors weight fusion, and
              ultra-low latency native Win32 operating system execution.
            </p>
          </div>
        </Reveal>

        {/* TECH CHIPS */}
        <Reveal delay={0.06}>
          <div className="xyverion-tech-chips">
            <span className="tech-chip primary">Python 3.13</span>
            <span className="tech-chip primary">PyTorch</span>
            <span className="tech-chip primary">Hugging Face Transformers</span>
            <span className="tech-chip primary">PEFT (QLoRA)</span>
            <span className="tech-chip primary">bitsandbytes (NF4)</span>
            <span className="tech-chip primary">Safetensors Fusion</span>
            <span className="tech-chip">Win32 API (Ctypes)</span>
            <span className="tech-chip">SQLite Vector/Memory</span>
            <span className="tech-chip">Microsoft Edge WebView2</span>
            <span className="tech-chip">Edge VRAM Optimization</span>
          </div>
        </Reveal>

        {/* METRICS */}
        <Reveal delay={0.1}>
          <div className="metrics-grid">
            {xyverionMetrics.map((m, idx) => (
              <div className={`metric-card ${m.highlight ? 'highlight' : ''}`} key={idx}>
                <div className="metric-val">{m.val}</div>
                <span className="metric-lbl">{m.lbl}</span>
                <p className="metric-sub">{m.sub}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 4 ARCHITECTURAL PILLARS */}
        <div className="pillars-grid">
          {xyverionPillars.map((p, i) => (
            <Reveal delay={i * 0.08} key={p.num}>
              <div className="pillar-card">
                <div className="pillar-top">
                  <div className="pillar-icon">{p.icon}</div>
                  <span className="pillar-num">{p.num}</span>
                </div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
                <ul className="pillar-bullets">
                  {p.bullets.map((b) => (
                    <li key={b}>
                      <Check size={14} />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="pillar-tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pipeline() {
  const stages = [
    [
      '01',
      'Data Curation & SFT',
      'Curated 1,749 multi-turn instruction pairs formatted with deductive reasoning, tool schemas, and strict creator guardrails.',
    ],
    [
      '02',
      '4-Bit QLoRA Tuning',
      'Quantized causal base LLM using NF4, paged AdamW, and low-rank adapter injection (r=16, α=32), driving validation loss from 1.6048 to 1.2473.',
    ],
    [
      '03',
      'Safetensors Fusion',
      'Automated post-training pipeline fusing 112 LoRA shards directly into base safetensors weights for zero runtime adapter overhead.',
    ],
    [
      '04',
      'Evaluation & RLHF',
      'Rigorous model evaluation, comparative human feedback scoring, and rubric-driven safety QA learned from enterprise Innodata workflows.',
    ],
    [
      '05',
      'Win32 Systems Hooks',
      'Binding language outputs directly to ultra-low latency Win32 C APIs for 55+ natural voice actions, GDI capture, and window management.',
    ],
    [
      '06',
      'Edge SLM Deployment',
      'Deploying private, lean, offline-capable small language models with persistent SQLite episodic memory and edge GPU VRAM flushing.',
    ],
  ];

  return (
    <section className="pipeline-section" id="pipeline">
      <div className="page-width">
        <Reveal>
          <div className="pipeline-head">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-index">04 /</span> THE WORKFLOW
              </div>
              <h2>
                From raw tokens to
                <br />
                <em>autonomous inference.</em>
              </h2>
            </div>
            <p>
              An end-to-end applied engineering pipeline: transforming domain intent and human
              feedback into quantized, fused, high-performance local language models.
            </p>
          </div>
        </Reveal>
        <div className="pipeline">
          <div className="pipeline-line" />
          {stages.map(([num, title, desc], i) => (
            <Reveal delay={i * 0.06} key={title}>
              <article className="pipeline-stage">
                <span className="stage-num">{num}</span>
                <div className="stage-icon">
                  {i === 0 ? (
                    <Network />
                  ) : i === 1 ? (
                    <Cpu />
                  ) : i === 2 ? (
                    <Layers />
                  ) : i === 3 ? (
                    <ShieldCheck />
                  ) : i === 4 ? (
                    <Terminal />
                  ) : (
                    <Zap />
                  )}
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [selected, setSelected] = useState('GenAI & Model Fine-Tuning');
  return (
    <section className="skills section page-width" id="skills">
      <Reveal>
        <SectionIntro
          eyebrow="05 / CAPABILITIES"
          title={'Fine-tuning depth &amp; <em>systems engineering.</em>'}
          copy="A specialized technical toolkit built around causal model fine-tuning, parameter-efficient adaptation, low-level OS automation, and enterprise evaluation rubrics."
        />
      </Reveal>
      <div className="skills-layout">
        <div className="skill-tabs">
          {Object.keys(skills).map((key, i) => (
            <button
              className={selected === key ? 'selected' : ''}
              key={key}
              onClick={() => setSelected(key)}
            >
              <span>0{i + 1}</span>
              {key}
              <ChevronRight size={15} />
            </button>
          ))}
        </div>
        <motion.div className="skill-cloud" layout key={selected}>
          {skills[selected].map((skill, i) => (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.035 }}
              key={skill}
              className="skill-chip"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ResearchVisual({ accent, id }) {
  return (
    <div className={`research-visual visual-${accent}`}>
      <div className="visual-grid" />
      {id === '01' ? (
        <>
          <div className="visual-shield">
            <ShieldCheck />
          </div>
          <div className="threat-path path-1" />
          <div className="threat-path path-2" />
          <span className="visual-code">0110 / 1001 / 1100</span>
        </>
      ) : id === '02' ? (
        <>
          <div className="scan-card">
            <div />
            <div />
            <div />
          </div>
          <span className="scan-line" />
          <span className="scan-label">DIAGNOSTIC / SIGNAL</span>
        </>
      ) : id === '03' ? (
        <>
          <div className="news-card">
            <span>CLAIM</span>
            <b>context</b>
            <small>verified / uncertain</small>
          </div>
          <div className="news-pulse" />
        </>
      ) : id === '04' ? (
        <>
          <div className="climate-orbit orbit-a" />
          <div className="climate-orbit orbit-b" />
          <div className="climate-core" />
        </>
      ) : (
        <>
          <div className="gen-node n1" />
          <div className="gen-node n2" />
          <div className="gen-node n3" />
          <div className="gen-node n4" />
          <div className="gen-line l1" />
          <div className="gen-line l2" />
          <div className="gen-line l3" />
          <span className="visual-code">TEXT → IMAGE → REASONING</span>
        </>
      )}
    </div>
  );
}

function ResearchCard({ item, onOpen }) {
  return (
    <motion.article
      className={`research-card accent-${item.accent}`}
      whileHover={{ y: -7 }}
      transition={{ duration: 0.25 }}
    >
      <ResearchVisual accent={item.accent} id={item.id} />
      <div className="research-card-body">
        <div className="research-meta">
          <span>{item.id}</span>
          <span>{item.date}</span>
        </div>
        <h3>{item.title}</h3>
        <div className="research-type">{item.type}</div>
        <p>{item.short}</p>
        <div className="tag-row">
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="card-links">
          <button onClick={() => onOpen(item)}>
            View research <ArrowUpRight size={15} />
          </button>
          <a href={item.pdf} download>
            Download PDF <Download size={14} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function Research({ onOpen }) {
  return (
    <section className="research section page-width" id="research">
      <Reveal>
        <div className="research-header">
          <SectionIntro
            eyebrow="06 / RESEARCH LAB"
            title={'Independent inquiries,<br /><em>carefully examined.</em>'}
            copy="Five formal and independent investigations spanning ML threat detection, medical computer vision, misinformation NLP, climate modeling, and generative model scaling laws."
          />
          <div className="research-count">
            <strong>05</strong>
            <span>
              independent
              <br />
              research works
            </span>
            <b>2022 — 2025</b>
          </div>
        </div>
      </Reveal>
      <div className="research-grid">
        {research.map((item, i) => (
          <Reveal delay={i * 0.07} key={item.id}>
            <ResearchCard item={item} onOpen={onOpen} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SupportingProjects() {
  return (
    <section className="projects section page-width" id="projects">
      <Reveal>
        <SectionIntro
          eyebrow="07 / FOUNDATIONAL WORK"
          title={'Full-stack systems &amp; <em>web interfaces.</em>'}
          copy="Foundational software development experience prior to specialized GenAI engineering, demonstrating strong competencies across modern web architecture, JavaScript, and API integrations."
        />
      </Reveal>
      <div className="project-slate">
        <div className="project-slate-top">
          <span>WEB APPLICATIONS &amp; SYSTEMS INTEGRATION</span>
          <span>2022 — 2024</span>
        </div>
        <div className="project-slate-main">
          <div className="project-mark">
            <span />
            <span />
            <span />
          </div>
          <div>
            <h3>Interactive Full-Stack Web Applications</h3>
            <p>
              Engineered responsive applications utilizing modern JavaScript, HTML5/CSS3, and
              dynamic API endpoints. Serves as the web and client foundation for desktop AI
              runtimes such as Microsoft Edge WebView2.
            </p>
          </div>
          <span className="project-status">DETAILS ON REQUEST</span>
        </div>
      </div>
      <div className="supporting-work">
        <span>SUPPORTING BACKGROUND</span>
        <div>
          <b>Digital Identity &amp; Visual Design</b>
          <small>Freelance · 2022 — 2023</small>
        </div>
        <div>
          <b>Web Solutions &amp; Client Engineering</b>
          <small>Freelance · 2022 — 2024</small>
        </div>
        <div>
          <b>IELTS Academic Band 7.5 (C1)</b>
          <small>IDP Education · Sep 2025</small>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="education section page-width">
      <Reveal>
        <SectionIntro
          eyebrow="08 / CREDENTIALS"
          title={'Academic foundation &amp; <em>C1 language fluency.</em>'}
          copy="A concise academic and certified English fluency record, reflecting strong quantitative and verbal communication credentials."
        />
      </Reveal>
      <div className="education-grid">
        <article>
          <span>ACADEMIC FOUNDATION</span>
          <h3>Higher Secondary Certificate (HSC) — Science Stream</h3>
          <b>78.50%</b>
          <small>2020 — 2022</small>
          <div className="edu-rule" />
          <h3>Secondary School Certificate (SSC)</h3>
          <b>85.20%</b>
          <small>2020</small>
        </article>
        <article className="ielts-card">
          <span>CERTIFIED ENGLISH FLUENCY</span>
          <div className="band">
            <strong>7.5</strong>
            <small>Overall Band</small>
          </div>
          <p>CEFR C1 Level · Advanced Proficiency</p>
          <div className="score-list">
            <span>
              Listening <b>7.5</b>
            </span>
            <span>
              Reading <b>8.0</b>
            </span>
            <span>
              Writing <b>6.5</b>
            </span>
            <span>
              Speaking <b>7.0</b>
            </span>
          </div>
          <small>September 2025 · IDP Education</small>
        </article>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section page-width" id="contact">
      <Reveal>
        <div className="contact-card">
          <div className="contact-orbit" />
          <div className="eyebrow">
            <span className="status-dot" /> AVAILABLE FOR APPLIED GENAI &amp; LLM SYSTEMS ROLES
          </div>
          <h2>
            Let’s build &amp; fine-tune
            <br />
            <em>exceptional AI.</em>
          </h2>
          <p>
            Whether you need custom model fine-tuning (QLoRA/PEFT), local SLM edge architecture,
            complex alignment dataset curation, or enterprise model evaluation, let's connect.
          </p>
          <div className="contact-actions">
            <a className="button button-primary" href="mailto:durgeshunde@gmail.com">
              Send an email <Mail size={16} />
            </a>
            <a className="button button-ghost" href={resumeHref} download="Durgesh-Unde-Resume.pdf">
              Download resume <Download size={16} />
            </a>
          </div>
          <div className="contact-details">
            <a href="mailto:durgeshunde@gmail.com">
              <Mail size={16} /> durgeshunde@gmail.com
            </a>
            <a href="tel:+919322323097">
              <span className="phone-icon">+</span> +91 93223 23097
            </a>
            <span>
              <span className="pin-icon">⌖</span> Shrirampur / Pune, Maharashtra, India
            </span>
          </div>
          <div className="social-placeholders">
            <a
              href="https://github.com/durgeshunde/durgesh-unde-portfolio"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <small>durgeshunde/durgesh-unde-portfolio</small>
            </a>
            <a
              href="https://www.linkedin.com/in/durgesh-u-89911241b/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <small>durgesh-u-89911241b</small>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ResearchModal({ item, onClose }) {
  useEffect(() => {
    const fn = (e) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', fn);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', fn);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="research-modal"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-top">
          <span>RESEARCH LAB / {item.id}</span>
          <button onClick={onClose} aria-label="Close research details">
            <X size={20} />
          </button>
        </div>
        <div className="modal-hero">
          <ResearchVisual accent={item.accent} id={item.id} />
          <div>
            <div className="research-meta">
              <span>{item.date}</span>
              <span>{item.type}</span>
            </div>
            <h2 id="modal-title">{item.title}</h2>
            <div className="tag-row">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-grid">
          <div>
            <span className="modal-label">OVERVIEW</span>
            <p>{item.short}</p>
            <span className="modal-label">RESEARCH QUESTION</span>
            <p>{item.question}</p>
            <span className="modal-label">APPROACH</span>
            <p>{item.method}</p>
          </div>
          <div>
            <span className="modal-label">OBJECTIVES</span>
            <ul className="modal-list">
              {item.objectives.map((o) => (
                <li key={o}>
                  <Check size={14} />
                  {o}
                </li>
              ))}
            </ul>
            <span className="modal-label">KEY FINDING</span>
            <p>{item.findings}</p>
            <span className="modal-label">TAKEAWAY</span>
            <p>{item.takeaway}</p>
          </div>
        </div>
        <div className="modal-footer">
          <span>Original document · download unchanged</span>
          <a className="button button-primary" href={item.pdf} download>
            Download full research paper <Download size={16} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [modal, setModal] = useState(null);
  const navigate = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <>
      <Header onNavigate={navigate} />
      <main>
        <Hero onNavigate={navigate} />
        <About />
        <Experience />
        <XyverionShowcase />
        <Pipeline />
        <Skills />
        <Research onOpen={setModal} />
        <SupportingProjects />
        <Education />
        <Contact />
      </main>
      <footer>
        <div className="page-width footer-inner">
          <a className="brand" href="#top">
            <Mark />
            <span>
              DURGESH
              <br />
              <em>UNDE</em>
            </span>
          </a>
          <span>Applied GenAI &amp; LLM Systems Engineer · 4-Bit QLoRA Fine-Tuning</span>
          <span>© {new Date().getFullYear()} Durgesh Unde</span>
        </div>
      </footer>
      <AnimatePresence>
        {modal && <ResearchModal item={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

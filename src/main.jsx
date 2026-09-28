import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Bot,
  Check,
  ChevronRight,
  Cpu,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Layers,
  Mail,
  Menu,
  MessageSquare,
  Network,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  X,
  Zap,
  ZoomIn
} from 'lucide-react';
import './styles.css';

const assetBase = import.meta.env.BASE_URL;
const resumeHref = `${assetBase}assets/durgesh-unde-resume.pdf`;
const dashboardImg = `${assetBase}assets/xyverion-dashboard.png`;
const chatImg = `${assetBase}assets/xyverion-chat.png`;

const research = [
  {
    id: '01',
    date: 'August 2023',
    type: 'Research Study',
    title: 'Enhancing Cybersecurity with Machine Learning-Based Threat Detection',
    short: 'A study of intelligent threat detection systems using supervised and unsupervised learning to identify malicious patterns, anomalies, and evolving attack vectors.',
    tags: ['Cybersecurity', 'Threat Detection', 'Random Forest', 'Anomaly Detection'],
    accent: 'cyan',
    pdf: `${assetBase}research/enhancing-cybersecurity-threat-detection.pdf`,
    question: 'How can machine learning strengthen threat detection beyond static, signature-based security?',
    objectives: [
      'Improve detection accuracy for known and unknown threats',
      'Reduce false alarms and alert fatigue',
      'Explore automated response and escalation',
      'Evaluate supervised and unsupervised ML approaches',
    ],
    method: 'Literature-led analysis of software-level threat detection, using network traffic, system logs, user behaviour, publicly available datasets, and practical enterprise implementation.',
    findings: 'Machine-learning-based approaches improve detection accuracy, reduce false positives, and support automated threat response when integrated with operational infrastructure.',
    takeaway: 'Adaptive pattern recognition gives security teams a path beyond predefined signatures — while data, compute, and deployment context remain critical.',
  },
  {
    id: '02',
    date: 'February 2024',
    type: 'Individual Research Report',
    title: 'AI in Healthcare Diagnostics: Beyond Human Accuracy',
    short: 'An exploration of deep learning, medical imaging, clinical decision support, and the conditions required for responsible, explainable diagnostic AI.',
    tags: ['Healthcare AI', 'Deep Learning', 'Medical Imaging', 'Explainability'],
    accent: 'amber',
    pdf: `${assetBase}research/ai-healthcare-diagnostics.pdf`,
    question: 'Where can AI-assisted diagnostics exceed average human performance, and what must accompany that capability?',
    objectives: [
      'Trace evolution from rule-based systems to deep learning',
      'Examine imaging, oncology, pathology, and clinical decision support',
      'Consider bias, data quality, explainability, and regulation',
      'Map future directions such as multimodal and federated learning',
    ],
    method: 'Independent synthesis of the technical evolution and practical implications of AI diagnostics, with attention to CNNs, foundation models, clinical workflows, and human oversight.',
    findings: 'Targeted diagnostic tasks can match or exceed average human performance, but generalization, validation, and clinical integration dictate real-world value.',
    takeaway: 'The strongest model is not the whole solution: reliable diagnostic AI depends on high-quality data, transparent reasoning, and collaborative clinical use.',
  },
  {
    id: '03',
    date: 'December 2022',
    type: 'Formal Academic Investigation',
    title: 'Fake News Detection Using Machine Learning Techniques',
    short: 'A methodology for identifying misinformation in text through NLP feature extraction, comparative modelling, and a hybrid CNN + SVM detection approach.',
    tags: ['Misinformation', 'NLP', 'CNN + SVM', 'Text Classification'],
    accent: 'violet',
    pdf: `${assetBase}research/fake-news-detection-ml.pdf`,
    question: 'How can machine learning distinguish legitimate news from fabricated content at the speed and scale of online platforms?',
    objectives: [
      'Develop robust models for text classification',
      'Compare content, source, and propagation feature sets',
      'Benchmark accuracy, precision, recall, and F1-score',
      'Propose a scalable framework for content credibility',
    ],
    method: 'A reproducible pipeline covering data acquisition, preprocessing, embeddings, deterministic splits, cross-validation, comparative model training, and evaluation on public text datasets.',
    findings: 'A hybrid approach combining CNN deep feature extraction with traditional SVM classification outperforms single-method baselines in the presented framework.',
    takeaway: 'Detection quality is inseparable from semantic context, evolving deception patterns, representative labels, and careful handling of false positives.',
  },
  {
    id: '04',
    date: 'December 2024',
    type: 'Independent Research Presentation',
    title: 'AI in Climate Change Prediction and Environmental Sustainability',
    short: 'A visual research presentation on AI for climate prediction, renewable energy optimisation, resource management, and equitable deployment.',
    tags: ['Climate AI', 'Neural Networks', 'Sustainability', 'Resource Optimization'],
    accent: 'green',
    pdf: `${assetBase}research/ai-climate-change-sustainability.pdf`,
    question: 'How can computational intelligence support climate action while remaining accessible, fair, and environmentally responsible?',
    objectives: [
      'Explore neural networks for atmospheric and ocean modelling',
      'Survey renewable energy, resource, and conservation applications',
      'Critically examine compute, access, and algorithmic bias',
      'Assess future implications for climate policy',
    ],
    method: 'Structured research presentation synthesising climate science context, predictive modelling approaches, sustainability applications, and ethical challenges.',
    findings: 'AI serves as a powerful predictive and optimization instrument, while computational cost, data access, and equitable deployment remain core constraints.',
    takeaway: 'Climate intelligence is valuable only when its benefits can reach the communities most exposed to environmental risk.',
  },
  {
    id: '05',
    date: 'September 2025',
    type: 'Independent Research',
    title: 'The Evolution of Generative AI Models: From Text to General Intelligence',
    short: 'A deep dive into the progression from transformer-based text generation to multimodal systems, reasoning, contextual awareness, and autonomous agents.',
    tags: ['Generative AI', 'Transformers', 'Multimodal', 'Autonomous Agents'],
    accent: 'rose',
    pdf: `${assetBase}research/evolution-generative-ai-models.pdf`,
    question: 'What changes as generative models move from fluent text production toward broader, more general capabilities?',
    objectives: [
      'Trace evolution from GPT-2 and GPT-3 to modern foundation models',
      'Analyze transformer architecture and emergent reasoning',
      'Compare task-specific ML with general-purpose generative systems',
      'Explore safety, governance, and the human role in future AI',
    ],
    method: 'Independent research synthesis spanning model history, attention architectures, multimodal systems, reasoning, regulation, and human-AI collaboration.',
    findings: 'The study traces a staged progression toward multimodal reasoning and agentic execution, while treating full AGI as aspirational and not yet achieved.',
    takeaway: 'Capability growth is inseparable from system integration, governance, and the human engineering that guides how models are applied.',
  },
];

const experience = [
  {
    period: 'September 2026 — Present',
    role: 'Founder & AI Engineer',
    company: 'XYVERION AI',
    current: true,
    body: 'Building AI software across conversational AI, agentic workflows, desktop automation, LLM-based systems, and practical product applications.',
    bullets: [
      'Developed and engineered XYVERION 3.0, a local autonomous AI desktop system powered by a fine-tuned causal language model.',
      'Worked with model integration, tool calling, local model execution, application interfaces and automation.',
      'Built native Windows automation and local AI system components.',
      'Developed supporting software architecture around model execution, memory and system control.',
    ],
  },
  {
    period: 'August 2026 — Present',
    role: 'AI Data Annotation & Evaluation Contractor',
    company: 'Innodata India Pvt. Ltd.',
    current: true,
    body: 'Executing structured AI training data annotation, content moderation, dense grounding, and systematic model evaluation workflows under strict SLAs.',
    bullets: [
      'AI training data annotation, grounding workflows, and reference-expression workflows.',
      'Evaluated model outputs for factual grounding, contextual consistency, alignment, and safety.',
      'Linguistic, grammatical, and semantic quality review across multi-turn human-AI datasets.',
      'Applied guideline-based rubrics and QA to deliver benchmark training data while meeting assigned AHT and SLA targets.',
    ],
  },
  {
    period: 'January 2026 — July 2026',
    role: 'AI Training & Data Annotation Contributor',
    company: 'Outlier AI',
    body: 'Contributed structured human feedback, comparative ranking, and multimodal data labeling to generative AI evaluation workflows.',
    bullets: [
      'Structured human feedback and comparative model output ranking for reasoning and code generation models.',
      'Multimodal data labeling, image annotation, and quality assurance under strict guideline rubrics.',
      'Curated multilingual speech and voice dataset components across English, Hindi, and Marathi prompts.',
      'Performed quality assessments and systematic error categorization to improve model alignment.',
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
    val: '1,749',
    lbl: 'Instruction Dataset Examples',
    sub: '1,749-example multi-turn instruction dataset covering reasoning & schemas',
    highlight: false,
  },
  {
    val: '112',
    lbl: 'LoRA Adapter Shards Fused',
    sub: 'Automated post-training pipeline merging adapter weights into base safetensors',
    highlight: false,
  },
  {
    val: '55+',
    lbl: 'Windows / Voice Commands',
    sub: 'Native Ctypes controller executing system actions and app lifecycle',
    highlight: false,
  },
  {
    val: '< 0.3s',
    lbl: 'Native Controller Latency',
    sub: 'Low-latency Win32 OS execution and media/window hooks',
    highlight: true,
  },
];

const xyverionStack = [
  'Python',
  'PyTorch',
  'Hugging Face Transformers',
  'PEFT',
  '4-bit QLoRA',
  'bitsandbytes',
  'NF4',
  'LoRA',
  'Safetensors',
  'Win32 API',
  'Python ctypes',
  'SQLite',
  'Microsoft Edge WebView2',
  'JavaScript',
  'HTML/CSS',
  'Git',
];

const xyverionPillars = [
  {
    icon: <Cpu size={22} />,
    num: '01',
    title: '4-Bit QLoRA Fine-Tuning',
    desc: 'I adapted causal open-source LLMs on consumer edge hardware (NVIDIA GTX 1650 4GB) using bitsandbytes NormalFloat4 (NF4) quantization, gradient checkpointing, and targeted LoRA projection matrices.',
    bullets: [
      'Targeted attention projection modules (q_proj, k_proj, v_proj, o_proj)',
      'Low-rank parameters (r=16, α=32) with paged AdamW 8-bit optimizer',
      'Validation loss reduced from 1.6048 to 1.2473 across 85 optimization steps',
    ],
    tags: ['PEFT', '4-Bit QLoRA', 'bitsandbytes', 'PyTorch', 'Transformers'],
  },
  {
    icon: <Layers size={22} />,
    num: '02',
    title: 'Safetensors Weight Fusion',
    desc: 'I eliminated runtime PEFT adapter overhead by developing an automated Python post-training fusion script that directly merges 112 LoRA adapter shards into base model weights.',
    bullets: [
      'Direct mathematical fusion into base safetensors architecture',
      'Zero runtime adapter overhead at token generation time',
      'Standalone native checkpoint deployment without PEFT dependencies',
    ],
    tags: ['Safetensors', 'Weight Fusion', 'Tensor Arithmetic', 'Zero Overhead'],
  },
  {
    icon: <Terminal size={22} />,
    num: '03',
    title: 'Native Win32 Automation',
    desc: 'I bridged language generation directly to the operating system via low-level Win32 C API bindings in Python ctypes, enabling autonomous desktop actions with sub-second latency.',
    bullets: [
      '55+ natural voice and system commands: app lifecycle, media, and volume',
      'GDI screenshot buffer capture and active window state management',
      'Safe Recycle Bin deletion implemented through SHFileOperationW',
    ],
    tags: ['Win32 API', 'Python Ctypes', 'Voice Engine', 'Low-Latency Hooks'],
  },
  {
    icon: <Database size={22} />,
    num: '04',
    title: 'Desktop Client & Persistent Memory',
    desc: 'I engineered a frameless desktop client using Microsoft Edge WebView2, backed by SQLite episodic memory for multi-session conversational recall and automated GPU VRAM lifecycle management.',
    bullets: [
      'Persistent SQLite relational memory schema for conversational recall',
      'Frameless, modern client built with Microsoft Edge WebView2',
      'Automatic GPU cache and VRAM lifecycle management on application exit',
    ],
    tags: ['Edge WebView2', 'SQLite', 'Episodic Memory', 'VRAM Management'],
  },
];

const whatIBuildCards = [
  {
    icon: <Bot size={24} />,
    title: 'AI AGENTS',
    copy: 'Tool-using AI systems designed to interact with software, APIs and real workflows.',
    tag: 'Autonomous Systems',
  },
  {
    icon: <MessageSquare size={24} />,
    title: 'CONVERSATIONAL AI',
    copy: 'AI assistants designed around business questions, customer interactions and practical workflows.',
    tag: 'Dialogue & Intent',
  },
  {
    icon: <BrainCircuit size={24} />,
    title: 'MODEL ENGINEERING',
    copy: 'LLM fine-tuning, model evaluation, dataset curation and parameter-efficient adaptation.',
    tag: 'Weights & Curation',
  },
  {
    icon: <Workflow size={24} />,
    title: 'AUTOMATION',
    copy: 'AI-powered desktop, software and workflow automation connecting models to real actions.',
    tag: 'OS & Integration',
  },
];

const capabilities = {
  'AI / Model Engineering': [
    'Python',
    'PyTorch',
    'Transformers',
    'QLoRA',
    'PEFT',
    'LoRA',
    'NF4 Quantization',
    'LLM Evaluation',
    'AI Agents',
    'Model Alignment',
    'Data Annotation',
    'Conversational AI',
  ],
  'Systems / Automation': [
    'Win32 API',
    'Python ctypes',
    'Safetensors',
    'SQLite',
    'Microsoft Edge WebView2',
    'GPU / VRAM Lifecycle Management',
    'OS Automation',
  ],
  'Software': [
    'JavaScript',
    'HTML5',
    'CSS3',
    'REST APIs',
    'Git',
  ],
  'Quality / Evaluation': [
    'Model Output Evaluation',
    'Grounding',
    'Human-in-the-Loop QA',
    'Multimodal Annotation',
    'Benchmark Data Auditing',
    'Linguistic & Semantic Evaluation',
  ],
};

function Reveal({ children, className = '', delay = 0, y = 20 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
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
    { id: 'work', label: 'Selected Work' },
    { id: 'xyverion', label: 'XYVERION 3.0' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'research', label: 'Research' },
    { id: 'education', label: 'Education' },
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
      <div className="hero-content page-width">
        <Reveal>
          <div className="eyebrow">
            <span className="status-dot" /> OPEN TO AI ENGINEERING &amp; COLLABORATION OPPORTUNITIES{' '}
            <span className="eyebrow-line" />
          </div>
        </Reveal>
        <Reveal delay={0.04}>
          <div className="hero-name">DURGESH UNDE</div>
          <div className="hero-role">
            AI ENGINEER &amp; FOUNDER <span>/</span> LLMs <span>/</span> AI AGENTS <span>/</span> AUTOMATION <span>/</span> MODEL ENGINEERING
          </div>
        </Reveal>
        <Reveal delay={0.07}>
          <h1>
            Building AI systems
            <br />
            <em>that work beyond the demo.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="hero-copy">
            I build AI-powered software across LLM fine-tuning, AI agents, conversational AI,
            automation, model evaluation, and full-stack applications.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => onNavigate('work')}>
              EXPLORE MY WORK <ArrowDownRight size={16} />
            </button>
            <button className="button button-quiet" onClick={() => onNavigate('xyverion')}>
              XYVERION 3.0 <ArrowUpRight size={16} />
            </button>
            <a className="button button-ghost" href={resumeHref} download="Durgesh-Unde-Resume.pdf">
              DOWNLOAD RESUME <Download size={15} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="hero-foot">
            <div>
              <span className="mini-label">CORE FOCUS</span>
              <strong>LLMs · AI Agents · Automation · Model Engineering</strong>
            </div>
            <div className="scroll-note">
              <span className="scroll-line" /> Scroll to explore
            </div>
          </div>
        </Reveal>
      </div>

      <div className="signal-panel" aria-hidden="true">
        <div className="signal-label">SYSTEM ARCHITECTURE / LOCAL SLM &amp; AGENTS</div>
        <div className="signal-canvas">
          <div className="signal-ring ring-a" />
          <div className="signal-core">
            <BrainCircuit size={28} />
            <span>AI</span>
          </div>
          <svg viewBox="0 0 500 500">
            <path d="M90 148 C180 80 230 220 304 150 S430 130 416 286 290 420 192 350 98 310 90 148" />
            <path d="M56 270 C170 220 208 330 274 274 S365 170 444 252" />
          </svg>
        </div>
        <div className="signal-meta">
          <span>LOCAL SLM ENGINE</span>
          <span>AUTONOMOUS AGENTS</span>
          <span>WIN32 AUTOMATION</span>
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
  const keywords = [
    'LLMs',
    'AI Agents',
    'Conversational AI',
    'Model Engineering',
    'Automation',
    'AI Evaluation',
  ];

  return (
    <section className="about section page-width" id="about">
      <Reveal>
        <SectionIntro
          eyebrow="01 / PROFILE"
          title={'Building AI systems<br /><em>from the model layer up.</em>'}
          copy="I build AI systems across LLM fine-tuning, AI agents, conversational AI, automation, model evaluation and full-stack application development."
        />
      </Reveal>
      <div className="about-layout">
        <Reveal delay={0.06} className="about-note">
          <div className="editorial-number">01</div>
          <p>
            As the founder of XYVERION AI, I focus on turning AI capabilities into practical software
            — from locally running language models and desktop automation to conversational systems for
            real-world business workflows.
          </p>
          <p style={{ marginTop: '16px', color: '#9fa9a7' }}>
            I enjoy working where models, software and systems engineering meet.
          </p>
          <span className="line-accent" />
        </Reveal>
        <Reveal delay={0.12} className="keyword-field">
          <div className="keyword-card keyword-main">
            <Sparkles size={18} />
            <span>
              Core Technical
              <br />
              <strong>Focus Areas</strong>
            </span>
          </div>
          {keywords.map((x, i) => (
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
          title={'Professional experience &amp; <em>technical evidence.</em>'}
          copy="My track record developing autonomous local AI systems, building software workflows, and conducting systematic model evaluation under strict rubrics."
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
                {item.current ? <span className="pulse" /> : <span className="timeline-dot" />}
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
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
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

function SelectedWork({ onNavigate }) {
  return (
    <section className="selected-work-section section page-width" id="work">
      <Reveal>
        <SectionIntro
          eyebrow="03 / SELECTED WORK"
          title={'Practical AI software &amp; <em>model systems.</em>'}
          copy="Featured engineering work turning causal language models and agentic tool-use into functional, locally executed desktop software."
        />
      </Reveal>

      <Reveal delay={0.08}>
        <div className="flagship-feature-card">
          <div className="feature-card-content">
            <div className="feature-badge-row">
              <span className="badge-flagship">FLAGSHIP PROJECT</span>
              <span className="badge-category">LOCAL AI &amp; AUTONOMOUS SYSTEMS</span>
            </div>
            <h3>XYVERION 3.0</h3>
            <h4>Autonomous Desktop AI &amp; Local SLM Engine</h4>
            <p>
              An autonomous desktop AI system powered by a fine-tuned causal language model.
              Combines 4-bit QLoRA adaptation, automated Safetensors weight fusion, native
              Win32 desktop automation, and persistent SQLite memory into a unified desktop client.
            </p>

            <div className="feature-metric-strip">
              <div className="metric-pill">
                <strong>1.2473</strong>
                <span>Val Loss</span>
              </div>
              <div className="metric-pill">
                <strong>1,749</strong>
                <span>Instruction Dataset</span>
              </div>
              <div className="metric-pill">
                <strong>112</strong>
                <span>Fused Shards</span>
              </div>
              <div className="metric-pill">
                <strong>&lt; 0.3s</strong>
                <span>Win32 Latency</span>
              </div>
            </div>

            <div className="feature-tags">
              <span>Local SLM</span>
              <span>4-Bit QLoRA</span>
              <span>Safetensors Fusion</span>
              <span>Win32 Ctypes</span>
              <span>SQLite Memory</span>
              <span>Edge WebView2</span>
            </div>

            <div className="feature-actions">
              <button className="button button-primary" onClick={() => onNavigate('xyverion')}>
                EXPLORE CASE STUDY <ArrowDownRight size={16} />
              </button>
            </div>
          </div>

          <div className="feature-card-preview" onClick={() => onNavigate('xyverion')}>
            <img
              src={dashboardImg}
              alt="XYVERION 3.0 desktop interface preview"
              loading="lazy"
            />
            <div className="preview-overlay">
              <span>View Full Case Study &amp; Technical Breakdown <ArrowUpRight size={14} /></span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ScreenshotLightbox({ image, caption, onClose }) {
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
      className="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close image preview">
          <X size={20} />
        </button>
        <img src={image} alt={caption} />
        <div className="lightbox-caption">{caption}</div>
      </div>
    </motion.div>
  );
}

function XyverionCaseStudy() {
  const [activeImage, setActiveImage] = useState(null);

  const stages = [
    [
      '01',
      'Data Curation & SFT',
      'Curated a 1,749-example multi-turn instruction dataset formatted with deductive reasoning, tool schemas, and strict creator guardrails.',
    ],
    [
      '02',
      '4-Bit QLoRA Fine-Tuning',
      'Fine-tuned a causal LLM using NF4 quantization, paged AdamW, and targeted low-rank adapter matrices (r=16, α=32), driving validation loss from 1.6048 to 1.2473.',
    ],
    [
      '03',
      'Safetensors Weight Fusion',
      'Automated post-training script merging 112 LoRA adapter shards directly into base safetensors weights for zero runtime adapter overhead.',
    ],
    [
      '04',
      'Evaluation & Human Feedback',
      'Systematic output evaluation, comparative ranking, error taxonomy categorization, and alignment validation against target guidelines.',
    ],
    [
      '05',
      'Win32 Systems Integration',
      'Bound model outputs directly to native Win32 C APIs using Python ctypes for 55+ natural voice actions, GDI capture, and window management.',
    ],
    [
      '06',
      'Local SLM Deployment',
      'Packaged an offline-capable small language model with persistent SQLite episodic memory and automated GPU VRAM lifecycle management.',
    ],
  ];

  return (
    <section className="xyverion-section" id="xyverion">
      <div className="page-width">
        <Reveal>
          <div className="xyverion-head">
            <div className="xyverion-badge-row">
              <span className="badge-live">FLAGSHIP CASE STUDY</span>
              <span className="badge-arch">AUTONOMOUS DESKTOP AI &amp; LOCAL SLM ENGINE</span>
            </div>
            <h2>
              XYVERION 3.0 —<br />
              <em>Autonomous Desktop AI &amp; Local SLM Engine.</em>
            </h2>
            <p className="section-intro">
              I engineered a local AI desktop system combining a fine-tuned language model, native
              Windows automation, persistent memory, and a modern desktop client.
            </p>
          </div>
        </Reveal>

        {/* SCREENSHOT GALLERY */}
        <Reveal delay={0.06}>
          <div className="screenshot-gallery">
            <div className="gallery-card primary-card" onClick={() => setActiveImage({ src: dashboardImg, caption: 'XYVERION 3.0 desktop interface' })}>
              <div className="gallery-img-wrap">
                <img
                  src={dashboardImg}
                  alt="XYVERION 3.0 desktop interface showing modes of thinking and neural engine status"
                  loading="lazy"
                />
                <div className="zoom-hint">
                  <ZoomIn size={16} /> Click to expand
                </div>
              </div>
              <div className="gallery-caption">
                <strong>XYVERION 3.0 desktop interface</strong>
                <span>Home dashboard with multi-mode reasoning controls and neural engine status</span>
              </div>
            </div>

            <div className="gallery-card secondary-card" onClick={() => setActiveImage({ src: chatImg, caption: 'Local AI system / working UI' })}>
              <div className="gallery-img-wrap">
                <img
                  src={chatImg}
                  alt="Local AI system / working UI showing conversational tool calling and memory vault"
                  loading="lazy"
                />
                <div className="zoom-hint">
                  <ZoomIn size={16} /> Click to expand
                </div>
              </div>
              <div className="gallery-caption">
                <strong>Local AI system / working UI</strong>
                <span>Active conversational workspace with reasoning protocols and context inspector</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* METRICS GRID */}
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

        {/* TECHNICAL STACK PILLS */}
        <Reveal delay={0.14}>
          <div className="stack-wrap">
            <span className="mini-label">VERIFIED TECHNICAL STACK</span>
            <div className="xyverion-tech-chips">
              {xyverionStack.map((tech) => (
                <span className="tech-chip" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 4 ARCHITECTURAL PILLARS */}
        <div className="pillars-grid">
          {xyverionPillars.map((p, i) => (
            <Reveal delay={i * 0.07} key={p.num}>
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

        {/* TECHNICAL WORKFLOW */}
        <div className="workflow-container">
          <Reveal>
            <div className="pipeline-head">
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-index">04 /</span> TECHNICAL WORKFLOW
                </div>
                <h2>
                  From data to
                  <br />
                  <em>autonomous inference.</em>
                </h2>
              </div>
              <p>
                A systematic workflow translating instruction datasets and human feedback into
                quantized, fused, and locally executed desktop intelligence.
              </p>
            </div>
          </Reveal>
          <div className="pipeline">
            <div className="pipeline-line" />
            {stages.map(([num, title, desc], i) => (
              <Reveal delay={i * 0.05} key={title}>
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
      </div>

      <AnimatePresence>
        {activeImage && (
          <ScreenshotLightbox
            image={activeImage.src}
            caption={activeImage.caption}
            onClose={() => setActiveImage(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function WhatIBuild() {
  return (
    <section className="what-i-build-section section page-width" id="build">
      <Reveal>
        <SectionIntro
          eyebrow="05 / WHAT I BUILD"
          title={'Practical software<br /><em>powered by intelligence.</em>'}
          copy="I focus on turning AI capabilities into practical software — from autonomous desktop systems to conversational tools for real workflows."
        />
      </Reveal>
      <div className="what-i-build-grid">
        {whatIBuildCards.map((card, i) => (
          <Reveal delay={i * 0.06} key={card.title}>
            <div className="build-card">
              <div className="build-card-top">
                <div className="build-icon">{card.icon}</div>
                <span className="build-tag">{card.tag}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Capabilities() {
  const [selected, setSelected] = useState('AI / Model Engineering');

  return (
    <section className="capabilities section page-width" id="capabilities">
      <Reveal>
        <SectionIntro
          eyebrow="06 / CAPABILITIES"
          title={'Technical foundation &amp; <em>applied depth.</em>'}
          copy="A focused technical skillset across model engineering, system-level automation, software development, and evaluation."
        />
      </Reveal>
      <div className="skills-layout">
        <div className="skill-tabs">
          {Object.keys(capabilities).map((key, i) => (
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
          {capabilities[selected].map((skill, i) => (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.025 }}
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
          <span className="visual-code">THREAT / ANOMALY</span>
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
            <span>VERIFICATION</span>
            <b>context</b>
            <small>NLP / hybrid classification</small>
          </div>
          <div className="news-pulse" />
        </>
      ) : id === '04' ? (
        <>
          <div className="climate-orbit orbit-a" />
          <div className="climate-core" />
        </>
      ) : (
        <>
          <div className="gen-node n1" />
          <div className="gen-node n2" />
          <div className="gen-node n3" />
          <div className="gen-line l1" />
          <div className="gen-line l2" />
          <span className="visual-code">TRANSFORMER → MULTIMODAL</span>
        </>
      )}
    </div>
  );
}

function ResearchCard({ item, onOpen }) {
  return (
    <motion.article
      className={`research-card accent-${item.accent}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
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
            View study <ArrowUpRight size={15} />
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
            eyebrow="07 / RESEARCH &amp; WRITING"
            title={'Independent inquiries,<br /><em>carefully examined.</em>'}
            copy="Five formal and independent research investigations spanning ML threat detection, medical computer vision, misinformation NLP, climate modeling, and generative model scaling laws."
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
          <Reveal delay={i * 0.05} key={item.id}>
            <ResearchCard item={item} onOpen={onOpen} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="education section page-width" id="education">
      <Reveal>
        <SectionIntro
          eyebrow="08 / CREDENTIALS"
          title={'Academic foundation &amp; <em>certified language fluency.</em>'}
          copy="My current and foundational academic path, paired with certified English communication credentials."
        />
      </Reveal>
      <div className="education-grid">
        <article className="uopeople-card">
          <div className="edu-badge">CURRENT &amp; FUTURE PATH</div>
          <div className="edu-icon"><GraduationCap size={22} /></div>
          <h3>B.S. Computer Science</h3>
          <p className="edu-institution">University of the People</p>
          <b className="starting-pill">Starting November 2026</b>
        </article>

        <article>
          <span>FOUNDATIONAL EDUCATION</span>
          <h3>Higher Secondary Certificate (HSC) — Science</h3>
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
            <span className="status-dot" /> OPEN TO AI ENGINEERING, PRODUCT &amp; COLLABORATION OPPORTUNITIES
          </div>
          <h2>
            Let’s build &amp;
            <br />
            <em>collaborate.</em>
          </h2>
          <p>
            I'm interested in building AI products, engineering LLM-powered systems, collaborating
            on applied AI projects, and developing automation that solves real operational problems.
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
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-top">
          <span>RESEARCH &amp; WRITING / {item.id}</span>
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
          <span>Original document · research study download</span>
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
        <SelectedWork onNavigate={navigate} />
        <XyverionCaseStudy />
        <WhatIBuild />
        <Capabilities />
        <Research onOpen={setModal} />
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
          <div className="footer-center">
            <span>AI Engineer · Founder · Builder</span>
            <small>LLMs · AI Agents · Automation · Applied AI</small>
          </div>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/durgesh-u-89911241b/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="mailto:durgeshunde@gmail.com">Email</a>
            <span className="footer-copy">© {new Date().getFullYear()} Durgesh Unde</span>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {modal && <ResearchModal item={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

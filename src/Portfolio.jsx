import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowDown,
  Code2,
  Briefcase,
  Mail,
  Download,
  Menu,
  X,
  Plus,
  Pause,
  Play,
} from "lucide-react";
import "./redesign.css";

const base = import.meta.env.BASE_URL;
const github = "https://github.com/durgeshunde";
const linkedin = "https://www.linkedin.com/in/durgesh-unde-89911241b/";
const resume = `${base}assets/durgesh-unde-resume.pdf`;
const writings = [
  [
    "2025",
    "The Evolution of Generative AI Models",
    "Transformers · Multimodal systems",
    "evolution-generative-ai-models.pdf",
  ],
  [
    "2024",
    "AI for Climate & Environmental Sustainability",
    "Climate prediction · Responsible deployment",
    "ai-climate-change-sustainability.pdf",
  ],
  [
    "2024",
    "AI in Healthcare Diagnostics",
    "Medical imaging · Explainability",
    "ai-healthcare-diagnostics.pdf",
  ],
  [
    "2023",
    "Machine Learning for Threat Detection",
    "Cybersecurity · Anomaly detection",
    "enhancing-cybersecurity-threat-detection.pdf",
  ],
  [
    "2022",
    "Fake News Detection with Machine Learning",
    "NLP · Text classification",
    "fake-news-detection-ml.pdf",
  ],
];
const steps = [
  {
    title: "Curate",
    label: "01 / DATA",
    body: "Start with the task. Structure instruction examples, tool schemas and evaluation criteria before adapting a model.",
    tags: ["Instruction datasets", "Data quality", "Task definition"],
  },
  {
    title: "Adapt",
    label: "02 / MODEL",
    body: "Work within the hardware budget. Use parameter efficient fine tuning and quantization to adapt a local language model.",
    tags: ["PyTorch", "QLoRA / PEFT", "Transformers"],
  },
  {
    title: "Connect",
    label: "03 / SYSTEM",
    body: "Give the model a useful interface. Connect tools, native desktop actions, APIs and persistent context around inference.",
    tags: ["Python / Win32", "SQLite", "REST APIs"],
  },
  {
    title: "Evaluate",
    label: "04 / EVIDENCE",
    body: "Look past a convincing demo. Inspect outputs, compare baselines and document where a system fails and what a metric actually measures.",
    tags: ["Model evaluation", "Controlled experiments", "Human feedback"],
  },
];

function ArrowLink({ href, children, ...props }) {
  return (
    <a className="arrow-link" href={href} {...props}>
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}

// Procedural point sculpture, rendered locally without a 3D engine or API calls.
function Sculpture() {
  const canvas = useRef(null);
  const [shape, setShape] = useState(0);
  const [paused, setPaused] = useState(false);
  const state = useRef({ shape: 0, paused: false });
  useEffect(() => {
    state.current = { shape, paused };
  }, [shape, paused]);
  useEffect(() => {
    const el = canvas.current,
      ctx = el.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0,
      height = 0,
      frame,
      visible = true,
      time = 0,
      last = 0;
    const pointer = { x: 0, y: 0 };
    const resize = () => {
      width = el.clientWidth;
      height = el.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(el);
    const move = (e) => {
      const r = el.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width - 0.5;
      pointer.y = (e.clientY - r.top) / r.height - 0.5;
    };
    const leave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    const draw = (now) => {
      frame = requestAnimationFrame(draw);
      if (now - last < 32) return;
      const delta = Math.min((now - last) / 1000, 0.06);
      last = now;
      if (!visible || document.hidden) return;
      if (!state.current.paused && !reduced.matches) time += delta;
      ctx.clearRect(0, 0, width, height);
      const angle = time * 0.13 + pointer.x * 0.5,
        tilt = -0.42 + pointer.y * 0.28;
      const scale = Math.min(width, height) * 0.32;
      const dots = [];
      for (let i = 0; i < 78; i++) {
        const u = (i / 78) * Math.PI * 2;
        for (let j = 0; j < 40; j++) {
          const v = (j / 40) * Math.PI * 2;
          let x, y, z;
          if (state.current.shape === 0) {
            const radius = 1 + 0.31 * Math.cos(v);
            x = radius * Math.cos(u);
            y = radius * Math.sin(u);
            z = 0.42 * Math.sin(v) + 0.22 * Math.sin(3 * u + time * 0.2);
          } else if (state.current.shape === 1) {
            x = (i / 77 - 0.5) * 2.7;
            y = (j / 39 - 0.5) * 2.3;
            z =
              0.34 *
              Math.sin(x * 3 + time * 0.7) *
              Math.cos(y * 2 - time * 0.3);
          } else {
            const phi = ((j + 0.5) / 40) * Math.PI;
            const r =
              1 + 0.1 * Math.sin(5 * u + time * 0.4) * Math.sin(3 * phi);
            x = r * Math.sin(phi) * Math.cos(u);
            y = r * Math.cos(phi);
            z = r * Math.sin(phi) * Math.sin(u);
          }
          const rx = x * Math.cos(angle) - z * Math.sin(angle),
            rz = x * Math.sin(angle) + z * Math.cos(angle);
          const ry = y * Math.cos(tilt) - rz * Math.sin(tilt),
            depth = y * Math.sin(tilt) + rz * Math.cos(tilt);
          const p = 3.7 / (3.7 + depth);
          dots.push([
            width / 2 + rx * scale * p,
            height / 2 + ry * scale * p,
            depth,
            p,
            i,
            j,
          ]);
        }
      }
      dots.sort((a, b) => b[2] - a[2]);
      for (const [x, y, z, p, i, j] of dots) {
        const alpha = Math.max(0.12, Math.min(0.94, 0.53 - z * 0.25));
        ctx.fillStyle = `rgba(${i % 13 === 0 ? "84,64,47" : "174,82,44"},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, (j % 5 === 0 ? 1.28 : 0.86) * p, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    resize();
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div className="sculpture-wrap">
      <div className="sculpture-top mono">
        <span>FIG. 001</span>
        <span>COMPUTATIONAL FORM</span>
        <span>↗</span>
      </div>
      <div className="sculpture-stage">
        <div className="crosshair one" />
        <div className="crosshair two" />
        <canvas
          ref={canvas}
          aria-label="Interactive copper point sculpture"
          role="img"
        />
        <span className="axis mono">
          Y ↑<br />X →
        </span>
      </div>
      <div className="sculpture-bottom">
        <div className="shape-controls" aria-label="Sculpture shape">
          {["Orbit", "Wave", "Field"].map((label, i) => (
            <button
              key={label}
              onClick={() => setShape(i)}
              aria-pressed={shape === i}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          className="pause"
          aria-label={
            paused ? "Play sculpture animation" : "Pause sculpture animation"
          }
          onClick={() => setPaused((v) => !v)}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
      <span className="sculpture-note mono">
        A LITTLE MATH. A LITTLE MOTION. MOVE YOUR CURSOR.
      </span>
    </div>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [step, setStep] = useState(0);
  const dialog = useRef(null);
  const [image, setImage] = useState("");
  const [reading, setReading] = useState(0);
  useEffect(() => {
    const scroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setReading(max > 0 ? scrollY / max : 0);
    };
    addEventListener("scroll", scroll, { passive: true });
    scroll();
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => {
      removeEventListener("scroll", scroll);
      observer.disconnect();
    };
  }, []);
  const openImage = (src) => {
    setImage(src);
    dialog.current.showModal();
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div
        className="reading-progress"
        style={{ transform: `scaleX(${reading})` }}
      />
      <header>
        <a href="#top" className="brand" aria-label="Durgesh Unde home">
          <span className="brand-symbol">
            d<span>u</span>
          </span>
          <span>
            Durgesh Unde
            <span className="brand-sub mono">AI ENGINEER & FOUNDER</span>
          </span>
        </a>
        <nav aria-label="Main navigation" className={menu ? "open" : ""}>
          {[
            ["work", "Work"],
            ["approach", "Approach"],
            ["research", "Research"],
            ["about", "About"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-contact"
            onClick={() => setMenu(false)}
          >
            Let’s talk <ArrowUpRight size={15} />
          </a>
        </nav>
        <button
          className="menu-toggle"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
          onClick={() => setMenu((v) => !v)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main">
        <section className="hero page" id="top">
          <div className="hero-top mono">
            <span>
              <i className="status-dot" /> OPEN TO ENGINEERING ROLES &
              COLLABORATIONS
            </span>
            <span>BASED IN INDIA · BUILDING EVERYWHERE</span>
          </div>
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">
                INDEPENDENT AI ENGINEER / FOUNDER, XYVERION AI
              </p>
              <h1>
                Intelligence,
                <br />
                made <em>useful.</em>
              </h1>
              <p className="hero-description">
                I build and evaluate AI systems. From adapting language models
                on local hardware to connecting agents with software people can
                use.
              </p>
              <div className="hero-actions">
                <a className="button dark" href="#work">
                  Explore my work <ArrowDown size={17} />
                </a>
                <a className="quiet-link" href={resume} download>
                  Resume <Download size={16} />
                </a>
              </div>
              <div className="hero-signature">
                <span className="signature-line" />
                <span>Models. Systems. Evidence.</span>
              </div>
            </div>
            <Sculpture />
          </div>
          <div className="hero-footer mono">
            <span>SELECTED ENGINEERING & INDEPENDENT RESEARCH</span>
            <a href="#work">
              SCROLL TO DISCOVER <ArrowDown size={13} />
            </a>
            <span>PORTFOLIO / 2026</span>
          </div>
        </section>
        <div className="discipline-strip" aria-label="Technical focus">
          <span>LLM FINE TUNING</span>
          <i>✳</i>
          <span>AGENT SYSTEMS</span>
          <i>✳</i>
          <span>MODEL EVALUATION</span>
          <i>✳</i>
          <span>APPLIED RESEARCH</span>
        </div>
        <section className="work-section" id="work">
          <div className="page">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">01 / SELECTED WORK</p>
                <h2>
                  Built to explore.
                  <br />
                  <em>Engineered to work.</em>
                </h2>
              </div>
              <p>
                Three ways I work with AI:
                <br />
                adapt a model, build a product,
                <br />
                question what the evidence says.
              </p>
            </div>
            <article className="flagship reveal" id="xyverion">
              <div className="project-copy">
                <div className="project-label mono">
                  <span>01 / LOCAL AI SYSTEM</span>
                  <span>2026</span>
                </div>
                <h3>
                  XYVERION <em>3.0</em>
                </h3>
                <p className="project-subtitle">
                  A language model.
                  <br />A desktop it can work with.
                </p>
                <p>
                  A local AI desktop system bringing together QLoRA fine tuning,
                  native Windows controls and persistent conversational memory.
                </p>
                <div className="tags">
                  <span>Python</span>
                  <span>PyTorch</span>
                  <span>PEFT / QLoRA</span>
                  <span>Win32</span>
                  <span>SQLite</span>
                </div>
                <a className="arrow-link" href="#case-study">
                  Inside the engineering <Plus size={18} />
                </a>
              </div>
              <div className="project-screen">
                <div className="screen-toolbar mono">
                  <span>
                    <i />
                    <i />
                    <i />
                  </span>
                  XYVERION / DESKTOP CLIENT<span>↗</span>
                </div>
                <button
                  className="screenshot-button"
                  onClick={() => openImage("xyverion-dashboard.png")}
                  aria-label="Enlarge XYVERION desktop screenshot"
                >
                  <img
                    src={`${base}assets/xyverion-dashboard.png`}
                    alt="Actual XYVERION 3.0 desktop dashboard with local neural engine controls"
                    loading="lazy"
                  />
                  <span>
                    ACTUAL APPLICATION · CLICK TO EXPLORE <Plus size={14} />
                  </span>
                </button>
              </div>
            </article>
            <div className="project-pair">
              <article className="small-project reveal">
                <a
                  className="project-art collusion-art"
                  href={`${github}/when-correlation-lies`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View When Correlation Lies research repository"
                >
                  <div className="art-meta mono">
                    CONTROLLED MULTI AGENT EXPERIMENT
                  </div>
                  <div className="agent-graph" aria-hidden="true">
                    <svg viewBox="0 0 460 235">
                      <path
                        className="graph-path"
                        d="M95 58L365 58L365 177L95 177Z M95 58L365 177 M365 58L95 177"
                      />
                      <path
                        className="graph-public"
                        d="M230 118L95 58M230 118L365 58M230 118L365 177M230 118L95 177"
                      />
                      {[
                        [95, 58],
                        [365, 58],
                        [95, 177],
                        [365, 177],
                      ].map(([x, y], i) => (
                        <g key={i}>
                          <circle cx={x} cy={y} r="23" />
                          <text x={x} y={y + 4}>
                            A{i + 1}
                          </text>
                        </g>
                      ))}
                      <circle
                        className="public-node"
                        cx="230"
                        cy="118"
                        r="28"
                      />
                      <text className="context-label" x="230" y="121">
                        CONTEXT
                      </text>
                    </svg>
                  </div>
                  <span className="art-caption mono">
                    CORRELATION ≠ COORDINATION <ArrowUpRight size={20} />
                  </span>
                </a>
                <div className="project-label mono">
                  02 / INDEPENDENT RESEARCH
                </div>
                <h3>When Correlation Lies</h3>
                <p>
                  Can shared context make independent agents look coordinated? A
                  controlled benchmark studying the limits of collusion
                  detection metrics.
                </p>
                <div className="tags">
                  <span>Multi agent evaluation</span>
                  <span>MI / CMI</span>
                  <span>Apart Sprint 2026</span>
                </div>
                <ArrowLink
                  href={`${github}/when-correlation-lies`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the research & code
                </ArrowLink>
              </article>
              <article className="small-project reveal">
                <a
                  href="https://xyverionai.com"
                  className="project-art product-art"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Try XYVERION AI business assistant"
                >
                  <div className="art-meta mono">
                    XYVERION AI / CONVERSATIONAL SOFTWARE
                  </div>
                  <div className="chat-illustration" aria-hidden="true">
                    <div className="chat-question">
                      A question from your customer.
                    </div>
                    <div className="chat-response">
                      <span className="mini-mark">✳</span>
                      <div>
                        A useful answer.
                        <br />
                        <span>Built around your business.</span>
                      </div>
                    </div>
                    <div className="chat-input">
                      Ask. Understand. Respond.
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                  <span className="art-caption mono">
                    ILLUSTRATIVE INTERFACE · LIVE DEMO AVAILABLE{" "}
                    <ArrowUpRight size={20} />
                  </span>
                </a>
                <div className="project-label mono">
                  03 / APPLIED AI PRODUCT
                </div>
                <h3>XYVERION AI</h3>
                <p>
                  Building conversational assistants for business websites, with
                  application logic, persistent conversation context and API
                  integration.
                </p>
                <div className="tags">
                  <span>Cloudflare Workers</span>
                  <span>Conversation KV</span>
                  <span>Model APIs</span>
                </div>
                <ArrowLink
                  href="https://xyverionai.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore the live demo
                </ArrowLink>
              </article>
            </div>
          </div>
        </section>
        <section className="case-section page" id="case-study">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">ENGINEERING NOTES / XYVERION 3.0</p>
              <h2>
                Small hardware.
                <br />
                <em>Real constraints.</em>
              </h2>
            </div>
            <p>
              The interesting part is the system around the model. Here’s what
              went into the desktop build.
            </p>
          </div>
          <div className="case-grid reveal">
            <div className="hardware-note">
              <span className="mono">DEVELOPMENT HARDWARE</span>
              <strong>
                4<span>GB</span>
              </strong>
              <p>NVIDIA GTX 1650</p>
              <div className="hardware-bars" aria-hidden="true">
                {Array.from({ length: 24 }, (_, i) => (
                  <i
                    key={i}
                    style={{
                      height: `${25 + Math.sin(i * 0.65) * 17 + i * 1.2}%`,
                    }}
                  />
                ))}
              </div>
              <span className="mono">CONSUMER GPU / LOCAL INFERENCE</span>
            </div>
            <div className="engineering-notes">
              {[
                [
                  "01",
                  "Model adaptation",
                  "Parameter efficient adaptation using 4 bit QLoRA, PEFT and Hugging Face Transformers. Built around a curated instruction dataset and a limited VRAM budget.",
                ],
                [
                  "02",
                  "Native actions",
                  "Python ctypes bindings to the Win32 API connect the application with desktop controls, window state and system actions.",
                ],
                [
                  "03",
                  "Application & memory",
                  "An Edge WebView2 desktop interface with SQLite conversation storage and GPU memory lifecycle handling.",
                ],
              ].map(([n, title, body]) => (
                <div key={n}>
                  <span className="mono">{n}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <details className="case-details">
            <summary>
              View the conversation interface <Plus size={18} />
            </summary>
            <button
              className="screenshot-button"
              onClick={() => openImage("xyverion-chat.png")}
              aria-label="Enlarge XYVERION conversation screenshot"
            >
              <img
                loading="lazy"
                src={`${base}assets/xyverion-chat.png`}
                alt="XYVERION conversation interface with memory and context controls"
              />
            </button>
            <p className="caption">
              Application screenshot. Interface controls show the intended
              workflow; task reliability requires separate evaluation.
            </p>
          </details>
        </section>
        <section className="approach-section" id="approach">
          <div className="page">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">02 / THE WAY I BUILD</p>
                <h2>
                  From a model
                  <br />
                  <em>to a useful system.</em>
                </h2>
              </div>
              <p>
                Model work and software work belong together. Explore the layers
                of my engineering process.
              </p>
            </div>
            <div className="process reveal">
              <div
                className="process-tabs"
                role="tablist"
                aria-label="Engineering process"
              >
                {steps.map((s, i) => (
                  <button
                    key={s.title}
                    id={`step-${i}`}
                    role="tab"
                    aria-selected={step === i}
                    aria-controls="engineering-panel"
                    tabIndex={step === i ? 0 : -1}
                    onClick={() => setStep(i)}
                    onKeyDown={(e) => {
                      let next;
                      if (e.key === "ArrowRight") next = (i + 1) % steps.length;
                      else if (e.key === "ArrowLeft")
                        next = (i + steps.length - 1) % steps.length;
                      else if (e.key === "Home") next = 0;
                      else if (e.key === "End") next = steps.length - 1;
                      else return;
                      e.preventDefault();
                      setStep(next);
                      document.getElementById(`step-${next}`).focus();
                    }}
                  >
                    <span className="mono">0{i + 1}</span>
                    <strong>{s.title}</strong>
                    <ArrowUpRight size={21} />
                  </button>
                ))}
              </div>
              <div
                className="process-panel"
                id="engineering-panel"
                role="tabpanel"
                aria-labelledby={`step-${step}`}
                tabIndex={0}
              >
                <span className="mono">{steps[step].label}</span>
                <p key={step}>{steps[step].body}</p>
                <div className="tags">
                  {steps[step].tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="research-section page" id="research">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">03 / RESEARCH & WRITING</p>
              <h2>
                Build things.
                <br />
                <em>Ask better questions.</em>
              </h2>
            </div>
            <p>
              Independent experiments and earlier technical writing. The code,
              assumptions and limitations matter as much as the result.
            </p>
          </div>
          <a
            className="research-feature reveal"
            href={`${github}/when-correlation-lies`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="mono">
              OCT 2026 / APART AI COLLUSION RESEARCH SPRINT
            </span>
            <div>
              <h3>When Correlation Lies</h3>
              <ArrowUpRight size={35} />
            </div>
            <p>
              Four agents. Shared context. Different explanations for the same
              correlation.
            </p>
            <span className="research-note">
              Controlled Rock Paper Scissors experiments using Qwen2.5 1.5B
              Instruct. Examines supplied coordination signals and shared
              context, rather than claiming spontaneous collusion.
            </span>
            <span className="arrow-link">
              Explore methods, code & limitations <ArrowUpRight size={18} />
            </span>
          </a>
          <div className="writing-header mono">
            <span>EARLIER INDEPENDENT WRITING</span>
            <span>PDF ARCHIVE / 2022–2025</span>
          </div>
          <div className="writing-list">
            {writings.map(([date, title, topic, file]) => (
              <a
                key={file}
                href={`${base}research/${file}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="mono">{date}</span>
                <h3>
                  {title}
                  <small>{topic}</small>
                </h3>
                <span className="pdf-label mono">
                  PDF <ArrowUpRight size={18} />
                </span>
              </a>
            ))}
          </div>
        </section>
        <section className="about-section" id="about">
          <div className="page">
            <div className="about-intro reveal">
              <p className="eyebrow">04 / THE PERSON BEHIND THE SYSTEMS</p>
              <h2>
                Curiosity is the start.
                <br />
                <em>Engineering is the follow through.</em>
              </h2>
              <div className="about-copy">
                <span className="about-monogram" aria-hidden="true">
                  du<span>✳</span>
                </span>
                <div>
                  <p>
                    I’m Durgesh, an independent AI engineer and the founder of
                    XYVERION AI, based in Maharashtra, India.
                  </p>
                  <p>
                    I enjoy the space where language models meet practical
                    software: fitting models to hardware, connecting them to
                    tools and understanding their limits. My professional
                    experience in annotation and model evaluation also shapes
                    how I approach quality.
                  </p>
                  <ArrowLink href={github} target="_blank" rel="noreferrer">
                    Follow my work on GitHub
                  </ArrowLink>
                </div>
              </div>
            </div>
            <div className="experience-block">
              <p className="eyebrow">EXPERIENCE</p>
              {[
                [
                  "SEP 2026 — PRESENT",
                  "Founder & AI Engineer",
                  "XYVERION AI",
                  "Local AI software, conversational systems and product engineering.",
                ],
                [
                  "AUG 2026 — PRESENT",
                  "AI Data Annotation & Evaluation Contractor",
                  "Innodata India Pvt. Ltd.",
                  "Grounding, semantic quality review and model output evaluation.",
                ],
                [
                  "JAN — JUL 2026",
                  "AI Training & Data Annotation Contributor",
                  "Outlier AI",
                  "Human feedback, output ranking and multimodal annotation.",
                ],
              ].map(([date, title, org, body]) => (
                <div className="experience-row" key={org}>
                  <span className="mono">{date}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                  <span>{org}</span>
                </div>
              ))}
            </div>
            <div className="credentials">
              <div>
                <span className="mono">LEARNING</span>
                <h3>Computer Science</h3>
                <p>
                  University of the People
                  <br />
                  Enrolled · Program start November 2026
                </p>
              </div>
              <div>
                <span className="mono">COMMUNICATION</span>
                <h3>
                  IELTS <em>7.5</em>
                </h3>
                <p>
                  Overall band · CEFR C1
                  <br />
                  September 2025
                </p>
              </div>
              <div>
                <span className="mono">TECHNICAL TOOLKIT</span>
                <p className="toolkit">
                  Python · PyTorch · Transformers · PEFT · QLoRA · SQLite ·
                  JavaScript · React · REST APIs · Git
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="contact-section page" id="contact">
          <div className="reveal">
            <p className="eyebrow">
              <i className="status-dot" /> OPEN TO WHAT’S NEXT
            </p>
            <h2>
              Have something
              <br />
              <em>worth building?</em>
              <span className="contact-star" aria-hidden="true">
                ✳
              </span>
            </h2>
            <div className="contact-bottom">
              <div>
                <p>
                  AI engineering roles, research collaborations
                  <br />
                  or a product that needs a thoughtful builder.
                </p>
                <ArrowLink href="mailto:durgeshunde@gmail.com">
                  durgeshunde@gmail.com
                </ArrowLink>
              </div>
              <a className="button dark" href={resume} download>
                Download resume <Download size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="page">
        <a className="footer-name" href="#top">
          Durgesh Unde<span className="mono">AI ENGINEER & FOUNDER</span>
        </a>
        <div>
          <a href={github} target="_blank" rel="noreferrer">
            <Code2 size={16} /> GitHub
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer">
            <Briefcase size={16} /> LinkedIn
          </a>
          <a href="mailto:durgeshunde@gmail.com">
            <Mail size={16} /> Email
          </a>
        </div>
        <span className="mono">
          © {new Date().getFullYear()} / BUILT WITH INTENT
        </span>
      </footer>
      <dialog
        ref={dialog}
        aria-label="Project screenshot viewer"
        className="image-dialog"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <button
          className="dialog-close"
          onClick={() => dialog.current.close()}
          aria-label="Close screenshot"
        >
          <X size={22} />
        </button>
        {image && (
          <img
            src={`${base}assets/${image}`}
            alt={
              image.includes("dashboard")
                ? "Enlarged XYVERION desktop dashboard"
                : "Enlarged XYVERION conversation interface"
            }
          />
        )}
      </dialog>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);

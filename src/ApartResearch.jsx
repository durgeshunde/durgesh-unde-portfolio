import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function ApartResearch() {
  return (
    <article className="apart-feature" id="apart-research">
      <div>
        <div className="eyebrow">FEATURED RESEARCH / APART SPRINT 2026</div>
        <h3>
          When <em>Correlation</em> Lies
        </h3>
        <p>
          Can shared context make independent agents look coordinated? I built a
          controlled multi-agent benchmark to examine what collusion detection
          metrics actually tell us.
        </p>
        <div className="apart-tag-row">
          <span>630 LLM trajectories</span>
          <span>MI / CMI</span>
          <span>Qwen2.5 1.5B</span>
        </div>
        <p className="apart-limit">
          Submitted to the Apart AI Collusion Research Sprint. Controlled Rock
          Paper Scissors experiments compare independent behavior, shared public
          context and supplied private coordination signals. The study does not
          establish spontaneous collusion.
        </p>
        <a
          className="button button-primary"
          href="https://github.com/durgeshunde/when-correlation-lies"
          target="_blank"
          rel="noreferrer"
        >
          Explore research &amp; code <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="apart-network">
        <svg
          viewBox="0 0 360 300"
          role="img"
          aria-label="Conceptual diagram of four agents connected to shared context"
        >
          <path
            className="agent-path"
            d="M70 65L290 65L290 235L70 235Z M70 65L290 235 M290 65L70 235"
          />
          <path
            className="context-path"
            d="M70 65L180 150L290 65 M70 235L180 150L290 235"
          />
          {[
            [70, 65],
            [290, 65],
            [70, 235],
            [290, 235],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="28" />
              <text x={x} y={y + 4}>
                A{i + 1}
              </text>
            </g>
          ))}
          <circle className="center-node" cx="180" cy="150" r="37" />
          <text className="center-label" x="180" y="148">
            SHARED
          </text>
          <text className="center-label" x="180" y="159">
            CONTEXT
          </text>
        </svg>
        <span className="network-label">
          CORRELATION ≠ COORDINATION
          <br />
          CONCEPTUAL EXPERIMENT DIAGRAM
        </span>
      </div>
    </article>
  );
}

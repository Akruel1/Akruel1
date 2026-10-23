"use client";

import { useId, useMemo, useState } from "react";
import styles from "./ArchitectureReveal.module.css";

export type ArchNode = { id: string; label: string; detail: string };

type Props = {
  title: string;
  caption: string;
  nodes: readonly ArchNode[];
  edges: readonly [string, string][];
};

export function ArchitectureReveal({ title, caption, nodes, edges }: Props) {
  const uid = useId();
  const [active, setActive] = useState(nodes[0]?.id ?? null);
  const [revealed, setRevealed] = useState(1);

  const positions = useMemo(() => {
    const cols = Math.min(4, Math.max(2, Math.ceil(Math.sqrt(nodes.length))));
    const rows = Math.ceil(nodes.length / cols);
    return Object.fromEntries(
      nodes.map((node, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        return [
          node.id,
          { x: ((col + 0.5) / cols) * 100, y: ((row + 0.5) / rows) * 100 },
        ];
      }),
    ) as Record<string, { x: number; y: number }>;
  }, [nodes]);

  const visibleNodes = nodes.slice(0, Math.min(revealed, nodes.length));
  const activeNode = nodes.find((n) => n.id === active) ?? nodes[0];

  return (
    <figure className={styles.figure} aria-labelledby={`${uid}-title`}>
      <div className={styles.head}>
        <figcaption id={`${uid}-title`} className={styles.title}>
          {title}
        </figcaption>
        <p className={styles.caption}>{caption}</p>
        {revealed < nodes.length && (
          <button
            type="button"
            className={styles.reveal}
            onClick={() => setRevealed((n) => Math.min(nodes.length, n + 2))}
          >
            Reveal next
          </button>
        )}
      </div>

      <div className={styles.canvas}>
        <svg className={styles.svg} viewBox="0 0 100 100" role="presentation">
          {edges.map(([from, to]) => {
            const a = positions[from];
            const b = positions[to];
            if (!a || !b) return null;
            const fromVisible = visibleNodes.some((n) => n.id === from);
            const toVisible = visibleNodes.some((n) => n.id === to);
            if (!fromVisible || !toVisible) return null;
            const lit = active === from || active === to;
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={lit ? styles.edgeLit : styles.edge}
              />
            );
          })}
        </svg>
        <ul className={styles.nodes}>
          {visibleNodes.map((node) => {
            const pos = positions[node.id];
            const isActive = active === node.id;
            return (
              <li key={node.id} style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
                <button
                  type="button"
                  className={isActive ? styles.nodeActive : styles.node}
                  aria-pressed={isActive}
                  aria-describedby={`${uid}-detail`}
                  onFocus={() => setActive(node.id)}
                  onMouseEnter={() => setActive(node.id)}
                  onClick={() => setActive(node.id)}
                >
                  {node.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p id={`${uid}-detail`} className={styles.detail} aria-live="polite">
        <strong>{activeNode?.label}</strong>
        <span>{activeNode?.detail}</span>
      </p>
    </figure>
  );
}

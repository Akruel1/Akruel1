"use client";

import { useId, useMemo, useState } from "react";
import styles from "./ArchitectureDiagram.module.css";

export type ArchNode = {
  id: string;
  label: string;
  detail: string;
};

type Props = {
  nodes: readonly ArchNode[];
  edges: readonly [string, string][];
  caption: string;
  title: string;
};

export function ArchitectureDiagram({ nodes, edges, caption, title }: Props) {
  const uid = useId();
  const [active, setActive] = useState<string | null>(nodes[0]?.id ?? null);

  const positions = useMemo(() => {
    const cols = Math.min(4, Math.max(2, Math.ceil(Math.sqrt(nodes.length))));
    const rows = Math.ceil(nodes.length / cols);
    return Object.fromEntries(
      nodes.map((node, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = ((col + 0.5) / cols) * 100;
        const y = ((row + 0.5) / rows) * 100;
        return [node.id, { x, y }];
      }),
    ) as Record<string, { x: number; y: number }>;
  }, [nodes]);

  const activeNode = nodes.find((n) => n.id === active) ?? nodes[0];

  return (
    <figure className={styles.figure} aria-labelledby={`${uid}-title`}>
      <figcaption id={`${uid}-title`} className={styles.captionTitle}>
        {title}
      </figcaption>
      <p className={styles.caption}>{caption}</p>

      <div className={styles.canvas}>
        <svg className={styles.svg} viewBox="0 0 100 100" role="presentation">
          {edges.map(([from, to]) => {
            const a = positions[from];
            const b = positions[to];
            if (!a || !b) return null;
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
          {nodes.map((node) => {
            const pos = positions[node.id];
            const isActive = active === node.id;
            return (
              <li
                key={node.id}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
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

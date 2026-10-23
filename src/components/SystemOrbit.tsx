"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./SystemOrbit.module.css";

const nodes = [
  { id: "api", x: 78, y: 28, label: "API" },
  { id: "rag", x: 82, y: 62, label: "RAG" },
  { id: "db", x: 52, y: 82, label: "Store" },
  { id: "vec", x: 22, y: 66, label: "Vector" },
  { id: "flow", x: 18, y: 30, label: "Flow" },
];

export function SystemOrbit() {
  const reduce = useReducedMotion();

  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 100 100" role="presentation">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(154, 220, 240, 0.35)" />
            <stop offset="55%" stopColor="rgba(74, 168, 196, 0.08)" />
            <stop offset="100%" stopColor="rgba(74, 168, 196, 0)" />
          </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="38" className={styles.ring} />
        <circle cx="50" cy="50" r="26" className={styles.ringSoft} />
        <circle cx="50" cy="50" r="14" className={styles.ring} />
        <circle cx="50" cy="50" r="22" fill="url(#coreGlow)" />

        {nodes.map((node, i) => {
          const prev = nodes[(i + nodes.length - 1) % nodes.length];
          return (
            <line
              key={`e-${node.id}`}
              x1={prev.x}
              y1={prev.y}
              x2={node.x}
              y2={node.y}
              className={styles.edge}
            />
          );
        })}

        {nodes.map((node) => (
          <g key={node.id}>
            <line
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
              className={styles.spoke}
            />
            <circle cx={node.x} cy={node.y} r="2.2" className={styles.node} />
            <text x={node.x} y={node.y - 4.5} className={styles.label}>
              {node.label}
            </text>
          </g>
        ))}

        <motion.circle
          cx="50"
          cy="50"
          r="3.2"
          className={styles.core}
          animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
          transition={reduce ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {!reduce && (
        <motion.div
          className={styles.scan}
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

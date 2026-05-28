"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  from?: "up" | "left" | "right" | "down";
  className?: string;
}

export function Reveal({ children, delay = 0, from = "up", className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: from === "up" ? 44 : from === "down" ? -44 : 0,
        x: from === "left" ? -44 : from === "right" ? 44 : 0,
        scale: 0.97,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

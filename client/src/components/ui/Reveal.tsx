import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { easeOut } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

type MarginValue = `${number}${"px" | "%"}`;
type RevealMargin = MarginValue | `${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  margin?: RevealMargin;
}

export function Reveal({ children, className, delay = 0, distance = 28, margin = "-12% 0px" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin });
  const reducedMotion = useReducedMotionSafe();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : distance }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

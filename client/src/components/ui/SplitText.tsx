import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { easeOut } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface SplitTextProps {
  lines: readonly string[];
  className?: string;
  id?: string;
}

export function SplitText({ lines, className, id }: SplitTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reducedMotion = useReducedMotionSafe();

  return (
    <h1 id={id} ref={ref} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, index) => (
        <motion.span
          key={`${line}-${index}`}
          className="block font-heading"
          style={{ fontFamily: "inherit" }}
          initial={{ opacity: 0, x: reducedMotion ? 0 : index % 2 === 0 ? -38 : 38 }}
          animate={isInView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : index * 0.08, ease: easeOut }}
        >
          {line}
        </motion.span>
      ))}
    </h1>
  );
}

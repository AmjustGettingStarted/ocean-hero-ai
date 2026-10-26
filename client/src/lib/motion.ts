import type { Variants } from "framer-motion";

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: easeOut } },
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -42 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 42 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 26,
};

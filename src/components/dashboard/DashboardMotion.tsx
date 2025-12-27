"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 1. Container that staggers its children (Float Up effect)
export const StaggerContainer = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.div
    initial="hidden"
    animate="show"
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

// 2. The individual item that floats up
export const StaggerItem = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
      },
    }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);
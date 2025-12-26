"use client";

import { motion } from "framer-motion";
import { Paper, PaperProps } from "@mantine/core";
import { forwardRef } from "react";

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
          staggerChildren: 0.1, // Delay between each item
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
      hidden: { opacity: 0, y: 20 }, // Start slightly down
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

// 3. Hover Card with Azure Glow (Client Component)
// We wrap Mantine's Paper with motion
// FIX: Cast Paper to 'any' to bypass TypeScript strict polymorphic type checking
const MotionPaper = motion.create(Paper as any);

export const StatCard = forwardRef<
  HTMLDivElement,
  PaperProps & { children: React.ReactNode }
>(({ children, ...props }, ref) => {
  return (
    <MotionPaper
      ref={ref}
      {...props}
      whileHover={{
        y: -5, // Lift up slightly
        boxShadow: "0 10px 30px -10px rgba(0, 112, 243, 0.4)", // Azure Glow
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </MotionPaper>
  );
});
StatCard.displayName = "StatCard";

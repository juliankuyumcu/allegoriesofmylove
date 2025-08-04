'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useTheme } from '@/context/ThemeProvider';

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div 
      onClick={() => toggleTheme()} 
      className="cursor-pointer -mb-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      title="Toggle theme"
    >
      <svg width="25" height="25" viewBox="0 0 25 20">
        <motion.circle 
            cx="17" 
            cy="10" 
            r="3"
            className="fill-pencil dark:fill-paper duration-1000"
        />
        <motion.g
          initial={{ scale: 0 }}
          className="fill-pencil dark:fill-paper "
          animate={{
            scale: (theme === "dark" ? 2 : 0)
          }}
          transition={{ duration: 0.5 }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <polygon
                key={i}
                points="0,-3 0.6,-2  -0.6,-2"
                transform={`translate(17 10) rotate(${angle})`}
              />
            );
          })}
        </motion.g>
      </svg>
    </motion.div>
  );
}

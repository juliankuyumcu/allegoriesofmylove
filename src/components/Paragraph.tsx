"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

interface ParagraphProps {
    paragraph: string;
    index: number;
    paragraphCount: number;
}

export default function Paragraph({ paragraph, index, paragraphCount }: ParagraphProps) {

    const order: number = Math.min(index, paragraphCount - index);
    const ref = useRef(null);
    const isInView = useInView(ref);
    const isMaskInView = useInView(ref, {once: true, amount: 1});

    // useEffect(() => {
    //     if (isInView)

    // }, [isInView]);

    return (
        <motion.div 
            ref={ref}
            className="relative size-max" 
            initial={{ opacity: 0 }}
            animate={{ opacity: !isInView ? 0 : 1}}
        >
            <p>{paragraph || "\u200B"}</p>
            <motion.div
                className={`absolute top-0 -right-px h-full bg-paper dark:bg-ink`}
                key={index}
                initial={{ width: "101%"}}
                animate={{ width: 0 }}
                transition={{delay: (1 + 0.15 * (index + 1)), duration: 1, ease: "easeInOut"}}
            ></motion.div>
        </motion.div>
    );
}
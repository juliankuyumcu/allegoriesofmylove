"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface ParagraphProps {
    paragraph: string;
    index: number;
    typeIn: boolean;
}

export default function Paragraph({ paragraph, index, typeIn }: ParagraphProps) {

    const ref = useRef(null);
    const isInView = useInView(ref);

    return (
        <motion.div 
            ref={ref}
            className="relative size-max" 
            initial={{ opacity: 0 }}
            animate={{ opacity: !isInView ? 0 : 1}}
        >
            <p>{paragraph || "\u200B"}</p>
            {typeIn && 
                <motion.div
                    className={`absolute top-0 -right-px h-full bg-paper dark:bg-ink`}
                    key={index}
                    initial={{ width: "101%"}}
                    animate={{ width: 0 }}
                    transition={{ delay: (1 + 0.15 * (index + 1)), duration: 1, ease: "easeInOut" }}
                ></motion.div>
            }
        </motion.div>
    );
}
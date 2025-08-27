"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { useTheme } from "@/context/ThemeProvider";
import ReactMarkdown from "react-markdown"

interface ParagraphProps {
    paragraph: string;
    index: number;
    typeIn: boolean;
}

export default function Paragraph({ paragraph, index, typeIn }: ParagraphProps) {

    const ref = useRef(null!);
    const isInView = useInView(ref);
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="w-fit relative text-wrap" >
            <motion.div 
                key={`paragraph-${index}-container`}
                ref={ref}
                initial={{ opacity: 0 }}
                animate={{ opacity: !isInView ? 0 : 1}}
            >   
                <div className="max-md:text-xs">
                    <ReactMarkdown>
                        {paragraph || "\u200B"}
                    </ReactMarkdown>
                </div>
                {typeIn && 
                    <motion.div
                        style={{
                            position: "absolute", top: 0, right: -1, 
                            height: "100%", 
                            backgroundColor: theme === "dark" ? "var(--ink)" : "var(--paper)",
                        }}
                        key={`paragraph-${index}`}
                        initial={{ width: "103%"}}
                        animate={{ width: 0 }}
                        transition={{ type: "tween", delay: (1 + 0.25 * (index + 1)), duration: 1.5, ease: "easeOut" }}
                    ></motion.div>
                }
            </motion.div>
        </div>
    );
}
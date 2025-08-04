"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import Paragraph from "./Paragraph";

interface WritingContentProps {
    content: string;
}

export default function WritingContent({ content }: WritingContentProps) {

    const paragraphs = content.split("\n");
    const [interactive, setInteractive] = useState(false);

    return (
        <motion.div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // transition={{ delay: 1.5 }}
            onAnimationComplete={() => setInteractive(true)}
        >
            {paragraphs.map((paragraph, index) =>
                <Paragraph
                    key={index}
                    paragraph={paragraph}
                    index={index}
                    paragraphCount={paragraphs.length}
                />
            )}
        </motion.div>
    );
};
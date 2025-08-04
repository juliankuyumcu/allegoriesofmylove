"use client"

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatePresence } from "motion/react";
import DarkModeToggle from "./DarkModeToggle";
import Margin from "./Margin";
import WritingList from "./WritingList";
import { WritingPreviewType } from "@/util/types";
import WritingDetail from "./WritingDetail";
import WritingMedia from "./WritingMedia";

export default function ContentBox({data, writing} : {data: WritingPreviewType[], writing: WritingPreviewType | null}) {

    const [ selectedWriting, setSelectedWriting ] = useState<WritingPreviewType | null>(writing);
    const [ interactive, setInteractive ] = useState(!selectedWriting);
    const contentRef = useRef(null);
    const isInView = useInView(contentRef, {once: true});

    const poemContent = `Playwright in all its splendor\nTaking years to finally bloom\n\nA vacuous dream space made existent only by hope\nTears flood in when the gates are opened\nYet evaporation takes it all away again\nOr, is it gravity\n\nIt isn’t the same as the others\nLife beams in separate chambers\n\nBut all is ignored\nIn the end\n\nPlaywright in all its splendor\nTaking years to finally bloom\n\nA vacuous dream space made existent only by hope\nTears flood in when the gates are opened\nYet evaporation takes it all away again\nOr, is it gravity\n\nIt isn’t the same as the others\nLife beams in separate chambers\n\nBut all is ignored\nIn the end`;

    return (
        <main className="flex flex-col gap-3 subpixel-antialiased">
            <nav className="flex flex-row justify-between">
                <motion.h1
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    allegories of my love
                </motion.h1>
                <DarkModeToggle/>
            </nav>
            
            <Margin direction="horizontal"/>

            <div className="relative flex flex-row gap-3">
                <Margin direction="vertical"/>

                <motion.div
                    ref={contentRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: !isInView ? 2 : 0 }}
                >
                    <motion.div
                            key="list"
                            className={`w-116 h-120 overflow-y-scroll scroll-smooth snap-y pr-3 duration-1000 ${!interactive ? "pointer-events-none" : ""}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: selectedWriting ? 0 : 1}}
                            transition={{ delay: !selectedWriting ? 0.5 : 0 }}
                            onAnimationComplete={() => setInteractive(!selectedWriting)}
                        >
                            <WritingList writings={data} setSelectedWriting={setSelectedWriting}/>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {selectedWriting &&
                            <motion.div
                                key="detail"
                                className={`absolute top-0 right-0 w-116 h-120 overflow-y-scroll pr-3 duration-1000 z-2`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: !interactive ? 0 : 0.5 }}
                            >
                                <WritingDetail
                                    selectedWriting={selectedWriting}
                                    setSelectedWriting={setSelectedWriting}
                                    writingContent={poemContent}
                                    writingMedia={{data: {attributes: {url: "./globe.svg"}}}}
                                />
                            </motion.div>
                        }
                    </AnimatePresence> 
                </motion.div>
                
                
                <div className="absolute top-1 right-[1] h-[98%] w-px bg-pencil dark:bg-paper -z-1"></div>

                { /* scrollbar mask */}
                <motion.div
                    className="absolute top-0 right-0 w-2 h-full bg-paper dark:bg-ink duration-1000"
                    initial={{height: "101%"}}
                    animate={{height: 0}}
                    transition={{ delay: 0.5 }}
                ></motion.div>
            </div>

            <div className="inline-flex flex-row justify-end">
                <Margin direction="horizontal"/>
            </div>
        </main>
    )
}
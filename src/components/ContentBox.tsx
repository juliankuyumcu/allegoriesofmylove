"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

import { WritingPreviewType } from "@/util/types";
import WritingDetail from "./WritingDetail";
import DarkModeToggle from "./DarkModeToggle";
import Margin from "./Margin";
import WritingList from "./WritingList";

interface ContentBoxProps {
    data: WritingPreviewType[];
    writing: WritingPreviewType | null; 
}

export default function ContentBox({data, writing} : ContentBoxProps) {

    const [ selectedWriting, setSelectedWriting ] = useState<WritingPreviewType | null>(writing);
    const [ showMedia, setShowMedia ] = useState<boolean>(false);
    const [ interactive, setInteractive ] = useState(!selectedWriting);
    const [ renderBox, setRenderBox ] = useState<boolean>(false);
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const variants = {
        visible: { opacity: 1},
        hidden: { opacity: 0},
    };

    useEffect(() => {
        const s = setTimeout(() => {
            setRenderBox(true);
        }, 2000);

        return () => clearTimeout(s);
    }, []);

    useEffect(() => {
        const onPopState = () => {
            if (selectedWriting) {
                setSelectedWriting(null);
                setShowMedia(false);
            }
        };
        window.addEventListener('popstate', onPopState);

        return () => window.removeEventListener('popstate', onPopState);
    }, [selectedWriting]);

    useEffect(() => {
        window.history.pushState(null, "", window.history.state);
        window.history.replaceState(null, "", process.env.NEXT_PUBLIC_DOMAIN + (selectedWriting ? `/${selectedWriting.slug}` : ""));
    }, [router, selectedWriting]);

    return (
        <main className="flex flex-col gap-4 subpixel-antialiased">
            <nav className="flex flex-row justify-between max-md:text-sm">
                <motion.h1
                    key="page-title"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ type: "tween", delay: 0.5, duration: 1 }}
                >
                    allegories of my love
                </motion.h1>
                <DarkModeToggle/>
            </nav>
            
            <motion.div
                style={{display: "flex", flexDirection: "column", gap: "16px"}}
                key="contnent"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{type: "tween", delay: 1, duration: 1}}
            >
                <Margin direction="horizontal"/>
                
                <div className="relative flex flex-row gap-3">
                    <Margin direction="vertical"/>

                    <div className="pr-4 w-72 h-[60vh] md:w-110 md:h-120">
                        <motion.div
                            variants={variants}
                            key="main-content"
                            initial="hidden"
                            animate="visible"
                            transition={{ type: "tween", duration: 1, delay: 3}}
                        >
                            {renderBox && 
                                <>
                                    <div inert={interactive ? false : true}>
                                        <motion.div
                                            variants={variants}
                                            key="list"
                                            initial="hidden"
                                            animate={selectedWriting ? "hidden" : "visible"}
                                            transition={{ type: "tween", delay: !selectedWriting ? 0.5 : 0 }}
                                            onAnimationComplete={() => setInteractive(!selectedWriting)}
                                        >
                                            <WritingList writings={data} setSelectedWriting={setSelectedWriting}/>
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {selectedWriting &&
                                            <div className={`absolute top-0 right-0 w-full h-full px-3 duration-1000 z-2 overflow-y-scroll`}>
                                                <motion.div
                                                    variants={variants}
                                                    key="detail"
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit={{ opacity: 0, pointerEvents: "none" }}
                                                    transition={{ type: "tween", delay: !interactive ? 0 : 0.5 }}
                                                >
                                                    <WritingDetail
                                                        selectedWriting={selectedWriting}
                                                        setSelectedWriting={setSelectedWriting}
                                                        showMedia={showMedia}
                                                        setShowMedia={setShowMedia}
                                                    />
                                                </motion.div>
                                            </div>
                                        }
                                    </AnimatePresence>
                                </> 
                            }
                        </motion.div>
                    </div>
                    
                    {/* fake scrollbar track (background) */}
                    <div className="absolute top-1 right-[1px] h-[98%] w-px bg-pencil dark:bg-pencil -z-1"></div>

                    { /* scrollbar mask */}
                    <motion.div
                        key="scrollbar-mask"
                        style={{
                            zIndex: 12, 
                            position: "absolute",
                            top: 0, right: 0, 
                            backgroundColor: theme == "dark" ? "var(--ink)" : "var(--paper)", 
                            width: "8px",
                            // animationTimingFunction: "ease-in-out",
                            // transitionTimingFunction: "ease-in-out"
                        }}
                        initial={{ height: "101%" }}
                        animate={{ height: 0 }}
                        transition={{ type: "tween", duration: 1.5, delay: 1.5 }}
                    ></motion.div>

                    { /* fake scrollbar track (mask) */}
                    <motion.div 
                        key="scrollbar-fake"
                        style={{
                            zIndex: 11, 
                            position: "absolute", 
                            top: 0, right: -1, 
                            width: 5, height: "100%", 
                            display: "flex", justifyContent: "center", alignItems: "center", 
                            backgroundColor: theme === "dark" ? "var(--ink)" : "var(--paper)",
                            transitionDuration: "1000ms",
                            pointerEvents: "none"
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: ((!selectedWriting) || (selectedWriting && showMedia)) ? 1 : 0 }}
                        transition={{ type: "tween", delay: showMedia ? 0 : selectedWriting ? 0.5 : 0 , duration: 0.4 }}
                    >
                        <div className="w-px h-[98%] bg-pencil dark:bg-pencil z-11"></div>
                    </motion.div>
                </div>

                <div className="w-full inline-flex flex-row justify-end">
                    <Margin direction="horizontal"/>
                </div>
            </motion.div>
        </main>
    )
}
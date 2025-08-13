import React, { useEffect, useState, useRef } from "react";
import { WritingPreviewType } from "@/util/types";
import Pin from "./Pin";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Share from "./Share";
import MediaToggle from "./MediaToggle";

interface WritingTitleProps {
    writing: WritingPreviewType;
    setSelectedWriting: React.Dispatch<React.SetStateAction<WritingPreviewType | null>>;
    isHeader: boolean;
    isMedia?: boolean | false;
    showMedia?: boolean;
    setShowMedia?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WritingTitle({ writing, setSelectedWriting, isHeader, isMedia, showMedia, setShowMedia }: WritingTitleProps) {
    const ref = useRef(null!);
    const isInView = useInView(ref, {amount: 0.5});

    const [ copied, setCopied ] = useState(false);
    const [ hasCopied, setHasCopied ] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!copied) return;

        setHasCopied(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        timeoutRef.current = setTimeout(() => {
            setCopied(false);
        }, 1000);
    }, [copied]);

    return (
        <motion.div
            key="writing-title"
            ref={ref} 
            initial={{ opacity: 1 }}
            animate={{ opacity: !isInView ? 0 : 1}}
        >   
            <div className="w-full duration-500 inline-flex flex-col gap-2 delay-1">
                <div className={`flex flex-row ${isHeader ? "max-md:flex-col" : ""} max-md:gap-1 gap-4 justify-between duration-500 max-md:text-sm`}>
                    {isHeader ?
                        <div className={`flex flex-row max-md:flex-col max-md:m-auto gap-2`}>
                            <a 
                                className={`max-md:hidden text-md cursor-pointer overflow-hidden`} 
                                onClick={(e) => {e.preventDefault(); setSelectedWriting(null); if (setShowMedia) setShowMedia(false);}}
                                href={process.env.NEXT_PUBLIC_DOMAIN}
                                title="Back"
                            >
                                <motion.div
                                    key="writing-title-back-button"
                                    initial={{ width: 0 }}
                                    animate={{ width: 30 }}
                                    transition={{ type:"tween" , delay: 0.8 }}
                                    exit={{ width: 0 }}
                                >
                                    <p className="text-center">←</p>
                                </motion.div>
                            </a>
                            <h2 className="text-left max-md:text-center">
                                {writing?.title.toLowerCase()} 
                            </h2>
                        </div>   
                        :
                        <a
                            className={`cursor-pointer text-left hover:underline`}
                            onClick={(e) => {e.preventDefault(); setSelectedWriting(writing)}}
                            href={process.env.NEXT_PUBLIC_DOMAIN + `/${writing.slug}`}
                            target="_parent"
                            title="Open"
                        >
                            {writing?.title.toLowerCase()}
                        </a>
                    }
                    <AnimatePresence mode="wait">
                        {copied &&
                            <motion.div
                                key="notice"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="lg:pr-2 max-md:h-10 max-md:flex max-md:items-center max-md:justify-center pointer-events-none">
                                    <p className=" max-md:text-center text-right">copied to clipboard</p>
                                </div>
                            </motion.div>
                        }
                        {!copied &&
                            <motion.div
                                key="buttons" 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ display: "flex", alignItems: "between", justifyContent: "center" }}
                            >
                                {isHeader && 
                                    <a 
                                        className={`lg:hidden max-md:mr-10 max-md:text-2xl max-md:flex max-md:justify-center text-md cursor-pointer overflow-hidden`} 
                                        onClick={(e) => {e.preventDefault(); setSelectedWriting(null); if (setShowMedia) setShowMedia(false);}}
                                        href={process.env.NEXT_PUBLIC_DOMAIN}
                                        title="Back"
                                    >
                                        <motion.div
                                            key="writing-title-back-button"
                                            initial={{ ...(hasCopied ? {width: 30} : {width: 0}) }}
                                            animate={{ width: 30 }}
                                            transition={{ type:"tween" , delay: 0.8 }}
                                        >
                                            <p className="text-center max-md:mb-2">←</p>
                                        </motion.div>
                                    </a>
                                }
                                <div className="inline-flex flex-row gap-3 max-md:gap-4 items-center">
                                    {isHeader &&
                                        <>
                                            {(isMedia && showMedia !== undefined && setShowMedia !== undefined) && <MediaToggle showMedia={showMedia} setShowMedia={setShowMedia} />}
                                            <Share slug={writing.slug} setCopied={setCopied} />
                                        </>
                                    }
                                    <Pin slug={writing.slug}/>
                                </div>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
                <span className="h-px w-full bg-pencil dark:bg-pencil duration-1000"></span>
            </div>
        </motion.div>
    );
}
import React, { useEffect, useState, useRef } from "react";
import { WritingPreviewType } from "@/util/types";
import Pin from "./Pin";
import { AnimatePresence, motion, useInView } from "motion/react";
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
    const ref = useRef(null);
    const isInView = useInView(ref, {amount: 0.5});

    const [ copied, setCopied ] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!copied) return;

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
            ref={ref} 
            className={`duration-500 inline-flex flex-col gap-2 delay-1`}
            initial={{ opacity: 1 }}
            animate={{ opacity: !isInView ? 0 : 1}}
        >
            <motion.div
                className={`flex flex-row gap-4 justify-between duration-500`}
            >
                {isHeader ?
                    <div className={`flex flex-row gap-2`}>
                        <AnimatePresence>
                            <motion.button
                                className={`cursor-pointer overflow-hidden`}
                                onClick={() => {setSelectedWriting(null); if (setShowMedia) setShowMedia(false);}}
                                initial={{ width: 0 }}
                                animate={{ width: 30 }}
                                transition={{ delay: 0.8 }}
                                exit={ {width: 0}}
                                title="Back"
                            >
                                ←
                            </motion.button>
                        </AnimatePresence>
                        <h2 className="text-left">
                            [ {writing?.title.toLowerCase()} ]
                        </h2>
                    </div>   
                    :
                    <button
                        className={`cursor-pointer text-left`}
                        onClick={() => setSelectedWriting(writing)}
                        title="Open"
                    >
                        [ {writing?.title.toLowerCase()} ]
                    </button>
                }
                <AnimatePresence mode="wait">
                    {copied &&
                        <motion.div
                            key="notice"
                            className="pr-2 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p className="text-right">copied to clipboard</p>
                        </motion.div>
                    }
                    {!copied &&
                        <motion.div
                            key="buttons" 
                            className="inline-flex flex-row gap-4 items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                                {isHeader &&
                                    <>
                                        {(isMedia && showMedia !== undefined && setShowMedia !== undefined) && <MediaToggle showMedia={showMedia} setShowMedia={setShowMedia} />}
                                        <Share slug={writing.slug} setCopied={setCopied} />
                                    </>
                                }
                                <Pin slug={writing.slug}/>
                        </motion.div>
                    }
                </AnimatePresence>
            </motion.div>
            <span className="h-px w-full bg-pencil dark:bg-pencil duration-1000"></span>
        </motion.div>
    );
}
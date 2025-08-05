import React, { SetStateAction, useEffect, useRef } from "react";
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

    return (
        <motion.div
            ref={ref} 
            className={`duration-500 inline-flex flex-col gap-2 delay-1`}
            initial={{ opacity: 1 }}
            animate={{ opacity: !isInView ? 0 : 1}}
        >
            <motion.div
                className={`flex flex-row justify-between duration-500`}
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
                        <h2>
                            [ {writing?.data.attributes.title.toLowerCase()} ]
                        </h2>
                    </div>   
                    :
                    <button
                        className={`cursor-pointer  `}
                        onClick={() => setSelectedWriting(writing)}
                        title="Open"
                    >
                        [ {writing?.data.attributes.title.toLowerCase()} ]
                    </button>
                }
                <div className="inline-flex flex-row gap-4 items-center">
                    {isHeader &&
                        <>
                            {(isMedia && showMedia !== undefined && setShowMedia !== undefined) && <MediaToggle showMedia={showMedia} setShowMedia={setShowMedia} />}
                            <Share slug={writing.data.attributes.slug} />
                        </>
                    }
                    <Pin slug={writing.data.attributes.slug}/>
                </div>
            </motion.div>
            <span className="h-px w-full bg-ink dark:bg-paper duration-1000"></span>
        </motion.div>
    );
}
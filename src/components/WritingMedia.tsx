import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MediaType, WritingPreviewType } from "@/util/types";
import WritingTitle from "@/components/WritingTitle";
import WritingContent from "@/components/WritingContent";
import Image from "next/image";

interface WritingDetailProps {
    selectedWriting: WritingPreviewType;
    setSelectedWriting: React.Dispatch<React.SetStateAction<WritingPreviewType | null>>;
    writingContent: string;
    writingMedia: MediaType | null;
}

export default function WritingMedia({ selectedWriting, setSelectedWriting, writingContent, writingMedia }: WritingDetailProps) {

    const [ showMedia, setShowMedia ] = useState(false);
    const [ interactive, setInteractive ] = useState(true);
    console.log(!!writingMedia);

    return (
        <div className={`relative h-full flex flex-col gap-3 p-2`}>
            <WritingTitle
                writing={selectedWriting}
                setSelectedWriting={setSelectedWriting}
                isHeader={true}
                isMedia={!!writingMedia}
                showMedia={showMedia}
                setShowMedia={setShowMedia}
            />
            
            <motion.div
                key="content"
                className={`${interactive ? "" : "pointer-events-none hidden"} overflow-x-scroll`}
                initial={{ opacity: 0 }}
                animate={{ opacity: showMedia ? 0 : 1 }}
                transition={{ delay: !showMedia ? 0.5 : 0, duration: 1 }}
                onAnimationComplete={() => setInteractive(!showMedia)}
            >
                <WritingContent
                    content={writingContent}
                />
            </motion.div>

            {writingMedia &&
                <AnimatePresence mode="wait">
                    {showMedia &&
                        <motion.div
                            key="media"
                            className="flex-1 flex justify-center items-center overflow-hidden p-4 z-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: !interactive ? 0.5 : 0, duration: 0.5 }}
                        >
                            <Image
                                className="grow max-h-full max-w-full object-contain"
                                width={10}
                                height={10}
                                src={writingMedia.data.attributes.url}
                                alt={"Drawing of " + selectedWriting.data.attributes.title}
                            />
                        </motion.div>
                    }
                </AnimatePresence>
            }
        </div>
    );
};
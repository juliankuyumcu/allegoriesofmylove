import React, { useEffect, useState } from "react";
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
    showMedia: boolean;
    setShowMedia: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WritingDetail({ selectedWriting, setSelectedWriting, writingContent, writingMedia, showMedia, setShowMedia }: WritingDetailProps) {

    const [ typeIn, setTypeIn ] = useState(true);

    useEffect(() => {
        if (showMedia === true)
            setTypeIn(false);
    }, [showMedia]);

    return (
        <div className={`relative h-full flex flex-col gap-3 px-2`}>
            <WritingTitle
                writing={selectedWriting}
                setSelectedWriting={setSelectedWriting}
                isHeader={true}
                isMedia={!!writingMedia}
                showMedia={showMedia}
                setShowMedia={setShowMedia}
            />
            
            {writingMedia &&
                <AnimatePresence mode="wait">
                    {!showMedia && 
                        <motion.div
                            key="content"
                            className={``}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            exit={{opacity: 0 }}
                        >
                            <WritingContent
                                content={writingContent}
                                typeIn={typeIn}
                            />
                        </motion.div>
                    }
                    {showMedia &&
                        <motion.div
                            key="media"
                            className="flex-1 flex justify-center items-center overflow-y-hidden p-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Image
                                className="grow max-h-full max-w-full object-contain"
                                width={465}
                                height={478}
                                src={(process.env.NEXT_PUBLIC_STRAPI_URL || "") + writingMedia.data.attributes.url}
                                alt={"Drawing of " + selectedWriting.data.attributes.title}
                            />
                        </motion.div>
                    }
                </AnimatePresence>
            }
        </div>
    );
};
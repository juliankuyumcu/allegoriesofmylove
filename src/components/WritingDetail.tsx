import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MediaType, WritingPreviewType, WritingType } from "@/util/types";
import WritingTitle from "@/components/WritingTitle";
import WritingContent from "@/components/WritingContent";
import Image from "next/image";
import { strapiFetch } from "@/util/fetch";

interface WritingDetailProps {
    selectedWriting: WritingPreviewType;
    setSelectedWriting: React.Dispatch<React.SetStateAction<WritingPreviewType | null>>;
    showMedia: boolean;
    setShowMedia: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WritingDetail({ selectedWriting, setSelectedWriting, showMedia, setShowMedia }: WritingDetailProps) {

    const [ typeIn, setTypeIn ] = useState(true);
    const [ fullWriting, setFullWriting ] = useState<WritingType | null>(null);
    const [ mediaLoaded, setMediaLoaded ] = useState(false);

    useEffect(() => {
        strapiFetch({
            method: "GET",
            slug: "writings",
            populate: ["media"],
            fields: ["content"],
            filters: {
                "slug": {"$eq": selectedWriting.slug}
            },
        }).then((res) => {
            if (res.length > 0)
                setFullWriting(res[0] as WritingType);
        });
    }, [selectedWriting.slug]);

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
                isMedia={!!fullWriting?.media}
                showMedia={showMedia}
                setShowMedia={setShowMedia}
            />
            <AnimatePresence mode="wait">
                {(!!fullWriting?.content && !showMedia) &&
                    <motion.div
                        key="content"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: "tween", duration: 0.5 }}
                        exit={{opacity: 0 }}
                    >
                        <div className={`text-pretty`}>
                            <WritingContent
                                content={fullWriting?.content || ""}
                                typeIn={typeIn}
                            />
                        </div>
                    </motion.div>
                }
                {(!!fullWriting?.media && showMedia) &&
                    <motion.div
                        key="media"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: mediaLoaded ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "tween", duration: 0.4 }}
                    >
                        <div className="flex-1 flex justify-center items-center overflow-y-hidden p-6">
                            <Image
                                className="grow max-h-full max-w-full object-contain"
                                width={fullWriting?.media?.width}
                                height={fullWriting?.media?.height}
                                src={(process.env.NEXT_PUBLIC_STRAPI_URL || "") + fullWriting?.media?.url}
                                alt={"Drawing of " + selectedWriting.title}
                                onLoadingComplete={() => setMediaLoaded(true)}
                            />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};
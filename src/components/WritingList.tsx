"use client";

import React, { useEffect, useState } from "react";
import { WritingPreviewType } from "@/util/types";
import { usePinned } from "@/context/PinnedProvider";
import WritingTitle from "./WritingTitle";

interface WritingListProps {
    writings: WritingPreviewType[];
    setSelectedWriting: React.Dispatch<React.SetStateAction<WritingPreviewType | null>>;
}

export default function WritingList({ writings, setSelectedWriting }: WritingListProps) {

    const { pinnedSlugs, togglePin, isPinned } = usePinned();
    const [ sortedWritings, setSortedWritings ] = useState<WritingPreviewType[]>([]);
    
    useEffect(() => {
        if (pinnedSlugs === null || sortedWritings.length > 0)
            return; 

        setSortedWritings([
            ...(writings.filter(writing => isPinned(writing.slug))),
            ...(writings.filter(writing => !isPinned(writing.slug)))
        ]);
    }, [pinnedSlugs, sortedWritings, writings, isPinned]);

    return (
        <div className={`flex flex-col gap-2 pl-2 px-2`}>
            {sortedWritings.map(writing =>
                <WritingTitle 
                    key={writing.slug}
                    writing={writing} 
                    setSelectedWriting={setSelectedWriting}
                    isHeader={false}
                />
            )}
        </div>
    );
}
"use client"

import React from "react";
import { WritingPreviewType } from "@/util/types";
import WritingTitle from "./WritingTitle";

interface WritingListProps {
    writings: WritingPreviewType[];
    setSelectedWriting: React.Dispatch<React.SetStateAction<WritingPreviewType | null>>;
}

export default function WritingList({ writings,setSelectedWriting }: WritingListProps) {
    return (
        <div className={`flex flex-col gap-2 p-2`}>
            {writings.map(writing =>
                <WritingTitle 
                    key={writing.data.attributes.slug}
                    writing={writing} 
                    setSelectedWriting={setSelectedWriting}
                    isHeader={false}
                />
            )}
        </div>
    );
}
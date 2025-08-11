import React from "react";
import Paragraph from "./Paragraph";

interface WritingContentProps {
    content: string;
    typeIn: boolean;
}

export default function WritingContent({ content, typeIn }: WritingContentProps) {

    const paragraphs = content.split("\n");

    return (
        <div className="text-wrap w-full">
            {paragraphs.map((paragraph, index) =>
                <Paragraph
                    key={index}
                    paragraph={paragraph}
                    index={index}
                    typeIn={typeIn}
                />
            )}
        </div>
    );
};
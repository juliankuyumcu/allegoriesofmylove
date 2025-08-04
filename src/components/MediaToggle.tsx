import React from "react";

interface MediaToggleProps {
    showMedia: boolean;
    setShowMedia: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MediaToggle({ showMedia, setShowMedia }: MediaToggleProps) {
    return (
        <button
            className="cursor-pointer"
            title={"Toggle media"}
            onClick={() => setShowMedia(!showMedia)}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                version="1.1" 
                x="22px" y="22px" 
                viewBox="0 0 467.8 524.125"
                width={16} height={16}
                // style="enable-background:new 22.3 22.5 467.8 467.3;" 
                enableBackground={"new 0 0 467.8 467.3"}
                className="fill-ink"
            >
                <g>
                    <path 
                        className="stroke-ink dark:stroke-paper duration-300" strokeWidth={15}
                        d="M486.1,22.5H26.3c-2.2,0-4,1.8-4,4v459.3c0,2.2,1.8,4,4,4h459.8c2.2,0,4-1.8,4-4V26.5C490.1,24.3,488.3,22.5,486.1,22.5z    
                        M30.3,30.5h451.8V337l-121.9-94.7c-1.6-1.3-4-1.1-5.4,0.4L217.6,389.3l-37.1-34.7c-0.8-0.7-1.8-1.1-2.9-1.1   
                        c-1.1,0-2.1,0.5-2.8,1.3L58.4,481.8H30.3V30.5z M304.9,481.8H69.3L178,363.3L304.9,481.8z M316.6,481.8l-93.1-87l134.7-144   
                        l123.9,96.3v134.7H316.6z"
                    />
                    <path 
                        className="stroke-ink dark:stroke-paper duration-300" strokeWidth={15}
                        d="M133.5,188.5c28.7,0,52.1-23.4,52.1-52.1c0-28.7-23.4-52-52.1-52c-28.7,0-52.1,23.3-52.1,52   
                        C81.4,165.1,104.8,188.5,133.5,188.5z M133.5,92.4c24.3,0,44.1,19.8,44.1,44c0,24.3-19.8,44.1-44.1,44.1   
                        c-24.3,0-44.1-19.8-44.1-44.1C89.4,112.1,109.2,92.4,133.5,92.4z"
                    />
                </g>
            </svg>
        </button>
        
    );
};
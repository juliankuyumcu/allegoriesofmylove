"use client"

import React, { useState, useEffect } from "react";
import { usePinned } from "@/context/PinnedProvider";
import { motion } from "motion/react";

interface PinProps {
    slug: string;
}

export default function Pin({ slug }: PinProps) {

    const { pinnedSlugs, isPinned, togglePin } = usePinned();
    const [ localPinned, setLocalPinned ] = useState(isPinned(slug));

    useEffect(() => {
        setLocalPinned(isPinned(slug));
    }, [pinnedSlugs, isPinned, slug]);

    return (
        <button 
            className="cursor-pointer"
            onClick={() => togglePin(slug)} 
            title={`${localPinned ? "Unpin from" : "Pin to"} top`}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                version="1.1" x="0px" y="0px" viewBox="0 0 100 100" 
                enableBackground="new 0 0 100 100"
                width={15} height={15}
                className="-scale-x-100 mr-1"
            >
                <motion.path 
                    className={"stroke-ink fill-ink dark:stroke-paper dark:fill-paper duration-300"}
                    fillOpacity={localPinned ? 1 : 0}
                    strokeWidth={5}
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M51.447,59.186c0,0-12.542,12.916-18.583,17.829  
                    c-3.561-7.275,2.275-18.726,2.275-18.726L11.535,27.337c0,0-7.694,3.517-11.535,2.013C9.471,19.251,19.254,9.468,29.352-0.003  
                    c1.434,3.76-2.012,11.284-2.012,11.284l30.701,23.856c0,0,11.578-5.927,18.977-2.275c-4.955,5.917-17.83,18.332-17.83,18.332  
                    s27.875,31.665,40.66,48.651c0.352,0.301,0.021,0.098-0.252,0C83.035,86.804,51.447,59.186,51.447,59.186z"
                />
            </svg>  
        </button>
    );
}
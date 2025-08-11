import React from "react";
import { motion } from "framer-motion";

interface MarginProps {
    direction: string;
}

export default function Margin({ direction }: MarginProps) {
    return (
        <motion.span
            style={{transitionTimingFunction: "ease-in-out"}}
            initial={{...(direction === "horizontal" ? {width: 0} : {height: 0})}}
            animate={{...(direction === "horizontal" ? {width: "100%"} : {height: "100%"})}}
            transition={{ type: "tween", duration: 1.5, delay: 1.5, ease: "easeInOut" }}
        >
            <span className={`block ${direction === "horizontal" ? "h-px w-full px-4" : "w-px h-full py-1"} bg-clip-content bg-pencil dark:bg-pencil`}></span>   
        </motion.span>
    );
}
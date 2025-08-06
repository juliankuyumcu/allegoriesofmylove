import React from "react";
import { motion } from "motion/react";

interface MarginProps {
    direction: string;
}

export default function Margin({ direction }: MarginProps) {
    return (
        <motion.span 
            className={`${direction === "horizontal" ? "h-px px-4" : "w-px py-1"} bg-clip-content bg-pencil dark:bg-pencil duration-1000`}
            initial={{...(direction === "horizontal" ? {width: 0} : {height: 0})}}
            animate={{...(direction === "horizontal" ? {width: "100%"} : {height: "100%"})}}
            transition={{ delay: 0.5 }}
        ></motion.span>
    );
}
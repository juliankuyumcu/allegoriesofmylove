"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type PinnedContextType = {
    pinnedSlugs: Set<string> | null;
    togglePin: (slug: string) => void;
    isPinned: (slug: string) => boolean;
}

const PinnedContext = createContext<PinnedContextType | undefined>(undefined);

export const PinnedProvider = ({ children }: { children: ReactNode }) => {
    const [ pinnedSlugs, setPinnedSlugs ] = useState<Set<string> | null>(null);

    useEffect(() => {
        const stored: Set<string> = new Set(JSON.parse(localStorage.getItem("pinned") || "[]"));
        setPinnedSlugs(stored);
    }, []);
    
    const togglePin = (slug: string) => {
        setPinnedSlugs((prev: Set<string> | null) => {
            const newSet = new Set(prev);
            if (newSet.has(slug))
                newSet.delete(slug);
            else
                newSet.add(slug);
            localStorage.setItem("pinned", JSON.stringify([...newSet]));
            return newSet;
        });
    };

    const isPinned = (slug: string) => pinnedSlugs !== null && pinnedSlugs.has(slug);

    return (
        <PinnedContext.Provider value={{ pinnedSlugs, togglePin, isPinned }}>
            {children}
        </PinnedContext.Provider>
    );
};

export const usePinned = () => {
    const context = useContext(PinnedContext);
    if (!context) throw new Error("usePinned must be used within PinnedProvider");
    return context;
};
'use client'

import React, { createContext, useMemo } from "react";
import useLocalStorage from "@/lib/useLocalStorage";

export const StorageContext = createContext();

export default function StorageProvider({ children }) {
    const [theme, setTheme] = useLocalStorage("theme", global.window?.__theme || 'light');
    const value = useMemo(() => ({theme, setTheme}), [theme]);

    return (
         <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
    )
}
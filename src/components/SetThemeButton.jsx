'use client';
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image'; 
import themeToggle from "../../public/theme-toggle.svg";

import { StorageContext } from "@/app/storageProvider";

const SetThemeButton = () => {
  const { theme, setTheme } = useContext(StorageContext);
  // const [theme, setTheme] = useState(global.window?.__theme || 'light');

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    global.window?.__setPreferredTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    global.window.__onThemeChange = setTheme;
  }, []);

  return (
    <button onClick={toggleTheme} className="cursor-pointer flex flex-col items-end gap-1">
      <Image src={themeToggle} alt="Theme toggle" />
      <span className='text-neutral-50 font-bold text-sm underline'>Dark Mode {isDark ? 'On' : 'Off'}</span>
    </button>
  );
};

export default SetThemeButton;
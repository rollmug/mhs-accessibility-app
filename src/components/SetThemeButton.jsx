'use client';
import { useRef, useEffect, useContext } from 'react';
import Image from 'next/image';
import themeToggle from "../../public/theme-toggle.svg";

import { StorageContext } from "@/app/storageProvider";

const SetThemeButton = () => {
  const { theme, setTheme } = useContext(StorageContext);
  const isDark = theme === 'dark';
  // const firstFocusableElementRef = useRef(null);

  const toggleTheme = () => {
    global.window?.__setPreferredTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    global.window.__onThemeChange = setTheme;
    // if (firstFocusableElementRef.current) {
    //   firstFocusableElementRef.current.focus();
    // }
  }, []);

  return (
    <button onClick={toggleTheme} className="cursor-pointer flex flex-col items-end gap-1" aria-hidden="true">
      <Image src={themeToggle} alt="Toggle dark mode." />
      <span className='text-neutral-50 font-bold text-sm underline'>Dark Mode {isDark ? 'On' : 'Off'}</span>
    </button>
  );
};

export default SetThemeButton;
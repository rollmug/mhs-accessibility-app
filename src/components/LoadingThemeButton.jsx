import Image from 'next/image';
import themeToggle from "../../public/theme-toggle.svg";

const LoadingThemeButton = () => {
    return (
        <button className="cursor-pointer flex flex-col items-end gap-1">
          <Image src={themeToggle} alt="theme-toggle" />
          <span className='text-neutral-50 font-bold text-sm underline'>Loading theme...</span>
        </button>
      );
};

export default LoadingThemeButton;
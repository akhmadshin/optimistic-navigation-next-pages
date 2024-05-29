import { useTheme } from "next-themes";
import * as React from "react";
import { useEffect, useState } from "react";

export type ThemeSwitchProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ThemeSwitch = React.forwardRef<HTMLButtonElement, ThemeSwitchProps>(
  ({ ...props }, ref) => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const oppositeTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      return null;
    }

    return (
      <button
        className="flex-1  bottom-4 left-4 px-2 py-2 font-semibold select-none rounded-md text-gray-800 border border-gray-500 bg-transparent hover:bg-gray-50"
        aria-label={`Switch to ${oppositeTheme} mode`}
        onClick={() => setTheme(oppositeTheme)}
        ref={ref}
        {...props}
      >
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M2.22 2.22a.75.75 0 011.06 0l14.5 14.5a.75.75 0 11-1.06 1.06L2.22 3.28a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
            <path d="M4.73 7.912L2.191 10.75A.75.75 0 002.75 12h6.068L4.73 7.912zM9.233 12.415l-1.216 5.678a.75.75 0 001.292.657l2.956-3.303-3.032-3.032zM15.27 12.088l2.539-2.838A.75.75 0 0017.25 8h-6.068l4.088 4.088zM10.767 7.585l1.216-5.678a.75.75 0 00-1.292-.657L7.735 4.553l3.032 3.032z" />
          </svg>
        )}
      </button>
    );
  },
);

ThemeSwitch.displayName = "ThemeSwitch";

export { ThemeSwitch };

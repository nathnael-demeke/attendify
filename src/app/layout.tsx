"use client"
import React from "react";
import { NavDrawerProvider } from "@/context/NavDrawerContext";
import titleMap from "./page-title";
import { usePathname } from "next/navigation";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/material-symbols-outlined";
import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	const currentPath = usePathname();
	const pageTitle: string = titleMap[currentPath];
	const description: string = "Attendify is an innovative web app designed for efficient school attendance management. Featuring seamless QR code scanning for quick and accurate check-ins, Attendify provides real-time attendance tracking, automated report generation, and user-friendly dashboards for administrators and teachers. Enhance your school's attendance system with Attendify's robust features and streamlined interface.";

	const [theme, setTheme] = React.useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem('theme') || 'system';
        }
        return 'system';
    });

    const [fontSize, setFontSize] = React.useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem('font-size') || 'small';
        }
        return 'medium';
    });

    const [isTouchDevice, setTouchDevice] = React.useState(() => {
        if (typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
            return true;
        }
        false;
    });

	React.useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    React.useEffect(() => {
        applyFontSize(fontSize);
    }, [fontSize]);

    React.useEffect(() => {
        removeHover(isTouchDevice);
    }, [isTouchDevice]);

    const applyTheme = (selectedTheme: string) => {
        if (selectedTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        } else if (selectedTheme === 'light') {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else if (selectedTheme === 'system') {
            const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDarkScheme) {
                document.documentElement.classList.add('dark-mode');
                document.documentElement.classList.remove('light-mode');
            } else {
                document.documentElement.classList.add('light-mode');
                document.documentElement.classList.remove('dark-mode');
            }
            localStorage.removeItem('theme');
        }
    };

    const applyFontSize = (selectedFontSize: string) => {
        document.documentElement.classList.remove('small-font-size', 'medium-font-size', 'large-font-size');
        if (selectedFontSize === 'small') {
            document.documentElement.style.fontSize = "12px";
            localStorage.setItem('font-size', 'small');
        } else if (selectedFontSize === 'large') {
            document.documentElement.style.fontSize = "16px";
            localStorage.setItem('font-size', 'large');
        } else {
            document.documentElement.style.fontSize = "14px";
            localStorage.setItem('font-size', 'medium');
        }
    };

    const removeHover = (isTouchDevice: boolean | undefined) => {
        if (isTouchDevice) {
            document.documentElement.classList.add('no-hover');
            document.documentElement.classList.remove('hover-true');
        } else {
            document.documentElement.classList.add('hover-true');
            document.documentElement.classList.remove('no-hover');
        }
    }

	return (
		<html lang="en" className={""}>
			<head>
				<title>{pageTitle}</title>
				<meta name="description" content={description} />
			</head>
			<body>
				<NavDrawerProvider>
					{children}
				</NavDrawerProvider>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/context/ThemeProvider";
import { PinnedProvider } from "@/context/PinnedProvider";

export const metadata: Metadata = {
  title: {
    default: "allegoriesofmy.love",
    template: "%s",
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ThemeProvider>
        <html lang="en" className={`w-full h-full text-md text-ink dark:text-paper bg-paper dark:bg-ink transition-colors duration-1000`}>
          <head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    try {
                      const theme = localStorage.getItem('theme');
                      const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                      if (isDark) {
                        document.documentElement.classList.add('dark');
                      } else {
                        document.documentElement.classList.remove('dark');
                      }
                    } catch(_) {}
                  })();
                `,
              }}
            />
          </head>
          <body
            className={`w-full h-full inline-flex flex-col items-center justify-center`}
          >
            <PinnedProvider>
              {children}
            </PinnedProvider>
          </body>
        </html>
      </ThemeProvider>
    </>
  );
}

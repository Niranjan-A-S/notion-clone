import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { ConvexClientProvider } from '@/providers/convex-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Notion',
    description: 'The connected workspace where better, faster work happens',
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                href: '/logo.svg',
                url: '/logo.svg',
            },
            {
                media: '(prefers-color-scheme: dark)',
                href: '/logo-dark.svg',
                url: '/logo-dark.svg',
            }
        ]
    }
};

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ConvexClientProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        storageKey="notion-theme"
                        disableTransitionOnChange
                    >
                        <Toaster position="bottom-center" />
                        {children}
                    </ThemeProvider>
                </ConvexClientProvider>
            </body>
        </html>
    );
}

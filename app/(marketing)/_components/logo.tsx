'use client';

import { Poppins } from 'next/font/google';
import Image from 'next/image';
import { FC, memo } from 'react';
import { cn } from '@/lib/utils';


const font = Poppins({
    subsets: ['latin'],
    weight: ['400', '600'],
});

export const Logo: FC = memo(() => {
    return <div className="hidden md:flex items-center gap-x-2">
        <Image
            src="/logo.svg"
            alt="Notion"
            width="40"
            height="40"
            className="dark:hidden"
        />
        <Image
            src="/logo-dark.svg"
            alt="Notion"
            width="40"
            height="40"
            className="hidden dark:block"
        />
        <p className={cn('font-semibold', font.className)}>Notion</p>
    </div>;
});
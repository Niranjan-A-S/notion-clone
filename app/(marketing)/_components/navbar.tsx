'use client';
import { FC, memo } from 'react';
import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import Link from 'next/link';
import { Logo } from './logo';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/spinner';


export const Navbar: FC = memo(() => {
    const scrolled = useScroll();
    const { isAuthenticated, isLoading } = useConvexAuth();

    return <div className={cn(
        'z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6',
        scrolled && 'border-b shadow-sm'
    )}>
        <Logo />
        <div className="md:ml-auto md:justify-end justify-between flex items-center gap-x-2 w-full">
            {isLoading ? <Spinner /> : null}
            {(!isLoading && !isAuthenticated)
                ? <>
                    <SignInButton mode="modal" >
                        <Button variant='ghost' size="sm">
                            Login
                        </Button>
                    </SignInButton>
                    <SignInButton mode="modal" >
                        <Button size="sm">
                            Get Notion
                        </Button>
                    </SignInButton>
                </>
                : null}
            {(!isLoading && isAuthenticated) ? <>
                <Button variant='ghost' size="sm" asChild>
                    <Link href="/documents">
                        Enter Notion
                    </Link>
                </Button>
                <UserButton
                    afterSignOutUrl="/"
                />
            </> : null
            }
            <ModeToggle />
        </div>
    </div >;
});
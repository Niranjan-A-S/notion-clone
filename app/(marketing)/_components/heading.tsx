'use client';
import { FC, memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';
import { SignInButton } from '@clerk/clerk-react';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';

export const Heading: FC = memo(() => {
    const { isAuthenticated, isLoading } = useConvexAuth();


    return <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">Your Ideas, Documents and Plans. Unified. Welcome to {' '}
            <span className="underline">Notion</span>
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">Notion is the connected workspace where <br />
            better faster work happens.
        </h3>
        {isLoading ? <div className="w-full flex items-center justify-center">
            <Spinner />
        </div> : null}
        {!isLoading && isAuthenticated
            ? <Button asChild>
                <Link href='/documents'>
                    Enter Notion <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
            </Button>
            : null}
        {!isAuthenticated && !isLoading
            ? <SignInButton mode="modal" >
                <Button>
                    Get Notion Free <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </SignInButton>
            : null}
    </div>;
});
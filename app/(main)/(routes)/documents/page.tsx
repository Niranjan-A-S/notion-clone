'use client';
import Image from 'next/image';
import { FC, memo, useCallback } from 'react';
import { PlusCircle } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';

const DocumentsPage: FC = () => {
    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = useCallback(() => {
        const promise = create({ title: 'Untitled' });

        toast.promise(promise, {
            success: 'New note created!',
            loading: 'Creating... a new note',
            error: 'Failed to create a new note',
        });
    }, [create]);

    return <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
            src="/empty.png"
            alt="Empty"
            height="300"
            width="300"
            className="dark:hidden"
        />
        <Image
            src="/empty-dark.png"
            alt="Empty"
            height="300"
            width="300"
            className="hidden dark:block"
        />
        <h2 className="text-lg font-medium">Welcome to {user?.firstName}&apos;s Notion</h2>
        <Button onClick={onCreate}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create a note
        </Button>
    </div>;
};

export default memo(DocumentsPage);
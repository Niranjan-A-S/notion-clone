import { useQuery } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import { FC, memo, useCallback, useState } from 'react';
import { FileIcon } from 'lucide-react';
import { Item } from './item';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';

interface IDocumentListProps {
    parentDocumentId?: Id<'documents'>;
    level: number;
    data?: Doc<'documents'>[];
}

export const DocumentList: FC<IDocumentListProps> = memo(({ level = 0, parentDocumentId }) => {
    const params = useParams();
    const router = useRouter();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const onExpand = useCallback((documentId: string) => {
        setExpanded((prev) => ({ ...prev, [documentId]: !prev[documentId] }));
    }, []);

    const documents = useQuery(api.documents.getSidebar, {
        parentDocument: parentDocumentId,
    });

    const onRedirect = useCallback((documentId: string) => {
        router.push(`/documents/${documentId}`);
    }, [router]);

    if (documents === undefined) {
        //checking for loading
        return <>
            <Item.Skeleton level={level} />
            {level == 0 ? (
                <>
                    <Item.Skeleton level={level} />
                    <Item.Skeleton level={level} />
                </>
            )
                : null}
        </>;
    }

    return <>
        <p
            style={{ paddingLeft: level ? `${(level * 12) + 25}px` : undefined }}
            className={cn(
                'hidden text-sm font-medium text-muted-foreground/80',
                expanded && 'last:block',
                level == 0 && 'hidden',
            )}
        >No pages inside</p>
        {
            documents.map((document) => (
                <div
                    key={document._id}
                >
                    <Item
                        id={document._id}
                        level={level}
                        icon={FileIcon}
                        documentIcon={document.icon}
                        label={document.title}
                        isActive={document._id === params._documentId}
                        isExpanded={expanded[document._id]}
                        onExpand={() => onExpand(document._id)}
                        onClick={() => onRedirect(document._id)}
                    />
                    {expanded[document._id] && (
                        <DocumentList
                            level={level + 1}
                            parentDocumentId={document._id}
                        />
                    )}
                </div>

            ))
        }
    </>;
});
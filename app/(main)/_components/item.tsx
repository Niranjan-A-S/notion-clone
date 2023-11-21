'use client';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';
import { FC, MouseEventHandler, memo, useCallback, useMemo } from 'react';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface IItemProps {
    label: string;
    onClick: () => void;
    icon: LucideIcon;
    id?: Id<'documents'>;
    documentIcon?: string;
    isActive?: boolean;
    isExpanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
}

export const Item: FC<IItemProps> = memo(({
    label,
    icon: Icon,
    onClick,
    documentIcon,
    id,
    isActive,
    isExpanded,
    isSearch,
    level = 0,
    onExpand
}) => {

    const ChevronIcon = useMemo(() => isExpanded ? ChevronDown : ChevronRight, [isExpanded]);

    const handleExpand: MouseEventHandler = useCallback((event) => {
        event.stopPropagation();
        onExpand?.();
    }, [onExpand]);

    return <div
        role="button"
        onClick={onClick}
        style={{ paddingLeft: level ? `${(level * 12) + 12}px` : '12px' }}
        className={cn(
            'group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium',
            isActive && 'bg-primary/5 text-primary',
        )}
    >
        {!!id
            ? <div
                className="h-full rounded-sm hover:bg-neutral-300   dark:hover:bg-neutral-600 mr-1"
                role="button"
                onClick={handleExpand}
            >
                <ChevronIcon
                    className="h-4 w-4  shrink-0 text-muted-foreground/50 "
                />
            </div>
            : null}
        {documentIcon ? <div className="shrink-0 text-[18px] mr-2">{documentIcon}</div> : <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />}
        <span className="truncate">{label}</span>
        {isSearch ? <kbd className="ml-auto  pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">CTRL</span>K
        </kbd> : null}
    </div>;
});

Item.Skeleton = function ItemSkeleton({ level }: Pick<IItemProps, 'level'>) {
    return <div
        style={{ paddingLeft: level ? `${(level * 12) + 25}px` : '12px' }}
        className='flex gap-x-2 py-[3px]'
    >
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-[30%]' />
    </div>;
};
import { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/shared/utils'

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>): ReactNode {
    return <div className={cn('animate-pulse rounded-md bg-gray-700', className)} {...props} />
}

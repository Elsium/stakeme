import { FC } from 'react'

import { Skeleton } from '@/shared/components/ui'

interface Segment {
    color: string
    percent: number
}

interface NodeDataChartProps {
    segments: Segment[]
    loading: boolean
    innerColor: string
    cn: (...classes: string[]) => string
}

export const NodeDataChart: FC<NodeDataChartProps> = ({ segments, loading, innerColor, cn }) => {
    if (loading) {
        return <Skeleton className={'h-32 w-32 rounded-full'} />
    }

    let currentAngle = 0
    const gradientParts = segments
        .map(seg => {
            const start = currentAngle
            const end = currentAngle + seg.percent
            currentAngle = end
            return `${seg.color} ${start}% ${end}%`
        })
        .join(', ')

    const donutStyle = { background: `conic-gradient(${gradientParts})` }

    return (
        <div className='relative h-32 w-32'>
            <div className={'h-full w-full rounded-full'} style={donutStyle}></div>
            <div
                className={cn(
                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                    'flex h-[7.5rem] w-[7.5rem] items-center justify-center rounded-full',
                    innerColor
                )}
            />
        </div>
    )
}

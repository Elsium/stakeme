'use client'

import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

import { Skeleton } from '@/shared/components/ui'
import { NodeDataModal } from '@/shared/components/widgets/NodeDataWidget/node-data-modal'
import { fetchMapData } from '@/shared/services'
import { MapNodeData } from '@/shared/types'
import { cn } from '@/shared/utils'

interface GroupedData {
    as: string
    isp: string
    count: number
    nodes: MapNodeData[]
}

const top6Colors = ['#514A96', '#DA6940', '#008ADA', '#7AA987', '#8326C2', '#8E2E2E']

export const NodeDataWidget: FC = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<MapNodeData[]>([])
    const [grouped, setGrouped] = useState<GroupedData[]>([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const mapNodes = await fetchMapData()
                setData(mapNodes)

                const groups = mapNodes.reduce((acc: Record<string, MapNodeData[]>, node) => {
                    const asKey = node.as
                    if (!acc[asKey]) acc[asKey] = []
                    acc[asKey].push(node)
                    return acc
                }, {})

                const groupArray = Object.entries(groups).map(([asName, nodes]) => ({
                    as: asName,
                    isp: nodes[0]?.isp || '',
                    count: nodes.length,
                    nodes
                }))

                groupArray.sort((a, b) => b.count - a.count)
                setGrouped(groupArray)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching map data:', error)
            }
        }

        fetchData()
    }, [])

    const totalNodesCount = data.length
    const top6 = grouped.slice(0, 6)
    const segments = top6.map((g, i) => {
        const pct = (g.count / totalNodesCount) * 100
        return {
            color: top6Colors[i],
            percent: pct
        }
    })
    let currentAngle = 0
    const gradientParts = segments
        .map(seg => {
            const start = currentAngle
            const end = currentAngle + seg.percent
            currentAngle = end
            return `${seg.color} ${start}% ${end}%`
        })
        .join(', ')
    const donutStyle = {
        background: `conic-gradient(${gradientParts})`
    }

    return (
        <div className={'flex min-w-[360px] flex-col items-center gap-5 rounded-xl bg-secondary p-[30px] text-white'}>
            <div className={'flex w-full items-center justify-between'}>
                <h2 className={'text-lg font-light'}>Node Data Center</h2>

                <div className={'flex items-center justify-center gap-3'}>
                    <Image className={'select-none'} src={'/assets/points.svg'} alt={''} width={60} height={20} />
                    <p className={'text-2xl'}>{totalNodesCount}</p>
                </div>
            </div>

            <div className='flex w-full flex-row gap-4'>
                {loading ? (
                    <Skeleton className={'h-32 w-32 rounded-full'} />
                ) : (
                    <div className='relative h-32 w-32'>
                        <div className={'h-full w-full rounded-full'} style={donutStyle}></div>
                        <div
                            className={cn(
                                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                                'flex h-[7.5rem] w-[7.5rem] items-center justify-center rounded-full bg-secondary'
                            )}
                        />
                    </div>
                )}
                <div className={'flex w-1/2 flex-col gap-1.5 font-poppins text-xs text-icon'}>
                    {loading && (
                        <>
                            <Skeleton className={'h-4 w-full'} />
                            <Skeleton className={'h-4 w-full'} />
                            <Skeleton className={'h-4 w-full'} />
                            <Skeleton className={'h-4 w-full'} />
                            <Skeleton className={'h-4 w-full'} />
                            <Skeleton className={'h-4 w-full'} />
                        </>
                    )}
                    {top6.map((g, i) => {
                        const pct = (g.count / totalNodesCount) * 100
                        return (
                            <div key={g.as} className={'flex items-center justify-between'}>
                                <div className={'flex items-center justify-center gap-1.5'}>
                                    <div className={`h-2 w-2 rounded-full bg-[${top6Colors[i]}]`} />
                                    <p>{g.isp}</p>
                                </div>
                                <p>{pct.toFixed(2)}%</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <button
                className={cn(
                    'select-none rounded-3xl bg-tertiary/15 px-10 py-1 font-poppins text-xs text-textTertiary',
                    'transition-colors duration-150 hover:bg-tertiary/35 hover:text-textTertiary/80',
                    'active:bg-tertiary/25 active:text-textTertiary/90'
                )}
                onClick={() => setShowModal(true)}
            >
                View all centers
            </button>

            {showModal && (
                <NodeDataModal onClose={() => setShowModal(false)} groups={grouped} total={totalNodesCount} />
            )}
        </div>
    )
}

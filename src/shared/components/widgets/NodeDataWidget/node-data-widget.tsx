'use client'

import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

import { Skeleton } from '@/shared/components/ui'
import { fetchMapData } from '@/shared/services'
import { MapNodeData } from '@/shared/types'
import { cn } from '@/shared/utils'

import { NodeDataChart } from './node-data-chart'
import { NodeDataModal } from './node-data-modal'

const top6Colors = ['#514A96', '#DA6940', '#008ADA', '#7AA987', '#8326C2', '#8E2E2E']

interface GroupedData {
    as: string
    isp: string
    count: number
    nodes: MapNodeData[]
}

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
                    acc[node.as] = acc[node.as] || []
                    acc[node.as].push(node)
                    return acc
                }, {})
                const groupArray = Object.entries(groups)
                    .map(([as, nodes]) => ({
                        as,
                        isp: nodes[0]?.isp || '',
                        count: nodes.length,
                        nodes
                    }))
                    .sort((a, b) => b.count - a.count)
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
    const segments = top6.map((g, i) => ({
        color: top6Colors[i],
        percent: (g.count / totalNodesCount) * 100
    }))

    return (
        <div
            className={
                'flex min-w-[360px] flex-col-reverse items-center gap-5 rounded-xl bg-secondary p-[30px] text-white md:flex-col'
            }
        >
            <div className={'flex w-full flex-col items-start justify-between md:flex-row md:items-center'}>
                <h2 className={'text-lg font-light'}>Node Data Center</h2>
                <div className={'flex items-center justify-center gap-3'}>
                    <Image className={'select-none'} src={'/assets/points.svg'} alt={''} width={60} height={20} />
                    <p className={'text-2xl'}>{totalNodesCount}</p>
                </div>
            </div>

            <div className='flex w-full flex-row gap-4'>
                <NodeDataChart segments={segments} loading={loading} innerColor='bg-secondary' cn={cn} />
                <div className={'flex w-1/2 flex-col gap-1.5 font-poppins text-xs text-icon'}>
                    {loading && [...Array(6)].map((_, i) => <Skeleton key={i} className={'h-4 w-full'} />)}
                    {!loading &&
                        top6.map((g, i) => {
                            const pct = (g.count / totalNodesCount) * 100
                            return (
                                <div key={g.as} className={'flex items-center justify-between'}>
                                    <div className={'flex items-center justify-center gap-1.5'}>
                                        <div
                                            className={'h-2 w-2 rounded-full'}
                                            style={{ backgroundColor: top6Colors[i] }}
                                        />
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

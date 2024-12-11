'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { useMedia } from 'react-use'

import { fetchNetworkData } from '@/shared/services'
import { NetworkData, RPCItem } from '@/shared/types'

import { RPCTableHeader } from './rpc-table-header'
import { RPCTableRow } from './rpc-table-row'
import { RPCTableSkeletonRows } from './rpc-table-skeleton-rows'
import { TabSearch } from './tab-search'

export const RPCTable: FC = () => {
    const [data, setData] = useState<NetworkData | null>(null)

    const searchParams = useSearchParams()
    const router = useRouter()

    const initialTab = (searchParams.get('tab') as 'cosmos' | 'evm') || 'cosmos'
    const initialSearch = searchParams.get('search') || ''
    const initialSortBlockHistory = (searchParams.get('sortBlockHistory') as 'asc' | 'desc') || 'asc'
    const initialSortIndexation = (searchParams.get('sortIndexation') as 'on' | 'off') || 'on'

    const [tab, setTab] = useState<'cosmos' | 'evm'>(initialTab)
    const [search, setSearch] = useState(initialSearch)
    const [sortBlockHistory, setSortBlockHistory] = useState<'asc' | 'desc'>(initialSortBlockHistory)
    const [sortIndexation, setSortIndexation] = useState<'on' | 'off'>(initialSortIndexation)

    const isDesktop = useMedia('(min-width: 768px)', false)

    useEffect(() => {
        const params = new URLSearchParams()
        params.set('tab', tab)
        if (search) params.set('search', search)
        params.set('sortBlockHistory', sortBlockHistory)
        params.set('sortIndexation', sortIndexation)
        router.replace(`?${params.toString()}`, { scroll: false })
    }, [tab, search, sortBlockHistory, sortIndexation, router])

    useEffect(() => {
        fetchNetworkData().then(setData)
    }, [])

    let filteredData: RPCItem[] = data ? (tab === 'cosmos' ? data.rpcs.cosmos : data.rpcs.evm) : []
    filteredData = filteredData.filter(item => item.noder.moniker.toLowerCase().includes(search.toLowerCase()))

    if (sortBlockHistory) {
        filteredData.sort((a, b) => {
            const aUptime = Number(a.uptime)
            const bUptime = Number(b.uptime)
            return sortBlockHistory === 'asc' ? aUptime - bUptime : bUptime - aUptime
        })
    }

    if (sortIndexation) {
        filteredData.sort((a, b) => {
            const aVal = a.tx_index === 'on' ? 1 : 0
            const bVal = b.tx_index === 'on' ? 1 : 0
            return sortIndexation === 'on' ? bVal - aVal : aVal - bVal
        })
    }

    const onSortBlockHistory = (): void => {
        setSortBlockHistory(prev => (prev === 'desc' ? 'asc' : 'desc'))
    }

    const onSortIndexation = (): void => {
        setSortIndexation(prev => (prev === 'on' ? 'off' : 'on'))
    }

    return (
        <div className={'text-white'}>
            <TabSearch tab={tab} search={search} onTabChange={setTab} onSearchChange={setSearch} />
            <table className='mt-[28px] w-full text-sm'>
                {isDesktop && (
                    <RPCTableHeader
                        sortBlockHistory={sortBlockHistory}
                        sortIndexation={sortIndexation}
                        onSortBlockHistory={onSortBlockHistory}
                        onSortIndexation={onSortIndexation}
                    />
                )}
                {!data ? (
                    <RPCTableSkeletonRows />
                ) : (
                    <tbody className={'alternate-rows'}>
                        {filteredData.map((item, idx) => (
                            <RPCTableRow key={idx} item={item} />
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    )
}

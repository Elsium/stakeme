'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import { Skeleton } from '@/shared/components/ui'
import { TabSearch } from '@/shared/components/widgets/RPCTable/tab-search'
import { fetchNetworkData } from '@/shared/services'
import { NetworkData, RPCItem } from '@/shared/types'

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

    useEffect(() => {
        const params = new URLSearchParams()

        if (tab) params.set('tab', tab)
        if (search) params.set('search', search)
        if (sortBlockHistory) params.set('sortBlockHistory', sortBlockHistory)
        if (sortIndexation) params.set('sortIndexation', sortIndexation)

        const queryString = params.toString()
        const newUrl = queryString ? `?${queryString}` : ''
        router.replace(newUrl, { scroll: false })
    }, [tab, search, sortBlockHistory, sortIndexation, router])

    useEffect(() => {
        fetchNetworkData().then(res => {
            setData(res)
        })
    }, [])

    let filteredData: RPCItem[] = data ? (tab === 'cosmos' ? data.rpcs.cosmos : data.rpcs.evm) : []

    filteredData = filteredData.filter(item => item.noder.moniker.toLowerCase().includes(search.toLowerCase()))

    if (sortBlockHistory) {
        filteredData = [...filteredData].sort((a, b) => {
            const aUptime = Number(a.uptime)
            const bUptime = Number(b.uptime)
            return sortBlockHistory === 'asc' ? aUptime - bUptime : bUptime - aUptime
        })
    }

    if (sortIndexation) {
        filteredData = [...filteredData].sort((a, b) => {
            const aVal = a.tx_index === 'on' ? 1 : 0
            const bVal = b.tx_index === 'on' ? 1 : 0
            return sortIndexation === 'on' ? bVal - aVal : aVal - bVal
        })
    }

    return (
        <div className={'text-white'}>
            <TabSearch tab={tab} search={search} onTabChange={setTab} onSearchChange={setSearch} />
            <table className='mt-[28px] w-full text-sm'>
                <thead>
                    <tr className={'select-none font-montserrat text-sm text-textSecondary/30'}>
                        <th className='text-left font-normal'>Status, Location</th>
                        <th className='text-left font-normal'>Node</th>
                        <th
                            className={'cursor-pointer font-normal'}
                            onClick={() => {
                                if (sortBlockHistory === 'desc') setSortBlockHistory('asc')
                                else if (sortBlockHistory === 'asc') setSortBlockHistory('desc')
                            }}
                        >
                            <div className={'flex items-center justify-start gap-1'}>
                                <p>Block history</p>
                                <Image
                                    src={'/assets/arrow.svg'}
                                    alt={sortBlockHistory === 'asc' ? '↑' : '↓'}
                                    width={15}
                                    height={9}
                                    className={`${sortBlockHistory === 'asc' && 'rotate-180'}`}
                                />
                            </div>
                        </th>
                        <th
                            className={'cursor-pointer font-normal'}
                            onClick={() => {
                                if (sortIndexation === 'off') setSortIndexation('on')
                                else if (sortIndexation === 'on') setSortIndexation('off')
                            }}
                        >
                            <div className={'flex items-center justify-start gap-1'}>
                                <p>Indexation</p>
                                <Image
                                    src={'/assets/arrow.svg'}
                                    alt={sortIndexation === 'off' ? '↑' : '↓'}
                                    width={15}
                                    height={9}
                                    className={`${sortIndexation === 'off' && 'rotate-180'}`}
                                />
                            </div>
                        </th>
                    </tr>
                </thead>
                {!data ? (
                    <tbody className={'alternate-rows'}>
                        {[...Array(6)].map((_, i) => (
                            <tr key={i} className={'border-b border-[#131313]'}>
                                <td className='p-8'>
                                    <Skeleton className={'h-4 w-1/2'} />
                                </td>
                                <td className='p-8'>
                                    <Skeleton className={'h-4 w-1/2'} />
                                </td>
                                <td className='p-8'>
                                    <Skeleton className={'h-4 w-1/2'} />
                                </td>
                                <td className='p-8'>
                                    <Skeleton className={'h-4 w-1/2'} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody className={'alternate-rows'}>
                        {filteredData.map((item, idx) => {
                            const status = item.rpcIp ? 'RPC' : item.evmIp ? 'EVM RPC' : 'Unknown'
                            const ip = item.rpcIp || item.evmIp

                            return (
                                <tr key={idx} className={'border-b border-[#131313]'}>
                                    <td className={'p-8 text-lg'}>
                                        <div className={'flex items-center gap-[30px]'}>
                                            <p>{status}</p>
                                            <div className={'flex items-center gap-1'}>
                                                {/*<div>Отображение смайлика флага страны по ip</div>*/}
                                                <p>http://{ip}</p>
                                            </div>
                                            <button
                                                className={'hover:brightness-50 active:brightness-90'}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`http://${ip}`)
                                                    alert('IP Address copied to clipboard!')
                                                }}
                                            >
                                                <Image src={'/assets/copy.svg'} alt={''} width={12} height={15} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className={'p-8'}>
                                        <div className={'flex items-center gap-2 text-lg'}>
                                            <Image src={'/assets/person.svg'} alt={''} width={18} height={18} />
                                            <p className={'text-link'}>{item.noder.moniker}</p>
                                        </div>
                                    </td>
                                    <td className={'p-8'}>
                                        <div className={'flex items-center gap-2 text-lg'}>
                                            <Image src={'/assets/block.svg'} alt={''} width={18} height={18} />
                                            <p className={'text-link'}>
                                                {item.uptime.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
                                            </p>
                                        </div>
                                    </td>
                                    <td className='p-8'>
                                        <div className={'flex items-center gap-2 text-base'}>
                                            <Image
                                                src={item.tx_index === 'on' ? '/assets/on.svg' : '/assets/off.svg'}
                                                alt={''}
                                                width={27}
                                                height={27}
                                            />
                                            <p>{item.tx_index === 'on' ? 'On' : 'Off'}</p>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                )}
            </table>
        </div>
    )
}

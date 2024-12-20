'use client'

import Image from 'next/image'
import { FC } from 'react'

interface RPCTableHeaderProps {
    sortBlockHistory: 'asc' | 'desc'
    sortIndexation: 'on' | 'off'
    onSortBlockHistory: () => void
    onSortIndexation: () => void
}

export const RPCTableHeader: FC<RPCTableHeaderProps> = ({
    sortBlockHistory,
    sortIndexation,
    onSortBlockHistory,
    onSortIndexation
}) => {
    return (
        <thead>
            <tr className={'grid select-none grid-cols-table font-montserrat text-sm text-textSecondary/30'}>
                <th className='text-left font-normal'>Status, Location</th>
                <th className='text-left font-normal'>Node</th>
                <th className={'cursor-pointer font-normal'} onClick={onSortBlockHistory}>
                    <div className={'flex items-center justify-start gap-1'}>
                        <p>Block history</p>
                        <div className={'h-[9px] w-[15px]'}>
                            <Image
                                src={'/assets/arrow.svg'}
                                alt={sortBlockHistory === 'asc' ? '↑' : '↓'}
                                width={15}
                                height={9}
                                className={`${sortBlockHistory === 'asc' && 'rotate-180'}`}
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </div>
                    </div>
                </th>
                <th className={'cursor-pointer font-normal'} onClick={onSortIndexation}>
                    <div className={'flex items-center justify-start gap-1'}>
                        <p>Indexation</p>
                        <div className={'h-[9px] w-[15px]'}>
                            <Image
                                src={'/assets/arrow.svg'}
                                alt={sortIndexation === 'off' ? '↑' : '↓'}
                                width={15}
                                height={9}
                                className={`${sortIndexation === 'off' && 'rotate-180'}`}
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </div>
                    </div>
                </th>
            </tr>
        </thead>
    )
}

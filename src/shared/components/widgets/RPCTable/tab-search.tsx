'use client'

import Image from 'next/image'
import { FC } from 'react'
import { useMedia } from 'react-use'

import { cn } from '@/shared/utils'

interface TabSearchProps {
    search: string
    tab: 'cosmos' | 'evm'
    onTabChange: (tab: 'cosmos' | 'evm') => void
    onSearchChange: (search: string) => void
}

export const TabSearch: FC<TabSearchProps> = ({ search, tab, onTabChange, onSearchChange }) => {
    const isDesktop = useMedia('(min-width: 768px)', false)

    return (
        <>
            <div className={'mb-[40px] flex items-center justify-between px-5 md:px-0'}>
                <h1 className={'font-montserrat text-lg font-normal md:text-xl'}>RPC / REST / GRPs</h1>
                <div className={'relative w-1/3 md:w-auto'}>
                    <input
                        value={search}
                        onChange={e => onSearchChange(e.target.value)}
                        placeholder={isDesktop ? 'Search mode' : ''}
                        className={cn(
                            'w-full rounded-xl border-[0.9px] border-secondary bg-primary px-8 py-2 text-center text-textPrimary md:px-12',
                            'placeholder:select-none placeholder:text-textPrimary/50',
                            'focus:border-tertiary focus:outline-none'
                        )}
                    />
                    <div className={'absolute right-3 top-1/2 -translate-y-1/2 select-none'}>
                        <Image src={'/assets/search.svg'} alt={''} width={16} height={16} />
                    </div>
                </div>
            </div>
            <div className='flex select-none items-center gap-[10px] px-5 md:px-0'>
                <button
                    onClick={() => onTabChange('cosmos')}
                    className={cn(
                        'h-[38px] w-1/2 rounded-3xl md:w-[130px]',
                        `${tab === 'cosmos' ? 'bg-textSecondary text-secondary' : 'bg-tertiary text-textPrimary'}`
                    )}
                >
                    Cosmos
                </button>
                <button
                    onClick={() => onTabChange('evm')}
                    className={cn(
                        'h-[38px] w-1/2 rounded-3xl md:w-[130px]',
                        `${tab === 'evm' ? 'bg-textSecondary text-secondary' : 'bg-tertiary text-textPrimary'}`
                    )}
                >
                    EVM
                </button>
            </div>
        </>
    )
}

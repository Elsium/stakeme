'use client'

import Image from 'next/image'
import { FC } from 'react'

import { cn } from '@/shared/utils'

interface TabSearchProps {
    search: string
    tab: 'cosmos' | 'evm'
    onTabChange: (tab: 'cosmos' | 'evm') => void
    onSearchChange: (search: string) => void
}

export const TabSearch: FC<TabSearchProps> = ({ search, tab, onTabChange, onSearchChange }) => {
    return (
        <>
            <div className={'mb-[40px] flex items-center justify-between'}>
                <h1 className={'font-montserrat text-xl font-normal'}>RPC / REST / GRPs</h1>
                <div className={'relative'}>
                    <input
                        value={search}
                        onChange={e => onSearchChange(e.target.value)}
                        placeholder={'Search mode'}
                        className={cn(
                            'rounded-xl border-[0.9px] border-secondary bg-primary px-12 py-2 text-center text-textPrimary',
                            'placeholder:select-none placeholder:text-textPrimary/50',
                            'focus:border-tertiary focus:outline-none'
                        )}
                    />
                    <div className={'absolute right-3 top-1/2 -translate-y-1/2 select-none'}>
                        <Image src={'/assets/search.svg'} alt={''} width={16} height={16} />
                    </div>
                </div>
            </div>
            <div className='flex select-none items-center gap-[10px]'>
                <button
                    onClick={() => onTabChange('cosmos')}
                    className={cn(
                        'h-[38px] w-[130px] rounded-3xl',
                        `${tab === 'cosmos' ? 'bg-textSecondary text-secondary' : 'bg-tertiary text-textPrimary'}`
                    )}
                >
                    Cosmos
                </button>
                <button
                    onClick={() => onTabChange('evm')}
                    className={cn(
                        'h-[38px] w-[130px] rounded-3xl',
                        `${tab === 'evm' ? 'bg-textSecondary text-secondary' : 'bg-tertiary text-textPrimary'}`
                    )}
                >
                    EVM
                </button>
            </div>
        </>
    )
}

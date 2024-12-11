'use client'

import { FC } from 'react'
import { useMedia } from 'react-use'

import { Skeleton } from '@/shared/components/ui'

export const RPCTableSkeletonRows: FC = () => {
    const isDesktop = useMedia('(min-width: 768px)', false)

    if (isDesktop)
        return (
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
        )
    else
        return (
            <tbody className={'alternate-rows'}>
                {[...Array(6)].map((_, i) => (
                    <tr key={i} className={'border-b border-[#131313]'}>
                        <td className='p-8'>
                            <div className={'flex flex-col gap-5 pl-[10px]'}>
                                <div className={'flex items-center gap-[30px]'}>
                                    <Skeleton className={'h-4 w-full'} />
                                </div>
                                <div className={'flex items-center gap-[20px]'}>
                                    <Skeleton className={'h-4 w-[30%]'} />
                                    <Skeleton className={'h-4 w-[30%]'} />
                                    <Skeleton className={'h-4 w-[30%]'} />
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        )
}

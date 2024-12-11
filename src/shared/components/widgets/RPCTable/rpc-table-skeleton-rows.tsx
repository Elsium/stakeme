import { FC } from 'react'

import { Skeleton } from '@/shared/components/ui'

export const RPCTableSkeletonRows: FC = () => {
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
}

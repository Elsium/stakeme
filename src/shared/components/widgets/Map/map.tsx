'use client'

import Image from 'next/image'
import { FC } from 'react'
import { useMedia } from 'react-use'

export const MapPlaceholder: FC = () => {
    const isDesktop = useMedia('(min-width: 768px)', false)

    if (isDesktop)
        return (
            <div className='h-auto w-auto select-none'>
                <Image
                    src={'/assets/Card.svg'}
                    alt={''}
                    width={1000}
                    height={400}
                    style={{ width: 'auto', height: 'auto' }}
                    priority
                />
            </div>
        )
    else
        return (
            <div className='h-auto w-auto select-none'>
                <Image
                    src={'/assets/Card-mobile.svg'}
                    alt={''}
                    width={360}
                    height={537}
                    style={{ width: 'auto', height: 'auto' }}
                    priority
                />
            </div>
        )
}

import Image from 'next/image'
import { FC } from 'react'

export const MapPlaceholder: FC = () => {
    return (
        <div className='h-auto w-auto select-none'>
            <Image src={'/assets/Card.svg'} alt={''} width={1000} height={400} />
        </div>
    )
}

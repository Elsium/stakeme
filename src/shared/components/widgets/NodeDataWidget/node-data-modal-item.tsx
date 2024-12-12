import Image from 'next/image'
import { FC } from 'react'

import { MapNodeData } from '@/shared/types'

interface GroupedData {
    as: string
    isp: string
    count: number
    nodes: MapNodeData[]
}

interface NodeDataModalItemProps {
    group: GroupedData
    index: number
    total: number
    itemsPerPage: number
    page: number
}

export const NodeDataModalItem: FC<NodeDataModalItemProps> = ({ group, index, total, itemsPerPage, page }) => {
    return (
        <div className={'flex items-center justify-start font-montserrat'}>
            <p className={'mr-[15px] text-icon'}>{(page - 1) * itemsPerPage + index + 1}</p>
            <div className={'mr-[7px] h-[18px] w-[18px]'}>
                <Image
                    src={'/assets/person.svg'}
                    alt={''}
                    width={18}
                    height={18}
                    style={{ width: 'auto', height: 'auto' }}
                />
            </div>
            <p className={'mr-[40px]'}>{group.isp}</p>
            <p className={'rounded-2xl bg-tertiary/35 px-5 py-0.5 text-icon'}>
                {((group.count / total) * 100).toFixed(0)}%
            </p>
        </div>
    )
}

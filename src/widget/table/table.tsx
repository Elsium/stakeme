import { FC, ReactNode } from 'react'

import { RPCTable } from '@/shared/components/widgets/RPCTable/rpc-table'
import { NetworkData } from '@/shared/types'
import { cn } from '@/shared/utils'

interface IProps {
    data: NetworkData
    classname?: string
}

export const Table: FC<IProps> = ({ data, classname }): ReactNode => {
    return (
        <section className={cn('max-w-screen mt-[40px]', classname)}>
            <RPCTable data={data} />
        </section>
    )
}

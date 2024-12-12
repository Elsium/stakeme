import React from 'react'

import { RPCTable } from '@/shared/components/widgets/RPCTable/rpc-table'
import { cn } from '@/shared/utils'

interface IProps {
    classname?: string
}

export const Table: React.FC<IProps> = ({ classname }): React.ReactNode => {
    return (
        <section className={cn('max-w-screen mt-[40px]', classname)}>
            <RPCTable />
        </section>
    )
}

import { ReactNode } from 'react'

import { NodeData } from '@/widget/node-data/node-data'
import { Table } from '@/widget/table/table'

export default function Home(): ReactNode {
    return (
        <div className='min-h-screen bg-primary text-textPrimary'>
            <div className='flex flex-col items-center py-10 md:block md:px-[30px]'>
                <NodeData />
                <Table />
            </div>
        </div>
    )
}

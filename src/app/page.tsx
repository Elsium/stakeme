import { ReactNode } from 'react'

import { fetchMapData, fetchNetworkData } from '@/shared/services'

import { NodeData } from '@/widget/node-data/node-data'
import { Table } from '@/widget/table/table'

async function fetchData() {
    const [nodeData, networkData] = await Promise.all([fetchMapData(), fetchNetworkData()])
    return { nodeData, networkData }
}

export default async function Home(): Promise<ReactNode> {
    const { nodeData, networkData } = await fetchData()

    return (
        <div className='min-h-screen bg-primary text-textPrimary'>
            <div className='flex flex-col items-center py-10 md:block md:px-[30px]'>
                <NodeData data={nodeData} />
                <Table data={networkData} />
            </div>
        </div>
    )
}

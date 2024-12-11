import { ReactNode } from 'react'

import { MapPlaceholder } from '@/shared/components/widgets/Map/map'
import { NodeDataWidget } from '@/shared/components/widgets/NodeDataWidget/node-data-widget'
import { RPCTable } from '@/shared/components/widgets/RPCTable/rpc-table'

export default function Home(): ReactNode {
    return (
        <div className='min-h-screen bg-primary text-textPrimary'>
            <div className='flex flex-col items-center py-10 md:block md:px-[30px]'>
                <h1 className={'mb-[40px] ml-[20px] self-start font-montserrat text-xl font-normal md:ml-0'}>
                    Node Data center
                </h1>
                <section className={'flex flex-col-reverse items-center gap-5 md:flex-row md:items-start'}>
                    <NodeDataWidget />
                    <MapPlaceholder />
                </section>

                <section className={'max-w-screen mt-[40px]'}>
                    <RPCTable />
                </section>
            </div>
        </div>
    )
}

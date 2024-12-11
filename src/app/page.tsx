import { ReactNode } from 'react'

import { MapPlaceholder } from '@/shared/components/widgets/Map/map'
import { NodeDataWidget } from '@/shared/components/widgets/NodeDataWidget/node-data-widget'
import { RPCTable } from '@/shared/components/widgets/RPCTable/rpc-table'

export default function Home(): ReactNode {
    return (
        <div className='min-h-screen bg-primary text-textPrimary'>
            <div className='px-[30px] py-10'>
                <h1 className={'mb-[40px] font-montserrat text-xl font-normal'}>Node Data center</h1>
                <section className={'flex items-start gap-5'}>
                    <NodeDataWidget />
                    <MapPlaceholder />
                </section>

                <section className={'mt-[40px]'}>
                    <RPCTable />
                </section>
            </div>
        </div>
    )
}

import { FC, ReactNode } from 'react'

import { MapPlaceholder } from '@/shared/components/widgets/Map/map'
import { NodeDataWidget } from '@/shared/components/widgets/NodeDataWidget/node-data-widget'
import { MapNodeData } from '@/shared/types'

interface IProps {
    data: MapNodeData[]
    classname?: string
}

export const NodeData: FC<IProps> = ({ data, classname }): ReactNode => {
    return (
        <div className={classname}>
            <h1 className={'mb-[40px] ml-[20px] self-start font-montserrat text-xl font-normal md:ml-0'}>
                Node Data center
            </h1>
            <section className={'flex flex-col-reverse items-center gap-5 md:flex-row md:items-start'}>
                <NodeDataWidget data={data} />
                <MapPlaceholder />
            </section>
        </div>
    )
}

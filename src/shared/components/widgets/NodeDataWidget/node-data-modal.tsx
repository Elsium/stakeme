'use client'

import Image from 'next/image'
import { FC, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

import { Pagination } from '@/shared/components/ui'
import { MapNodeData } from '@/shared/types'

import { NodeDataModalItem } from './node-data-modal-item'

interface GroupedData {
    as: string
    isp: string
    count: number
    nodes: MapNodeData[]
}

interface NodeDataModalProps {
    onClose: () => void
    groups: GroupedData[]
    total: number
}

export const NodeDataModal: FC<NodeDataModalProps> = ({ onClose, groups, total }) => {
    const refModal = useRef(null)
    const [page, setPage] = useState(1)
    const itemsPerPage = 6
    const totalPages = Math.ceil(groups.length / itemsPerPage)
    const currentItems = groups.slice((page - 1) * itemsPerPage, page * itemsPerPage)

    useClickAway(refModal, onClose)

    return (
        <div className={'fixed inset-0 z-50 flex items-center justify-center bg-primary/70'}>
            <div
                ref={refModal}
                className={
                    'max-w-screen flex w-full flex-col gap-[30px] rounded-xl bg-secondary p-[30px] text-textPrimary md:max-w-[1000px]'
                }
            >
                <div className={'flex w-full items-center justify-between'}>
                    <div className={'flex items-center justify-center gap-3'}>
                        <h2 className={'font-poppins text-lg font-medium'}>Node Data Center</h2>
                        <Image className={'select-none'} src={'/assets/points.svg'} alt={''} width={60} height={20} />
                        <p className={'text-2xl'}>{total}</p>
                    </div>
                    <button className={'select-none hover:brightness-150'} onClick={onClose}>
                        <Image src={'/assets/close.svg'} alt={''} width={34} height={34} />
                    </button>
                </div>
                <div className={'grid w-full grid-cols-1 grid-rows-6 gap-5 md:grid-cols-3 md:grid-rows-2'}>
                    {currentItems.map((g, i) => (
                        <NodeDataModalItem
                            key={g.as}
                            group={g}
                            index={i}
                            total={total}
                            itemsPerPage={itemsPerPage}
                            page={page}
                        />
                    ))}
                </div>
                <div className='flex w-full select-none justify-end gap-4'>
                    <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} maxVisiblePages={5} />
                </div>
            </div>
        </div>
    )
}

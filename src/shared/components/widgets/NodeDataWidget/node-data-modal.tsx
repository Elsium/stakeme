'use client'

import Image from 'next/image'
import { FC, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

import { MapNodeData } from '@/shared/types'

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

    useClickAway(refModal, () => {
        onClose()
    })

    return (
        <div className={'fixed inset-0 z-50 flex items-center justify-center bg-primary/70'}>
            <div
                className={
                    'flex w-full max-w-[1000px] flex-col gap-[30px] rounded-xl bg-secondary p-[30px] text-textPrimary'
                }
                ref={refModal}
            >
                <div className={'flex w-full items-center justify-between'}>
                    <div className={'flex items-center justify-center gap-3'}>
                        <h2 className={'font-poppins text-lg font-medium'}>Node Data Center</h2>
                        <Image className={'select-none'} src={'/assets/points.svg'} alt={''} width={60} height={20} />
                        <p className={'text-2xl'}>{total}</p>
                    </div>
                    <button className={'select-none'} onClick={onClose}>
                        <Image src={'/assets/close.svg'} alt={''} width={34} height={34} />
                    </button>
                </div>

                <div className={'grid w-full grid-cols-3 grid-rows-2 gap-5'}>
                    {currentItems.map((g, i) => (
                        <div key={g.as} className={'flex items-center justify-start font-montserrat'}>
                            <p className={'mr-[15px] text-icon'}>{(page - 1) * itemsPerPage + i + 1}</p>
                            <div className={'mr-[7px]'}>
                                <Image src={'/assets/person.svg'} alt={''} width={18} height={18} />
                            </div>
                            <p className={'mr-[40px]'}>{g.isp}</p>
                            <p className={'rounded-2xl bg-tertiary/35 px-5 py-0.5 text-icon'}>
                                {((g.count / total) * 100).toFixed(0)}%
                            </p>
                        </div>
                    ))}
                </div>

                <div className='flex w-full select-none justify-end gap-4'>
                    <button disabled={page === 1} onClick={() => setPage(page - 1)} className='border px-2 py-1'>
                        Prev
                    </button>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className='border px-2 py-1'
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

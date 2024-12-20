'use client'

import Image from 'next/image'
import { FC } from 'react'
import { useMedia } from 'react-use'

import { RPCItem } from '@/shared/types'

interface RPCTableRowProps {
    item: RPCItem
}

export const RPCTableRow: FC<RPCTableRowProps> = ({ item }) => {
    const status = item.rpcIp ? 'RPC' : item.evmIp ? 'EVM RPC' : 'Unknown'
    const ip = item.rpcIp || item.evmIp

    const copyToClipboard = () => {
        if (ip) {
            navigator.clipboard.writeText(`http://${ip}`)
            alert('IP Address copied to clipboard!')
        }
    }

    const isDesktop = useMedia('(min-width: 768px)', false)

    if (isDesktop)
        return (
            <tr className={'grid grid-cols-table border-b border-[#131313]'}>
                <td className={'py-8 text-lg'}>
                    <div className={'flex items-center gap-[30px]'}>
                        <p>{status}</p>
                        <p>http://{ip}</p>
                        <button
                            type={'button'}
                            className={'h-[15px] w-[12px] hover:brightness-50 active:brightness-90'}
                            onClick={copyToClipboard}
                        >
                            <Image
                                src={'/assets/copy.svg'}
                                alt={''}
                                width={12}
                                height={15}
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </button>
                    </div>
                </td>
                <td className={'py-8'}>
                    <div className={'flex h-[18px] w-[18px] items-center gap-2 text-lg'}>
                        <Image
                            src={'/assets/person.svg'}
                            alt={''}
                            width={18}
                            height={18}
                            style={{ width: 'auto', height: 'auto' }}
                        />
                        <p className={'text-link'}>{item.noder.moniker}</p>
                    </div>
                </td>
                <td className={'py-8'}>
                    <div className={'flex items-center gap-2 text-lg'}>
                        <div className={'h-[18px] w-[18px]'}>
                            <Image
                                src={'/assets/block.svg'}
                                alt={''}
                                width={18}
                                height={18}
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </div>
                        <p className={'text-link'}>{item.uptime.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}</p>
                    </div>
                </td>
                <td className='py-8'>
                    <div className={'flex items-center gap-2 text-base'}>
                        <Image
                            src={item.tx_index === 'on' ? '/assets/on.svg' : '/assets/off.svg'}
                            alt={''}
                            width={27}
                            height={27}
                            style={{ width: 'auto', height: 'auto' }}
                        />
                        <p>{item.tx_index === 'on' ? 'On' : 'Off'}</p>
                    </div>
                </td>
            </tr>
        )
    else
        return (
            <tr className={'border-b border-[#131313]'}>
                <td className={'mx-5 py-4 text-sm'}>
                    <div className={'flex flex-col gap-5 pl-[10px]'}>
                        <div className={'flex items-center gap-[30px]'}>
                            <p>{status}</p>
                            <div className={'flex items-center gap-1'}>
                                <p>http://{ip}</p>
                            </div>
                            <button className={'hover:brightness-50 active:brightness-90'} onClick={copyToClipboard}>
                                <Image
                                    src={'/assets/copy.svg'}
                                    alt={''}
                                    width={12}
                                    height={15}
                                    style={{ width: 'auto', height: 'auto' }}
                                />
                            </button>
                        </div>
                        <div className={'grid grid-cols-3 gap-[20px]'}>
                            <div className={'flex items-center gap-2 text-sm'}>
                                <Image
                                    src={'/assets/block.svg'}
                                    alt={''}
                                    width={18}
                                    height={18}
                                    style={{ width: 'auto', height: 'auto' }}
                                />
                                <p className={'text-link'}>{item.uptime.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}</p>
                            </div>
                            <div className={'flex h-[18px] w-[18px] items-center gap-2 text-sm'}>
                                <Image
                                    src={'/assets/person.svg'}
                                    alt={''}
                                    width={18}
                                    height={18}
                                    style={{ width: 'auto', height: 'auto' }}
                                />
                                <p className={'text-link'}>{item.noder.moniker}</p>
                            </div>
                            <div className={'flex items-center gap-2 text-xs'}>
                                <Image
                                    src={item.tx_index === 'on' ? '/assets/on.svg' : '/assets/off.svg'}
                                    alt={''}
                                    width={27}
                                    height={27}
                                    style={{ width: 'auto', height: 'auto' }}
                                />
                                <p>{item.tx_index === 'on' ? 'On' : 'Off'}</p>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        )
}

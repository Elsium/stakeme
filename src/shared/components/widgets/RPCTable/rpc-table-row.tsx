'use client'

import Image from 'next/image'
import { FC } from 'react'

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

    return (
        <tr className={'border-b border-[#131313]'}>
            <td className={'p-8 text-lg'}>
                <div className={'flex items-center gap-[30px]'}>
                    <p>{status}</p>
                    <div className={'flex items-center gap-1'}>
                        <p>http://{ip}</p>
                    </div>
                    <button className={'hover:brightness-50 active:brightness-90'} onClick={copyToClipboard}>
                        <Image src={'/assets/copy.svg'} alt={''} width={12} height={15} />
                    </button>
                </div>
            </td>
            <td className={'p-8'}>
                <div className={'flex items-center gap-2 text-lg'}>
                    <Image src={'/assets/person.svg'} alt={''} width={18} height={18} />
                    <p className={'text-link'}>{item.noder.moniker}</p>
                </div>
            </td>
            <td className={'p-8'}>
                <div className={'flex items-center gap-2 text-lg'}>
                    <Image src={'/assets/block.svg'} alt={''} width={18} height={18} />
                    <p className={'text-link'}>{item.uptime.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}</p>
                </div>
            </td>
            <td className='p-8'>
                <div className={'flex items-center gap-2 text-base'}>
                    <Image
                        src={item.tx_index === 'on' ? '/assets/on.svg' : '/assets/off.svg'}
                        alt={''}
                        width={27}
                        height={27}
                    />
                    <p>{item.tx_index === 'on' ? 'On' : 'Off'}</p>
                </div>
            </td>
        </tr>
    )
}
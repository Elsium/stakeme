import { MapNodeData, NetworkData } from '@/shared/types'

import { axiosInstance } from './axiosInstance'

export async function fetchMapData(): Promise<MapNodeData[]> {
    const res = await axiosInstance.get('/map-data')
    return res.data
}

export async function fetchNetworkData(): Promise<NetworkData> {
    const res = await axiosInstance.get('/network-data')
    return res.data
}

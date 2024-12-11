export interface Noder {
    moniker: string
    address: string
}

export interface MapNodeData {
    noder: Noder
    country: string
    city: string
    lat: number
    lon: number
    isp: string
    as: string
    ip: string
}

export interface RPCItem {
    noder: Noder
    rpcIp?: string
    evmIp?: string
    uptime: string
    tx_index: 'on' | 'off'
}

export interface PeerItem {
    noder: Noder
    peer: string
}

export interface RPCData {
    cosmos: RPCItem[]
    evm: RPCItem[]
}

export interface PeerData {
    cosmos: PeerItem[]
    evm: PeerItem[]
}

export interface NetworkData {
    rpcs: RPCData
    peers: PeerData
}

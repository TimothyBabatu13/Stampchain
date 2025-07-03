type tokenNetwork = "ethereum" | "polygon" | "solana" | "base"

interface LaunchTokenType {
    network: tokenNetwork
}

export const CheckIfSpecifiedWalletIsConnected = () => {
    
}

export const LaunchToken = ({ network } : LaunchTokenType) => {
    switch (network) {
        case 'solana':
            console.log('building on solana rn')
            return 'building on solana rn'
            
        case 'base':
            console.log('building on base rn')
            return 'building on base rn'
        case 'ethereum':
            console.log('building on ethreum rn')
            return 'building on ethreum rn'
        case 'polygon':
            console.log('building on polygon')
            return 'building on polygon'
        default:
            return null
    }
}
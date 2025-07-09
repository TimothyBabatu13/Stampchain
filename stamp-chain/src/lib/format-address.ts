export const formatAddress = (add: string): string => {
    return `${add.slice(0,6)}...${add.slice(add.length-7, add.length)}`
}
export const formatNumber = (num: number): string => {
    if(!num) return "0";
    return new Intl.NumberFormat('en-US').format(num)
}
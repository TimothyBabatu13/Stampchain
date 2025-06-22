'use client';

import { formatNumber } from "@/lib/format-number";
import { useFormStore } from "@/stores/formStore";

export const TotalSupply = () => {

    const tokenSupply = formatNumber(useFormStore(s => Number(s.form.totalSupply)));
    const symbol = useFormStore(s => s.form.tokenSymbol)
  return (
    <div className="text-2xl font-bold text-blue-600 mb-1">{tokenSupply} {symbol}</div>
  )
}

export const TokenClaim = () => {
    const tokenClaim = formatNumber(useFormStore(s => Number(s.form.tokensPerClaim)));
    return(
        <div className="text-2xl font-bold text-purple-600 mb-1">{tokenClaim} per claim</div>
    )
}
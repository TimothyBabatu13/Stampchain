'use client';

import { formatNumber } from "@/lib/format-number";
import { useFormStore } from "@/stores/formStore";

export const TotalSupply = () => {
    const cofeeSupply = formatNumber(useFormStore(s => Number(s.form.totalSupply)));
  return (
    <div className="text-2xl font-bold text-blue-600 mb-1">{cofeeSupply} COFFEE</div>
  )
}

export const TokenClaim = () => {
    const tokenClaim = formatNumber(useFormStore(s => Number(s.form.tokensPerClaim)));
    return(
        <div className="text-2xl font-bold text-purple-600 mb-1">{tokenClaim} per claim</div>
    )
}
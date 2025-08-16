'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormStore } from "@/stores/formStore";
import { Coins } from "lucide-react";

const TokenForm = () => {

  const { totalSupply, tokensPerClaim, maxClaimsPerWallet, blockchain } = useFormStore(e => e.form);
  const setForm = useFormStore(e => e.setForm);

  return (
    <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Coins className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle>Token Configuration</CardTitle>
                  <CardDescription>Define your token economics and distribution rules</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalSupply">Total Token Supply *</Label>
                  <Input
                    id="totalSupply"
                    type="number"
                    placeholder="10000"
                    value={totalSupply}
                    onChange={(e) => setForm({totalSupply: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tokensPerClaim">Tokens per Claim *</Label>
                  <Input
                    id="tokensPerClaim"
                    type="number"
                    placeholder="10"
                    value={tokensPerClaim}
                    onChange={(e) => setForm({tokensPerClaim: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxClaimsPerWallet">Max Claims per Wallet</Label>
                  <Input
                    id="maxClaimsPerWallet"
                    type="number"
                    placeholder="5"
                    value={maxClaimsPerWallet}
                    onChange={(e) => setForm({maxClaimsPerWallet: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="blockchain">Blockchain Network *</Label>
                <Select 
                  value={blockchain} 
                  onValueChange={(value) => setForm({blockchain: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="ethereum">Ethereum (ERC-20)</SelectItem> */}
                    {/* <SelectItem value="polygon">Polygon (ERC-20)</SelectItem> */}
                    <SelectItem value="solana">Solana (SPL)</SelectItem>
                    <SelectItem value="base">Base (ERC-20)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

  )
}

export default TokenForm
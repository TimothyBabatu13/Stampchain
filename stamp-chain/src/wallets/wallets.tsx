import BaseWallet from "./base-wallet";
import SolanaWallet from "./solana.-wallet";

const Wallets = ({ children } : {
    children: React.ReactNode
}) => {
  return (
    <SolanaWallet>
        <BaseWallet>
            {children}
        </BaseWallet>
    </SolanaWallet>
  )
}

export default Wallets
import Wallets from "@/wallets/wallets";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

const layout = async ({ children } : {
    children: React.ReactNode
}) => {
    const serverSession = await getServerSession();
    if(!serverSession){
        redirect('/')
    }
  return (
    <Wallets>
        {children}
    </Wallets>
  )
}

export default layout
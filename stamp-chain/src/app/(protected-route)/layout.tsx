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
    <div>
        {children}
    </div>
  )
}

export default layout
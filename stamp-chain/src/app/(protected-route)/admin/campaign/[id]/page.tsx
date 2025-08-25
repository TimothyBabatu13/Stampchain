import { CampaignDetailPage } from "./chart"
import CampaignDetails from "./components/campaign-details"
import { TokenDetailsCard } from "./components/token-details-card"

interface pageProps {
    params: Promise<string>,
}
interface idProps {
    id: string
}
const page = async ( { params }: pageProps ) => {
    const { id }  = (await params) as unknown as idProps
    
  return (
    <div className="container mx-auto px-4 py-8">
      <CampaignDetails id={id}/>
      <TokenDetailsCard id={id} />
      <CampaignDetailPage params={{ id }} />
    </div>
  )
}

export default page



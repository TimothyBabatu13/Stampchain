interface pageProps {
    params: Promise<string>,
}
interface idProps {
    id: string
}
const page = async ( { params }: pageProps ) => {
    const { id }  = (await params) as unknown as idProps
    
  return (
    <div>
        This is for page {id}
    </div>
  )
}

export default page
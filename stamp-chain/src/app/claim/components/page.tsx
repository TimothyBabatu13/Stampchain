'use client';
import { useClaimStore } from "@/stores/claimStore"
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const Page = () => {

    const step = useClaimStore(s => s.step)
    
      const render = () => {
        switch (step) {
          case 1:
            return <Step1 />
          case 2:
            return <Step2 />
          case 3:
            return <Step3 />  
          default:
            return null
        }
      }

  return (
    <div>
        {render()}
    </div>
  )
}

export default Page
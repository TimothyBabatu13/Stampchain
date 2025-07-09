'use client';

import { useEffect } from "react";
import { toast } from "sonner";

const ClientRenderedSonner = ({ isVisible, errorMessage } : {
    isVisible: boolean,
    errorMessage: string
}) => {

    useEffect(()=>{
        if(isVisible){
            toast.error(errorMessage)
        }
    }, [isVisible, errorMessage])

  return null
}

export default ClientRenderedSonner
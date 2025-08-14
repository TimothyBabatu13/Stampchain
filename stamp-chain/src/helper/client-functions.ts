import { toPng } from "html-to-image";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
interface copyToClipboardType {
    token: string,
    callback?: () => void
}
export const copyToClipboard = ({ token, callback } : copyToClipboardType) => {
    navigator.clipboard.writeText(token);
    if(callback){
        callback();
    }
}

export const downloadQRCode = async (qrCode: {
    id: string;
    url: string; 
    token: string; 
}) => {
    const id = document.getElementById(`qr-code--${qrCode.id}`)!;
    const dataUrl = await toPng(id);

    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = dataUrl;
    link.click();
}

export const downloadAllQRCodes = async (ids: string[], setIsLoading :Dispatch<SetStateAction<boolean>>) => {
    setIsLoading(true)
    
    const arr = ids.map(async (id, number) =>{
        const i = document.getElementById(id)!;
        try {  
            const dataURL = await toPng(i)
            const link = document.createElement('a');
            link.download = `qr-code-${number + 1}.png`;
            link.href = dataURL;
            link.click()
        } catch (error) {
            const err = error as Error
            toast.error(err.message)
        }
    })

    await Promise.all(arr);
    setIsLoading(false)
    
}
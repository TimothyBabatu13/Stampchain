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

export const downloadQRCode = (qrCode: {
    id: string;
    url: string; 
    token: string; 
}) => {
    // In a real app, this would generate and download the actual QR code image
    console.log("Downloading QR code:", qrCode)
}


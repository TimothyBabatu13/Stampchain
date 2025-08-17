import { Keypair } from "@solana/web3.js";

export const convertStringToSecretKey = (server_text: string): Keypair =>{
    const secretArray = server_text.split(",").map((num) => parseInt(num.trim()));
    const secretKey = new Uint8Array(secretArray);
    const keypair = Keypair.fromSecretKey(secretKey);
    return keypair
}
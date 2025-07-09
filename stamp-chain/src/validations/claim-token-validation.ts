import z from "zod";
const wallets = [
    'solana'
] as const
export const ClaimTokenValidation = z.object({
    token: z.string({
        required_error: "Token field is required",
        invalid_type_error: "Token must be string"
    }).nonempty("Token field must not be empty")
})

export const ClaimTokenToAddress = z.object({
    token: z.string({
        required_error: "token is required",
        invalid_type_error: "type of token must be string"
    }).nonempty("token field must not be empty"),
    walletAddress: z.string({
        invalid_type_error: "wallet address must be of type string",
        required_error: "wallet address is required"
    }).nonempty("Wallet address field must not be empty"),
    wallet: z.enum(wallets)
})
import { z } from "zod";

export const createCampaign = z.object({
  name: z.string({
    required_error: "Token name is required.",
    invalid_type_error: "Token name must be a string.",
  }).nonempty("Token name cannot be empty"),
  tokenSymbol: z.string({
    required_error: "Token symbol is required.",
    invalid_type_error: "Token symbol must be a string.",
  }).nonempty("Token symbol cannot be empty"),
  blockchain: z.enum(["solana", "ethereum"], {
    required_error: "Blockchain is required.",
    invalid_type_error: "Blockchain must be either 'solana' or 'ethereum'.",
  }),
  description: z.string().optional(),
  expirationDate: z.string().optional(),
  metadataUri: z.string().optional(),
  maxClaimsPerWallet: z.string(),
  tokensPerClaim: z.string({
    required_error: "Total Per Claim is required.",
    invalid_type_error: "Token per claim must be a string.",
  }).nonempty("Token per claim cannot be empty"),
  decimals: z.string().optional().default('9'),
  totalSupply: z.string({
    required_error: "Total supply is required.",
    invalid_type_error: "Total supply must be a number.",
  }).nonempty("Total supply must not be empty"),
  walletAddress: z.string({
    required_error: "Wallet address is required.",
    invalid_type_error: "Wallet address must be a string.",
  }).nonempty("Wallet address must not be empty"),
});
import z from "zod";

export const CreateQRCodesValidation = z.object({
    qrCount: z.string({
        required_error: "qr count is required",
        invalid_type_error: "qr count must be a string"
    }).nonempty("Qr count must not be empty"),
    campaign: z.string({
        required_error: "Please select a campaign",
        invalid_type_error: "Campaign selected must be a string"
    }).nonempty("Campaign field must not be empty")
})
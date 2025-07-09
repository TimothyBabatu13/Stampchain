const baseURL = process.env.BASE_URL!
export const generateURL = (id: string) => `${baseURL}/claim?token=${id}`; 
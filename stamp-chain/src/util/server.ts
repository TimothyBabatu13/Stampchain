import { getServerSession } from "next-auth";

export const userIsActive = async ():Promise<boolean> => {
    const session = await getServerSession();
    return session ? true : false
}

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FormAddress from "@/components/order/form-address";

export default async function AddressPage() {

    const session = await auth();
    const user = session?.user;

    if (!user?.id) {
        return redirect("/api/auth/signin");
    };

    return (
        <FormAddress />
    )
};
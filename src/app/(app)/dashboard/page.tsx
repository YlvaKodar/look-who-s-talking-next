import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/login");
    }

    return (
        <div>
            <h1>LOGGED IN</h1>
            <p> {session.user.name}</p>
            <p>{session.user.email}</p>
        </div>
    );
}
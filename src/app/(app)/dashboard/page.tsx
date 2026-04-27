import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    let helloRole = "Hello Admin";

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "ADMIN") {
        helloRole = "Hello User!"
    };

    return (
        <div>
            <h1>{helloRole}</h1>
            <p> {session.user.name}</p>
            <p>{session.user.email}</p>
        </div>
    );
}
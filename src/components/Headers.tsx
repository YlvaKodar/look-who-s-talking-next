"use client";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { CommonButton, ListButton } from "@/ui/Buttons";
import { Common } from "@/constants/constants";
import { H2 } from "./ui/Headings";

export function Header() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => router.push("/"),
            },
        });
    };

    return (
        <header className={`w-full border-b border-background-dark`}>
            {session && (
                <div className={`w-full flex flex-row gap-6 py-2 w-full ms:px-6 md:max-w-xl ml-auto px-4 items-center`}>
                    <p className={`text-md`}>{session.user.email}</p>
                    <ListButton onClick={handleSignOut}>{Common.logOut}</ListButton>
                </div>
            )}
            {/*<h2 className={`text-4xl text-nonbinary-light text-shadow-orange-800  font-bold pb-3 text-center`} >{Common.title}</h2>*/}
        </header>
    );
}
"use client";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ListButton } from "@/ui/Buttons";
import { Common } from "@/constants/constants";

export function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const username: string | undefined = session?.user?.role === "ADMIN" ? session.user.name + " (ADMIN)" : session?.user.name ;

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => router.push("/"),
            },
        });
    };

    return (
        <header className={`w-full border-b border-background-dark`}>

            <div className={`pt-2 h-10`}>
                <BackButton/>
                {session ? (
                    <>
                        <ListButton onClick={handleSignOut}>{Common.logOut}</ListButton>
                        <p className={` h-10 text-bold text-mono px-3`}>{username} </p>
                    </>
                ) : (<div className={` h-10 text-bold text-mono px-3`}></div>)}

            </div>
            <Logo className={"text-4xl"}/>
        </header>
    );
}

type LogoProps = {
    className?: string;
}
export function Logo({className}:LogoProps ) {
    const letters = [
        { char: "L", color: "var(--color-eleven)" },
        { char: "O", color: "var(--color-tree)" },
        { char: "O", color: "var(--color-six)" },
        { char: "K", color: "var(--color-eight)" },
        { char: " ", color: "transparent" },
        { char: "W", color: "var(--color-twelve)" },
        { char: "H", color: "var(--color-forteen)" },
        { char: "O", color: "var(--color-fore)" },
        { char: "'", color: "var(--color-sixteen)" },
        { char: "S", color: "var(--color-eighteen)" },
        { char: " ", color: "transparent" },
        { char: "T", color: "var(--color-thirteen)" },
        { char: "A", color: "var(--color-two)" },
        { char: "L", color: "var(--color-six)" },
        { char: "K", color: "var(--color-fore)" },
        { char: "I", color: "var(--color-twelve)" },
        { char: "N", color: "var(--color-eight)" },
        { char: "G", color: "var(--color-forteen)" },
        { char: "!", color: "var(--color-eighteen)" },
    ];

    return (
        <h1 className={`font-bold font-bitcount text-center py-3 ${className}`}>
            {letters.map((l, i) => (
                <span key={i} style={{ color: l.color }}>
          {l.char}
        </span>
            ))}
        </h1>
    );
}

function BackButton() {
    const router = useRouter();
    return (
        <ListButton onClick={() => router.back()}>
            {Common.backButton}
        </ListButton>
    )
}

export function Footer() {
    return(
        <footer className={"mx-auto p-4 text-center text-sm text-foreground/60"}>
            <p>©&nbsp;2026</p> <p className={"font-bitcount"}> {Common.footer}</p>
        </footer>
        )
}
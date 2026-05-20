"use client"
import {H1, H3} from "@/ui/Headings";
import {useState} from "react";
import {ChevronIcon, LoadingIndicator} from "@/ui/Common";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { CommonButton, ListButton } from "@/ui/Buttons";
import {ButtonContainer, ListButtonContainer, SectionContainer, SimpleContainer} from "@/ui/Containers";
import {Common} from "@/constants/constants";
import {id} from "zod/locales";

//Todo: Add admin panel, add Are you sure?
//Todo: Add update
export function MySelf() {
    const [error, setError] = useState<string | null>(null);
    const {data: session, isPending} = useSession();
    const [show, setShow] = useState(false);
    const router = useRouter();

    if (isPending) {
        return (
            <LoadingIndicator/>
        )
    }

    if (!session) return router.push("/login");

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => router.push("/"),
            },
        });
    };

    const handleDelete = async () => {
        setError(null)
        try{
            const result = await fetch(`/api/users/me`, {
            method: "DELETE",
            });

            const res = await result.json();

            if (!result.ok) {
                setError(res.error);
                return;
            }
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <SectionContainer>
            <div onClick={() => setShow(!show)}>
                <H1>Hello me! <ChevronIcon isOpen={show}/></H1>
            </div>
            {show && (
                <>
                    {error && (
                        <SimpleContainer>
                            <div onClick={() => setError(null)} className="text-seven text-bold">{error}</div>
                        </SimpleContainer>
                    )}
                <SimpleContainer>
                    <p>{Common.userName}: <span className={"text-bold font-mono"}>{session.user.name}</span> </p>
                    <p>{Common.userEmail}: <span className={"text-bold font-mono"}> {session.user.email}</span> </p>
                </SimpleContainer>

                    <ButtonContainer>
                        <CommonButton onClick={handleSignOut}>{Common.logOut}</CommonButton>
                        <CommonButton variant={"danger"} onClick={handleDelete}>{Common.deleteAccount}</CommonButton>
                    </ButtonContainer>
                </>
            )}
        </SectionContainer>
    )
}
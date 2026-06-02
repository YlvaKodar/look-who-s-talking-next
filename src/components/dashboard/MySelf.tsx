"use client"
import { H1, H4 } from "@/ui/Headings";
import { useState } from "react";
import { ChevronIcon, LoadingIndicator } from "@/ui/Common";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { CommonButton } from "@/ui/Buttons";
import { ButtonContainer, SectionContainer, SimpleContainer, DangerContainer } from "@/ui/Containers";
import { Common } from "@/constants/constants";
import { ValidationMessage } from "@/ui/Common";

//Todo: Add admin panel?
//Todo: Add update
export function MySelf() {
    const [error, setError] = useState<string | null>(null);
    const {data: session, isPending} = useSession();
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const router = useRouter();

    if (isPending) {
        return (
            <LoadingIndicator/>
        )
    }

    if (!session) {
        router.push("/login");
        return null;
    }

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => router.push("/"),
            },
        });
    };

    const DeleteContainer = () => {
        return(
            <>
                {error && (
                    <SimpleContainer>
                        <div onClick={() => setError(null)}>
                            <ValidationMessage>{error}</ValidationMessage>
                        </div>
                    </SimpleContainer>
                )}

                <>
                    <ButtonContainer>
                        <CommonButton type={"button"} disabled={showConfirm} onClick={handleSignOut}>{Common.logOut}</CommonButton>
                        <CommonButton type={"button"} disabled={showConfirm} variant={"danger"} onClick={() => setShowConfirm(true)}>{Common.deleteAccount}</CommonButton>
                    </ButtonContainer>
                </>

                {showConfirm && (
                    <DangerContainer>
                        <H4>{Common.areYouSure}</H4>

                        <ButtonContainer>
                            <CommonButton variant={"secondary"} onClick={() => setShowConfirm(false)}>{Common.no}</CommonButton>
                            <CommonButton variant={"danger"} onClick={handleDelete}>{Common.yes}</CommonButton>
                        </ButtonContainer>
                    </DangerContainer>
                )}
            </>
        )
    }

    const handleDelete = async () => {
        setError(null)
        try{
            const result = await fetch(`/api/users/me`, {
            method: "DELETE",
            });

            const res = await result.json();

            if (!result.ok) {
                setError(res.error);
                setShowConfirm(false);
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
                <SimpleContainer>
                    <p>{Common.userName}: <span className={"text-bold font-mono"}>{session.user.name}</span> </p>
                    <p>{Common.userEmail}: <span className={"text-bold font-mono"}> {session.user.email}</span> </p>
                </SimpleContainer>
                    <DeleteContainer/>
                </>
            )}
        </SectionContainer>
    )
}
"use client"
import { H1, H3, H4 } from "@/components/ui/Headings";
import { CommonButton } from "@/ui/Buttons";
import {ButtonContainer, DangerContainer, SimpleContainer} from "@/ui/Containers";
import { useRouter } from "next/navigation";
import { StartText, Common } from "@/constants/constants";
import { Logo } from "@/components/Headers";
import { useState } from "react";
import {ChevronIcon} from "@/ui/Common";

export default function StartView() {
    const [showAbout, setShowAbout] = useState<boolean>(true)
    const [showStart, setShowStart] = useState<boolean>(false)
    const [showUse, setShowUse] = useState<boolean>(false)
    const aboutText = showAbout ? StartText.aboutButton : Common.comingSoon;
    const aboutColor = showAbout ? "secondary" : "ohoh";
    const router = useRouter();


    return (
        <div className="flex flex-col py-2">
            <div className="py-2 md:pt-8">
                <Logo className={"text-5xl md:text-7xl"}/>
            </div>
                <H1>{StartText.about}</H1>
            <div>
                <div onClick={() => setShowStart(!showStart)}>
                    <H4>{StartText.useWithoutLoginHeading} <ChevronIcon isOpen={showStart}/></H4>
                </div>
                {showStart && (
                    <SimpleContainer>
                        <p>{StartText.useWithoutLoginText}</p>
                    </SimpleContainer>
                )}
                <ButtonContainer>
                    <CommonButton variant="primary" onClick={() => router.push("/setup")}>{StartText.newMeetingButton}</CommonButton>
                    <CommonButton variant={aboutColor} onClick={() => setShowAbout(!showAbout)}>{aboutText}</CommonButton>
                    <CommonButton variant="primary" onClick={() => router.push("/howToUse")}>{"How to use"}</CommonButton>
                </ButtonContainer>
            </div>

            <div>
                <div onClick={() => setShowUse(!showUse)}>
                    <H4>{StartText.useWithAccountHeading} <ChevronIcon isOpen={showUse}/></H4>
                </div>
                {showUse && (
                    <SimpleContainer>
                        <p>{StartText.useWithAccountText}</p>
                    </SimpleContainer>
                )}
                <ButtonContainer>
                    <CommonButton variant="secondary" onClick={() =>  router.push("/login")}>{StartText.loginButton}</CommonButton>
                    <CommonButton variant="secondary" onClick={() => router.push("/signin")} >{StartText.signupButton}</CommonButton>
                </ButtonContainer>
            </div>

            <div className="flex flex-col py-6">
                <DangerContainer>
                    <H1>{"Ooops ..."}</H1>
                    <H3>{"This app is still under construction!"}</H3>
                    <H4>{"Sorry about the mess, I'm working on it ..."}</H4>
                </DangerContainer>
            </div>
        </div>
    );
}

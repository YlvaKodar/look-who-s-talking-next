"use client"
import {ColorHeading, H1, H4} from "@/components/ui/Headings";
import { CommonButton } from "@/ui/Buttons";
import {ButtonContainer, AlertContainer} from "@/ui/Containers";
import { useRouter } from "next/navigation";
import { StartText, Common } from "@/constants/constants";
import { Logo } from "@/components/Headers";
import { useState } from "react";

export default function StartView() {
    const [showAbout, setShowAbout] = useState<boolean>(true)
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
                <H4>{StartText.useWithoutLoginHeading}</H4>
                <ButtonContainer>
                    <CommonButton variant="primary" onClick={() => router.push("/setup")}>{StartText.newMeetingButton}</CommonButton>
                    <CommonButton  variant={aboutColor} onClick={() => router.push("/howToUse")}>{"How to use"}</CommonButton>
                    <CommonButton variant="primary"  onClick={() => setShowAbout(!showAbout)}>{aboutText}</CommonButton>
                </ButtonContainer>
            </div>

            <div>
                <H4>{StartText.useWithAccountHeading} <span className={"text-tip"} >{"(It's free!)"}</span></H4>
                <ButtonContainer>
                    <CommonButton variant="secondary" onClick={() =>  router.push("/login")}>{StartText.loginButton}</CommonButton>
                    <CommonButton variant="secondary" onClick={() => router.push("/signin")} >{StartText.signupButton}</CommonButton>
                </ButtonContainer>
            </div>

            <div className="flex flex-col py-6">
                <AlertContainer>
                    <ColorHeading heading={"This app is still under construction!"}/>
                    <H4 color={"example"}>{"Sorry about the mess, I'm working on it ..."}</H4>
                </AlertContainer>
            </div>
        </div>
    );
}

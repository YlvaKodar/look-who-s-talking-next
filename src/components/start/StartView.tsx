"use client"
import { H1, H3, H4 } from "@/components/ui/Headings";
import { CommonButton } from "@/ui/Buttons";
import {ButtonContainer, SimpleContainer} from "@/ui/Containers";
import { useRouter } from "next/navigation";
import { StartText, Common } from "@/constants/constants";
import { Logo } from "@/components/Headers";
import { useState } from "react";
import {ChevronIcon} from "@/ui/Common";

export default function StartView() {
    const [showAbout, setShowAbout] = useState<boolean>(true)
    const [showHow, setShowHow] = useState<boolean>(true)
    const [showStart, setShowStart] = useState<boolean>(true)
    const [showUse, setShowUse] = useState<boolean>(true)
    const aboutText = showAbout ? StartText.aboutButton : Common.commingSoon;
    const aboutColor = showAbout ? "secondary" : "ohoh";
    const howText = showHow ? StartText.howToUseButton : Common.commingSoon;
    const howColor = showHow ? "primary" : "ohoh";
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
                    <CommonButton variant={howColor} onClick={() => setShowHow(!showHow)}>{howText}</CommonButton>
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
        </div>
    );
}

"use client"
import { H1, H3, H4 } from "@/components/ui/Headings";
import { CommonButton } from "@/ui/Buttons";
import { ButtonContainer } from "@/ui/Containers";
import { useRouter } from "next/navigation";
import { StartText } from "@/constants/constants";
import {Logo} from "@/components/Headers";

export default function StartView() {
    const router = useRouter();

    return (
        <div className="flex flex-col py-20">
            <div className="py-50 md:pt-8">
                <Logo className={"text-9xl"}/>
            </div>
            <div className="md:py-4">
                <H1>{StartText.about}</H1>
            </div>
            <div>
                <H4>{StartText.useWithoutLoginHeading}</H4>
                <p>{StartText.useWithoutLoginText}</p>
                <ButtonContainer>
                    <CommonButton variant="primary" onClick={() => router.push("/setup")}>{StartText.newMeetingButton}</CommonButton>
                    <CommonButton variant="secondary">{StartText.aboutButton}</CommonButton>
                    <CommonButton variant="primary">{StartText.howToUseButton}</CommonButton>
                </ButtonContainer>
            </div>

            <div>
                <H4>{StartText.useWithAccountHeading}</H4>
                <p>{StartText.useWithAccountText}</p>
                <ButtonContainer>
                    <CommonButton variant="secondary" onClick={() =>  router.push("/login")}>{StartText.loginButton}</CommonButton>
                    <CommonButton variant="secondary" onClick={() => router.push("/signin")} >{StartText.signupButton}</CommonButton>
                </ButtonContainer>
            </div>
        </div>
    );
}

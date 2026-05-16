"use client"
import { H1, H3 } from "@/components/ui/Headings";
import { CommonButton } from "@/ui/Buttons";
import { ButtonContainer } from "@/ui/Containers";
import { useRouter } from "next/navigation";
import { StartText } from "@/constants/constants";

export default function StartView() {
    const router = useRouter();

    const handeNewMeeting = async () => {
        router.push("/setup");
    }

    return (
        <div>
            <H1>{StartText.heading}</H1>
            <H3>{StartText.about}</H3>
            <ButtonContainer>
                <CommonButton id="new-meeting-btn" variant="primary" onClick={handeNewMeeting} >New meeting</CommonButton>
                <CommonButton id="about-btn" variant="secondary">About</CommonButton>
                <CommonButton id="how-to-use-btn" variant="primary">How to use</CommonButton>
            </ButtonContainer>
        </div>
    );
}

"use client"
import { H1, H2, H3, H4 } from "@/components/ui/Headings";
import { useRouter } from "next/navigation";

export default function StartView() {
    const router = useRouter();

    const handeNewMeeting = async () => {
        router.push("/setup");
    }

    return (
        <div>
            <H1>Look Who's Talking</H1>
            <H3>Timing tool for mixed-gender conversations</H3>

            <div className="flex flex-row gap-6 w-full max-w-sm mx-auto px-4">
                <button id="new-meeting-btn"  onClick={handeNewMeeting} >New meeting</button>
                <button id="about-btn" className="secondary">About</button>
                <button id="how-to-use-btn" className="tertiary">How to use</button>
            </div>
        </div>
    );
}

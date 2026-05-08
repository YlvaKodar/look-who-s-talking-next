"use client"
import { InputField } from "@/components/ui/FormFields";
import { MeetingSetupForm } from "@/constants/constants";
import { useMeetingStorage } from "@/hooks/useMeetingStorage";
import { useRouter } from "next/navigation";
import { createActiveMeeting } from "@/util/meetingUtil";
import { SyntheticEvent } from "react";


export default function SetupMeetingForm (){
    const { setup } = useMeetingStorage();
    const router = useRouter();

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);

        const title = data.get("title") as string;
        const startedAt = data.get("date") as string;
        const womenCount = Number(data.get("womenCount")) || 0;
        const nonbinaryCount = Number(data.get("nonbinaryCount")) || 0;
        const menCount = Number(data.get("menCount")) || 0;

        const activeMeeting = createActiveMeeting(
            title,
            startedAt,
            womenCount,
            nonbinaryCount,
            menCount,
        );

        setup.save(activeMeeting)
        router.push('/meeting')
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2 id="setup_form_head_1" className="secondary">About this meeting:</h2>
                <InputField type="text" label={MeetingSetupForm.meetingTitleLabel} name="title" required/>
                <InputField type="date" label={MeetingSetupForm.startTimeLabel} name="date" required/>
            </div>
            <div>
                <h2 id="setup_form_head_2" className="secondary">We need a participant count:</h2>
                <InputField type="number" label={MeetingSetupForm.womenCountLabel} name="womenCount" min={0} defaultValue={0} required/>
                <InputField type="number" label={MeetingSetupForm.nonbinaryCountLabel} name="nonbinaryCount" min={0} defaultValue={0} required/>
                <InputField type="number" label={MeetingSetupForm.menCountLabel} name="menCount" min={0} defaultValue={0} required/>
            </div>
            <div>
                <button type="submit">{MeetingSetupForm.submitLabel}</button>
            </div>
        </form>
    )
}

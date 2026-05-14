"use client"
import { PageContainer } from "@/ui/PaigeContainer";
import {ActiveMeetingView} from "@/components/meeting/ActiveMeetingView";

export default function MeetingPage() {
    return (
        <PageContainer>
            <div>
                <ActiveMeetingView/>
            </div>
        </PageContainer>
    )
}
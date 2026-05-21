"use client"
import { CommonButton, ListButton } from "@/ui/Buttons";
import {ButtonContainer, ListButtonContainer, SimpleContainer, SectionContainer} from "@/ui/Containers";
import { MeetingText} from "@/constants/constants";
import { List } from "@/ui/Lists";
import { Tooltip } from "@/ui/Common";
import { ChevronIcon } from "@/ui/Common";
import { useRouter } from "next/navigation";
import {useState} from "react";
import {MeetingListItem} from "@/types/meeting";
import {H1, H3} from "@/ui/Headings";

export function MyMeetings() {
    const [show, setShow] = useState(false);
    const [showMeetings, setShowMeetings] = useState<boolean>(false);
    const [meetings, setMeetings] = useState<MeetingListItem[]>([]);
    const [noMeetings, setNoMeetings] = useState(false);
    const router = useRouter();

    async function fetchMeetings() {
        try {
            const result = await fetch(`/api/meetings`);
            if (!result.ok) {
                const error = await result.json();
                console.error(error.code, error.error);
                return;
            }
            const meetings: MeetingListItem[] = await result.json();
            setMeetings(meetings)
            if (!meetings.length) setNoMeetings(true);

        } catch (error) {
            console.error(error);
        }
    }

    const MeetingList = ({ meetings }: { meetings: MeetingListItem[] })=> {
        return (
            <List
                items={meetings.map((meeting) => ({
                    children:
                        <>
                            <div className={`relative group`}>{meeting.title} {<Tooltip
                                label={meeting.startedAt}/>}</div>
                            <ListButtonContainer>
                                <ListButton onClick={() => router.push(`/meeting/${meeting.id}`)}>{">"} <Tooltip
                                    label={MeetingText.goToMeeting}/> </ListButton>
                            </ListButtonContainer>
                        </>,
                }))}
            />
        )
    }

    return (
        <SectionContainer>
            <div onClick={() => setShow(!show)}>
                <H1>{MeetingText.headingMeeting} <ChevronIcon isOpen={show}/></H1>
            </div>
            {show && (
                <>
                    <ButtonContainer>
                        <CommonButton onClick={() => router.push(`/setup`)}>{MeetingText.createNewMeeting}</CommonButton>
                    </ButtonContainer>

                    <div onClick={() => { setShowMeetings(prevState => !prevState); fetchMeetings(); }}>
                        <H3 center={"px-1"}>{MeetingText.myMeetings} <ChevronIcon isOpen={showMeetings}/></H3>
                    </div>
                    {showMeetings && (
                        <MeetingList meetings={meetings} />
                    )}
                    { showMeetings && noMeetings && (
                        <SimpleContainer>
                            <p>{"No meetings found!"}</p>
                        </SimpleContainer>
                    )
                    }
                </>
            )}
        </SectionContainer>
    )
}
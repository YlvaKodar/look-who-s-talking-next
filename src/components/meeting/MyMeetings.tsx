"use client"
import { CommonButton, ListButton } from "@/ui/Buttons";
import {ButtonContainer, ListButtonContainer, SimpleContainer, SmallSectionContainer} from "@/ui/Containers";
import { MeetingText} from "@/constants/constants";
import { List } from "@/ui/Lists";
import {LoadingIndicator, Tooltip, ValidationMessage} from "@/ui/Common";
import { ChevronIcon } from "@/ui/Common";
import { useRouter } from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {MeetingListItem} from "@/types/meeting";
import {H1, H3} from "@/ui/Headings";

export function MyMeetings() {
    const [show, setShow] = useState(false);
    const [showMeetings, setShowMeetings] = useState<boolean>(false);
    const router = useRouter();

    return (
        <SmallSectionContainer>
            <div onClick={() => setShow(!show)}>
                <H1>{MeetingText.headingMeeting} <ChevronIcon isOpen={show}/></H1>
            </div>
            {show && (
                <>
                    <ButtonContainer>
                        <CommonButton onClick={() => router.push(`/setup`)}>{MeetingText.createNewMeeting}</CommonButton>
                    </ButtonContainer>

                    <div onClick={() => { setShowMeetings(prevState => !prevState);}}>
                        <H3 center={"px-1"}>{MeetingText.myMeetings} <ChevronIcon isOpen={showMeetings}/></H3>
                    </div>

                    {showMeetings && (
                        <MeetingSection/>
                    )}
                </>
            )}
        </SmallSectionContainer>
    )
}

function MeetingSection () {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [meetings, setMeetings] = useState<MeetingListItem[]>([]);

    const fetchMeetings= useCallback(async () => {
        try {
            const result = await fetch(`/api/meetings`);
            if (!result.ok) {
                const error = await result.json();
                console.error(error.code, error.error);
                setError(error.error);
                return;
            }
            const meetings: MeetingListItem[] = await result.json();
            setLoading(false);
            setMeetings(meetings)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchMeetings();
    }, [fetchMeetings]);

    return (
        <>
            { meetings.length > 0 &&  (
                <MeetingList meetings={meetings} />
            )}
            { loading && (
                <LoadingIndicator/>
            )}
            { !loading && meetings.length === 0 &&  (
                <SimpleContainer>
                    <p>{"No meetings found!"}</p>
                </SimpleContainer>
            )}
            {error && (
                <SimpleContainer>
                    <div onClick={() => setError(null)}>
                        <ValidationMessage>{error}</ValidationMessage>
                    </div>
                </SimpleContainer>
            )}
        </>
    )
}

const MeetingList = ({ meetings }: { meetings: MeetingListItem[] })=> {
    const router = useRouter();
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
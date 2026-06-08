"use client"
import { H1, H3 } from "@/ui/Headings"
import { CommonButton, ListButton } from "@/ui/Buttons";
import {ButtonContainer, ListButtonContainer, SmallSectionContainer, SimpleContainer} from "@/ui/Containers";
import { GroupText } from "@/constants/constants";
import {useCallback, useEffect, useState} from "react";
import { List } from "@/ui/Lists";
import {LoadingIndicator, Tooltip, ValidationMessage} from "@/ui/Common";
import { GroupListItem } from "@/types/group"
import { ChevronIcon } from "@/ui/Common";
import { useRouter } from "next/navigation";
import GroupForm from "@/components/group/GroupForm";

export function MyGroups() {
    const [show, setShow] = useState<boolean>(false)
    const [showClocker, setShowClocker] = useState<boolean>(false);
    const [showKeeper, setShowKeeper] = useState<boolean>(false);
    const [showNewGroup, setShowNewGroup] = useState<boolean>(false);

    return (
        <SmallSectionContainer>
            <div onClick={() => setShow(!show)}>
                <H1>{GroupText.headingGroups} <ChevronIcon isOpen={show}/></H1>
            </div>
            { show && (
                <>
                    <ButtonContainer>
                        <CommonButton onClick={() => setShowNewGroup(prevState => !prevState) }>{GroupText.createNewGroup}</CommonButton>
                    </ButtonContainer>
                    { showNewGroup && (
                        <GroupForm/>
                    )}
                    <div>
                        <div onClick={() => { setShowKeeper(prevState => !prevState);}}>
                            <H3 center={"px-1"}>{GroupText.keeperGroups} <ChevronIcon isOpen={showKeeper}/></H3>
                        </div>

                        {showKeeper && (
                            <GroupSection status = "keeper"/>
                        )}

                        <div onClick={() => { setShowClocker(prevState => !prevState) }}>
                            <H3 center={"px-1"}>{GroupText.clockerGroups}<ChevronIcon isOpen={showClocker}/></H3>
                        </div>

                        {showClocker && (
                            <GroupSection status = "clocker"/>
                        )}
                    </div>
                </>
            )}
        </SmallSectionContainer>
    )
}

function GroupSection({status}: {  status: string }) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState<GroupListItem[]>([]);

    const fetchGroups = useCallback(async () => {
        try {
            const result = await fetch(`/api/groups?status=${status}`);
            if (!result.ok) {
                const error = await result.json();
                setError(error.error);
                console.error(error.code, error.error);
                return;
            }
            const groups: GroupListItem[] = await result.json();
            setLoading(false);
            setGroups(groups);
            setError(null);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [status]);

    useEffect(() => {
        setLoading(true);
        fetchGroups();
    }, [fetchGroups]);

    return (
        <>
            { groups.length > 0 && (
                <GroupList group={groups}/>
            )}
            { loading && (
                <LoadingIndicator/>
            )}
            {!loading && groups.length === 0 && (
                <SimpleContainer>
                    <p>{"No groups found."}</p>
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

const GroupList = ({ group }: { group: GroupListItem[] })=> {
    const router = useRouter();

    return (
        <List
            items={group.map((group) => ({
                children:
                    <>
                        <div className={`relative group`}>{group.name}  {group.description && <Tooltip label={group.description} />} </div>
                        <ListButtonContainer>
                            <ListButton onClick={() => router.push(`/setup?groupId=${group.id}&groupName=${group.name}`, ) }>{"New meeting"} <Tooltip label={GroupText.createNewGroupMeeting}  /> </ListButton>
                            <ListButton onClick={() => router.push(`/group/${group.id}`) }>{">"} <Tooltip label={GroupText.goToGroup} /> </ListButton>
                        </ListButtonContainer>
                    </>,
            }))}
        />
    )
}
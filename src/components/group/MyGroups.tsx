"use client"
import { H1, H3 } from "@/ui/Headings"
import { CommonButton, ListButton } from "@/ui/Buttons";
import {ButtonContainer, ListButtonContainer} from "@/ui/Containers";
import { GroupText } from "@/constants/constants";
import { useState } from "react";
import { List } from "@/ui/Lists";
import { Tooltip } from "@/ui/Common";
import { GroupListItem } from "@/types/group"
import { ChevronIcon } from "@/ui/Common";
import { useRouter } from "next/navigation";
import GroupForm from "@/components/group/GroupForm";

export function MyGroups() {
    const [show, setShow] = useState<boolean>(false)
    const [showClocker, setShowClocker] = useState<boolean>(false);
    const [showKeeper, setShowKeeper] = useState<boolean>(false);
    const [keeperGroups, setKeeperGroups] = useState<GroupListItem[]>([]);
    const [showNewGroup, setShowNewGroup] = useState<boolean>(false);
    const [clockerGroups, setClockerGroups] = useState<GroupListItem[]>([]);
    const router = useRouter();


    async function fetchGroups(status: string) {
        try {
            const result = await fetch(`/api/groups?status=${status}`);
            if (!result.ok) {
                const error = await result.json();
                console.error(error.code, error.error);
                return;
            }
            const groups: GroupListItem[] = await result.json();
            status === "keeper" ? setKeeperGroups(groups) : setClockerGroups(groups);

        } catch (error) {
            console.error(error);
        }
    }

    const GroupList = ({ group }: { group: GroupListItem[] })=> {
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

    return (
        <div className={`rounded-md w-full border border-foreground-dark, bg-background-light py-2  px-6 max-w-md mx-auto `}>
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
                        <div onClick={() => { setShowKeeper(prevState => !prevState); fetchGroups("keeper"); }}>
                            <H3 center={"px-1"}>{GroupText.keeperGroups} <ChevronIcon isOpen={showKeeper}/></H3>
                        </div>

                        {showKeeper && (
                            <GroupList group={keeperGroups}/>
                        )}

                        <div onClick={() => { setShowClocker(prevState => !prevState); fetchGroups("clocker"); }}>
                            <H3 center={"px-1"}>{GroupText.clockerGroups}<ChevronIcon isOpen={showClocker}/></H3>
                        </div>

                        { showClocker && (
                            <GroupList group={clockerGroups}/>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
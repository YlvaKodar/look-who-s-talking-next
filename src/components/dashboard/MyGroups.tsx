"use client"
import { H1, H3 } from "@/ui/Headings"
import { CommonButton, ListButton } from "@/ui/Buttons";
import { ListItemContainer, ListButtonContainer } from "@/ui/Containers";
import { DashboardText } from "@/constants/constants";
import { useState } from "react";
import { List } from "@/ui/Lists";
import { GroupListItem } from "@/types/group"
import { ChevronIcon } from "@/ui/Common";
import { useRouter } from "next/navigation";

//Todo: new meeting
export function MyGroups() {
    const [showClocker, setShowClocker] = useState<boolean>(false);
    const [showKeeper, setShowKeeper] = useState<boolean>(false);
    const [keeperGroups, setKeeperGroups] = useState<GroupListItem[]>([]);
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

    return (
        <div className={`rounded-md w-full border border-foreground-dark, bg-background-light py-2  px-6 max-w-md mx-auto `}>
            <div>
                <H1>{DashboardText.headingGroups}</H1>
                    <CommonButton>{DashboardText.createNewGroup}</CommonButton>
            </div>
            <div>
                <div onClick={() => { setShowKeeper(prevState => !prevState); fetchGroups("keeper"); }}>
                    <H3>{DashboardText.keeperGroups} <ChevronIcon isOpen={showKeeper}/></H3>
                </div>

                {showKeeper && (
                    <List
                        items={keeperGroups.map((group) => ({
                            children: <ListItemContainer>
                                        <div className={`flex flex-row w-full`}>{group.name}
                                            <ListButtonContainer>
                                                <ListButton onClick={() => router.push(`/group/${group.id}`) }>{"Go to"}</ListButton>
                                                <ListButton>{"New meeting"}</ListButton>
                                            </ListButtonContainer>
                                        </div>
                                    </ListItemContainer>,
                            description: group.description,
                        }))}
                    />
                )}

                <div onClick={() => { setShowClocker(prevState => !prevState); fetchGroups("clocker"); }}>
                    <H3>{DashboardText.clockerGroups}<ChevronIcon isOpen={showClocker}/></H3>
                </div>

                { showClocker && (
                    <List
                        items={clockerGroups.map((group) => ({
                            children: <ListItemContainer>
                                <div className={`flex flex-row w-full`}>{group.name}
                                    <ListButtonContainer>
                                        <ListButton onClick={() => router.push(`/group/${group.id}`) }>{"Go to"}</ListButton>
                                        <ListButton>{"New meeting"}</ListButton>
                                    </ListButtonContainer>
                                </div>
                            </ListItemContainer>,
                            description: group.description,
                        }))}
                    />
                )
                }
            </div>
        </div>
    )
}
"use client"
import { SearchField } from "@/components/ui/FormFields";
import {JSX, SyntheticEvent, useEffect, useState} from "react";
import { UserListItem } from "@/types/user";
import {ListButtonContainer} from "@/ui/Containers";
import { CommonButton, ListButton } from "@/ui/Buttons";
import {List} from "@/ui/Lists";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {ParamValue} from "next/dist/server/request/params";
import {GroupText} from "@/constants/constants";

interface AddClockersProps {
    groupId: ParamValue;
    exclude: UserListItem[];
    showAddClockers: boolean;
    router: AppRouterInstance;
}

//TODO: Prettier exclude.
export function AddClockers({groupId, exclude, showAddClockers, router}: AddClockersProps){
    const [show, setShow] = useState(showAddClockers);
    const [apiError, setApiError] = useState<string | null>(null);
    const [clockersToAdd, setClockersToAdd] = useState<UserListItem[]>([]);

    async function handleSubmit   (e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const add: string[] = clockersToAdd.map((clocker) => clocker.id);

        try {
            const res = await fetch(`/api/groups/${groupId}/clockers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({add}),
            })

            if (!res.ok) {
                const error = await res.json();
                console.error(error.code, error.error );
                setApiError(error.error ?? "Error! Alert! DANGER!");
            }
            setShow(false);
            router.refresh();
        } catch (error) {
            setApiError("Fnurr på tråden!");
            console.error(error);
        }
    };

    return (
        <>
            {show && (
                <div className={`w-full flex flex-col gap-4 justify-center`}>
                    <div className={`w-full flex flex-col py-7 justify-center`}>
                        <SearchField
                            label={GroupText.searchClockers}
                            fetchResults={(q) => {
                                const excludeIds: string = exclude.map((m) => m.id).join(",");
                                return fetch(`/api/users?q=${encodeURIComponent(q)}&exclude=${excludeIds}`)
                                    .then((r) => r.json());
                            }}
                            renderResult={(user: UserListItem) => (
                                <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-foreground/50">{user.email}</p>
                                </div>
                            )}
                            getKey={(user) => user.id}
                            onSelect={(user) => setClockersToAdd((prev) => [...prev, user])}
                        />
                    </div>

                    <form  className={`w-full flex flex-col gap-4 justify-center`} onSubmit={handleSubmit}>
                        {apiError && <p role="alert">{apiError}</p>}

                        {
                            <List
                                items={clockersToAdd.map((clocker) => ({
                                    children: <>
                                        {clocker.name}

                                        <ListButtonContainer>
                                            <ListButton
                                                onClick={() => setClockersToAdd((prev) => prev.filter((c) => c.id !== clocker.id)) }>
                                                {"–"}
                                            </ListButton>
                                        </ListButtonContainer>
                                    </>
                                }))}
                            />
                        }
                        <CommonButton>{GroupText.addClockers}</CommonButton>
                    </form>
                </div>
            )}
        </>
    )
}
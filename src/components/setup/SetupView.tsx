"use client"
import { H1 } from "@/components/ui/Headings";
import SetupForm  from "@/components/setup/SetupForm";
import { SetupText } from "@/constants/constants";
import {authClient} from "@/lib/auth-client";

type SetupViewProps = {
    groupId?: string;
    groupName?: string;
}

export default function SetupView({ groupId, groupName }: SetupViewProps) {
    const { data: session } = authClient.useSession();

    return (
        <div className="w-full mx-auto max-w-2xl flex flex-col">
            <H1>{SetupText.heading}</H1>
            {session && (
                <SetupForm groupId={groupId} groupName={groupName} />
            )}
            {!session && (
                <SetupForm/>
            )}
        </div>
    )
}

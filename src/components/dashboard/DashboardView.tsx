"use client"
import { authClient} from "@/lib/auth-client";
import { MyGroups } from "@/components/group/MyGroups";
import { MyMeetings } from "@/components/meeting/MyMeetings";
import { MySelf } from "@/components/dashboard/MySelf";

export function DashboardView() {
    const { data: session } = authClient.useSession();

    return (
        <div className={`w-full flex flex-col gap-y-4 max-w-md mx-auto `}>
            <div>
                <MyGroups />
            </div>
            <div>
                <MyMeetings />
            </div>
            <div>
                <MySelf />
            </div>
        </div>
    )
}
"use client"
import { authClient} from "@/lib/auth-client";
import { MyGroups } from "@/components/group/MyGroups";
import { MyMeetings } from "@/components/dashboard/MyMeetings";
import { MySelf } from "@/components/dashboard/MySelf";



export function DashboardView() {
    const { data: session } = authClient.useSession();

    return (
        <div>
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
"use client"
import { H1, H2, H3, H4 } from "@/components/ui/Headings";
import SetupForm  from "@/components/setup/SetupForm";

export default function SetupView(){

    return (
        <div >
            <H1>Let's set it up!</H1>
            <SetupForm/>
        </div>
    )
}

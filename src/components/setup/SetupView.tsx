"use client"
import { H1 } from "@/components/ui/Headings";
import SetupForm  from "@/components/setup/SetupForm";
import { SetupText } from "@/constants/constants";


export default function SetupView(){

    return (
        <div >
            <H1>{SetupText.heading}</H1>
            <SetupForm/>
        </div>
    )
}

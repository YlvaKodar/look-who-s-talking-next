"use client"
import { authClient} from "@/lib/auth-client";
import { H2, H3, H4 } from "@/ui/Headings"
import { CommonButton } from "@/ui/Buttons";
import { DashboardText } from "@/constants/constants";
import {ButtonContainer} from "@/ui/Containers";
import { useState } from "react";

export function MyGroups() {
    const [showGroupButtons, setShowGroupButtons] = useState<boolean>(false);
    type Toggle = "keeper" | "clocker";
    const [toggleGroups, setToggleGroups] = useState<Toggle>("keeper");



    return (
        <div>
            <div>
                <H2>{DashboardText.headingGroups}</H2>
                <ButtonContainer>
                    <CommonButton onClick={() => setShowGroupButtons((prev => !prev) )}>{DashboardText.myGroups}</CommonButton>
                    <CommonButton>{DashboardText.createNewGroup}</CommonButton>
                </ButtonContainer>
            </div>
            {showGroupButtons && (
                <div>
                    <ButtonContainer>
                        <CommonButton>{DashboardText.keeperGroups}</CommonButton>
                        <CommonButton>{DashboardText.klockerGroups}</CommonButton>
                    </ButtonContainer>

                    {toggleGroups === "keeper" && (
                        <div></div>

                    )}

                    {toggleGroups === "clocker" && (
                            <div></div>
                        )
                    }

                </div>
            )}
        </div>
    )
}
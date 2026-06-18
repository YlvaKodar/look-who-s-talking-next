"use client"
import {
    BigSectionContainer,
    ButtonContainer, AlertContainer,
    ListButtonContainer,
    SimpleContainer,
    SmallSectionContainer
} from "@/ui/Containers";
import {ChevronIcon, P} from "@/ui/Common";
import {useState} from "react";
import {H1, H3, H4, ColorHeading} from "@/ui/Headings";
import {HowToUseText} from "@/constants/constants";

export function HowToUse() {
    return (
        <BigSectionContainer>
            <ColorHeading heading={"HOW TO USE"}/>
            <BasicUsage/>
            <AccountUsage/>
        </BigSectionContainer>
    )
}

function BasicUsage() {
    const [showBasic, setShowBasic] = useState(false);
    return (
        <div>
            <div onClick={() => setShowBasic(!showBasic)}>
                <H1 center={""}>{HowToUseText.basics} <ChevronIcon isOpen={showBasic}/></H1>
            </div>
            {showBasic && (
                <>
                    <SimpleContainer>
                        <H3 center={""}>{HowToUseText.one}</H3>
                        <P>{HowToUseText.oneOne}</P>
                        <P>{HowToUseText.oneTwo}</P>
                    </SimpleContainer>
                    <SimpleContainer>
                        <H3 center={""}>{HowToUseText.two}</H3>
                        <P>{HowToUseText.twoOne}</P>
                        <P>{HowToUseText.twoTwo}</P>
                        <AlertContainer variant={"example"} >
                            <H4 color={"example"}>{HowToUseText.example}</H4>
                            <SimpleContainer>
                                <P className={"font-semibold"}>{HowToUseText.twoExample.one}</P>
                                <P className={"font-semibold"}>{HowToUseText.twoExample.two}</P>
                                <P className={"font-semibold"}>{HowToUseText.twoExample.three}</P>
                                <P className={"font-semibold"}>{HowToUseText.twoExample.four}</P>
                            </SimpleContainer>
                        </AlertContainer>
                        <AlertContainer variant={"alert"}>
                            <H4 color={"alert"}>{HowToUseText.note}</H4>
                            <P>{HowToUseText.twoNoteOne}</P>
                            <P>{HowToUseText.twoNoteTwo}</P>
                            <P>{HowToUseText.twoNoteThree}</P>
                        </AlertContainer>
                    </SimpleContainer>
                    <SimpleContainer>
                        <H3 center={""}>{HowToUseText.three}</H3>
                        <P>{HowToUseText.threeOne}</P>
                        <P>{HowToUseText.threeTwo}</P>
                        <P color={"tip"} className={"font-semibold"} >{HowToUseText.threeThree}</P>
                        <P>{HowToUseText.threeFour}</P>
                        <AlertContainer variant={"tip"}>
                            <H4 color={"tip"}>{HowToUseText.tip}</H4>
                            <P>{HowToUseText.tipMore}</P>
                        </AlertContainer>
                    </SimpleContainer>
                    <SimpleContainer>
                        <H3 center={""}>{HowToUseText.lastly}</H3>
                        <P>{HowToUseText.lastlyOne}</P>
                        <P color={"danger"} className={"font-semibold"}>{HowToUseText.lastlyTwo}</P>
                        <P>{HowToUseText.lastlyThree}</P>
                    </SimpleContainer>
                </>
            )}
        </div>

    )
}

function AccountUsage() {
    const [showAccount, setShowAccount] = useState(false);
    return (
        <div>
            <div onClick={() => setShowAccount(!showAccount)}>
                <H1 center={""}>{HowToUseText.withAccount} <ChevronIcon isOpen={showAccount}/></H1>
            </div>

            {showAccount && (
                <>
                    <SimpleContainer>
                        <AlertContainer variant={"danger"}>
                            <P>{HowToUseText.disclaimer}</P>
                        </AlertContainer>
                    </SimpleContainer>
                    <SimpleContainer>
                        <H3 center={""}>{HowToUseText.createAccount}</H3>
                        <P>{HowToUseText.createAccountOne}</P>
                        <P>{HowToUseText.createAccountTwo}</P>
                    </SimpleContainer>
                    <SimpleContainer>
                        <H3 center={""}>{HowToUseText.groups}</H3>
                        <P>{HowToUseText.groupsMore}</P>
                        <AlertContainer variant={"alert"}>
                            <H4 color={"alert"}>{HowToUseText.note}</H4>
                            <P>{HowToUseText.groupsNote}</P>
                        </AlertContainer>
                        <AlertContainer variant={"example"}>
                            <H4 color={"example"}>{HowToUseText.example}</H4>
                            <P>{HowToUseText.groupsExampleOne}</P>
                            <P>{HowToUseText.groupsExampleTwo}</P>
                            <P>{HowToUseText.groupsExampleThree}</P>
                            <P>{HowToUseText.groupsExampleFour}</P>
                        </AlertContainer>
                    </SimpleContainer>
                    <SimpleContainer>
                        <H3 center={""}>{HowToUseText.meetings}</H3>
                        <P>{HowToUseText.meetingsOne}</P>
                        <P>{HowToUseText.meetingsTwo}</P>
                        <P>{HowToUseText.meetingsThree}</P>
                        <AlertContainer variant={"alert"}>
                            <H4 color={"alert"}>{HowToUseText.note}</H4>
                            <P>{HowToUseText.meetingNote}</P>
                        </AlertContainer>
                    </SimpleContainer>
                    <SimpleContainer>
                        <H3 center={""}>{HowToUseText.upcoming}</H3>
                        <P>{HowToUseText.upcomingOne}</P>
                        <P>{HowToUseText.upcomingTwo}</P>
                    </SimpleContainer>
                </>
            )
            }
        </div>
    )
}
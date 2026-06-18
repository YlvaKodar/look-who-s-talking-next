"use client"
import { H1, H2, H3, H4 } from "@/components/ui/Headings";
import { ButtonContainer } from "@/ui/Containers";
import { RadioButtons } from "@/ui/Buttons";
import { Genders, SetupText } from "@/constants/constants"
import { useState } from "react";
import {VARIANTS} from "@/constants/CONFIG";

export function SchemePicker() {
    const [selectedScheme, setSelectedScheme] = useState("amber");
    const setScheme = (scheme: string) => {
        setSelectedScheme(scheme);
        document.documentElement.setAttribute("data-theme", scheme);
    }

    const schemes = [
        {value: "jamjar", label: "Jam Jar"},
        {value: "nautilus", label: "Nautilus"},
        {value: "amber", label: "Amber"},
        {value: "lollipopguild", label: "Lollipop Guild"},
    ]

    return (
        <div>
            <div>
                <H3>{SetupText.colorSchemeLabel}</H3>
                <div className={`py-2 rounded-md w-full border border-foreground-dark, bg-bglight px-2`}>
                    <H4>{SetupText.schemePreview}</H4>
                    <Preview/>
                </div>
            </div>
            <div className={`pt-3`}>
                <RadioButtons options={schemes} value={selectedScheme} onChange={setScheme} name="schemes" />
            </div>
        </div>
    )
}

type Preview = {
    variant: string;
}

const variants = {
    women:  VARIANTS.women.base,
    nonbinary: VARIANTS.nonbinary.base,
    men: VARIANTS.men.base,
}

function Preview() {

    return (
        <ButtonContainer>
            <button disabled={true} className={`py-2 rounded-md w-full transition-all ${variants.women}`}>{Genders.womenLabel}</button>
            <button disabled={true} className={`py-2 rounded-md w-full transition-all ${variants.nonbinary}`}>{Genders.nonbinaryLabel}</button>
            <button disabled={true} className={`py-2 rounded-md w-full transition-all ${ variants.men}`}>{Genders.menLabel}</button>
        </ButtonContainer>
    )
}
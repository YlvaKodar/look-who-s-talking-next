"use client"
import { H1, H2, H3, H4 } from "@/components/ui/Headings";
import { ButtonContainer } from "@/ui/Containers";
import { RadioButtons } from "@/ui/Buttons";
import { CONFIG, Genders } from "@/constants/constants"
import { useState } from "react";

export function ThemePicker() {
    const [selectedTheme, setSelectedTheme] = useState<Theme>("amber");
    const setTheme = (theme: Theme) => {
        setSelectedTheme(theme);
        document.documentElement.setAttribute("data-theme", theme)
    }

    type Theme = "jamjar" | "nautilus" | "lollipopguild" | "amber";

    const themes = [
        {value: "jamjar", label: "Jam Jar"},
        {value: "nautilus", label: "Nautilus"},
        {value: "amber", label: "Amber"},
        {value: "lollipopguild", label: "Lollipop Guild"},
    ]

    return (
        <div>
            <div>
                <H3>Pick a color theme?</H3>
                <Preview/>
            </div>
            <div>
                <RadioButtons<Theme> options={themes} value={selectedTheme} onChange={setTheme} name="themes" />
                {/*<button onClick={() => setTheme("nautilus")}>Nautilus</button>*/}
                {/*<button onClick={() => setTheme("jamjar")}>Jamjar</button>*/}
            </div>
        </div>
    )
}

type Preview = {
    variant: string;
}

const variants = {
    women:  CONFIG.VARIANTS.women.base,
    nonbinary: CONFIG.VARIANTS.nonbinary.base,
    men: CONFIG.VARIANTS.men.base,
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
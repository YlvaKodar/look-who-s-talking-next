"use client"
import {H3} from "@/ui/Headings";
import { useRouter } from "next/navigation";

type ListItemProps = {
    text: string
    redirect?: string
    params?: string[]
}

type ListProps = {
    heading: string
    items: ListItemProps[]
    titelColor?: string
    textColor?: string
    backgroundColor?: string
    hover?: string
}

export const List = ({
    heading,
    items,
    titelColor = "text-foreground-dark",
    textColor = "text-foreground-ligt",
    hover = "hover: text-foreground-dark",
}: ListProps) => {
    const router = useRouter();
    return (
        <div className={`w-full`}>
            <H3>{heading}</H3>
            {items.map((item, index) => (
                <div key={index} className={`${textColor} ${hover} `}>
                    <ListItem text={item.text} redirect={item.redirect} params={item.params} />
                </div>
            ))}
        </div>
    )
}

const ListItem = ({text, redirect, params}: ListItemProps )=> {
    const router = useRouter();

    if (redirect) {
        return (
            <div className={`w-full`} onClick={() => router.push(redirect)}>{text}</div>
        )
    }
    return (
        <div className={`w-full`}>{text}</div>
    )
}

"use client"
import {H3} from "@/ui/Headings";
import { useRouter } from "next/navigation";

type ListItemProps = {
    text: string
    description?: string | null
    redirect?: string
}

type ListProps = {
    heading?: string
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
    textColor = "text-foreground-light",
    hover = "hover:text-foreground-dark",
}: ListProps) => {
    return (
        <div className={`w-full`}>
            {heading && (<H3>{heading}</H3>)}
            {items.map((item, index) => (
                <div key={index} className={`${textColor} ${hover} `}>
                    <ListItem text={item.text} description={item?.description} redirect={item.redirect} />
                </div>
            ))}
        </div>
    )
}

const ListItem = ({text, redirect, description}: ListItemProps )=> {
    const router = useRouter();

    if (redirect) {
        return (
            <div className={`relative group w-full`}>
                <div className={`w-full cursor-pointer`} onClick={() => router.push(redirect)}>{text}</div>
                {description && (
                    <div className={`absolute left-0 top-full mt-1 z-10
                           bg-foreground-dark text-background-light text-sm
                            px-2 py-1 rounded
                            invisible group-hover:visible
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-200
                            whitespace-nowrap`}>{description}</div>
                )}
            </div>
        )
    }
    return (
        <div className={`relative group w-full`}>
            <div className={`w-full`}>{text}</div>
            {description && (
                <div className={`absolute left-0 top-full mt-1 z-10
                           bg-foreground-dark text-background-light text-sm
                            px-2 py-1 rounded
                            invisible group-hover:visible
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-200
                            whitespace-nowrap`}>{description}</div>
            )}
        </div>
    )
}

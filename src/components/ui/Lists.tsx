"use client"
import {H3} from "@/ui/Headings";
import { useRouter } from "next/navigation";

type ListItemProps = {
    children: React.ReactNode;
    description?: string | null
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
                    <ListItem description={item?.description}>
                        {item?.children}
                    </ListItem>
                </div>
            ))}
        </div>
    )
}

const ListItem = ({ children, description }: ListItemProps) => {
    const router = useRouter();
    return (
        <div className={`relative group w-full`}>
            <div className={`w-full cursor-default`}
            >
                {children}
            </div>
            {description && <Tooltip description={description} />}
        </div>
    )
}

const Tooltip = ({ description }: { description: string }) => (
    <div className={`absolute left-0 top-full mt-1 z-10
        bg-foreground-dark text-background-light text-sm
        px-2 py-1 rounded
        invisible group-hover:visible
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        whitespace-nowrap`}>
        {description}
    </div>
)

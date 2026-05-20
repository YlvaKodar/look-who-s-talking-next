"use client"
import {H3} from "@/ui/Headings";
import { useRouter } from "next/navigation";
import { ListItemContainer } from "@/ui/Containers";
import { Tooltip } from "@/ui/Common";

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
        <div className={`w-full pb-4`}>
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
        <div className={`w-full`}>
            <ListItemContainer>
                {children}
                {description && <Tooltip label={description}/>}
            </ListItemContainer>
        </div>
    )
}

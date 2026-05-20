export function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        // <div className="flex flex-col gap-6 py-12 w-full ms:px-6 md:max-w-xl mx-auto px-4 items-center">
        <div className="mx-auto w-full flex flex-col max-w-3xl px-4 sm:px-6">
            {children}
        </div>
    )
}

export function ButtonContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col ms:flex-row gap-2 w-full pt-4 pb-4 items-center">
            {children}
        </div>
    )
}
export function ListItemContainer({ children, classname }: { children: React.ReactNode, classname?: string }) {
    return (
        <div className={`flex flex-row gap-4 px-1 cursor-default justify-between text-sm font-mono ${classname}`}>
            {children}
        </div>
    )
}
export function ListButtonContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className={`flex flex-row  py-1 justify-end`}>
            {children}
        </div>
    )
}

export function SectionContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className={`rounded-md w-full border border-foreground-dark, bg-background-light py-2  px-6 max-w-md mx-auto `}>
            {children}
        </div>
    )
}

export function SimpleContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className={`flex flex-col gap-1 px-1 py-1 cursor-default justify-between`}>{children}</div>
    )
}
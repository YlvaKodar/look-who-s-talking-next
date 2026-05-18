export function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-6 py-12 w-full ms:px-6 md:max-w-xl mx-auto px-4 items-center">
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
export function ListItemContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row gap-4 px-1 align-middle ">
            {children}
        </div>
    )
}
export function ListButtonContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row gap-4 px-1 align-middle ">
            {children}
        </div>
    )
}
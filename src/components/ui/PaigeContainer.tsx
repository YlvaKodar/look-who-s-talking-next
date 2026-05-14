export function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-6 w-full max-w-sm mx-auto px-4">
            {children}
        </div>
    )
}
"use client"
export function ChevronIcon({ isOpen }: { isOpen: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
                display: "inline-block",
    }}
>
    <polyline points="6 9 12 15 18 9" />
        </svg>
);
}

export const Tooltip = ({ label }: { label: string }) => (
    <div className={`absolute left-0 top-full mt-1 z-10
        bg-foreground-dark text-background-light text-sm
        px-2 py-1 rounded
        invisible group-hover:visible
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        whitespace-nowrap`}>
        {label}
    </div>
)

export const LoadingIndicator = () => {
    return (
        <div className={`text-center text-4xl text-bold font-bitcount`}>
            ...
        </div>
    )
}
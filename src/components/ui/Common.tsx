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
        bg-foreground-dark text-bglight text-sm
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
            <span className={"text-two"} >.</span><span className={"text-six"}>.</span><span className={"text-eight"}>.</span>
        </div>
    )
}

const styles = {
    error: {
        text: "text-red-600",
        border: "border-red-600",
    },
    warning: {
        text: "text-amber-700",
        border: "border-amber-700",
    },
    success: {
        text: "text-cyan-700",
        border: "border-cyan-700",
    },
}

type ValidationMessageProps = {
    messageType?: "error" | "warning" | "success",
    children?: React.ReactNode,
}

export const ValidationMessage = ({ children , messageType = "error" }: ValidationMessageProps) => {
    const { text, border } = styles[messageType];

    return (
        <div className={`py-1 w-full`}>
            <div className={`p-2 rounded-md font-medium w-full border-2 bg-bgextralight  ${border}`}>
                <p className={text}>{children}</p>
            </div>
        </div>
    )
}
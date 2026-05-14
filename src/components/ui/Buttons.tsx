
type CommonButtonProps = {
    variant?: "primary" | "secondary"
} & React.ComponentProps<"button">

const variants = {
    primary: "bg-foreground-dark text-background-light hover:bg-foreground-light",
    secondary: "border bg-background-light border-foreground-dark text-foreground-dark hover:bg-background-dark"
}

export function CommonButton({ variant = "primary", className, children, ...props }: CommonButtonProps) {
    return (
        <button
            className={`
        px-4 py-2 rounded-md font-medium w-full
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className ?? ""}
      `}
            {...props}
        >
            {children}
        </button>
    )
}
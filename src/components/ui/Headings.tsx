"use client"
const variants = {
    primary: "text-foreground-dark",
    women: "text-women-dark",
    nonbinary: "text-nonbinary-dark",
    men: "text-men-dark"
}

type HeadingProps = {
    color?: "primary" | "women" | "nonbinary" | "men",
    className?: string
    center?: string
} & React.HTMLAttributes<HTMLHeadingElement>;

export function H1({ children, color = "primary", className, center="text-center" }: HeadingProps) {
    return <h1 className={`text-4xl font-bitcount tracking-tight py-2  ${variants[color]} ${center}    ${className}`}>{children}</h1>;
}

export function H2({ children, color = "primary", center="text-center", className }: HeadingProps) {
    return <h2 className={`text-3xl font-mono tracking-tight font-semibold py-2 ${variants[color]}  ${center} ${className}`}>{children}</h2>;
}

export function H3({ children, color = "primary", center="text-center", className  }: HeadingProps ) {
    return <h3 className={`text-2xl font-mono font-semibold tracking-tight py-2 ${variants[color]} ${center} ${className}`}>{children}</h3>;
}

export function H4({ children, color = "primary", center="text-center", className  }: HeadingProps) {
    return <h4 className={`text-1xl font-mono font-semibold tracking-tight py-2 ${variants[color]}  ${center} ${className}`}>{children}</h4>;
}
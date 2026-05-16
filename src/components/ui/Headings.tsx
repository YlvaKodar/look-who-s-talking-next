"use client"
const variants = {
    primary: "text-foreground-dark",
    women: "text-women-dark",
    nonbinary: "text-nonbinary-dark",
    men: "text-men-dark"
}

type HeadingProps = {
    color?: "primary" | "women" | "nonbinary" | "men"
} & React.HTMLAttributes<HTMLHeadingElement>;

export function H1({ children, color = "primary"  }: HeadingProps) {
    return <h1 className={`text-4xl font-bold py-2 text-center ${variants[color]}`}>{children}</h1>;
}

export function H2({ children, color = "primary"  }: HeadingProps) {
    return <h2 className={`text-3xl font-semibold py-2 text-center ${variants[color]}`}>{children}</h2>;
}

export function H3({ children, color = "primary"  }: HeadingProps ) {
    return <h3 className={`text-2xl font-semibold py-2 text-center ${variants[color]}`}>{children}</h3>;
}

export function H4({ children, color = "primary"  }: HeadingProps) {
    return <h4 className={`text-1xl font-semibold py-2 text-center ${variants[color]}`}>{children}</h4>;
}
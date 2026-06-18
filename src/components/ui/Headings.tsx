"use client"
import {shuffle} from "remeda";
import {useState, useEffect} from "react";
import {VARIANTS} from "@/constants/CONFIG";

const variants = {
    primary: VARIANTS.primary.text,
    women: VARIANTS.women.text,
    nonbinary: VARIANTS.nonbinary.text,
    men: VARIANTS.men.text,
    danger: VARIANTS.danger.text,
    alert: VARIANTS.alert.text,
    example: VARIANTS.example.text,
    tip: VARIANTS.tip.text,
}

type HeadingProps = {
    color?: "primary" | "women" | "nonbinary" | "men" | "danger" | "alert" | "example" | "tip",
    className?: string
    center?: string
} & React.HTMLAttributes<HTMLHeadingElement>;

export function H1({ children, color = "primary", className, center="text-center" }: HeadingProps) {
    return <h1 className={`text-4xl font-bitcount tracking-tight py-2  ${variants[color]} ${center} ${className}`}>{children}</h1>;
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

type ColorHeadingProps = {
    heading: string;
    size?: "text-xl" | "text-2xl" | "text-3xl" | "text-4xl" | "text-5xl";
}
export function ColorHeading({heading, size = "text-5xl"}:ColorHeadingProps ) {
    const colors = [
         "var(--color-eleven)",
         "var(--color-tree)",
        "var(--color-six)",
        "var(--color-eight)",
        "var(--color-twelve)",
         "var(--color-forteen)",
     "var(--color-fore)",
      "var(--color-sixteen)",
         "var(--color-eighteen)",
        "var(--color-thirteen)",
         "var(--color-two)",
        "var(--color-six)",
        "var(--color-fore)",
       "var(--color-twelve)",
       "var(--color-eight)",
       "var(--color-forteen)",
        "var(--color-eighteen)",
    ];

    const [letters, setLetters] = useState(
        heading.split("").map((letter) => ({ char: letter, color: colors[0] }))
    );

    useEffect(() => {
        const shuffled = shuffle(colors);
        setLetters(
            heading.split("").map((letter, index) => ({
                char: letter,
                color: shuffled[index % shuffled.length],
            }))
        );
    }, [heading]);

    return (
        <h1 className={`${size}  text-center font-bitcount tracking-tight py-2`}>
            {letters.map((letter, index) => (
                <span key={index} style={{color: letter.color}} >{letter.char}</span>
            ))}
        </h1>
    );
}
export function H1({ children }: { children: React.ReactNode }) {
    return <h1 className="text-4xl font-bold tracking-tight text-foreground py-2 text-center">{children}</h1>;
}

export function H2({ children }: { children: React.ReactNode }) {
    return <h2 className="text-3xl font-semibold text-secondary py-2 text-center">{children}</h2>;
}

export function H3({ children }: { children: React.ReactNode }) {
    return <h3 className="text-2xl font-semibold text-foreground py-2 text-center">{children}</h3>;
}

export function H4({ children }: { children: React.ReactNode }) {
    return <h4 className="text-1xl font-semibold text-secondary py-2 text-center">{children}</h4>;
}
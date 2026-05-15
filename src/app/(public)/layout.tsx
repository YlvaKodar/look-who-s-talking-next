import { PageContainer } from "@/ui/Containers";
export default function PublicLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">

            <header className="p-4 text-center border-b border-foreground/10">
                 Temp header
            </header>
            <main className="flex-1 items-center">
                <PageContainer>
                    {children}
                </PageContainer>
            </main>
            <footer className="p-4 text-center text-sm text-foreground/60">
                © 2026 Temp footer
            </footer>
        </div>
    );
}
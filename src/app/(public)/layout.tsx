import { PageContainer } from "@/ui/Containers";
import {Header} from "@/components/Headers";
export default function PublicLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
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
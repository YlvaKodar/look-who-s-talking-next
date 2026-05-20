import { PageContainer } from "@/ui/Containers";
import { Header} from "@/components/Headers";
export default function PublicLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1 flex justify-center">
                <PageContainer>
                    {children}
                </PageContainer>
            </main>
        </div>
    );
}
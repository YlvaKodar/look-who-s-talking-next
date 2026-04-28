import { prisma } from "@/lib/prisma";

export default async function AdminTestComponent() {
    const users = await prisma.user.findMany();
    return (
        <div>
            <h1 className="text-3xl font-bold mb- font-[family-name:var(--font-geist-sans)] text-[#333333]">
                Users
            </h1>
            <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)] text-[#333333]">
                {users.map((user) => (
                    <li key={user.id} className="mb-2">
                        {user.name}
                    </li>
                ))}
            </ol>
        </div>
    );
}
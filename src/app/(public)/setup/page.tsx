import SetupView from "@/components/setup/SetupView";

type SearchParams = {
    searchParams: Promise<{ groupId?: string; groupName?: string }>;
};
export default async function SetupPage({ searchParams }: SearchParams){
    const { groupId, groupName } = await searchParams;
    return (
        <SetupView groupId={groupId} groupName={groupName} />
    )
}
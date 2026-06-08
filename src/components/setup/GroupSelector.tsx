import {useEffect, useState} from "react";
import {authClient} from "@/lib/auth-client";
import {GroupListItem} from "@/types/group";
import {SelectField} from "@/ui/FormFields";
import {Common} from "@/constants/constants";

type Props = {
    onSelect?: (group: { id: string; name: string } | null) => void;
};

export function GroupSelector({ onSelect }: Props = {}) {
    const [options, setOptions] = useState<{ value: string, label: string }[]>([]);
    const [selected, setSelected] = useState<{ value: string, label: string } | null>(null);
    const {data: session} = authClient.useSession();

    let placeholder = "Meeting group?";

    useEffect(() => {
        async function fetchGroups() {
            if (!session) return;
            try {
                const result = await fetch(`/api/groups?status=myGroups`);
                if (!result.ok) {
                    const error = await result.json();
                    return;
                }
                const groups: GroupListItem[] = await result.json();
                if (!groups.length) placeholder = "You have no groups loser";
                setOptions(groups.map((g) => ({value: g.id, label: g.name})));
                groups.map((g) => (console.log(g.name)));

            } catch (error) {
                console.error(error);
            }
        }
        fetchGroups()
    }, [session]);

    return (
        <>
            <SelectField
                label={Common.groupLabel}
                name="groupId"
                options={options}
                placeholder={Common.groupSelector}
                defaultValue={""}
                onChange={(e) => {
                    const opt = options.find(o => o.value === e.target.value) ?? null;
                    setSelected(opt);
                    onSelect?.(opt ? { id: opt.value, name: opt.label } : null);
                }}
            />
            {selected && (
                <input type="hidden" name="groupName" value={selected.label}/>
            )}
        </>
    );
}
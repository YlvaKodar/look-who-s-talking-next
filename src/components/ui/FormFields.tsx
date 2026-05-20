"use client";
import {useState, useEffect, useRef, ChangeEvent} from "react";

type InputFieldProps = {
    label: string;
    name: string;
    type?: "text" | "number" | "date" | "email" | "password";
    placeholder?: string;
    required?: boolean;
    min?: number;
    defaultValue?: string | number;
}

export function InputField({
    label,
    name,
    type = "text",
    placeholder,
    required,
    min,
    defaultValue,
                           }: InputFieldProps) {
    return (
     <div className="w-full mx-auto flex flex-col gap-1.5">
         <label
             htmlFor={name}
             className={`text-sm font-medium text-foreground`}
         >{label}</label>
         <input
         id={name}
         name={name}
         type={type}
         placeholder={placeholder}
         required={required}
         min={min}
         defaultValue={defaultValue}
         className={`
          w-full rounded-md border border-foreground
          bg-background-light px-3 py-2
          text-foreground placeholder:text-foreground/40
          focus:ring-2 focus:ring-foreground/30
        `}
         />
     </div>
    );
}

type SelectFieldProps = {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    required?: boolean;
    defaultValue?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectField({
                                label,
                                name,
                                options,
                                placeholder,
                                required,
                                defaultValue,
                                onChange,
                            }: SelectFieldProps) {
    return (
        <div className="w-full mx-auto flex flex-col gap-1.5">
            <label
                htmlFor={name}
                className="text-sm font-medium text-foreground"
            >{label}</label>
            <select
                id={name}
                name={name}
                required={required}
                defaultValue={defaultValue ?? ""}
                onChange={onChange}
                className={`
                    w-full rounded-md border border-foreground
                    bg-background-light px-3 py-2
                    text-foreground
                    focus:ring-2 focus:ring-foreground/30
                `}
            >
                {placeholder && (
                    <option value="">{placeholder ?? ""}</option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}


type SearchFieldProps<T> = {
    label: string;
    placeholder?: string;
    fetchResults: (query: string) => Promise<T[]>;
    renderResult: (item: T) => React.ReactNode;
    onSelect?: (item: T) => void;
    getKey: (item: T) => string;
};

export function SearchField<T>({
                                   label,
                                   placeholder = "",
                                   fetchResults,
                                   renderResult,
                                   onSelect,
                                   getKey,
                               }: SearchFieldProps<T>) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setOpen(false);
            return;
        }

        const timeout = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await fetchResults(query);
                setResults(data);
                setOpen(true);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [query, fetchResults]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="w-full mx-auto flex flex-col gap-1.5 relative">
            <label className="w-full text-sm font-medium text-foreground">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="
            w-full rounded-md border border-foreground
            bg-background-light px-3 py-2
            text-foreground placeholder:text-foreground/40
            focus:ring-2 focus:ring-foreground/30
          "
                />
                {loading && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-foreground/40">
            ...
          </span>
                )}
            </div>

            {open && (
                <ul className="absolute top-full mt-1 z-10 w-full rounded-md border border-foreground bg-background-light shadow-sm">
                    {results.length === 0 ? (
                        <li className="px-3 py-2 text-sm text-foreground/50">Nothing there</li>
                    ) : (
                        results.map((item) => (
                            <li
                                key={getKey(item)}
                                className="px-3 py-2 text-sm flex items-center justify-between hover:bg-foreground/5"
                            >
                                <div className="flex-1">{renderResult(item)}</div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onSelect?.(item);
                                        setOpen(false);
                                        setQuery("");
                                    }}
                                    className="ml-3 text-xs px-2 py-1 rounded border border-foreground-light cursor-pointer"
                                >
                                    +
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}
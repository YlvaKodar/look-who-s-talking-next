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
     <div className="flex flex-col gap-1.5 w-full md:max-w-sm">
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
}

export function SelectField({
                                label,
                                name,
                                options,
                                placeholder,
                                required,
                                defaultValue,
                            }: SelectFieldProps) {
    return (
        <div className="flex flex-col gap-1.5 w-full md:max-w-sm">
            <label
                htmlFor={name}
                className="text-sm font-medium text-foreground"
            >{label}</label>
            <select
                id={name}
                name={name}
                required={required}
                defaultValue={defaultValue ?? ""}
                className={`
                    w-full rounded-md border border-foreground
                    bg-background-light px-3 py-2
                    text-foreground
                    focus:ring-2 focus:ring-foreground/30
                `}
            >
                {placeholder && (
                    <option value="" disabled>{placeholder}</option>
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
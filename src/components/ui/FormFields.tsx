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
          bg-background px-3 py-2
          text-foreground placeholder:text-foreground/40
          focus:ring-2 focus:ring-foreground/30
        `}
         />
     </div>
    );
}
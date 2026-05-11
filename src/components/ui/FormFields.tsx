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
     <div>
         <label htmlFor={name}>{label}</label>
         <input
         id={name}
         name={name}
         type={type}
         placeholder={placeholder}
         required={required}
         min={min}
         defaultValue={defaultValue}
         />
     </div>
    );
}
type InputFieldProps = {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
}

export function InputField({
    label,
    name,
    type = "text",
    placeholder,
    required,
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
         />
     </div>
    );
}
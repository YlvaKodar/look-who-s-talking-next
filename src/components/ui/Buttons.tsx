"use client"
type CommonButtonProps = {
    variant?: "primary" | "secondary" | "tertiary"
} & React.ComponentProps<"button">

const variants = {
    primary: "bg-foreground-dark text-background-light hover:bg-foreground-light",
    secondary: "bg-background-light border border-foreground-dark text-foreground-dark hover:bg-background-dark",
    tertiary: "bg-background-dark border border-foreground-dark text-foreground-dark hover:bg-background-dark"
}

export function CommonButton({ variant = "primary", className, children, ...props }: CommonButtonProps) {
    return (
        <button
            className={`
        py-2 rounded-md font-medium w-full
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className ?? ""}
      `}
            {...props}
        >
            {children}
        </button>
    )
}

export function ListButton({ variant = "secondary",  className, children, ...props }: CommonButtonProps) {
    return (
        <button
            className={`
        relative group
        ml-3 text-xs px-2 py-1 rounded font-extralight
        cursor-pointer
        ${variants[variant]}
        ${className ?? ""}
      `}
            {...props}
        >
            {children}
        </button>
    )
}

type Option = {
    value: string;
    label: string;
    description?: string;
}

type RadioButtonsProps = {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    name: string;
}

export function RadioButtons({
                                        options,
                                        value,
                                        onChange,
                                        name,
                                    }: RadioButtonsProps) {
    return (
        <div className="flex flex-col gap-2.5">
            {options.map((option) => {
                const isSelected = value === option.value;
                return (
                    <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-md border px-3.5 py-2.5 transition-colors ${
                            isSelected
                                ? "border-foreground-dark bg-background-light"
                                : "border-foreground-light bg-background-dark hover:bg-background-light"
                        }`}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={isSelected}
                            onChange={() => onChange(option.value)}
                            className="sr-only"
                        />
                        <div
                            className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                isSelected ? "border-foreground-dark" : "border-foreground-light"
                            }`}
                        >
                            {isSelected && (
                                <div className="h-2 w-2 rounded-full bg-foreground-dark" />
                            )}
                        </div>
                        <div>
              <span className="text-sm font-medium text-foreground-dark">
                {option.label}
              </span>
                            {option.description && (
                                <p className="text-xs text-foreground-light">{option.description}</p>
                            )}
                        </div>
                    </label>
                );
            })}
        </div>
    );
}
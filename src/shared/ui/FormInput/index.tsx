import type { InputHTMLAttributes } from "react";
import { DEFAULT_INPUT_MAX_LENGTH } from "@/shared/config/constants";
import { cn } from "@/shared/lib/cn";
import {
  formFieldBaseClassName,
  formFieldDefaultClassName,
  formFieldFocusClassName,
} from "@/shared/ui/FormField/styles";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  maxLength?: number | null;
};

export function FormInput({
  id,
  label,
  className,
  maxLength = DEFAULT_INPUT_MAX_LENGTH,
  ...props
}: FormInputProps) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1.5" htmlFor={id}>
      <span className="text-sm font-medium leading-5 text-gray-700">{label}</span>
      <input
        id={id}
        maxLength={maxLength ?? undefined}
        className={cn(
          "px-3 py-2 text-base leading-6 text-gray-900",
          formFieldBaseClassName,
          formFieldDefaultClassName,
          formFieldFocusClassName,
          className,
        )}
        {...props}
      />
    </label>
  );
}

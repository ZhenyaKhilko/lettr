import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import {
  formFieldBaseClassName,
  formFieldDefaultClassName,
  formFieldErrorClassName,
  formFieldFocusClassName,
} from "@/shared/ui/FormField/styles";

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: boolean;
};

export function FormTextarea({ id, label, className, error = false, ...props }: FormTextareaProps) {
  return (
    <label className="relative flex min-h-0 flex-1 flex-col gap-1.5" htmlFor={id}>
      <span className="shrink-0 text-sm font-medium leading-5 text-gray-700">{label}</span>
      <textarea
        id={id}
        className={cn(
          "min-h-[120px] flex-1 resize-none px-3.5 py-3 text-base leading-6 text-gray-900 md:min-h-0",
          formFieldBaseClassName,
          error ? formFieldErrorClassName : cn(formFieldDefaultClassName, formFieldFocusClassName),
          className,
        )}
        {...props}
      />
    </label>
  );
}

import { MAX_DETAILS_LENGTH, MAX_TITLE_FIELD_LENGTH } from "@/shared/config/constants";
import type { LetterForm } from "@/entities/letter/model/types";
import { getTooltipTitle } from "@/shared/lib/truncateText";
import { Button, FormInput, FormTextarea } from "@/shared/ui";

type GeneratorFormProps = {
  title: string;
  values: LetterForm;
  hasGeneratedLetter: boolean;
  detailsError: boolean;
  submitDisabled: boolean;
  submitLoading: boolean;
  onChange: (field: keyof LetterForm, value: string) => void;
  onSubmit: () => void;
};

export function GeneratorForm({
  title,
  values,
  hasGeneratedLetter,
  detailsError,
  submitDisabled,
  submitLoading,
  onChange,
  onSubmit,
}: GeneratorFormProps) {
  const charCount = values.details.length;
  const overLimit = charCount > MAX_DETAILS_LENGTH;
  const detailsHintId = "additional-details-hint";
  const jobTitle = values.jobTitle.trim();
  const company = values.company.trim();
  const hasFilledTitle = Boolean(jobTitle && company);

  return (
    <div className="@container flex h-full w-full min-h-0 min-w-0 flex-col gap-4 md:h-[600px]">
      <header className="min-w-0 shrink-0 border-b border-gray-200 pb-3">
        {hasFilledTitle ? (
          <h1 className="m-0 min-w-0 whitespace-normal wrap-break-word font-display text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl sm:leading-[44px]">
            <span>{jobTitle}</span>
            <span>, </span>
            <span>{company}</span>
          </h1>
        ) : (
          <h1 className="m-0 font-display text-3xl font-semibold leading-tight tracking-tight text-gray-500 sm:text-4xl sm:leading-[44px]">
            {title}
          </h1>
        )}
      </header>

      <form
        className="flex min-h-0 flex-1 flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex shrink-0 flex-col gap-4 @sm:flex-row">
          <FormInput
            id="job-title"
            label="Job title"
            value={values.jobTitle}
            readOnly={submitLoading}
            placeholder="Product manager"
            maxLength={MAX_TITLE_FIELD_LENGTH}
            onChange={(e) => onChange("jobTitle", e.target.value)}
          />
          <FormInput
            id="company"
            label="Company"
            value={values.company}
            readOnly={submitLoading}
            placeholder="Apple"
            maxLength={MAX_TITLE_FIELD_LENGTH}
            title={getTooltipTitle(values.company, MAX_TITLE_FIELD_LENGTH)}
            className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
            onChange={(e) => onChange("company", e.target.value)}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4">
          <div className="shrink-0">
            <FormInput
              id="skills"
              label="I am good at..."
              value={values.skills}
              readOnly={submitLoading}
              placeholder="HTML, CSS and doing things in time"
              onChange={(e) => onChange("skills", e.target.value)}
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex min-h-0 flex-1 flex-col">
              <FormTextarea
                id="additional-details"
                label="Additional details"
                value={values.details}
                readOnly={submitLoading}
                placeholder="Describe why you are a great fit or paste your bio"
                onChange={(e) => onChange("details", e.target.value)}
                error={detailsError || overLimit}
                aria-describedby={detailsHintId}
                aria-invalid={detailsError || overLimit || undefined}
              />
            </div>
            <span
              id={detailsHintId}
              className={`mt-2 shrink-0 text-sm leading-5 ${overLimit ? "text-red-500" : "text-gray-600"}`}
              aria-live="polite"
            >
              {charCount}/{MAX_DETAILS_LENGTH}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          variant={hasGeneratedLetter ? "secondary" : "primary"}
          size="lg"
          className="w-full shrink-0"
          icon={hasGeneratedLetter ? <img src="/assets/icon-try-again.svg" alt="" /> : undefined}
          iconPosition="left"
          loading={submitLoading}
          loadingLabel="Generating letter"
          disabled={submitDisabled || overLimit}
        >
          {hasGeneratedLetter ? "Try Again" : "Generate Now"}
        </Button>
      </form>
    </div>
  );
}


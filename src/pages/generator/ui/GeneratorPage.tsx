import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GeneratorForm } from "@/widgets/generator/ui/GeneratorForm";
import { GeneratorPreview } from "@/widgets/generator/ui/GeneratorPreview";
import { Header } from "@/widgets/header/ui/Header";
import { GoalBanner } from "@/widgets/dashboard/ui/GoalBanner";
import { PageLayout } from "@/shared/ui";
import { useLetters } from "@/entities/letter/model/context/LettersContext";
import { generateLetter } from "@/entities/letter/lib/generateLetter";
import { EMPTY_LETTER_FORM } from "@/entities/letter/model/defaults";
import { canGenerate, getFormTitle, isDetailsOverLimit } from "@/entities/letter/model/validation";
import type { LetterForm } from "@/entities/letter/model/types";
import { APP_ROUTES, GENERATION_DELAY_MS, GOAL_COUNT } from "@/shared/config/constants";
import { getLetterRoute } from "@/shared/config/routes";
import { useClipboard } from "@/shared/hooks/useClipboard";

export function GeneratorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { letters, isLoading: isLettersLoading, addLetter, updateLetter, getLetter } = useLetters();

  const existing = id ? getLetter(id) : undefined;
  const isNew = !id;
  const { status: copyStatus, copy } = useClipboard();

  const [form, setForm] = useState<LetterForm>(() =>
    existing
      ? {
          jobTitle: existing.jobTitle,
          company: existing.company,
          skills: existing.skills,
          details: existing.details,
        }
      : { ...EMPTY_LETTER_FORM },
  );
  const [previewContent, setPreviewContent] = useState<string | null>(
    existing?.content ?? null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailsTouched, setDetailsTouched] = useState(false);

  useEffect(() => {
    if (id && !existing) return;
    if (existing) {
      setForm({
        jobTitle: existing.jobTitle,
        company: existing.company,
        skills: existing.skills,
        details: existing.details,
      });
      setPreviewContent(existing.content);
      setError(null);
      return;
    }

    setForm({ ...EMPTY_LETTER_FORM });
    setPreviewContent(null);
    setError(null);
  }, [id, existing]);

  const detailsError = detailsTouched && isDetailsOverLimit(form.details);
  const submitDisabled = !canGenerate(form);
  const title = getFormTitle(form, isNew);
  const hasGeneratedLetter = Boolean(existing?.content);
  const shouldShowGoalBanner =
    !isLettersLoading && letters.length > 0 && letters.length < GOAL_COUNT;

  const handleChange = (field: keyof LetterForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "details") setDetailsTouched(true);
  };

  const handleCopy = useCallback(async () => {
    if (!previewContent) return;
    await copy(previewContent);
  }, [copy, previewContent]);

  const handleSubmit = async () => {
    if (!canGenerate(form) || loading) return;

    setLoading(true);
    setPreviewContent(null);
    setError(null);

    try {
      const [content] = await Promise.all([
        generateLetter(form),
        new Promise((resolve) => setTimeout(resolve, GENERATION_DELAY_MS)),
      ]);

      if (isNew) {
        const letter = await addLetter(form, content);
        setPreviewContent(content);
        setLoading(false);
        navigate(getLetterRoute(letter.id), { replace: true });
      } else if (id) {
        await updateLetter(id, form, content);
        setPreviewContent(content);
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to generate cover letter:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred during generation."
      );
      setLoading(false);
    }
  };

  if (id && !existing) {
    return <Navigate to={APP_ROUTES.dashboard} replace />;
  }

  return (
    <PageLayout>
      <Header count={letters.length} />
      <section className="flex w-full flex-col gap-12">
        <div className="flex w-full min-w-0 flex-col gap-8 lg:flex-row lg:items-stretch">
          <div className="min-w-0 lg:flex-1">
            <GeneratorForm
              title={title}
              values={form}
              hasGeneratedLetter={hasGeneratedLetter}
              detailsError={detailsError}
              submitDisabled={submitDisabled}
              submitLoading={loading}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="min-w-0 lg:flex-1">
            <GeneratorPreview
              content={previewContent}
              loading={loading}
              error={error}
              copyStatus={copyStatus}
              onCopy={handleCopy}
              onRetry={handleSubmit}
            />
          </div>
        </div>
        {shouldShowGoalBanner && <GoalBanner count={letters.length} />}
      </section>
    </PageLayout>
  );
}

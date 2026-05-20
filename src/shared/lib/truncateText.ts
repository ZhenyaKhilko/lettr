export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}

export function getTooltipTitle(text: string, maxLength: number): string | undefined {
  return text.length > maxLength ? text : undefined;
}

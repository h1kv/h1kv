export function formatDate(date: Date | string | undefined | null): string {
  if (!date) return '';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC', // show the stored time as-is, no build-machine tz drift
  });
}

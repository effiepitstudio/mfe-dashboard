// format the iSO timestamp into a readable string

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatTimestamp(isoString: string): string {
  try {
    return dateFormatter.format(new Date(isoString));
  } catch {
    return isoString;
  }
}

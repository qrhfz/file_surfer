export function formatDateString(s: string | undefined): string {
  if (s === undefined) {
    return "N/A";
  }

  let f = new Intl.DateTimeFormat("en-UK", {
    dateStyle: "full",
    timeStyle: "medium",
  });

  return f.format(Date.parse(s));
}

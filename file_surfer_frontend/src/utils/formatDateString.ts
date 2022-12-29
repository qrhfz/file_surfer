export function formatDateString(s: string): string {
  let f = new Intl.DateTimeFormat("en-UK", {
    dateStyle: "full",
    timeStyle: "medium",
  });
  return f.format(Date.parse(s));
}

export function formatDateString(s: string): string {
  let f = new Intl.DateTimeFormat("en-UK", {
    dateStyle: "full",
    timeStyle: "long",
  });
  return f.format(Date.parse(s));
}

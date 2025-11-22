// lib/sanitize.ts
export function sanitizeString(s?: string) {
  return (s || "")
    .replace(/<\/?[^>]+(>|$)/g, "") // strip tags
    .replace(/[\u0000-\u001F\u007F]+/g, "") // strip control chars
    .trim()
    .slice(0, 2000); // limit length
}

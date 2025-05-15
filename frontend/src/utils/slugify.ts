import { slugify as translit } from "transliteration"

export function slugify(str: string): string {
  return translit(str)
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .toLowerCase()
}

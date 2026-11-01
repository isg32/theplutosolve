const mods = import.meta.glob('../assets/work/*.webp', { eager: true, import: 'default' }) as Record<string, string>

/** slug → bundled image URL (screenshots are stored in src/assets/work/<slug>.webp) */
export const workImages: Record<string, string> = Object.fromEntries(
  Object.entries(mods).map(([path, url]) => [path.split('/').pop()!.replace('.webp', ''), url]),
)

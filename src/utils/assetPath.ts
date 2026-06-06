const BASE = import.meta.env.BASE_URL;

export function assetPath(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE}${normalized}`;
}

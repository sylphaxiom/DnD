export function parseSearchParams(url: URL): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(url.search));
}

/** Drop-in `clientLoader` for any route that just needs its query string parsed. */
export async function searchParamsLoader({ request }: { request: Request }) {
  return parseSearchParams(new URL(request.url));
}

import { vi } from "vitest";
import { GraphClient } from "../src/lib/graph";

/** A fetch stub that answers by "METHOD path" and records every call. */
type Route = (url: URL, body: URLSearchParams | null) => unknown;
type Call = { method: string; path: string; params: Record<string, string> };

/** A fetch stub that answers by "METHOD path" and records every call into `calls`. */
export function fakeGraphFetch(routes: Record<string, Route>, calls: Call[] = []) {
  const fetchImpl = vi.fn(async (input: URL | RequestInfo, init?: RequestInit) => {
    const url = new URL(String(input));
    const method = init?.method ?? "GET";
    const path = url.pathname.replace(/^\/v[\d.]+\//, "");
    const body = init?.body instanceof URLSearchParams ? init.body : null;
    const params = Object.fromEntries([...(body ?? url.searchParams).entries()]);
    calls.push({ method, path, params });
    const handler = routes[`${method} ${path}`];
    if (!handler) return new Response(JSON.stringify({ error: { message: `No route ${method} ${path}` } }), { status: 404 });
    const out = handler(url, body);
    if (out instanceof Response) return out;
    return new Response(JSON.stringify(out), { status: 200 });
  }) as unknown as typeof fetch;
  return { fetchImpl, calls };
}

/** A GraphClient (token "TOKEN") backed by fakeGraphFetch. */
export function fakeGraph(routes: Record<string, Route>) {
  const { fetchImpl, calls } = fakeGraphFetch(routes);
  const client = new GraphClient({ token: "TOKEN", version: "v26.0", fetchImpl });
  return { client, calls };
}

export function graphError(code: number, message = "boom", status = 400) {
  return new Response(JSON.stringify({ error: { message, code } }), { status });
}

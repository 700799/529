// Minimal zero-dependency static file server for the e2e suite. Serves the
// `out/` export the way a static host would (trailingSlash: true => a
// directory resolves to its index.html), so tests exercise the real artifact
// without pulling in a server dependency.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const root = process.argv[2] || "out";
const port = Number(process.argv[3] || 4329);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".woff2": "font/woff2",
};

async function resolve(pathname) {
  // Block traversal outside the served root.
  const safe = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, safe);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    return file;
  } catch {
    // Fall back to <path>.html, then <path>/index.html.
    for (const candidate of [`${file}.html`, join(file, "index.html")]) {
      try {
        await stat(candidate);
        return candidate;
      } catch {}
    }
    return null;
  }
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  const file = await resolve(pathname);
  if (!file) {
    res.writeHead(404, { "content-type": "text/plain" });
    return res.end("404");
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(500, { "content-type": "text/plain" });
    res.end("500");
  }
}).listen(port, () => console.log(`serving ${root} on http://127.0.0.1:${port}`));

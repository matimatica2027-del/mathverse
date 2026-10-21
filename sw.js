self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.mode !== "navigate") return;
  if (new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response(
        `<!doctype html>
        <html lang="kk">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>MATHVERSE</title>
        <body style="font-family:Arial;text-align:center;padding:48px 20px;
          background:#fafaff;color:#14133e">
          <h1>MATHVERSE</h1>
          <p>Интернетке қосылып, бетті қайта ашыңыз.</p>
          <button onclick="location.reload()"
            style="padding:14px 22px;background:#7135ef;color:white;
            border:0;border-radius:14px;font:inherit">
            Қайта жүктеу
          </button>
        </body>
        </html>`,
        {
          status: 503,
          headers: { "Content-Type": "text/html; charset=utf-8" }
        }
      );
    })
  );
});

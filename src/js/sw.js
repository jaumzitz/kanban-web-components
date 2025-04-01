const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("./src/js/sw.js");


            if (registration.installing) {
                console.log("Instalando service worker...")
            } else if (registration.waiting) {
                console.log("Service worker instalado.")
            } else if (registration.active) {
                console.log("Service worker ativo.");
            }

        } catch (error) {
            console.error(`Registro do Service Worker falhou: ${error}`)
        }
    }
}

registerServiceWorker();



const addToCache = async (recursos) => {
    const cache = await caches.open("v1")
    await cache.addAll(recursos)
}


self.addEventListener("install", (evento) => {
    evento.waitUntil(
        addToCache([
            "/",
            "/index.html",
            "/manifest.json",
            "/src/reset.css",
            "/src/style.css",
            "/src/assets/favicon.png",
            "/src/js/eventListeners.js",
            "/src/js/index.js",
            "/src/js/sw.js",
            "/src/js/taskHandler.js",
            "/src/js/components/BoardHeader.js",
            "/src/js/components/TaskItem.js",
            "/src/js/components/TaskList.js"
        ])
    )
})

self.addEventListener("fetch", (e) => {
    e.respondWith(
      (async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) {
          return r;
        }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
      })(),
    );
  });
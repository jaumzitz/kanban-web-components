const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("./sw.js");


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

const cacheName = "v1"
const cacheFiles = [
    "/",
    "/index.html",
    "/manifest.json",
    "/src/reset.css",
    "/src/style.css",
    "/src/assets/favicon.png",
    "/sw.js",
    "/storage.js",
    "/src/js/index.js",
    "/src/js/components/BoardHeader.js",
    "/src/js/components/TaskItem.js",
    "/src/js/components/TaskList.js"
]


self.addEventListener("install", (evento) => {
    evento.waitUntil(
        addToCache(cacheFiles)

    )
    //console.log(`[Service Worker] Armazenando recursos em cache: ${cacheName}`)
})


//SW intercepta as requisições de rede
self.addEventListener("fetch", (e) => {

    e.respondWith(
        (async () => {


            const resource = await caches.match(e.request);

            //Se o recurso estiver no cache, retorna ele
            if (resource) {
                //console.log(`[Service Worker] Recurso disponível no cache: ${e.request.url}`);
                return resource;
            }

            /*Se não, realiza a requisiçaõ de rede e add no cache*/
            const response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            cache.put(e.request, response.clone());
            return response;
        })(),
    );
});
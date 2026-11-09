const V='taskist-20261109-140813',FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 // Always ask the server first (bypassing the browser's 10-minute cache) so updates show up straight away; fall back to the offline copy.
 const net=r.mode==='navigate'?fetch(r.url,{cache:'no-store',credentials:'same-origin'}):fetch(r,{cache:'no-cache'});
 e.respondWith(net.then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r.mode==='navigate'?'index.html':r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))});

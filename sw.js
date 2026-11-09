const V='taskist-20261109-193343',FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 // Always ask the server first (bypassing the browser's 10-minute cache) so updates show up straight away; fall back to the offline copy.
 const net=r.mode==='navigate'?fetch(r.url,{cache:'no-store',credentials:'same-origin'}):fetch(r,{cache:'no-cache'});
 e.respondWith(net.then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r.mode==='navigate'?'index.html':r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))});
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){d={body:e.data&&e.data.text()}}
 e.waitUntil(self.registration.showNotification(d.title||'Taskist',{body:d.body||'',tag:d.tag||'taskist',icon:'icon-192.png',badge:'icon-192.png',data:{id:d.id||''}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if('focus' in c)return c.focus()}return self.clients.openWindow('./')}))});

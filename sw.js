const C='md-kundalik-v5';
const LOCAL=['./','./index.html','./manifest.webmanifest','./firebase-config.js','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
const EXT=['firebase-app-compat.js','firebase-auth-compat.js','firebase-firestore-compat.js'].map(f=>'https://www.gstatic.com/firebasejs/10.14.1/'+f);
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{await Promise.allSettled(LOCAL.map(u=>c.add(new Request(u,{cache:'reload'}))));await Promise.allSettled(EXT.map(u=>c.add(u)))}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin&&u.hostname!=='www.gstatic.com')return;
 e.respondWith(caches.open(C).then(async c=>{const m=await c.match(r,{ignoreSearch:true});
  const f=fetch(r).then(n=>{if(n&&(n.ok||n.type==='opaque'))c.put(r,n.clone());return n}).catch(()=>m||c.match('./'));
  return m||f}))});

/* Neomundi service worker. Troque VERSION a cada atualização para forçar o aviso de nova versão. */
const VERSION='neomundi-v12';
const SHELL=['./','./index.html','./manifest.webmanifest','./editor-mapa.html','./editor-itens.html','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==VERSION)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 const u=new URL(r.url);
 /* Firebase/Google (login e banco) nunca passam pelo cache */
 if(/googleapis\.com|firebaseio\.com|firebaseapp\.com|google\.com|peerjs\.com/.test(u.host)&&!/gstatic\.com/.test(u.host))return;
 const sameOrigin=u.origin===location.origin;
 if(r.mode==='navigate'||(sameOrigin&&/\.(html|webmanifest)$/.test(u.pathname))){
  /* página: rede primeiro (atualização chega na hora), cache se estiver offline */
  e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(VERSION).then(x=>x.put(r,c));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
  return}
 /* bibliotecas (three.js, peerjs, firebase sdk) e imagens: cache primeiro, atualiza ao fundo */
 e.respondWith(caches.match(r).then(m=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const c=res.clone();caches.open(VERSION).then(x=>x.put(r,c))}return res}).catch(()=>m);return m||net}));
});

// Hasan & Şevval — bildirim servis çalışanı (oyun kapalıyken gelen bildirimler)
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
const IOS=/iPhone|iPad|iPod/.test(self.navigator&&navigator.userAgent||'');
self.addEventListener('push',e=>{ let d={}; try{ d=e.data?e.data.json():{}; }catch(_){ d={body:e.data&&e.data.text()}; }
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    if(!IOS && cs.some(c=>c.visibilityState==='visible')) return;   // oyun açıksa oyun içi bildirim yeter (iPhone her push'ta bildirim ister)
    return self.registration.showNotification(d.title||'Hasan & Şevval 💕',{body:d.body||'',tag:d.tag||'hs',renotify:true,icon:'icon-192.png',badge:'icon-192.png',vibrate:d.call?[400,200,400,200,400]:[200,100,200],requireInteraction:!!d.call,data:{url:d.url||'./'}}); })); });
self.addEventListener('notificationclick',e=>{ e.notification.close(); const url=new URL((e.notification.data&&e.notification.data.url)||'./',self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{ for(const c of cs){ if('focus' in c) return c.focus(); } return self.clients.openWindow(url); })); });

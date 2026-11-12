// Sync Lingua Latina progress across devices, using the account you're signed in to in Taskist.
// Same site as Taskist, so the Taskist sign-in (localStorage 'taskist.sb') is shared.
window.LSYNC=(function(){
 const KEY='taskist.sb',URL0='https://dmajmexhjbdiajzutjkg.supabase.co',PUB='sb_publishable_v78lR6DRaC09bRxfJ2xBdQ_SlW1nwt1',DOC='latin';
 const ld=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return {}}};
 const hdr=t=>{const h={apikey:PUB,'Content-Type':'application/json'};if(t)h.Authorization='Bearer '+t;return h};
 const jt=r=>r.text().then(t=>{let j=null;try{j=t?JSON.parse(t):null}catch(e){}if(!r.ok)throw new Error((j&&(j.msg||j.error_description||j.message||j.error))||('HTTP '+r.status));return j});
 let refreshing=null,state='idle',lastAt=+(localStorage.getItem('latin.synced')||0),err='',tmr=0,busy=null,again=false;
 function token(){const c=ld();if(c.access&&Date.now()<c.exp)return Promise.resolve(c.access);if(!c.refresh)return Promise.reject(new Error('Signed out'));
  if(refreshing)return refreshing;
  refreshing=fetch(URL0+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:hdr(),body:JSON.stringify({refresh_token:c.refresh})}).then(jt).then(j=>{
    const n=ld();if(n.refresh!==c.refresh&&n.access&&Date.now()<n.exp)return n.access; // Taskist refreshed meanwhile
    n.access=j.access_token;n.refresh=j.refresh_token;n.exp=Date.now()+Math.max(60,(j.expires_in||3600))*1000-60000;if(j.user){n.uid=j.user.id;n.email=j.user.email||n.email}
    try{localStorage.setItem(KEY,JSON.stringify(n))}catch(e){}return n.access}).finally(()=>{refreshing=null});
  return refreshing}
 function rest(m,qs,body,ex){return token().then(t=>fetch(URL0+'/rest/v1/lifeloop_docs'+qs,{method:m,headers:Object.assign(hdr(t),ex||{}),body:body?JSON.stringify(body):undefined,cache:'no-store'}).then(jt))}
 // the json column is text: store a JSON string, read it back with JSON.parse
 const clean=o=>{if(!o||typeof o!=='object')return null;for(const k of Object.keys(o))if(/^\d+$/.test(k))delete o[k];return o};
 const get=()=>rest('GET','?select=json,updated_at&name=eq.'+DOC+'&limit=1').then(r=>{if(!r||!r[0])return null;let j=r[0].json;if(typeof j==='string'){try{j=JSON.parse(j)}catch(e){j=null}}return clean(j)});
 const put=j=>rest('POST','?on_conflict=user_id,name',{user_id:ld().uid,name:DOC,json:JSON.stringify(j),updated_at:Date.now()},{Prefer:'resolution=merge-duplicates,return=minimal'});

 // ---- merge two progress states: nothing done on either device is lost ----
 const num=v=>typeof v==='number'?v:(v?1:0);
 function latest(a,ax,b,bx){ // live map + tombstone map, keep whichever happened last per key
  const live={},dead={},keys=new Set([...Object.keys(a||{}),...Object.keys(b||{}),...Object.keys(ax||{}),...Object.keys(bx||{})]);
  keys.forEach(k=>{const on=Math.max(num((a||{})[k]),num((b||{})[k])),off=Math.max(num((ax||{})[k]),num((bx||{})[k]));
   if(on&&on>=off)live[k]=Math.max((a||{})[k]===undefined?0:num(a[k]),(b||{})[k]===undefined?0:num(b[k]));else if(off)dead[k]=off});
  return [live,dead]}
 function merge(a,b){if(!b)return a;if(!a)return b;
  const ea=a.epoch||0,eb=b.epoch||0;if(ea!==eb)return ea>eb?a:b; // a reset wins over older data
  const o=Object.assign({},b,a);
  [o.done,o.doneX]=latest(a.done,a.doneX,b.done,b.doneX);
  [o.miss,o.missX]=latest(a.miss,a.missX,b.miss,b.missX);
  o.srs={};new Set([...Object.keys(a.srs||{}),...Object.keys(b.srs||{})]).forEach(k=>{const x=(a.srs||{})[k],y=(b.srs||{})[k];
   o.srs[k]=!x?y:!y?x:((x.t||0)!==(y.t||0)?((x.t||0)>(y.t||0)?x:y):((x.due||0)*10+(x.b||0)>=(y.due||0)*10+(y.b||0)?x:y))});
  o.wDone=Object.assign({},b.wDone||{},a.wDone||{});
  o.tried={};new Set([...Object.keys(a.tried||{}),...Object.keys(b.tried||{})]).forEach(k=>o.tried[k]=Math.max((a.tried||{})[k]||0,(b.tried||{})[k]||0));
  const sa=a.stats||{r:0,t:0},sb=b.stats||{r:0,t:0};o.stats=(sa.t||0)>=(sb.t||0)?sa:sb;
  const pick=(x,y)=>{x=x||{d:0,n:0};y=y||{d:0,n:0};return x.d!==y.d?(x.d>y.d?x:y):(x.n>=y.n?x:y)};
  o.streak=pick(a.streak,b.streak);o.newDay=pick(a.newDay,b.newDay);
  return o}

 function status(){const c=ld();return {signed:!!(c.refresh&&c.uid),email:c.email||'',state,lastAt,err}}
 function paint(){document.querySelectorAll('[data-lsync]').forEach(el=>el.innerHTML=label());}
 function label(){const s=status();if(!s.signed)return 'Not syncing. Sign in to Taskist (Settings → Sync & backup) and your Latin progress will sync too.';
  if(s.state==='busy')return 'Syncing…';if(s.state==='error')return 'Couldn\'t sync: '+s.err+'. It will try again.';
  return 'Synced with your Taskist account'+(s.lastAt?' · '+new Date(s.lastAt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}):'')}
 function run(){if(!status().signed)return Promise.resolve(false);if(busy){again=true;return busy}
  state='busy';paint();
  busy=get().then(remote=>{clean(S);const before=JSON.stringify(S),m=merge(S,remote);
    if(JSON.stringify(m)!==before){S=Object.assign(S,m);for(const k of Object.keys(S))if(!(k in m))delete S[k];try{localStorage.setItem('latin2y_v1',JSON.stringify(S))}catch(e){}refresh()}
    if(JSON.stringify(remote)!==JSON.stringify(m))return put(m)})
   .then(()=>{state='ok';err='';lastAt=Date.now();try{localStorage.setItem('latin.synced',lastAt)}catch(e){}})
   .catch(e=>{state=/Signed out/.test(e.message)?'idle':'error';err=e.message})
   .finally(()=>{busy=null;paint();if(again){again=false;soon(800)}});
  return busy}
 function refresh(){try{$('#streak').textContent=(S.streak.d>=today()-1?S.streak.n:0)+' day streak'}catch(e){}
  const h=(location.hash||'#home').slice(1),busyNow=document.activeElement&&/INPUT|TEXTAREA/.test(document.activeElement.tagName);
  if(!busyNow&&(/^(home|learn)/.test(h)||(/^lesson-/.test(h)&&!document.querySelector('.opt:disabled'))))try{route()}catch(e){}}
 function soon(ms){clearTimeout(tmr);tmr=setTimeout(run,ms||2000)}
 // push shortly after every save
 const sv=window.save;window.save=function(){sv.apply(this,arguments);if(status().signed)soon(2500)};
 // pull when the app opens or comes back to the front
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')soon(300);else if(tmr){clearTimeout(tmr);run()}});
 addEventListener('online',()=>soon(300));
 addEventListener('storage',e=>{if(e.key===KEY)paint()});
 // tidy any junk an earlier sync bug left in this device's copy
 try{if(Object.keys(S).some(k=>/^\d+$/.test(k))){clean(S);localStorage.setItem('latin2y_v1',JSON.stringify(S))}}catch(e){}
 setTimeout(run,600);
 return {run,status,label,paint,merge}
})();

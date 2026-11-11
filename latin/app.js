// ===== App =====
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const today=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);

// ---------- state ----------
const KEY='latin2y_v1';
let S={done:{},srs:{},streak:{d:0,n:0},stats:{r:0,t:0},newDay:{d:0,n:0},wDone:{},miss:{},tried:{}};
try{const x=JSON.parse(localStorage.getItem(KEY));if(x)S=Object.assign(S,x);}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function bump(ok){const t=today();if(S.streak.d!==t){S.streak.n=(S.streak.d===t-1)?S.streak.n+1:1;S.streak.d=t;}if(ok!==undefined){S.stats.t++;if(ok)S.stats.r++;}save();hdr();}
function hdr(){$('#streak').textContent=(S.streak.d>=today()-1?S.streak.n:0)+' day streak';}

// ---------- table renderers ----------
function nounTable(n){const d=declineNoun(n);return `<table class="t forms"><caption>${esc(n.lem)} — ${esc(n.mean)}</caption><tr><th></th><th>Singular</th><th>Plural</th></tr>${CASES.map((c,i)=>`<tr><td class=cs>${c}</td><td>${d.sg[i]}</td><td>${d.pl[i]}</td></tr>`).join('')}</table>`;}
function adjTable(a){const d=declineAdj(a);const row=(c,i,k)=>`<td>${d.m[k][i]}</td><td>${d.f[k][i]}</td><td>${d.n[k][i]}</td>`;
  return `<div class=scroll><table class="t forms"><caption>${esc(a.lem)} — ${esc(a.mean)}</caption><tr><th></th><th colspan=3>Singular (m f n)</th><th colspan=3>Plural (m f n)</th></tr>${CASES.map((c,i)=>`<tr><td class=cs>${c}</td>${row(c,i,'sg')}${row(c,i,'pl')}</tr>`).join('')}</table></div>`;}
function verbTable(v,mood,voice,tenses){const cols=tenses.map(t=>conj(v,mood,t,voice));const vn=v.dep?'':(voice=='A'?' active':' passive');
  return `<div class=scroll><table class="t forms"><caption>${esc(v.parts.join(', '))} — ${mood=='ind'?'indicative':'subjunctive'}${vn}</caption><tr><th></th>${tenses.map(t=>`<th>${TNAME[t]}</th>`).join('')}</tr>${PERS.map((p,i)=>`<tr><td class=cs>${p}</td>${cols.map(c=>`<td>${c?c[i]:'—'}</td>`).join('')}</tr>`).join('')}</table></div>`;}
function pronTable(name){const p=PRON[name];if(!p)return '';return `<div class=scroll><table class="t forms"><caption>${name}</caption><tr><th></th>${p.cols.map(c=>`<th>${c}</th>`).join('')}</tr>${Object.entries(p.rows).map(([c,r])=>`<tr><td class=cs>${c}</td>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</table></div>`;}
function irrTable(k){const v=IRR[k];if(!v)return '';const tn=Object.keys(v.ind),sn=Object.keys(v.sub);const sp=s=>s.split(' ');
  const multi=tn.map(t=>v.ind[t].includes(';')?null:sp(v.ind[t]));
  return `<div class=scroll><table class="t forms"><caption>${v.pp} — ${v.mean}</caption><tr><th></th>${tn.map(t=>`<th>${TNAME[t]}</th>`).join('')}${sn.map(t=>`<th>${TNAME[t]} subj.</th>`).join('')}</tr>${PERS.map((p,i)=>`<tr><td class=cs>${p}</td>${tn.map((t,j)=>`<td>${multi[j]?fixIrr(v.ind[t],i):(i==0?v.ind[t]:'')}</td>`).join('')}${sn.map(t=>`<td>${fixIrr(v.sub[t],i)}</td>`).join('')}</tr>`).join('')}</table></div><p class=note>${v.other}</p>`;}
function fixIrr(s,i){const a=s.replace(/nōn /g,'nōn_').split(' ');return (a[i]||'').replace('_',' ');}
function nfList(v){return `<table class="t forms"><caption>${esc(v.parts.join(', '))} — non-finite forms</caption>${Object.entries(nonFinite(v)).map(([k,x])=>`<tr><td class=cs>${k}</td><td>${x}</td></tr>`).join('')}</table>`;}
const findN=x=>NOUNS.find(n=>n.nom==x),findA=x=>ADJS.find(a=>a.parts[0]==x),findV=x=>VERBS.find(v=>v.parts[0]==x);
function renderBody(b){
  return b.replace(/\[\[(\w+):([^\]]+)\]\]/g,(m,k,a)=>{try{
    if(k=='N')return nounTable(findN(a));if(k=='A')return adjTable(findA(a));if(k=='P')return pronTable(a);if(k=='I')return irrTable(a);if(k=='NF')return nfList(findV(a));
    if(k=='V'){const [vb,mood,voice,ts]=a.split('|');return verbTable(findV(vb),mood,voice,ts.split(','));}}catch(e){return '';}return '';})
  .replace(/\{([^{}=]+)=([^{}]+)\}/g,(m,la,en)=>`<div class=ex><span class=la>${la.trim()}</span><span class=en>${en.trim()}</span></div>`);
}

// ---------- router ----------
const VIEWS={home,learn,drill,words,read,write,ref,review};
let firstRoute=true,routeT=0;
function route(){const h=(location.hash||'#home').slice(1);
  document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',h.startsWith(a.dataset.v)));
  const run=()=>{let m;const main=$('#main');main.scrollTop=0;window.scrollTo(0,0);
    if((m=h.match(/^lesson-(\d+)$/)))lesson(+m[1]);else if((m=h.match(/^learn-(\d+)$/)))learn(+m[1]);else if((m=h.match(/^read-(\d+)$/)))readText(+m[1]);else (VIEWS[h]||home)();
    if(window.afterRoute)afterRoute(h);};
  const main=$('#main');
  if(firstRoute||matchMedia('(prefers-reduced-motion: reduce)').matches){firstRoute=false;run();return;}
  clearTimeout(routeT);main.classList.remove('mfi');main.classList.add('mfo');
  routeT=setTimeout(()=>{run();main.classList.remove('mfo');void main.offsetWidth;main.classList.add('mfi');},90);}
window.addEventListener('hashchange',route);
function go(h){if(location.hash=='#'+h)route();else location.hash=h;}
function setMain(html){$('#main').innerHTML=html;if(window.afterRender)afterRender();}

// ---------- home ----------
function curLesson(){for(let i=0;i<LESSONS.length;i++)if(!S.done[i+1])return i+1;return LESSONS.length;}
function learnedCount(){return Object.values(S.srs).filter(c=>c.b>=2).length;}
function dueCount(){const t=today();return Object.values(S.srs).filter(c=>c.due<=t).length;}
function ring(p,size,label){const r=size/2-5,c=2*Math.PI*r;return `<svg class=ring width=${size} height=${size} viewBox="0 0 ${size} ${size}"><circle cx=${size/2} cy=${size/2} r=${r} class=rt /><circle cx=${size/2} cy=${size/2} r=${r} class=rf style="stroke-dasharray:${c};stroke-dashoffset:${c};--off:${c*(1-p)}" transform="rotate(-90 ${size/2} ${size/2})"/>${label?`<text x=50% y=50% dominant-baseline=central text-anchor=middle>${label}</text>`:''}</svg>`;}
function missCount(){return Object.keys(S.miss||{}).length;}
function tryCount(n){return ((window.TRY||{})[n]||[]).length;}
const LAUREL=(()=>{const cx=60,cy=8,r=50;let g='';[-1,1].forEach(side=>{let d='';for(let k=0;k<=24;k++){const a=(90+side*(8+k*4.2))*Math.PI/180,x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);d+=(k?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)}g+=`<path d="${d}"/>`;
  for(let k=1;k<=6;k++){const deg=90+side*(8+k*15),a=deg*Math.PI/180,x=cx+r*Math.cos(a),y=cy+r*Math.sin(a),tan=deg+90*side;[-1,1].forEach(o=>{const lx=x+o*6*Math.cos(a),ly=y+o*6*Math.sin(a);g+=`<ellipse cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" rx="6.5" ry="2.6" transform="rotate(${(tan+o*side*-28).toFixed(0)} ${lx.toFixed(1)} ${ly.toFixed(1)})"/>`})}});
  return `<svg class=laurel viewBox="0 0 120 64" aria-hidden=true><g fill=none stroke=currentColor stroke-width=1.5 stroke-linecap=round>${g}</g></svg>`})();
function home(){
  const cl=curLesson(),done=Object.keys(S.done).length,phase=PLAN.findIndex(p=>cl>=p.l[0]&&cl<=p.l[1]);
  const acc=S.stats.t?Math.round(100*S.stats.r/S.stats.t):0,L=LESSONS[cl-1],mc=missCount(),allDone=done>=LESSONS.length;
  const hr=new Date().getHours(),greet=hr<12?'Salvē! Good morning':hr<18?'Salvē! Good afternoon':'Salvē! Good evening';
  setMain(`<section class=hero2>${LAUREL}<div class=hg>${greet}</div><h1>Lingua Latina</h1><p>Read and write Classical Latin, one small step a day.</p></section>
  <a class="card cont" href="#lesson-${cl}">${ring(done/LESSONS.length,64,`${done}<tspan class=rs>/50</tspan>`)}<div class=ctx><span class=xk>${allDone?'Course complete · revisit':done?'Continue':'Start here'} · Unit ${L.u+1}</span><b>${cl}. ${esc(L.t)}</b><small>${UNITS[L.u]}${tryCount(cl)?` · ${tryCount(cl)} Try-its`:''}</small></div><span class=go aria-hidden=true><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>
  ${mc?`<a class="card rev" href="#review"><span class=rvn>${mc}</span><div><b>Review weak spots</b><small>Questions you missed. Get them right to clear them.</small></div></a>`:''}
  <div class=card><h3>Today</h3>
   <a class=todo href="#words"><b>Words</b><span>${dueCount()} due · ${Math.max(0,10-(S.newDay.d==today()?S.newDay.n:0))} new available</span></a>
   <a class=todo href="#drill"><b>Drill</b><span>Practise forms until they're automatic</span></a>
   <a class=todo href="#read"><b>Read</b><span>Tap any word for help</span></a>
   <a class=todo href="#write"><b>Write</b><span>English → Latin sentences</span></a></div>
  <div class=stats><div><b>${done}<small>/50</small></b><span>lessons</span></div><div><b>${learnedCount()}</b><span>words known</span></div><div><b>${acc}%</b><span>accuracy</span></div></div>
  <div class=card><h3>Units</h3><div class=ugrid>${UNITS.map((u,ui)=>{const ls=LESSONS.map((l,i)=>[l,i+1]).filter(x=>x[0].u==ui),d=ls.filter(x=>S.done[x[1]]).length;return `<a class="ucell ${d==ls.length?'full':ls.some(x=>x[1]==cl)?'now':''}" href="#learn-${ui}"><span class=un>${ui+1}</span><span class=ubar><i style="width:${100*d/ls.length}%"></i></span><small>${esc(u)}</small></a>`}).join('')}</div></div>
  <div class=card><h3>Daily routine (≈ 50 min)</h3>${DAILY.map(d=>`<div class=row><b>${d[0]}</b><span>${d[1]}</span></div>`).join('')}</div>
  <div class=card><h3>The 2-year plan</h3>${PLAN.map((p,i)=>`<details ${i==phase?'open':''} class="phase ${i==phase?'now':''}"><summary><b>${p.m}</b> <span>Lessons ${p.l[0]}${p.l[1]!=p.l[0]?'–'+p.l[1]:''} · ${p.words} words</span></summary><p><b>Goal:</b> ${p.goal}</p><p><b>Read:</b> ${p.read}</p></details>`).join('')}
  <p class=note>Companion book (optional but recommended): <i>Lingua Latina per se Illustrata</i>, Part I <i>Familia Romana</i> and Part II <i>Roma Aeterna</i>, by Hans Ørberg.</p></div>
  <div class=card><h3>Your data</h3><p class=note>Progress is saved in this browser only.</p><button class="btn ghost" id=reset>Reset all progress</button></div>`);
  $('#reset').onclick=e=>{if(e.target.dataset.c){S={done:{},srs:{},streak:{d:0,n:0},stats:{r:0,t:0},newDay:{d:0,n:0},wDone:{},miss:{},tried:{}};save();hdr();home();}else{e.target.dataset.c=1;e.target.textContent='Tap again to confirm';}};
  ringIn();
}
function ringIn(){requestAnimationFrame(()=>requestAnimationFrame(()=>document.querySelectorAll('.ring .rf').forEach(c=>c.style.strokeDashoffset=c.style.getPropertyValue('--off'))));}

// ---------- learn ----------
function learn(focus){
  const cl=curLesson(),done=Object.keys(S.done).length;
  let h=`<h2>Course</h2><div class=lhd>${ring(done/LESSONS.length,52,Math.round(100*done/LESSONS.length)+'%')}<p class=sub>50 lessons, 7 units. Each one tells the story of one idea, with Try-its as you go, a quiz and a drill.</p></div>`;
  UNITS.forEach((u,ui)=>{const ls=LESSONS.map((l,i)=>[l,i+1]).filter(x=>x[0].u==ui),d=ls.filter(x=>S.done[x[1]]).length;
    h+=`<section class="umap ${d==ls.length?'full':''}" id=unit-${ui}><div class=uhd><span class=ub>Unit ${ui+1}</span><b>${esc(u)}</b><span class=uc>${d}/${ls.length}</span></div><ol class=path>`;
    ls.forEach(([l,n],k)=>{const st=S.done[n]?'done':n==cl?'cur':'fut',t=S.tried[n]||0,tc=tryCount(n);
      h+=`<li class="node ${st}${k<ls.length-1&&S.done[n]&&S.done[ls[k+1][1]]?' lk':''}"><a href="#lesson-${n}"><span class=dot>${st=='done'?'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>':n}</span><span class=nt>${esc(l.t)}<small>${st=='cur'?'Up next':st=='done'?'Completed':'Lesson '+n}${tc&&(t||st!=="fut")?` · Try-its ${Math.min(t,tc)}/${tc}`:''}</small></span></a></li>`;});
    h+='</ol></section>';});
  setMain(h);ringIn();
  const tgt=typeof focus==='number'?document.getElementById('unit-'+focus):document.querySelector('.node.cur');
  if(tgt&&(typeof focus==='number'||done))setTimeout(()=>{const y=tgt.getBoundingClientRect().top+scrollY-(typeof focus==='number'?70:200);scrollTo({top:Math.max(0,y),behavior:'smooth'})},260);
}

function markMiss(k,ok){S.miss=S.miss||{};if(ok)delete S.miss[k];else S.miss[k]=1;}
function tryCard(q,key){return `<div class="card try" data-k="${key}"><div class=tyk><svg viewBox="0 0 24 24"><path d="M12 20h8.5"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>Try it</div><p class=tq>${q[0].replace(/<i>/g,'<i class=la>')}</p><div class=opts>${shuffle(q[1].map((o,i)=>i)).map(i=>`<button class=opt data-i=${i}>${q[1][i].replace(/<i>/g,'<i class=la>')}</button>`).join('')}</div><div class=tfb></div></div>`;}
function wireTry(el,q,onDone){el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const ok=+b.dataset.i===q[2];
  el.querySelectorAll('.opt').forEach(x=>{x.disabled=true;if(+x.dataset.i===q[2])x.classList.add('right')});if(!ok)b.classList.add('wrong');
  el.classList.add(ok?'got':'miss');const fb=el.querySelector('.tfb');fb.innerHTML=`<p class="${ok?'ok':'no'}">${ok?rnd(['Rēctē! Right.','Optimē! Exactly.','Bene! Correct.']):'Not quite.'}</p><p class=why>${q[3].replace(/<i>/g,'<i class=la>')}</p>${ok?'':'<button class="btn ghost tra">Try again</button>'}`;
  const ta=fb.querySelector('.tra');if(ta)ta.onclick=()=>{const nw=document.createElement('div');nw.innerHTML=tryCard(q,el.dataset.k);const c=nw.firstChild;el.replaceWith(c);wireTry(c,q,onDone)};
  bump(ok);onDone(ok)});}
function placeTries(n,TR){const art=document.querySelector('.story');if(!art)return;
  const anchors=[...art.querySelectorAll(':scope > h4')].slice(1);const sum=art.querySelector(':scope > .sum');if(sum)anchors.push(sum);
  let got=0;TR.forEach((q,i)=>{const k='t:'+n+':'+i,wrap=document.createElement('div');wrap.innerHTML=tryCard(q,k);const el=wrap.firstChild;
   const ai=anchors.length?Math.min(anchors.length-1,Math.max(0,Math.ceil((i+1)*anchors.length/TR.length)-1)):-1;
   if(ai>=0)art.insertBefore(el,anchors[ai]);else art.appendChild(el);
   wireTry(el,q,ok=>{markMiss(k,ok);if(ok){got++;S.tried[n]=Math.max(S.tried[n]||0,got);save();const c=$('#trc');if(c){c.textContent=`Try-its ${Math.min(S.tried[n],TR.length)}/${TR.length}`;c.classList.add('pop');setTimeout(()=>c.classList.remove('pop'),400)}}else save();})});}
let rpOn=false;
function readProgress(){const upd=()=>{const b=$('#rprog');if(!b)return;const h=document.documentElement.scrollHeight-innerHeight;b.firstChild.style.transform=`scaleX(${h>0?Math.min(1,scrollY/h):0})`};
  if(!rpOn){rpOn=true;addEventListener('scroll',()=>requestAnimationFrame(upd),{passive:true})}upd();}
function review(){const keys=Object.keys(S.miss||{});
  const pool=keys.map(k=>{const [t,n,i]=k.split(':');const q=t==='t'?((window.TRY||{})[n]||[])[i]:(LESSONS[n-1]&&LESSONS[n-1].q[i]);if(!q)return null;
    return t==='t'?{k,n:+n,q}:{k,n:+n,q:[esc(q[0]),q[1].map(esc),q[2],esc(q[3]||'')]}}).filter(Boolean);
  if(!pool.length){setMain(`<h2>Review</h2><div class="card empty">${LAUREL}<p class=big>Nothing to review</p><p class=note>Questions you get wrong in lessons land here. Clear them by getting them right.</p><a class=btn href="#learn">Back to the course</a></div>`);return;}
  const qs=shuffle(pool).slice(0,10);let i=0,right=0;
  setMain(`<h2>Review</h2><p class=sub>${pool.length} weak spot${pool.length>1?'s':''}. Get one right and it's cleared.</p><div class=bar><i id=rvb style="width:0"></i></div><div id=rvq></div>`);
  const show=()=>{const it=qs[i];$('#rvb').style.width=(100*i/qs.length)+'%';
    if(!it){$('#rvq').innerHTML=`<div class="card empty">${LAUREL}<p class=big>${right}/${qs.length} cleared</p><p class=note>${missCount()?missCount()+' still to go.':'All clear. Bene factum!'}</p>${missCount()?'<button class=btn id=rva>Keep going</button>':''}<a class="btn ghost" href="#home">Home</a></div>`;const a=$('#rva');if(a)a.onclick=review;return;}
    $('#rvq').innerHTML=`<div class=crumb style="margin-top:12px">From lesson ${it.n}: ${esc(LESSONS[it.n-1].t)}</div>`+tryCard(it.q,it.k);
    const el=$('#rvq .try');el.querySelector('.tyk').lastChild.textContent='Review';
    wireTry(el,it.q,ok=>{markMiss(it.k,ok);if(ok)right++;save();const nb=document.createElement('button');nb.className='btn';nb.textContent=i<qs.length-1?'Next':'Finish';nb.onclick=()=>{i++;show();scrollTo(0,0)};el.querySelector('.tfb').appendChild(nb)})};
  show();}
function lesson(n){
  const L=LESSONS[n-1];if(!L)return learn();
  const X=(window.EXPL||{})[n];
  const xTop=X&&X.p?`<div class="card xp"><div class=xk>In plain English</div><p>${X.p}</p></div>`:'';
  const xEnd=X?`<div class="card xs"><h3>Make it stick</h3>${X.s?`<div class=xk>Step by step</div><ol class=xol>${X.s.map(x=>`<li>${x}</li>`).join('')}</ol>`:''}${X.e&&X.e.length?`<div class=xk>Worked example${X.e.length>1?'s':''}</div>${X.e.map(e=>`<div class=ex><span class=la>${e[0]}</span><span class=en>${e[1]}</span>${e[2]?`<span class=why>Why: ${e[2]}</span>`:''}</div>`).join('')}`:''}${X.m?`<div class=xk>Watch out for</div><ul class=xul>${X.m.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}${X.h?`<div class=xk>Remember it</div><p class=xh>${X.h}</p>`:''}</div>`:'';
  const NR=(window.NARR||{})[n],nx=LESSONS[n];
  const story=NR?`<article class="lesson story">${renderBody(NR)}</article>`:`${xTop}<article class=lesson>${renderBody(L.b)}</article>${xEnd}`;
  const details=NR?`<details class="card dtl"><summary><h3>Tables & details</h3></summary><p class=note>Everything from this lesson in compact form, for looking things up later.</p><article class=lesson>${renderBody(L.b)}</article>${xEnd.replace('<div class="card xs">','<div class="xs">')}</details>`:'';
  const TR=(window.TRY||{})[n]||[],mins=NR?Math.max(3,Math.round(NR.replace(/<[^>]+>|\[\[[^\]]+\]\]/g,' ').split(/\s+/).length/170)):0;
  setMain(`<div class=rprog id=rprog><i></i></div><div class=crumb><a href="#learn-${L.u}">Unit ${L.u+1}</a> · Lesson ${n} of ${LESSONS.length}</div><h2>${esc(L.t)}</h2>
  <div class=lmeta>${mins?`<span>≈ ${mins} min</span>`:''}${TR.length?`<span id=trc>Try-its ${Math.min(S.tried[n]||0,TR.length)}/${TR.length}</span>`:''}${S.done[n]?'<span class=dn>Completed ✓</span>':''}</div>${story}
  ${L.dr?`<button class="btn" id=prac>Practise these forms →</button>`:''}
  <div class=card><h3>Check yourself</h3><div id=quiz></div></div>
  ${details}
  <div class=pn>${n>1?`<a class="btn ghost" href="#lesson-${n-1}">← Back</a>`:'<span></span>'}<button class="btn ${S.done[n]?'ghost':''}" id=mark>${S.done[n]?'Completed ✓':'Mark complete'}</button></div>
  ${nx?`<a class="card nxt" href="#lesson-${n+1}"><span class=xk>Next lesson</span><b>${n+1}. ${esc(nx.t)}</b><span class=nar>→</span></a>`:''}`);
  if(L.dr)$('#prac').onclick=()=>{DR.preset=L.dr;go('drill');};
  $('#mark').onclick=()=>{S.done[n]=S.done[n]?0:1;if(!S.done[n])delete S.done[n];save();bump();lesson(n);};
  if(NR&&TR.length)placeTries(n,TR);
  readProgress();
  let qi=0,score=0;const qs=L.q;
  function showQ(){const q=qs[qi];if(!q){$('#quiz').innerHTML=`<p class=big>${score}/${qs.length} correct</p>${score>=qs.length-1?'<p>Lesson complete ✓</p>':'<p>Review the lesson and try again.</p>'}<button class="btn ghost" id=again>Retry quiz</button>`;
      if(score>=qs.length-1&&!S.done[n]){S.done[n]=1;save();$('#mark').textContent='Completed ✓';$('#mark').classList.add('ghost');}
      $('#again').onclick=()=>{qi=0;score=0;showQ();};return;}
    const order=shuffle(q[1].map((o,i)=>i));
    $('#quiz').innerHTML=`<p class=qn>${qi+1}/${qs.length}</p><p class=q>${esc(q[0])}</p><div class=opts>${order.map(i=>`<button class=opt data-i=${i}>${esc(q[1][i])}</button>`).join('')}</div><div id=fb></div>`;
    document.querySelectorAll('#quiz .opt').forEach(b=>b.onclick=()=>{const ok=+b.dataset.i===q[2];if(ok)score++;markMiss('q:'+n+':'+qi,ok);bump(ok);
      document.querySelectorAll('#quiz .opt').forEach(x=>{x.disabled=true;if(+x.dataset.i===q[2])x.classList.add('right');});if(!ok)b.classList.add('wrong');
      $('#fb').innerHTML=`<p class="${ok?'ok':'no'}">${ok?'Correct.':'Not quite.'} ${esc(q[3]||'')}</p><button class=btn id=nq>Next</button>`;$('#nq').onclick=()=>{qi++;showQ();};});}
  showQ();
}

// ---------- drill ----------
const DR={mode:'noun',preset:null,decl:[1,2,3,4,5],conjs:[1,2,3,'3io',4],tenses:['ind.pres.A'],dep:false,score:0,n:0};
const TKEYS=[];['A','P'].forEach(vc=>{TENSES.ind.forEach(t=>TKEYS.push('ind.'+t+'.'+vc));TENSES.sub.forEach(t=>TKEYS.push('sub.'+t+'.'+vc));});
const tLabel=k=>{const [m,t,v]=k.split('.');return TNAME[t]+' '+(v=='A'?'act.':'pass.')+(m=='sub'?' subj.':'');};
const NUMN=['sg','pl'];
function drill(){
  if(DR.preset){const p=DR.preset;DR.preset=null;DR.mode=p.k;if(p.d)DR.decl=p.d;if(p.t)DR.tenses=p.t;DR.conjs=p.c||[1,2,3,'3io',4];DR.dep=!!p.dep;}
  const modes=[['noun','Nouns'],['adj','Adjectives'],['verb','Verbs'],['parse','Identify forms'],['pron','Pronouns'],['roman','Roman numerals']];
  let opts='';
  if(DR.mode=='noun')opts=`<div class=chips>${[1,2,3,4,5].map(d=>`<label><input type=checkbox data-d=${d} ${DR.decl.includes(d)?'checked':''}> ${d}${['st','nd','rd','th','th'][d-1]} decl.</label>`).join('')}</div>`;
  if(DR.mode=='verb'||DR.mode=='parse')opts=`<details class=cfg ${DR.mode=='verb'?'open':''}><summary>Tenses & conjugations</summary><div class=chips>${[1,2,3,'3io',4].map(c=>`<label><input type=checkbox data-c=${c} ${DR.conjs.map(String).includes(String(c))?'checked':''}> ${c=='3io'?'3rd -iō':c+(c==1?'st':c==2?'nd':c==3?'rd':'th')}</label>`).join('')}<label><input type=checkbox id=dep ${DR.dep?'checked':''}> deponents only</label></div><div class=chips>${TKEYS.map(k=>`<label><input type=checkbox data-t="${k}" ${DR.tenses.includes(k)?'checked':''}> ${tLabel(k)}</label>`).join('')}</div></details>`;
  setMain(`<h2>Drill</h2><div class=seg>${modes.map(m=>`<button data-m=${m[0]} class="${DR.mode==m[0]?'on':''}">${m[1]}</button>`).join('')}</div>${opts}<div class=card id=dq></div><p class=note id=dsc></p>`);
  document.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{DR.mode=b.dataset.m;DR.score=DR.n=0;drill();});
  document.querySelectorAll('[data-d]').forEach(c=>c.onchange=()=>{DR.decl=[...document.querySelectorAll('[data-d]:checked')].map(x=>+x.dataset.d);if(!DR.decl.length)DR.decl=[1];next();});
  document.querySelectorAll('[data-c]').forEach(c=>c.onchange=()=>{DR.conjs=[...document.querySelectorAll('[data-c]:checked')].map(x=>x.dataset.c=='3io'?'3io':+x.dataset.c);if(!DR.conjs.length)DR.conjs=[1];next();});
  document.querySelectorAll('[data-t]').forEach(c=>c.onchange=()=>{DR.tenses=[...document.querySelectorAll('[data-t]:checked')].map(x=>x.dataset.t);if(!DR.tenses.length)DR.tenses=['ind.pres.A'];next();});
  if($('#dep'))$('#dep').onchange=e=>{DR.dep=e.target.checked;next();};
  next();
}
function genVerbQ(){
  for(let k=0;k<200;k++){const pool=VERBS.filter(v=>v.dep==DR.dep&&DR.conjs.map(String).includes(String(v.c)));if(!pool.length)return null;
    const v=rnd(pool);let tk=rnd(DR.tenses);let [m,t,vc]=tk.split('.');if(v.dep)vc='P';
    const f=conj(v,m,t,vc);if(!f)continue;const p=Math.floor(Math.random()*6);
    return {v,m,t,vc,p,ans:f[p],desc:`${PERS[p]} ${TNAME[t].toLowerCase()} ${v.dep?'(deponent)':vc=='A'?'active':'passive'} ${m=='ind'?'indicative':'subjunctive'}`};}
  return null;}
function next(){
  const box=$('#dq');if(!box)return;let q;
  if(DR.mode=='noun'){const n=rnd(NOUNS.filter(n=>DR.decl.includes(n.d)));const ci=Math.floor(Math.random()*5),ni=Math.floor(Math.random()*2);const f=declineNoun(n);
    q={prompt:`<span class=la>${esc(n.lem)}</span> <small>(${esc(n.mean)})</small>`,ask:`${CASEFULL[CASES[ci]]} ${ni?'plural':'singular'}`,ans:[f[NUMN[ni]][ci]],table:nounTable(n)};}
  else if(DR.mode=='adj'){const a=rnd(ADJS);const d=declineAdj(a);const g=rnd(['m','f','n']),ci=Math.floor(Math.random()*5),ni=Math.floor(Math.random()*2);
    q={prompt:`<span class=la>${esc(a.lem)}</span> <small>(${esc(a.mean)})</small>`,ask:`${{m:'Masculine',f:'Feminine',n:'Neuter'}[g]} ${CASEFULL[CASES[ci]].toLowerCase()} ${ni?'plural':'singular'}`,ans:[d[g][NUMN[ni]][ci]],table:adjTable(a)};}
  else if(DR.mode=='verb'){const g=genVerbQ();if(!g){box.innerHTML='<p>No forms match these settings – tick more boxes.</p>';return;}
    q={prompt:`<span class=la>${esc(g.v.parts.join(', '))}</span> <small>(${esc(g.v.mean)})</small>`,ask:g.desc,ans:[g.ans],table:verbTable(g.v,g.m,g.vc,TENSES[g.m])};}
  else if(DR.mode=='pron'){const names=Object.keys(PRON).filter(k=>!k.startsWith('suī'));const nm=rnd(names),p=PRON[nm];const rows=Object.keys(p.rows);const r=rnd(rows),ci=Math.floor(Math.random()*p.cols.length);const cell=p.rows[r][ci];
    if(cell=='—'||cell.startsWith('='))return next();
    q={prompt:`<span class=la>${nm}</span>`,ask:`${CASEFULL[r]} — ${p.cols[ci]}`,ans:cell.replace(/\(.*?\)/g,'').split('/').map(s=>s.trim()).filter(Boolean),table:pronTable(nm)};}
  else if(DR.mode=='roman'){const n=1+Math.floor(Math.random()*(Math.random()<.6?100:3999));const r=toRoman(n);
    q=Math.random()<.5?{prompt:`<span class=la>${r}</span>`,ask:'Write as a number',ans:[String(n)]}:{prompt:`<span class=la>${n}</span>`,ask:'Write in Roman numerals',ans:[r.toLowerCase()]};}
  else if(DR.mode=='parse')return parseQ(box);
  box.innerHTML=`<p class=prompt>${q.prompt}</p><p class=ask>${q.ask}</p><form id=df><input id=di autocomplete=off autocapitalize=off spellcheck=false placeholder="Type the form (macrons optional)"><button class=btn>Check</button></form><div id=dfb></div>`;
  $('#di').focus({preventScroll:true});
  $('#df').onsubmit=e=>{e.preventDefault();const u=plain($('#di').value);if(!u)return;const ok=q.ans.some(a=>plain(a)==u);DR.n++;if(ok)DR.score++;bump(ok);
    $('#dfb').innerHTML=`<p class="${ok?'ok':'no'}">${ok?'Correct':'Answer'}: <span class=la>${q.ans.join(' / ')}</span></p>${q.table?`<details><summary>Show full table</summary>${q.table}</details>`:''}<button class=btn id=dn>Next</button>`;
    $('#di').disabled=true;$('#dn').onclick=next;$('#dn').focus({preventScroll:true});$('#dsc').textContent=`Session: ${DR.score}/${DR.n}`;};
}
function parseQ(box){
  let form,opts,correct;
  if(Math.random()<.5){const n=rnd(NOUNS);const d=declineNoun(n);const all=[];[0,1].forEach(ni=>[0,1,2,3,4].forEach(ci=>all.push({f:d[NUMN[ni]][ci],l:`${CASEFULL[CASES[ci]]} ${ni?'plural':'singular'}`})));
    const pick=rnd(all);form=pick.f;const ok=all.filter(x=>x.f==form).map(x=>x.l);const bad=shuffle(all.filter(x=>x.f!=form)).slice(0,3).map(x=>x.l);
    correct=pick.l;opts=shuffle([correct,...bad]);form={f:form,lem:n.lem,mean:n.mean,okAll:ok};}
  else{const g=genVerbQ()||{};if(!g.v)return box.innerHTML='<p>Tick more tenses.</p>';const v=g.v;const all=[];
    DR.tenses.forEach(tk=>{let [m,t,vc]=tk.split('.');if(v.dep)vc='P';const f=conj(v,m,t,vc);if(f)f.forEach((x,p)=>all.push({f:x,l:`${PERS[p]} ${TNAME[t].toLowerCase()} ${v.dep?'':vc=='A'?'active ':'passive '}${m=='ind'?'indic.':'subj.'}`}));});
    ['pres','impf','perf'].forEach(t=>{const f=conj(v,'ind',t,v.dep?'P':'A');if(f)f.forEach((x,p)=>all.push({f:x,l:`${PERS[p]} ${TNAME[t].toLowerCase()} ${v.dep?'':'active '}indic.`}));});
    const pick={f:g.ans,l:`${PERS[g.p]} ${TNAME[g.t].toLowerCase()} ${v.dep?'':g.vc=='A'?'active ':'passive '}${g.m=='ind'?'indic.':'subj.'}`};
    const ok=[...new Set(all.filter(x=>x.f==pick.f).map(x=>x.l).concat(pick.l))];const bad=shuffle([...new Set(all.filter(x=>x.f!=pick.f).map(x=>x.l))].filter(l=>!ok.includes(l))).slice(0,3);
    correct=pick.l;opts=shuffle([correct,...bad]);form={f:pick.f,lem:v.parts.join(', '),mean:v.mean,okAll:ok};}
  box.innerHTML=`<p class=ask>What form is this?</p><p class=prompt><span class=la>${form.f}</span></p><p class=note>from ${esc(form.lem)} (${esc(form.mean)})</p><div class=opts>${opts.map(o=>`<button class=opt>${o}</button>`).join('')}</div><div id=dfb></div>`;
  box.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const ok=form.okAll.includes(b.textContent);DR.n++;if(ok)DR.score++;bump(ok);
    box.querySelectorAll('.opt').forEach(x=>{x.disabled=true;if(form.okAll.includes(x.textContent))x.classList.add('right');});if(!ok)b.classList.add('wrong');
    $('#dfb').innerHTML=`${form.okAll.length>1?`<p class=note>This form is ambiguous: ${form.okAll.join('; ')}. Context decides.</p>`:''}<button class=btn id=dn>Next</button>`;$('#dn').onclick=next;$('#dsc').textContent=`Session: ${DR.score}/${DR.n}`;});
}
function toRoman(n){const m=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let r='';for(const [v,s] of m)while(n>=v){r+=s;n-=v;}return r;}

// ---------- words (SRS) ----------
const INT=[0,1,3,7,14,30,60,120,240];
const NEWORDER=(()=>{const g={};VOCAB.forEach(w=>{const k=POS(w.code);(g[k]=g[k]||[]).push(w.id);});const ks=['noun','verb','adjective','preposition','adverb','conjunction','pronoun','numeral'];const out=[];let more=true,i=0;while(more){more=false;ks.forEach(k=>{if(g[k]&&g[k][i]!==undefined){out.push(g[k][i]);more=true;}});i++;}return out;})();
let WS={queue:[],dir:'la',tab:'study',q:''};
function wordInfo(w){let extra='';const n=nounOf(w),v=verbOf(w),a=adjOf(w);
  if(n)extra=nounTable(n);else if(a)extra=adjTable(a);else if(v)extra=verbTable(v,'ind',v.dep?'P':'A',['pres','impf','fut','perf'])+nfList(v);else if(IRR[w.lem.split(',')[0]])extra=irrTable(w.lem.split(',')[0]);
  return extra;}
function words(){
  const t=today();if(S.newDay.d!==t)S.newDay={d:t,n:0};
  setMain(`<h2>Words</h2><div class=seg><button data-t=study class="${WS.tab=='study'?'on':''}">Study</button><button data-t=list class="${WS.tab=='list'?'on':''}">All ${VOCAB.length} words</button></div><div id=wb></div>`);
  document.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{WS.tab=b.dataset.t;words();});
  if(WS.tab=='list')return wordList();
  const due=Object.entries(S.srs).filter(([id,c])=>c.due<=t).map(([id])=>+id);
  const nNew=Math.max(0,10-S.newDay.n);const fresh=NEWORDER.filter(id=>!S.srs[id]).slice(0,nNew);
  WS.queue=shuffle(due).concat(fresh);
  $('#wb').innerHTML=`<div class=card><p><b>${due.length}</b> reviews due · <b>${fresh.length}</b> new today · <b>${Object.keys(S.srs).length}</b> started</p><div class=chips><label><input type=radio name=dir value=la ${WS.dir=='la'?'checked':''}> Latin → English</label><label><input type=radio name=dir value=en ${WS.dir=='en'?'checked':''}> English → Latin</label></div>${WS.queue.length?'<button class=btn id=ws>Start</button>':'<p>All done for today. Come back tomorrow, or browse the list.</p>'}</div><div id=wc></div>`;
  document.querySelectorAll('[name=dir]').forEach(r=>r.onchange=()=>WS.dir=r.value);
  if($('#ws'))$('#ws').onclick=()=>{$('#ws').remove();card();};
}
function card(){
  const id=WS.queue[0];if(id===undefined){$('#wc').innerHTML='<div class=card><p class=big>Session complete ✓</p></div>';return;}
  const w=VOCAB[id],isNew=!S.srs[id];const front=WS.dir=='la'?`<span class=la>${esc(w.lem)}</span>`:esc(w.mean);
  $('#wc').innerHTML=`<div class="card flash"><p class=note>${isNew?'New word':'Review'} · ${POS(w.code)} · ${WS.queue.length} left</p><p class=front>${front}</p><button class=btn id=rv>Show answer</button><div id=back></div></div>`;
  $('#rv').onclick=()=>{$('#rv').remove();$('#back').innerHTML=`<p class=answer>${WS.dir=='la'?esc(w.mean):`<span class=la>${esc(w.lem)}</span>`}</p><div class=grade><button data-g=0 class="btn no">Again</button><button data-g=1 class="btn">Good</button><button data-g=2 class="btn ghost">Easy</button></div>${wordInfo(w)?`<details><summary>Forms</summary>${wordInfo(w)}</details>`:''}`;
    document.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>grade(id,+b.dataset.g));};
}
function grade(id,g){const t=today();let c=S.srs[id];if(!c){c={b:0,due:t};S.newDay.n++;}
  if(g==0){c.b=0;c.due=t;WS.queue.push(id);}else{c.b=Math.min(INT.length-1,c.b+g);c.due=t+INT[c.b];}
  S.srs[id]=c;WS.queue.shift();bump(g>0);card();}
function wordList(){
  $('#wb').innerHTML=`<input id=wq class=search placeholder="Search Latin or English…" value="${esc(WS.q)}"><div id=wl class=list></div>`;
  const draw=()=>{const q=plain(WS.q);const ls=VOCAB.filter(w=>!q||plain(w.lem).includes(q)||plain(w.mean).includes(q));
    $('#wl').innerHTML=ls.map(w=>`<details class=wli><summary><span class=la>${esc(w.lem)}</span><span>${esc(w.mean)}</span>${S.srs[w.id]&&S.srs[w.id].b>=2?'<i>✓</i>':''}</summary><div>${wordInfo(w)||'<p class=note>'+POS(w.code)+'</p>'}</div></details>`).join('')||'<p>No matches.</p>';};
  $('#wq').oninput=e=>{WS.q=e.target.value;draw();};draw();
}

// ---------- reader ----------
function read(){setMain(`<h2>Reader</h2><p class=sub>Graded and real Latin. Tap any word to see its meaning and grammar.</p><div class=list>${READER.map((r,i)=>`<a class=li href="#read-${i}"><span class=num>${i+1}</span><span><b class=la>${r.t}</b><br><small>${r.lvl}</small></span><span></span></a>`).join('')}</div>`);}
function readText(i){const r=READER[i];if(!r)return read();
  const toks=r.w.split('~').map(x=>x.split('|'));
  setMain(`<div class=crumb><a href="#read">Reader</a></div><h2 class=la>${r.t}</h2><p class=sub>${r.lvl} · ${r.src}</p><div class="card text la">${toks.map((t,j)=>t[0]=='/'?'<br>':`<span class=w data-j=${j}>${esc(t[0])}</span>`).join(' ')}</div><div id=gl class="card gloss"><p class=note>Tap a word.</p></div>
  <div class=card><h3>Try this</h3><ol><li>Read it aloud twice.</li><li>Translate it in your head, tapping only words you don't know.</li><li>Write out a full English translation.</li><li>Come back in a week and read it again without help.</li></ol></div>
  <div class=pn>${i>0?`<a class="btn ghost" href="#read-${i-1}">← Previous</a>`:'<span></span>'}${i<READER.length-1?`<a class="btn ghost" href="#read-${i+1}">Next →</a>`:''}</div>`);
  document.querySelectorAll('.w').forEach(s=>s.onclick=()=>{document.querySelectorAll('.w.on').forEach(x=>x.classList.remove('on'));s.classList.add('on');const t=toks[+s.dataset.j];$('#gl').innerHTML=`<p><b class=la>${esc(t[0].replace(/[.,;:?!]/g,''))}</b></p><p>${esc(t[1])}</p>`;bump();});
}

// ---------- write ----------
let WI=null;
function write(){
  const cl=curLesson();
  setMain(`<h2>Write Latin</h2><p class=sub>Translate into Latin. Word order is flexible; macrons optional. Sentences are tagged with the lesson they practise.</p><div class=chips><label><input type=checkbox id=wonly ${WS.only!==false?'checked':''}> Only up to my current lesson (${cl})</label></div><div class=card id=wbx></div><div class=card><h3>Writing tips</h3><ul><li>Find the verb first; decide its person, tense, voice and mood.</li><li>Put the subject in the nominative and the direct object in the accusative.</li><li>Check that adjectives agree in gender, number and case.</li><li>Default order: subject – object – verb.</li></ul></div>`);
  $('#wonly').onchange=e=>{WS.only=e.target.checked;nextW();};nextW();
}
function nextW(){
  const cl=curLesson();let pool=COMP.map((c,i)=>i).filter(i=>WS.only===false||COMP[i].ls<=Math.max(cl,7));
  const undone=pool.filter(i=>!S.wDone[i]);WI=rnd(undone.length?undone:pool);const c=COMP[WI];
  $('#wbx').innerHTML=`<p class=note>Lesson ${c.ls} · ${Object.keys(S.wDone).length}/${COMP.length} mastered</p><p class=q>${esc(c.en)}</p><form id=wf><textarea id=wi rows=2 autocapitalize=off spellcheck=false placeholder="Latin…"></textarea><button class=btn>Check</button></form><div id=wfb></div>`;
  $('#wf').onsubmit=e=>{e.preventDefault();const u=plain($('#wi').value);if(!u)return;const bag=s=>plain(s).split(' ').sort().join(' ');
    const ok=c.ans.some(a=>bag(a)==bag(u));const best=c.ans[0];
    let diff='';if(!ok){const mine=new Set(plain(u).split(' '));const tgt=plain(best).split(' ');diff=`<p class=note>Words to check: ${tgt.filter(w=>!mine.has(w)).map(w=>`<b>${w}</b>`).join(', ')||'word order/extra words'}</p>`;}
    bump(ok);if(ok)S.wDone[WI]=1;save();
    $('#wfb').innerHTML=`<p class="${ok?'ok':'no'}">${ok?'Correct!':'Not quite.'}</p><p>Model: <span class=la>${c.ans.join(' <i>or</i> ')}</span></p>${diff}<p class=note>See lesson <a href="#lesson-${c.ls}">${c.ls}: ${esc(LESSONS[c.ls-1].t)}</a></p>${!ok?'<button class="btn ghost" id=wself>I was right (mark correct)</button>':''}<button class=btn id=wn>Next</button>`;
    $('#wn').onclick=nextW;if($('#wself'))$('#wself').onclick=e=>{S.wDone[WI]=1;save();e.target.remove();};};
}

// ---------- reference ----------
function ref(){
  const decl=[['1st','puella'],['2nd m','amīcus'],['2nd n','bellum'],['3rd','rēx'],['3rd n','corpus'],['3rd i-stem','cīvis'],['4th','manus'],['5th','rēs']];
  const endings=decl.map(([l,x])=>{const n=findN(x);const d=declineNoun(n);return {l,d};});
  const endTab=`<div class=scroll><table class="t forms"><tr><th></th>${endings.map(e=>`<th>${e.l}</th>`).join('')}</tr>${['sg','pl'].map(k=>CASES.slice(0,5).map((c,i)=>`<tr><td class=cs>${c} ${k}</td>${endings.map(e=>`<td>${e.d[k][i]}</td>`).join('')}</tr>`).join('')).join('')}</table></div>`;
  setMain(`<h2>Reference</h2><p class=sub>Every table in one place. Use the verb explorer to see the full conjugation of any verb in the word list.</p>
  <details class=card open><summary><h3>Verb explorer</h3></summary><select id=vx>${VERBS.map((v,i)=>`<option value=${i}>${v.parts[0]} – ${esc(v.mean)}</option>`).join('')}</select><div id=vxo></div></details>
  <details class=card><summary><h3>Noun endings (all declensions)</h3></summary>${endTab}</details>
  <details class=card><summary><h3>Adjectives</h3></summary>${adjTable(findA('bonus'))}${adjTable(findA('pulcher'))}${adjTable(findA('ācer'))}${adjTable(findA('ingēns'))}</details>
  <details class=card><summary><h3>Pronouns & numbers</h3></summary>${Object.keys(PRON).map(pronTable).join('')}</details>
  <details class=card><summary><h3>Irregular verbs</h3></summary>${Object.keys(IRR).map(irrTable).join('')}</details>
  <details class=card><summary><h3>Sequence of tenses</h3></summary><table class=t><tr><th>Main verb</th><th>Same time / later</th><th>Earlier</th></tr><tr><td>Primary (pres., fut., fut. perf.)</td><td>Present subj.</td><td>Perfect subj.</td></tr><tr><td>Secondary (impf., perf., plup.)</td><td>Imperfect subj.</td><td>Pluperfect subj.</td></tr></table></details>
  <details class=card><summary><h3>Subjunctive clause finder</h3></summary><table class=t><tr><th>Introduced by</th><th>Meaning</th><th>Lesson</th></tr>
  <tr><td>ut / nē</td><td>purpose "in order to"; indirect command</td><td><a href="#lesson-32">32</a>, <a href="#lesson-36">36</a></td></tr><tr><td>tam/ita/tantus … ut (nōn)</td><td>result "so … that"</td><td><a href="#lesson-33">33</a></td></tr><tr><td>cum</td><td>when / since / although</td><td><a href="#lesson-34">34</a></td></tr><tr><td>question word after verb of asking/knowing</td><td>indirect question</td><td><a href="#lesson-35">35</a></td></tr><tr><td>sī / nisi</td><td>conditions</td><td><a href="#lesson-37">37</a></td></tr><tr><td>timeō nē / ut</td><td>fear that / that not</td><td><a href="#lesson-38">38</a></td></tr><tr><td>quīn, quōminus</td><td>doubt, prevention</td><td><a href="#lesson-38">38</a></td></tr><tr><td>quī + subj.</td><td>characteristic, purpose, cause</td><td><a href="#lesson-40">40</a></td></tr><tr><td>utinam</td><td>wish</td><td><a href="#lesson-31">31</a></td></tr></table></details>
  <details class=card><summary><h3>Case uses at a glance</h3></summary><p><a href="#lesson-41">Genitive</a> · <a href="#lesson-42">Dative</a> · <a href="#lesson-43">Accusative</a> · <a href="#lesson-44">Ablative</a> · <a href="#lesson-45">Place & time</a></p></details>`);
  const show=()=>{const v=VERBS[+$('#vx').value];const vc=v.dep?['P']:['A','P'];
    $('#vxo').innerHTML=vc.map(x=>verbTable(v,'ind',x,TENSES.ind)+verbTable(v,'sub',x,TENSES.sub)).join('')+nfList(v);};
  $('#vx').onchange=show;show();
}

hdr();route();

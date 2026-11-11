// Desktop layout helpers: sidebar brand & progress, page-width hints, lesson contents panel with scroll-spy
(function(){
 const nav=document.getElementById('nav'),main=document.getElementById('main');
 // brand at the top of the sidebar, progress at the bottom (hidden on phones by CSS)
 const brand=document.createElement('a');brand.className='nbrand';brand.href='#home';brand.innerHTML=(typeof LAUREL!=='undefined'?LAUREL:'')+'<span>Lingua Latina</span>';
 nav.insertBefore(brand,nav.firstChild);
 const foot=document.createElement('div');foot.className='nfoot';nav.appendChild(foot);
 function footer(){const done=Object.keys(S.done).length,cl=curLesson();
  foot.innerHTML=`<a class=nprog href="#lesson-${cl}">${ring(done/LESSONS.length,46,done+'')}<span><b>${done} of 50 lessons</b><small>Next: ${esc(LESSONS[cl-1].t)}</small></span></a>`;
  const c=foot.querySelector('.rf');if(c)requestAnimationFrame(()=>requestAnimationFrame(()=>c.style.strokeDashoffset=c.style.getPropertyValue('--off')));}
 // contents panel for lessons
 let spy=null;
 function toc(n){const art=main.querySelector('.story');if(!art)return;const L=LESSONS[n-1],nx=LESSONS[n];
  const hs=[...art.querySelectorAll(':scope > h4')];hs.forEach((h,i)=>h.id='sec-'+i);
  const tr=((window.TRY||{})[n]||[]).length,got=Math.min(S.tried[n]||0,tr);
  const a=document.createElement('aside');a.className='toc';
  a.innerHTML=`<div class=tk>In this lesson</div><ol>${hs.map((h,i)=>`<li><a href="#" data-s="${i}">${esc(h.textContent.replace(/^\d+\.\s*/,''))}</a></li>`).join('')}<li><a href="#" data-s=quiz>Check yourself</a></li></ol>
   <div class=tcard>${ring(0,44,'')}<div><b id=tpct>0% read</b><small id=ttry>${tr?`Try-its ${got}/${tr}`:''}</small></div></div>
   ${S.done[n]?'<div class=tdone>Completed ✓</div>':''}
   ${nx?`<a class=tnext href="#lesson-${n+1}"><small>Next lesson</small><b>${n+1}. ${esc(nx.t)}</b></a>`:''}`;
  main.appendChild(a);
  a.querySelectorAll('[data-s]').forEach(x=>x.onclick=e=>{e.preventDefault();const t=x.dataset.s==='quiz'?document.getElementById('quiz'):hs[+x.dataset.s];if(t)scrollTo({top:t.getBoundingClientRect().top+scrollY-84,behavior:'smooth'});});
  const links=[...a.querySelectorAll('ol a')],rf=a.querySelector('.rf'),C=rf?parseFloat(rf.style.strokeDasharray):0;
  spy=()=>{if(!a.isConnected){removeEventListener('scroll',spyF);return}let k=-1;hs.forEach((h,i)=>{if(h.getBoundingClientRect().top<140)k=i});
   const q=document.getElementById('quiz');if(q&&q.getBoundingClientRect().top<200)k=hs.length;
   links.forEach((l,i)=>l.classList.toggle('on',i===k));
   const H=document.documentElement.scrollHeight-innerHeight,p=H>0?Math.min(1,scrollY/H):0;if(rf)rf.style.strokeDashoffset=C*(1-p);const tp=a.querySelector('#tpct');if(tp)tp.textContent=Math.round(p*100)+'% read';
   const tc=document.getElementById('trc'),tt=a.querySelector('#ttry');if(tc&&tt)tt.textContent=tc.textContent;};
  addEventListener('scroll',spyF,{passive:true});spy();}
 function spyF(){if(spy)requestAnimationFrame(spy)}
 const prev=window.afterRoute;
 window.afterRoute=function(h){if(prev)prev(h);
  const v=/^lesson-/.test(h)?'lesson':/^read-/.test(h)?'readtext':/^learn/.test(h)?'learn':(h||'home');main.dataset.v=v;
  removeEventListener('scroll',spyF);spy=null;
  const m=h.match(/^lesson-(\d+)$/);if(m)toc(+m[1]);
  footer();};
 const pr=window.afterRender;window.afterRender=function(){if(pr)pr();const m=(location.hash||'').match(/^#lesson-(\d+)$/);if(m&&!main.querySelector('.toc')){removeEventListener('scroll',spyF);setTimeout(()=>{if(!main.querySelector('.toc'))toc(+m[1])},0)}};
 // keep the sidebar progress fresh when a lesson gets completed
 const sv=window.save;window.save=function(){sv();clearTimeout(footer.t);footer.t=setTimeout(footer,300)};
 window.afterRoute((location.hash||'#home').slice(1));
})();

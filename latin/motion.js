// Taskist-style motion & chrome for Lingua Latina
(function(){
 const nav=document.getElementById('nav'),bar=document.getElementById('bar0'),tt=document.getElementById('tt'),back=document.getElementById('hback'),thm=document.getElementById('thm');
 // nav icons: grey layer + accent layer revealed with a circular sweep (as in Taskist)
 nav.classList.add('noan');
 nav.querySelectorAll('.ni').forEach(ni=>{const svg=ni.innerHTML;ni.innerHTML='<span class="nio">'+svg+'</span><span class="nin">'+svg+'</span>';});
 requestAnimationFrame(()=>requestAnimationFrame(()=>nav.classList.remove('noan')));
 // press box on the bottom bar
 nav.addEventListener('pointerdown',e=>{const a=e.target.closest('a');if(!a)return;a.classList.add('pr');const t0=Date.now();
  const up=()=>{document.removeEventListener('pointerup',up,true);document.removeEventListener('pointercancel',up,true);setTimeout(()=>a.classList.remove('pr'),Math.max(60,180-(Date.now()-t0)));};
  document.addEventListener('pointerup',up,true);document.addEventListener('pointercancel',up,true);});
 // small title in the top bar once the big title has scrolled away
 let titleEl=null;
 function onScroll(){const lim=titleEl?titleEl.getBoundingClientRect().bottom<56:window.scrollY>40;bar.classList.toggle('sc',window.scrollY>4&&lim||window.scrollY>140);}
 window.addEventListener('scroll',onScroll,{passive:true});
 window.afterRender=function(){titleEl=document.querySelector('#main h1,#main h2');tt.textContent=titleEl?titleEl.textContent.trim():'Latin';onScroll();};
 // back arrow: inside a lesson/text go up one level; on main pages go back to Taskist if we came from it
 const fromT=(()=>{try{return sessionStorage.getItem('latin.from')==='taskist'}catch(e){return false}})();
 window.afterRoute=function(h){const up=/^lesson-/.test(h)?'#learn':/^read-/.test(h)?'#read':h==='ref'?'#home':null;
  back.hidden=!(up||fromT);back.dataset.up=up||'';bar.style.paddingLeft=back.hidden?'14px':'6px';};
 back.onclick=()=>{const up=back.dataset.up;if(up)location.hash=up;else location.href='../';};
 // light / dark switch (Taskist passes its theme when it opens this page)
 const mtc=document.getElementById('mtc');
 function syncMeta(){mtc.setAttribute('content',document.documentElement.dataset.th==='dark'?'#1b1815':'#f6f1e7');}
 thm.onclick=()=>{const t=document.documentElement.dataset.th==='dark'?'light':'dark';document.documentElement.dataset.th=t;try{localStorage.setItem('latin.th',t)}catch(e){}syncMeta();};
 syncMeta();window.afterRender();window.afterRoute((location.hash||'#home').slice(1));
})();

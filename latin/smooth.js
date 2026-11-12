// Smooth answering: the old question slides out before the next one slides in,
// and typed answers light up green or red when checked.
(function(){
 const NEXT='#nq,#dn,#wn,#again,#rva,[data-g],.tfb .btn:not(.tra)';
 const BOX='#quiz,#dq,#wc,#rvq,#wbx';
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 document.addEventListener('click',e=>{const b=e.target.closest(NEXT);if(!b||b.dataset.go||reduce.matches)return;
  const box=b.closest(BOX)||b.closest('.card');if(!box)return;
  e.stopImmediatePropagation();e.preventDefault();box.classList.add('qout');
  setTimeout(()=>{b.dataset.go=1;b.click();box.classList.remove('qout');},180);},true);
 // typed answers: colour the input once the feedback arrives
 new MutationObserver(ms=>ms.forEach(m=>{const fb=m.target;if(!(fb.id==='dfb'||fb.id==='wfb'))return;
  const p=fb.querySelector('p.ok,p.no');const box=fb.closest(BOX)||fb.parentElement;const inp=box&&box.querySelector('input[type=text],input:not([type]),textarea');
  if(inp&&p){inp.classList.remove('aok','ano');void inp.offsetWidth;inp.classList.add(p.classList.contains('ok')?'aok':'ano')}}))
  .observe(document.getElementById('main'),{childList:true,subtree:true});
})();

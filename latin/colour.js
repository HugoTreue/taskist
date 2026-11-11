// Colour-code example sentences by each word's job (subject, verb, object, of, to/for, by/with…)
(function(){
 const L=window.LEX;if(!L)return;
 const ACC_P=new Set(['ad','ante','apud','circum','contrā','inter','ob','per','post','propter','trāns','prope']);
 const ABL_P=new Set(['ā','ab','cum','dē','ē','ex','prō','sine']);
 const BOTH_P=new Set(['in','sub']);
 const DATV=/^(dō|dīcō|nūntiō|dēmōnstrō|ostendō|trādō|crēdō|noceō|placeō|persuādeō|imperō|faveō|parcō|respondeō|mittō)(?=,|$)/;
 const SAYV=/^(dīcō|putō|sciō|nūntiō|crēdō|audiō|videō|nesciō|respondeō|arbitror|intellegō|cognōscō|negō|spērō)(?=,|$)/;
 const ROLE={subj:['subject','who does it'],verb:['verb','the action'],inf:['to …','verb: "to ___"'],obj:['object','what it is done to'],gen:['of','"of" / whose'],dat:['to / for','to whom, for whom'],abl:['by / with','by, with, from, in'],prep:['place / with','preposition + its noun'],voc:['calling','speaking to someone'],accs:['subject of "to…"','reported subject (accusative)'],abs:['background','ablative absolute'],link:['link','joining word'],adv:['how / when','adverb'],pred:['describes subject','after "is / are"'],loc:['place','where / to where (town or home)']};
 const LOCN=/^(Rōma|Carthāgō|Trōia|Athēnae|Corinthus|domus)\b/;
 const CR={Nom:'subj',Gen:'gen',Dat:'dat',Acc:'obj',Abl:'abl',Voc:'voc'};
 function analyse(word){const r=L.look(word);if(!r)return null;const out=[];r.hits.forEach(h=>{const ex=L.exactAn(h,r.word);const code=h.w&&h.w.code||'';
   if(!ex.length&&code){out.push({h,a:{k:code}});return}ex.forEach(a=>out.push({h,a}))});return {r,c:out}}
 function tagSentence(el){if(el.dataset.ct)return;const ws=[...el.querySelectorAll('.gw')];if(!ws.length)return;el.dataset.ct=1;
  const T=ws.map(w=>{const an=analyse(w.textContent)||{c:[]};return {w,txt:w.textContent.replace(/[^A-Za-zĀ-ſ]/g,''),c:an.c,role:null,num:null,ok:false}});
  // 1. fixed parts of speech
  T.forEach(t=>{const codes=new Set(t.c.map(x=>x.h.w&&x.h.w.code).filter(Boolean)),lem=(t.c[0]&&t.c[0].h.lemma.split(',')[0])||'';
   const fin=t.c.filter(x=>x.a.k==='v'||x.a.k==='imp'||/^(v|d)[x0-9s]/.test(x.a.k));const inf=t.c.filter(x=>x.a.k==='nf'&&/infinitive/.test(x.a.lab||''));
   if(codes.has('prep')&&!t.c.some(x=>['n','adj','pron'].includes(x.a.k))){t.role='prep';t.gov=ACC_P.has(t.txt.toLowerCase())?'Acc':ABL_P.has(t.txt.toLowerCase())?'Abl':'both';return}
   if(fin.length&&!t.c.some(x=>['n','pron'].includes(x.a.k))){t.role='verb';const ns=new Set(fin.map(x=>x.a.n));t.num=ns.size===1?[...ns][0]:null;t.lem=lem;t.isEst=fin.some(x=>x.a.irr==='sum');t.pass=fin.every(x=>x.a.vo==='P'&&!x.a.dep);return}
   if(LOCN.test(lem)&&t.c.some(x=>x.a.k==='adv'||(x.a.c&&/^(Rōm|Carthāg|Trōi|Athēn|Corinth)/.test(lem)&&/(ae|ī|e|am|em|ā|ō|īs)$/.test(t.txt)&&x.a.c!=='Nom'))){t.role='loc';return}
   if(inf.length&&!t.c.some(x=>x.a.k==='n')){t.role='inf';return}
   if(codes.has('conj')&&!t.c.some(x=>['n','adj','v','pron'].includes(x.a.k))){t.role='link';return}
   if(codes.has('adv')&&!t.c.some(x=>['n','adj','v','pron','part'].includes(x.a.k))){t.role='adv';return}
   const cs=t.c.filter(x=>x.a.c);t.cases=cs.map(x=>({c:x.a.c,n:x.a.n,g:x.a.g,k:x.a.k,pt:x.a.pt}));});
  T.forEach((t,i)=>{if(t.role)return;const pp=t.c.filter(x=>x.a.k==='part'&&x.a.pt==='perf'&&x.a.c==='Nom');if(!pp.length)return;const nb=[T[i+1],T[i-1]].find(u=>u&&u.role==='verb'&&u.isEst);if(nb){t.role='verb';nb.isEst=false;nb.num=pp[0].a.n}});
  // split into clauses at joining words, relatives and commas
  const segs=[[]];T.forEach((t,i)=>{const prev=i?ws[i-1]:null;let gap='';if(prev){let n=prev.nextSibling;while(n&&n!==t.w){gap+=n.textContent;n=n.nextSibling}}
   const rel=!t.role&&t.c.some(x=>/^quī, quae/.test(x.h.lemma||''));
   if(segs[segs.length-1].length&&(t.role==='link'||rel||/[,;:]/.test(gap)))segs.push([]);segs[segs.length-1].push(t)});
  segs.forEach(S=>solve(S));
  function solve(T){
  const verbs=T.filter(t=>t.role==='verb'),vnum=verbs.length&&verbs[0].num,isEst=verbs.some(v=>v.isEst),datVerb=verbs.some(v=>DATV.test(v.lem||'')),sayVerb=verbs.some(v=>SAYV.test(v.lem||''))&&T.some(t=>t.role==='inf'),passive=verbs.some(v=>v.pass);
  // 2. prepositions fix the case of what follows
  T.forEach((t,i)=>{if(t.role!=='prep')return;for(let j=i+1;j<T.length&&j<=i+3;j++){const u=T[j];if(!u.cases||!u.cases.length)break;const want=t.gov==='both'?['Acc','Abl']:[t.gov];const keep=u.cases.filter(x=>want.includes(x.c));if(!keep.length)break;u.cases=keep;u.role='prep';u.pp=t.txt}});
  // 3. ablative absolute: participle + noun both ablative, no preposition
  T.forEach((t,i)=>{if(t.role||!t.cases)return;const isPart=t.cases.some(x=>x.k==='part'&&x.pt!=='gerv'&&x.c==='Abl');if(!isPart)return;const nb=[T[i-1],T[i+1]].find(u=>u&&!u.role&&u.cases&&u.cases.some(x=>x.c==='Abl'&&x.k!=='part'));if(nb){t.role=nb.role='abs'}});
  // 4. adjectives lean on the noun beside them and share its job
  const nounish=u=>u&&!u.role&&u.cases&&u.cases.some(x=>x.k==='n'||x.k==='pron');
  const gm=(a,b)=>!a.g||!b.g||a.g===b.g||a.g==='mf'&&b.g!=='n'||b.g==='mf'&&a.g!=='n';
  T.forEach((t,i)=>{if(t.role||!t.cases||!t.cases.length||!t.cases.every(x=>x.k==='adj'||x.k==='part'))return;
   for(const u of [T[i-1],T[i+1]]){if(!nounish(u)||u.head)continue;const sh=t.cases.filter(a=>u.cases.some(b=>(b.k==='n'||b.k==='pron')&&b.c===a.c&&b.n===a.n&&gm(a,b)));if(!sh.length)continue;
    if(isEst&&sh.some(a=>a.c==='Nom'))continue;
    const ok=new Set(sh.map(a=>a.c+a.n));t.cases=sh;u.cases=u.cases.filter(b=>ok.has(b.c+b.n));t.head=u;break}});
  const pick=(t,c)=>{t.role=CR[c];t.cases=t.cases.filter(x=>x.c===c)};
  const open=()=>T.filter(t=>!t.role&&!t.head&&t.cases&&t.cases.length);
  // subject: a nominative that matches the verb's number
  let hasSubj=false;
  open().forEach(t=>{if(hasSubj)return;const nom=t.cases.filter(x=>x.c==='Nom'&&(!vnum||x.n===vnum));if(!nom.length)return;
   const neutAmb=t.cases.some(x=>x.c==='Acc'&&x.g==='n')&&!isEst&&!passive&&verbs.length;
   if(!neutAmb&&(t.cases.every(x=>x.c==='Nom'||x.c==='Voc'||x.c==='Gen'||x.c==='Dat'||(x.c==='Acc'&&x.g==='n'))||!t.cases.some(x=>x.c==='Acc'||x.c==='Abl'))){t.cases=nom;t.role='subj';hasSubj=true}});
  if(!hasSubj&&(vnum||isEst))open().forEach(t=>{if(hasSubj)return;const nom=t.cases.filter(x=>x.c==='Nom'&&(!vnum||x.n===vnum));if(!nom.length)return;if(t.cases.some(x=>x.c==='Acc'&&x.g==='n')&&!isEst&&!passive)return;
   const accAlt=T.some(u=>u!==t&&!u.role&&!u.head&&u.cases&&u.cases.some(x=>x.c==='Acc'));if(passive||isEst||!accAlt||T.indexOf(t)<T.findIndex(u=>u.role==='verb')){t.cases=nom;t.role='subj';hasSubj=true}});
  // after "is / are", another nominative describes the subject
  if(isEst&&hasSubj)open().forEach(t=>{if(t.cases.some(x=>x.c==='Nom')){t.cases=t.cases.filter(x=>x.c==='Nom');t.role='pred'}});
  let dDone=T.some(t=>t.role==='dat');
  open().forEach(t=>{let cs=new Set(t.cases.map(x=>x.c));
   if(hasSubj||vnum){cs.delete('Nom');cs.delete('Voc')}
   if(!cs.size)cs=new Set(t.cases.map(x=>x.c));
   if(cs.size===1){pick(t,[...cs][0]);return}
   if(cs.has('Acc')&&!cs.has('Abl')){pick(t,'Acc');return}
   if(cs.has('Gen')&&cs.has('Dat')){const d=datVerb&&!dDone;pick(t,d?'Dat':'Gen');if(d)dDone=true;return}
   if(cs.has('Dat')&&cs.has('Abl')){pick(t,datVerb&&!dDone?'Dat':'Abl');return}
   if(cs.has('Acc'))pick(t,'Acc');else if(cs.has('Abl'))pick(t,'Abl');else pick(t,[...cs][0])});
  // indirect statement: accusative subject of the infinitive
  if(sayVerb){const ii=T.findIndex(t=>t.role==='inf');for(let j=T.length-1;j>=0;j--){if(j>=ii&&ii>=0&&j!==ii)continue;if(T[j].role==='obj'&&T[j].cases&&T[j].cases.some(x=>x.k!=='adj')){T[j].role='accs';break}}}
  T.forEach(t=>{if(t.head&&!t.role)t.role=t.head.role,t.pp=t.head.pp});
  }
  // paint
  const seen=new Set();T.forEach(t=>{if(!t.role)return;seen.add(t.role);t.w.classList.add('cw','r-'+t.role);t.w.dataset.role=t.role+(t.pp?'|'+t.pp:'')});
  if(!seen.size)return;el.classList.add('coded');
  const ex=el.closest('.ex');if(ex&&!ex.querySelector('.leg')){const lg=document.createElement('div');lg.className='leg';
   ['subj','accs','verb','inf','obj','gen','dat','abl','prep','loc','abs','pred','voc','adv','link'].filter(r=>seen.has(r)).forEach(r=>{const s=document.createElement('span');s.className='lg r-'+r;s.textContent=ROLE[r][0];lg.appendChild(s)});ex.appendChild(lg)}}
 window.tagAll=function(root){root.querySelectorAll('.story .ex .la, .xs .ex .la').forEach(tagSentence)};
 window.roleInfo=function(rs){if(!rs)return null;const [r,pp]=rs.split('|');const R=ROLE[r];if(!R)return null;
  const why={subj:'It is in the nominative and matches the verb, so it is the one doing the action.',obj:'It is in the accusative, so the action is done to it.',verb:'Its ending shows who is acting and when.',inf:'The "to ___" form of a verb.',gen:'It is in the genitive: "of", or whose.',dat:'It is in the dative: the person something is given or said to.',abl:'It is in the ablative: by, with, from or in.',prep:'It goes with the preposition '+(pp||'before it')+', which decides its case.',voc:'It is in the vocative: someone is being spoken to.',accs:'After a verb of saying or thinking, the reported subject goes in the accusative.',abs:'A noun + participle in the ablative, giving background ("with … having been …").',pred:'It describes the subject after "is / are", so it stays in the nominative.',adv:'An adverb: it tells you how, when or where.',link:'A joining word: it starts a new clause.',loc:'Towns and home take no preposition: Rōmae = at Rome, Rōmam = to Rome, domī = at home.'}[r];
  return {name:R[0],sub:R[1],why}};
window.tagAll(document.getElementById('main'));
})();

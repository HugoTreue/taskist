// Tap any Latin word or grammar term for a short explanation in a bubble.
(function(){
 // ---------- grammar terms (plain-English explanations) ----------
 const G={
  'nominative':'The case for the subject — the person or thing doing the action. Puella cantat: the girl (nominative) sings.',
  'genitive':'The "of" case. Shows possession or belonging: liber puellae = the book of the girl / the girl\'s book.',
  'dative':'The "to / for" case. Usually the indirect object: puellae dōnum dō = I give a gift to the girl.',
  'accusative':'The case for the direct object — the thing the action is done to. Also used after prepositions like ad, in (into), per.',
  'ablative':'The "by / with / from / in" case. Covers means, manner, place, time and many prepositions (cum, in, ē, ā, dē, sine).',
  'vocative':'The case for calling someone directly: Mārce, venī! = Marcus, come! Usually the same as the nominative.',
  'locative':'A small leftover case meaning "at / in" a place, used with cities, small islands and domus: Rōmae = at Rome, domī = at home.',
  'case':'The form a noun takes to show its job in the sentence (subject, object, "of", "to", "by"…). Latin shows this with endings, not word order.',
  'cases':'The forms a noun takes to show its job in the sentence. Latin has six main ones: nominative, genitive, dative, accusative, ablative, vocative.',
  'declension':'A family of nouns that share the same set of endings. Latin has five; you can tell which from the genitive singular (-ae, -ī, -is, -ūs, -eī).',
  'declensions':'Families of nouns that share the same endings. There are five, identified by the genitive singular: -ae, -ī, -is, -ūs, -eī.',
  'conjugation':'A family of verbs that share the same pattern of endings. Latin has four (plus 3rd -iō verbs); the infinitive tells you which.',
  'conjugations':'Families of verbs with the same endings: 1st -āre, 2nd -ēre, 3rd -ere, 4th -īre (plus 3rd -iō verbs like capiō).',
  'inflection':'Changing a word\'s ending to show its job or meaning — like English he/him/his, but for almost every Latin word.',
  'gender':'Every noun is masculine, feminine or neuter. It is grammatical, not about meaning, and adjectives must match it.',
  'number':'Singular (one) or plural (more than one).',
  'singular':'One person or thing.',
  'plural':'More than one person or thing.',
  'masculine':'One of the three genders. Most 2nd-declension -us nouns are masculine.',
  'feminine':'One of the three genders. Most 1st-declension -a nouns are feminine.',
  'neuter':'The third gender ("neither"). Neuter nouns have the same form in nominative and accusative, and plurals in -a.',
  'adjective':'A describing word. In Latin it must agree with its noun in gender, number and case: puella bona, puerī bonī.',
  'adjectives':'Describing words. They must agree with their noun in gender, number and case.',
  'agreement':'Matching forms: an adjective takes the same gender, number and case as its noun; a verb matches its subject in person and number.',
  'agree':'Match in form: same gender, number and case (adjective + noun) or same person and number (verb + subject).',
  'stem':'The part of a word that stays the same; endings are added to it. For nouns, take the genitive and remove its ending: rēgis → rēg-.',
  'ending':'The changeable last part of a word that shows case, number, person or tense.',
  'endings':'The changeable last parts of words that show case, number, person, tense and so on.',
  'tense':'When the action happens — present, past (imperfect, perfect, pluperfect) or future (future, future perfect).',
  'present':'Tense for something happening now or habitually: amō = I love / I am loving.',
  'imperfect':'Past tense for ongoing or repeated action: amābam = I was loving / I used to love.',
  'future':'Tense for something that will happen: amābō = I will love.',
  'perfect':'Past tense for a completed action: amāvī = I loved / I have loved.',
  'pluperfect':'"Had" tense — finished before another past action: amāveram = I had loved.',
  'future perfect':'"Will have" tense: amāverō = I will have loved. Often translated with an English present after "if/when".',
  'mood':'The kind of statement a verb makes: indicative (fact), subjunctive (possibility, purpose, wish), imperative (command).',
  'indicative':'The ordinary mood for stating facts and asking real questions.',
  'subjunctive':'The mood for what is possible, wished, intended or reported — used in purpose clauses, result clauses, conditions, cum clauses and more.',
  'imperative':'The command form: amā! = love! (one person), amāte! = love! (more than one).',
  'voice':'Active (the subject does the action) or passive (the action is done to the subject).',
  'active':'The subject does the action: puer videt = the boy sees.',
  'passive':'The action is done to the subject: puer vidētur = the boy is seen.',
  'person':'Who does the action: 1st = I/we, 2nd = you, 3rd = he/she/it/they.',
  'infinitive':'The "to ___" form of a verb: amāre = to love.',
  'participle':'A verb used as an adjective: amāns = loving, amātus = (having been) loved.',
  'participles':'Verbs used as adjectives: present (amāns, loving), perfect passive (amātus, loved), future active (amātūrus, about to love).',
  'perfect passive participle':'The 4th principal part as an adjective: amātus, -a, -um = (having been) loved. Also builds the perfect passive.',
  'gerund':'A verb used as a noun: amandī = of loving. It has no nominative (use the infinitive instead).',
  'gerundive':'A verbal adjective meaning "to be ___ed": liber legendus = a book to be read. With esse it shows obligation.',
  'deponent':'A verb with passive forms but active meaning: loquor = I speak, not "I am spoken".',
  'deponents':'Verbs with passive forms but active meanings, like loquor (I speak) and sequor (I follow).',
  'principal parts':'The four forms you learn for each verb (amō, amāre, amāvī, amātum). Together they give you every tense.',
  'macron':'The line over a long vowel (ā ē ī ō ū). It shows pronunciation and can change meaning: malum (evil) vs mālum (apple).',
  'macrons':'Lines over long vowels (ā ē ī ō ū). They show pronunciation and sometimes meaning.',
  'diphthong':'Two vowels said as one sound: ae (eye), au (ow), oe (oy).',
  'diphthongs':'Pairs of vowels said as one sound: ae (eye), au (ow), oe (oy), ei, eu, ui.',
  'enclitic':'A little word attached to the end of another: -que (and), -ne (question), -ve (or). Senātus populusque = the senate and people.',
  'preposition':'A small word like in, ad, cum that comes before a noun and takes the accusative or ablative.',
  'prepositions':'Small words like in, ad, cum, ē that come before a noun and take the accusative or ablative.',
  'pronoun':'A word that stands for a noun: ego (I), tū (you), is (he), hic (this), quī (who).',
  'pronouns':'Words that stand for nouns: ego, tū, is, hic, ille, quī…',
  'reflexive':'A pronoun pointing back to the subject: sē laudat = he praises himself.',
  'relative clause':'A clause starting with quī, quae, quod (who, which, that) describing a noun: vir quem vidēs = the man whom you see.',
  'relative pronoun':'quī, quae, quod — "who, which, that". It agrees with its noun in gender and number, but its case comes from its own clause.',
  'antecedent':'The noun a relative pronoun refers back to: in "the man whom you see", the man is the antecedent.',
  'ablative absolute':'A noun + participle in the ablative giving background: urbe captā = with the city captured / after the city was captured.',
  'indirect statement':'Reporting what someone says or thinks, with an accusative + infinitive: dīcit puerum venīre = he says that the boy is coming.',
  'indirect command':'A reported order or request using ut / nē + subjunctive: imperat ut veniant = he orders them to come.',
  'indirect question':'A question reported after verbs like ask or know, with the subjunctive: rogō cūr veniās = I ask why you are coming.',
  'purpose clause':'ut / nē + subjunctive meaning "in order to / so that … not".',
  'result clause':'tam / ita / tantus … ut + subjunctive meaning "so … that".',
  'conditional':'An "if" sentence. Latin uses the subjunctive for unreal or possible conditions.',
  'conditions':'"If" sentences. Real ones use the indicative; possible or unreal ones use the subjunctive.',
  'comparative':'The "more / -er" form: longior = longer.',
  'superlative':'The "most / -est / very" form: longissimus = longest, very long.',
  'transitive':'A verb that takes a direct object (accusative): videō puellam.',
  'intransitive':'A verb with no direct object: currō = I run.',
  'impersonal':'A verb used only with "it" as subject: placet = it pleases, licet = it is allowed.',
  'syllable':'A unit of sound built around one vowel or diphthong.',
  'accent':'Stress. Latin stresses the second-to-last syllable if it is long, otherwise the third-to-last.',
  'subject':'Who or what does the action. In Latin it goes in the nominative.',
  'object':'The thing the action is done to (direct object, accusative) or for/to (indirect object, dative).',
  'direct object':'The thing the action is done to. It goes in the accusative.',
  'indirect object':'The person something is given or said to. It goes in the dative.',
  'clause':'A group of words with its own verb.',
  'sequence of tenses':'The rule choosing the subjunctive tense: after a present/future main verb use present or perfect; after a past main verb use imperfect or pluperfect.'
 };
 const GKEYS=Object.keys(G).sort((a,b)=>b.length-a.length);
 const GRX=new RegExp('\\b('+GKEYS.map(k=>k.replace(/ /g,'\\s+')).join('|')+')\\b','gi');

 // ---------- Latin word index: every form → what it is ----------
 const IDX=new Map();
 const key=s=>plain(s).replace(/\s+/g,'');
 const add=(form,lemma,mean,desc)=>{if(!form||form==='—')return;form=String(form).trim();if(/\s/.test(form))return;
  const k=key(form);if(!k)return;let e=IDX.get(k);if(!e){e=[];IDX.set(k,e);}
  let it=e.find(x=>x.lemma===lemma);if(!it){it={lemma,mean,descs:[],forms:new Set()};e.push(it);}
  if(desc&&!it.descs.includes(desc))it.descs.push(desc);if(desc)(it.dd=it.dd||[]).push({f:form.toLowerCase(),d:desc});it.forms.add(form);};
 const PW={'1st sg':'I','2nd sg':'you','3rd sg':'he / she / it','1st pl':'we','2nd pl':'you (plural)','3rd pl':'they'};const CN={Nom:'nominative',Gen:'genitive',Dat:'dative',Acc:'accusative',Abl:'ablative',Voc:'vocative'};
 function build(){
  VOCAB.forEach(w=>add(w.lem.split(',')[0].replace(/\s*\(.*$/,''),w.lem,w.mean,null));
  NOUNS.forEach(n=>{try{const d=declineNoun(n);['sg','pl'].forEach(k=>CASES.forEach((c,i)=>add(d[k][i],n.lem,n.mean,CN[c]+' '+(k==='sg'?'singular':'plural'))))}catch(e){}});
  ADJS.forEach(a=>{try{const d=declineAdj(a);[['m','masculine'],['f','feminine'],['n','neuter']].forEach(([g,gn])=>['sg','pl'].forEach(k=>CASES.forEach((c,i)=>add(d[g][k][i],a.lem,a.mean,gn+' '+CN[c]+' '+(k==='sg'?'singular':'plural')))))}catch(e){}});
  VERBS.forEach(v=>{try{
   const vcs=v.dep?['P']:['A','P'];
   [['ind',TENSES.ind],['sub',TENSES.sub]].forEach(([m,ts])=>ts.forEach(t=>vcs.forEach(vc=>{const f=conj(v,m,t,vc);if(!f)return;
    f.forEach((x,p)=>add(x,v.lem,v.mean,PW[PERS[p]]+' — '+TNAME[t].toLowerCase()+(v.dep?'':vc==='A'?' active':' passive')+(m==='ind'?' indicative':' subjunctive')))})));
   const pdecl=(stem,lab)=>{const d=declineAdj({t:'12',parts:[stem+'us',stem+'a',stem+'um']});[['m','masculine'],['f','feminine'],['n','neuter']].forEach(([g,gn])=>['sg','pl'].forEach(k=>CASES.forEach((c,i)=>add(d[g][k][i],v.lem,v.mean,lab+' — '+gn+' '+CN[c]+' '+(k==='sg'?'singular':'plural')))))};
   if(v.ppp){pdecl(v.ppp,v.dep?'perfect participle (having ___ed)':'perfect passive participle (having been ___ed)');pdecl(v.ppp+'ūr','future participle (about to ___)')}
   Object.entries(nonFinite(v)).forEach(([lab,val])=>String(val).split(',').forEach(x=>{x=x.replace(/\(.*?\)/g,'').trim();if(x&&!x.startsWith('-'))add(x,v.lem,v.mean,lab.toLowerCase())}));
  }catch(e){}});
  Object.entries(IRR).forEach(([k,v])=>{const lem=v.pp,mean=v.mean;
   ['ind','sub'].forEach(m=>Object.entries(v[m]).forEach(([t,s])=>{if(s.includes(';'))return;s.replace(/nōn /g,'nōn_').split(' ').forEach((x,p)=>{if(x.includes('_'))return;add(x,lem,mean,PW[PERS[p]]+' — '+TNAME[t].toLowerCase()+(m==='ind'?' indicative':' subjunctive'))})}));});
  Object.entries(PRON).forEach(([name,p])=>Object.entries(p.rows).forEach(([c,row])=>row.forEach((cell,i)=>String(cell).split('/').forEach(x=>{x=x.replace(/\(.*?\)/g,'').trim();if(x&&!x.startsWith('=')&&x!=='—')add(x,name,'pronoun',CN[c]+' '+p.cols[i])}))));
 }
 build();
 function look(word){const w=word.replace(/[^A-Za-zĀ-ſ]/g,'');if(!w)return null;let r=IDX.get(key(w));
  if(!r){for(const enc of ['que','ne','ve']){if(key(w).endsWith(enc)&&key(w).length>enc.length+1){const base=IDX.get(key(w).slice(0,-enc.length));if(base)return {hits:base,enc};}}return null}
  return {hits:r,enc:null};}
 function summarize(ds){const groups=new Map(),other=[];
  ds.forEach(d=>{const m=d.match(/^(.*?)(?:— )?(?:(masculine|feminine|neuter) )?(nominative|genitive|dative|accusative|ablative|vocative) (singular|plural)$/);
   if(m){const k=(m[1]||'')+'|'+(m[2]||'')+'|'+m[4];if(!groups.has(k))groups.set(k,[]);groups.get(k).push(m[3])}else other.push(d)});
  const out=[];groups.forEach((cs,k)=>{const [pre,g,n]=k.split('|');if(cs.includes('vocative')&&cs.includes('nominative'))cs=cs.filter(c=>c!=='vocative');
   out.push((pre?pre.trim()+' — ':'')+(g?g+' ':'')+cs.join(', ')+' '+n)});
  return other.concat(out)}
 function meanLine(m){return String(m||'').split(';')[0]}

 // ---------- wrap words so they can be tapped ----------
 const SKIP='button,a,input,textarea,select,summary,.text,.opt,.gw,.gt,label,option,script,style,#gb';
 function wrapLatin(root){root.querySelectorAll('.la,table.forms td:not(.cs),.prompt .la,.front .la,.answer .la').forEach(el=>{if(el.dataset.gl||el.closest(SKIP))return;el.dataset.gl=1;
  const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];let n;while((n=tw.nextNode()))if(!n.parentNode.closest('.gw'))nodes.push(n);
  nodes.forEach(t=>{const parts=t.textContent.split(/(\s+|[,.;:!?()"“”‘’…–—=\/]+)/);if(parts.length<1)return;let any=false;const fr=document.createDocumentFragment();
   parts.forEach(p=>{if(p&&!/^[\s,.;:!?()"“”‘’…–—=\/]+$/.test(p)&&look(p)){const s=document.createElement('span');s.className='gw';s.textContent=p;fr.appendChild(s);any=true}else fr.appendChild(document.createTextNode(p))});
   if(any)t.parentNode.replaceChild(fr,t)})})}
 function wrapTerms(root){const scope=root.querySelectorAll('.lesson p,.lesson li,.lesson h4,.lesson td,.ask,.sub,.note,.card p,.q,table.t:not(.forms) td,.ex .en,#fb p,#dfb p');
  const seen=new Set();root.querySelectorAll('.story .gt').forEach(x=>seen.add(x.dataset.k));
  scope.forEach(el=>{if(el.dataset.gt||el.closest(SKIP)||(el.tagName==='H4'&&el.closest('.story')))return;el.dataset.gt=1;const inStory=!!el.closest('.story');const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:x=>x.parentNode.closest('.la,.gw,.gt,table.forms,'+SKIP)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
   const nodes=[];let n;while((n=tw.nextNode()))nodes.push(n);
   nodes.forEach(t=>{const s=t.textContent;GRX.lastIndex=0;if(!GRX.test(s))return;GRX.lastIndex=0;const fr=document.createDocumentFragment();let last=0,m;
    while((m=GRX.exec(s))){const kk=m[1].toLowerCase().replace(/\s+/g,' ');if(inStory&&seen.has(kk))continue;if(inStory)seen.add(kk);fr.appendChild(document.createTextNode(s.slice(last,m.index)));const sp=document.createElement('span');sp.className='gt';sp.dataset.k=m[1].toLowerCase().replace(/\s+/g,' ');sp.textContent=m[1];fr.appendChild(sp);last=m.index+m[1].length}
    fr.appendChild(document.createTextNode(s.slice(last)));t.parentNode.replaceChild(fr,t)})})}
 const main=document.getElementById('main');let pend=0;
 function scan(){pend=0;try{wrapLatin(main);wrapTerms(main)}catch(e){}}
 new MutationObserver(()=>{if(!pend)pend=requestAnimationFrame(scan)}).observe(main,{childList:true,subtree:true});
 scan();

 // ---------- the bubble ----------
 const gb=document.createElement('div');gb.id='gb';gb.setAttribute('role','dialog');gb.hidden=true;document.body.appendChild(gb);
 let cur=null,hideT=0;
 function html(el){
  if(el.classList.contains('gt')){const k=el.dataset.k;return '<div class="gbk">Grammar</div><div class="gbh">'+esc(k.charAt(0).toUpperCase()+k.slice(1))+'</div><div class="gbx">'+esc(G[k]||'')+'</div>';}
  const r=look(el.textContent);if(!r)return null;
  const hits=r.hits.slice(0,3);
  return hits.map(h=>{const tw=el.textContent.replace(/[^A-Za-zĀ-ſ]/g,'').toLowerCase(),ex=(h.dd||[]).filter(x=>x.f===tw).map(x=>x.d),ds=summarize(ex.length?[...new Set(ex)]:h.descs);const lemma=h.lemma.split(',')[0];const isLemma=key(lemma)===key(el.textContent.replace(/[^A-Za-zĀ-ſ]/g,''))&&!ds.length;
   return '<div class="gbi"><div class="gbh la">'+esc(el.textContent.replace(/[,.;:!?]/g,''))+(r.enc?'':'')+'</div><div class="gbm">'+esc(meanLine(h.mean))+'</div>'+
    (ds.length?'<div class="gbx">'+ds.slice(0,5).map(esc).join('<br>')+(ds.length>5?'<br>…':'')+'</div>':'')+
    (isLemma&&!ds.length?'':'<div class="gbl">from <span class="la">'+esc(h.lemma)+'</span></div>')+'</div>'}).join('')+
   (r.enc?'<div class="gbx">+ <b>-'+r.enc+'</b> = '+({que:'"and"',ne:'question marker',ve:'"or"'}[r.enc])+'</div>':'')+
   (r.hits.length>3?'<div class="gbx">Also: '+r.hits.slice(3).map(h=>esc(h.lemma.split(',')[0])).join(', ')+'</div>':'');}
 function show(el){const h=html(el);if(!h)return;clearTimeout(hideT);if(cur)cur.classList.remove('gon');cur=el;el.classList.add('gon');
  gb.innerHTML=h;gb.hidden=false;gb.classList.remove('out');gb.style.visibility='hidden';gb.style.left='0px';gb.style.top='0px';
  const r=el.getBoundingClientRect(),w=Math.min(320,innerWidth-24);gb.style.width=w+'px';const bh=gb.offsetHeight;
  let x=Math.max(12,Math.min(innerWidth-w-12,r.left+r.width/2-w/2)),below=r.bottom+10+bh<innerHeight-80,y=below?r.bottom+10:r.top-10-bh;
  if(y<64)y=r.bottom+10;
  gb.style.left=x+'px';gb.style.top=y+'px';gb.style.setProperty('--ax',Math.max(18,Math.min(w-18,r.left+r.width/2-x))+'px');gb.classList.toggle('up',!below&&y<r.top);
  gb.style.visibility='';gb.classList.remove('in');void gb.offsetWidth;gb.classList.add('in');}
 function hide(){if(gb.hidden)return;if(cur){cur.classList.remove('gon');cur=null}gb.classList.remove('in');gb.classList.add('out');clearTimeout(hideT);hideT=setTimeout(()=>{gb.hidden=true;gb.classList.remove('out')},180);}
 document.addEventListener('click',e=>{const w=e.target.closest('.gw,.gt');if(w&&!e.target.closest('#gb')){if(w===cur){hide();return}e.preventDefault();show(w);return}if(!e.target.closest('#gb'))hide()},true);
 window.addEventListener('scroll',hide,{passive:true});window.addEventListener('hashchange',hide);window.addEventListener('resize',hide);
 document.addEventListener('keydown',e=>{if(e.key==='Escape')hide()});
})();

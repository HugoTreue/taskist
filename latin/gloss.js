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


 // ---------- Latin word index: every form → structured analyses ----------
 const IDX=new Map();
 const key=s=>plain(s).replace(/\s+/g,'');
 const VBY=new Map();VOCAB.forEach(w=>VBY.set(w.lem,w));
 function add(form,lemma,mean,a,extra){if(!form||form==='—')return;form=String(form).trim();if(/\s/.test(form))return;
  const k=key(form);if(!k)return;let e=IDX.get(k);if(!e){e=[];IDX.set(k,e);}
  let it=e.find(x=>x.lemma===lemma);if(!it){it=Object.assign({lemma,mean,an:[]},extra||{});e.push(it);}
  if(a){a.f=form.toLowerCase();it.an.push(a)}}
 const CS=['Nom','Gen','Dat','Acc','Abl','Voc'];
 function build(){
  VOCAB.forEach(w=>add(w.lem.split(',')[0].replace(/\s*\(.*$/,'').trim(),w.lem,w.mean,null,{w}));
  VOCAB.filter(w=>w.code==='prep').forEach(w=>w.lem.split(',').slice(1).map(x=>x.trim()).filter(x=>/^[a-zā-ūī]+$/i.test(x)).forEach(x=>add(x,w.lem,w.mean,null,{w})));
  NOUNS.forEach(n=>{try{const w=VBY.get(n.lem),d=declineNoun(n);['sg','pl'].forEach(k=>CS.forEach((c,i)=>add(d[k][i],n.lem,n.mean,{k:'n',c,n:k,g:n.g},{w,noun:n})))}catch(e){}});
  ADJS.forEach(a=>{try{const w=VBY.get(a.lem),d=declineAdj(a);['m','f','n'].forEach(g=>['sg','pl'].forEach(k=>CS.forEach((c,i)=>add(d[g][k][i],a.lem,a.mean,{k:'adj',c,n:k,g},{w,adj:a}))))}catch(e){}});
  VERBS.forEach(v=>{try{const w=VBY.get(v.lem),X={w,verb:v};
   (v.dep?['P']:['A','P']).forEach(vc=>[['ind',TENSES.ind],['sub',TENSES.sub]].forEach(([m,ts])=>ts.forEach(t=>{const f=conj(v,m,t,vc);if(!f)return;f.forEach((x,p)=>add(x,v.lem,v.mean,{k:'v',p:p%3+1,n:p<3?'sg':'pl',t,vo:vc,m,dep:v.dep},X))})));
   const pd=(stem,pt)=>{const d=declineAdj({t:'12',parts:[stem+'us',stem+'a',stem+'um']});['m','f','n'].forEach(g=>['sg','pl'].forEach(k=>CS.forEach((c,i)=>add(d[g][k][i],v.lem,v.mean,{k:'part',pt,c,n:k,g,dep:v.dep},X))))};
   if(v.ppp){pd(v.ppp,'perf');pd(v.ppp+'ūr','fut')}
   const nf=nonFinite(v);Object.entries(nf).forEach(([lab,val])=>String(val).split(',').forEach(x=>{x=x.replace(/\(.*?\)/g,'').trim();if(!x||x.startsWith('-'))return;
    if(/participle/i.test(lab)&&!/present participle/i.test(lab))return;let a={k:'nf',lab:lab.toLowerCase(),dep:v.dep};
    if(/present participle/i.test(lab)){a={k:'part',pt:'pres',c:'Nom',n:'sg',g:'m',dep:v.dep}}
    else if(/imperative/i.test(lab)){a={k:'imp',n:x.endsWith('te')||x.endsWith('minī')?'pl':'sg',dep:v.dep}}
    add(x,v.lem,v.mean,a,X)}));
   if(nf['Present participle']){const st=nf['Present participle'].split(', ')[1].slice(0,-2);const pp={sg:[null,st+'is',st+'ī',st+'em',st+'e'],pl:[st+'ēs',st+'ium',st+'ibus',st+'ēs',st+'ibus']};['sg','pl'].forEach(k=>pp[k].forEach((f,i)=>{if(f)add(f,v.lem,v.mean,{k:'part',pt:'pres',c:CS[i],n:k,g:'mf',dep:v.dep},X)}))}
  }catch(e){}});
  [['dīc','dīcō'],['dūc','dūcō'],['fac','faciō'],['fer','ferō']].forEach(([f,l])=>{const v=VERBS.find(x=>x.parts[0]===l);const w=VOCAB.find(x=>x.lem.split(',')[0]===l);if(w)add(f,w.lem,w.mean,{k:'imp',n:'sg'},v?{w,verb:v}:{w,irr:l})});
  Object.entries(IRR).forEach(([k,v])=>{const w=VOCAB.find(x=>x.lem.split(',')[0]===k);const lem=w?w.lem:v.pp,mean=w?w.mean:v.mean;
   ['ind','sub'].forEach(m=>Object.entries(v[m]).forEach(([t,s])=>{if(s.includes(';'))return;s.replace(/nōn /g,'nōn_').split(' ').forEach((x,p)=>{if(x.includes('_'))return;add(x,lem,mean,{k:'v',p:p%3+1,n:p<3?'sg':'pl',t,vo:'A',m,irr:k},{w,irr:k})})}));});
  // infinitives & compounds of irregular verbs
  const IRC={sum:['ad','ab','prō','dē'],'eō':['red','ex','ab','ad','per','in','sub','trāns']};
  Object.entries(IRR).forEach(([k,v])=>{const w=VOCAB.find(x=>x.lem.split(',')[0]===k);const lem=w?w.lem:v.pp,mean=w?w.mean:v.mean,inf=(v.pp||'').split(', ')[1];
   if(inf)add(inf,lem,mean,{k:'nf',lab:'present infinitive',irr:k},{w,irr:k});
   (IRC[k]||[]).forEach(pre=>{const cm={ad:['be present','approach'],ab:['be away','go away'],'prō':['be useful'],'dē':['be lacking'],red:[,'go back, return'],ex:[,'go out'],per:[,'perish, die'],in:[,'go into, enter'],sub:[,'go under'],'trāns':[,'go across']}[pre][k==='sum'?0:1];if(!cm)return;
    const cl=pre+k+', '+pre+inf;add(pre+inf,cl,cm,{k:'nf',lab:'present infinitive',irr:k},{irr:k});
    ['ind','sub'].forEach(m=>Object.entries(v[m]).forEach(([t,s])=>{if(s.includes(';'))return;s.split(' ').forEach((x,p)=>{if(x==='nōn')return;add(pre+x,cl,cm,{k:'v',p:p%3+1,n:p<3?'sg':'pl',t,vo:'A',m,irr:k},{irr:k})})}))})});
  [['nōlī','sg'],['nōlīte','pl']].forEach(([f,n])=>{const w=VOCAB.find(x=>x.lem.startsWith('nōlō'));if(w)add(f,w.lem,'don\'t …! (with an infinitive)',{k:'imp',n},{w,irr:'nōlō'})});
  // domus (4th decl., irregular)
  {const w=VOCAB.find(x=>x.lem.startsWith('domus,'));if(w){const F={sg:['domus','domūs','domuī','domum','domō','domus'],pl:['domūs','domuum','domibus','domōs','domibus','domūs']};['sg','pl'].forEach(k=>F[k].forEach((f,i)=>add(f,w.lem,w.mean,{k:'n',c:CS[i],n:k,g:'f'},{w})));add('domī',w.lem,'at home',{k:'adv'},{w})}}
  // gerunds & gerundives
  VERBS.forEach(v=>{try{const w=VBY.get(v.lem),X={w,verb:v},st=v.root+{1:'and',2:'end',3:'end','3io':'iend',4:'iend'}[v.c];
   [['Gen','ī'],['Dat','ō'],['Acc','um'],['Abl','ō']].forEach(([c,e])=>add(st+e,v.lem,v.mean,{k:'nf',lab:'gerund',c,n:'sg',g:'n'},X));
   const d=declineAdj({t:'12',parts:[st+'us',st+'a',st+'um']});['m','f','n'].forEach(g=>['sg','pl'].forEach(k=>CS.forEach((c,i)=>add(d[g][k][i],v.lem,v.mean,{k:'part',pt:'gerv',c,n:k,g},X))))}catch(e){}});
  // semi-deponents: present system only
  VOCAB.filter(w=>w.code==='vsd').forEach(w=>{try{const p=w.lem.split(', '),c=/āre$/.test(p[1])?1:/ēre$/.test(p[1])&&/eō$/.test(p[0])?2:/īre$/.test(p[1])?4:/iō$/.test(p[0])?'3io':3;const v=makeVerb([p[0],p[1]],c,false);
   [['ind',['pres','impf','fut']],['sub',['pres','impf']]].forEach(([m,ts])=>ts.forEach(t=>{const f=conj(v,m,t,'A');if(f)f.forEach((x,i)=>add(x,w.lem,w.mean,{k:'v',p:i%3+1,n:i<3?'sg':'pl',t,vo:'A',m},{w,verb:v}))}))}catch(e){}});
  // comparatives & superlatives
  const IRCMP={'bonus':['melior','optim'],'malus':['peior','pessim'],'magnus':['maior','maxim'],'parvus':['minor','minim'],'multus':[null,'plūrim']};
  ADJS.forEach(a=>{try{const w=VBY.get(a.lem),X={w,adj:a},p=a.parts;let st,sup;
   if(a.t==='12'){st=p[1].slice(0,-1);sup=/er$/.test(p[0])?p[0]+'rim':st+'issim'}
   else{st=p.length===3?p[1].slice(0,-2):p[1].endsWith('e')?p[0].slice(0,-2):p[1].slice(0,-2);sup=p.length===3?p[0]+'rim':/ilis$/.test(p[0])&&/^(facil|difficil|simil|dissimil|gracil|humil)/.test(p[0])?st+'lim':st+'issim'}
   let cm=st+'ior';const ir=IRCMP[p[0]];if(ir){if(ir[0])cm=ir[0];else cm=null;sup=ir[1]}
   if(cm){const b=cm.slice(0,-2),F={sg:[cm,b+'iōris',b+'iōrī',b+'iōrem',b+'iōre',cm],pl:[b+'iōrēs',b+'iōrum',b+'iōribus',b+'iōrēs',b+'iōribus',b+'iōrēs']},N={sg:[b+'ius',b+'iōris',b+'iōrī',b+'ius',b+'iōre',b+'ius'],pl:[b+'iōra',b+'iōrum',b+'iōribus',b+'iōra',b+'iōribus',b+'iōra']};
    ['sg','pl'].forEach(k=>CS.forEach((c,i)=>{['m','f'].forEach(g=>add(F[k][i],a.lem,a.mean,{k:'adj',c,n:k,g,deg:'comp'},X));add(N[k][i],a.lem,a.mean,{k:'adj',c,n:k,g:'n',deg:'comp'},X)}))}
   const d=declineAdj({t:'12',parts:[sup+'us',sup+'a',sup+'um']});['m','f','n'].forEach(g=>['sg','pl'].forEach(k=>CS.forEach((c,i)=>add(d[g][k][i],a.lem,a.mean,{k:'adj',c,n:k,g,deg:'sup'},X))))}catch(e){}});
  Object.entries(PRON).forEach(([name,p])=>{const w=VOCAB.find(x=>x.lem.split(',')[0]===name.split(/[ ,]/)[0]);
   Object.entries(p.rows).forEach(([c,row])=>row.forEach((cell,i)=>String(cell).split('/').forEach(x=>{x=x.replace(/\(.*?\)/g,'').trim();if(x&&!x.startsWith('=')&&x!=='—')add(x,w?w.lem:name,w?w.mean:'pronoun',{k:'pron',c,col:p.cols[i]},{w,pron:name})})))});
 }
 build();
 function look(word){const w=word.replace(/[^A-Za-zĀ-ſ]/g,'');if(!w)return null;let r=IDX.get(key(w));
  if(!r){for(const enc of ['que','ne','ve']){if(key(w).endsWith(enc)&&key(w).length>enc.length+1){const base=IDX.get(key(w).slice(0,-enc.length));if(base)return {hits:base,enc,word:w.slice(0,-enc.length)};}}return null}
  return {hits:r,enc:null,word:w};}
 // exact-form analyses (respecting macrons when the word has them)
 function exactAn(h,word){const lw=word.toLowerCase(),hasMac=/[āēīōū]/i.test(word);let ex=h.an.filter(a=>a.f===lw);if(!ex.length)ex=hasMac?[]:h.an.filter(a=>key(a.f)===key(lw));if(!ex.length&&!hasMac)ex=h.an;return ex}

 // ---------- plain English ----------
 const IRV={be:['was','been','being'],go:['went','gone','going'],see:['saw','seen','seeing'],give:['gave','given','giving'],take:['took','taken','taking'],write:['wrote','written','writing'],do:['did','done','doing'],know:['knew','known','knowing'],come:['came','come','coming'],run:['ran','run','running'],find:['found','found','finding'],hear:['heard','heard','hearing'],say:['said','said','saying'],lead:['led','led','leading'],send:['sent','sent','sending'],hold:['held','held','holding'],fight:['fought','fought','fighting'],teach:['taught','taught','teaching'],seek:['sought','sought','seeking'],think:['thought','thought','thinking'],make:['made','made','making'],have:['had','had','having'],put:['put','put','putting'],read:['read','read','reading'],throw:['threw','thrown','throwing'],fall:['fell','fallen','falling'],sing:['sang','sung','singing'],rise:['rose','risen','rising'],sit:['sat','sat','sitting'],stand:['stood','stood','standing'],leave:['left','left','leaving'],feel:['felt','felt','feeling'],sleep:['slept','slept','sleeping'],flee:['fled','fled','fleeing'],begin:['began','begun','beginning'],get:['got','got','getting'],tell:['told','told','telling'],speak:['spoke','spoken','speaking'],choose:['chose','chosen','choosing'],drive:['drove','driven','driving'],break:['broke','broken','breaking'],build:['built','built','building'],keep:['kept','kept','keeping'],lose:['lost','lost','losing'],bear:['bore','borne','bearing'],set:['set','set','setting'],cut:['cut','cut','cutting'],eat:['ate','eaten','eating'],drink:['drank','drunk','drinking'],grow:['grew','grown','growing'],win:['won','won','winning'],catch:['caught','caught','catching'],bring:['brought','brought','bringing'],buy:['bought','bought','buying'],die:['died','died','dying'],lie:['lay','lain','lying'],swim:['swam','swum','swimming'],strike:['struck','struck','striking'],seize:['seized','seized','seizing'],shine:['shone','shone','shining'],become:['became','become','becoming'],forget:['forgot','forgotten','forgetting'],dare:['dared','dared','daring']};
 const KEEP_CVC={stop:1,plan:1,rub:1,hit:1,beg:1,drag:1,admit:1,prefer:1,omit:1};
 function vparts(base){const w=base.split(' '),h=w[0],rest=w.slice(1).join(' ');let r=IRV[h];
  if(!r){let ed,ing;if(/e$/.test(h)){ed=h+'d';ing=/ee$/.test(h)?h+'ing':h.slice(0,-1)+'ing'}else if(/[^aeiou]y$/.test(h)){ed=h.slice(0,-1)+'ied';ing=h+'ing'}else if(KEEP_CVC[h]){ed=h+h.slice(-1)+'ed';ing=h+h.slice(-1)+'ing'}else{ed=h+'ed';ing=h+'ing'}r=[ed,ed,ing]}
  const s3=h==='be'?'is':h==='have'?'has':/(s|x|z|ch|sh|o)$/.test(h)?h+'es':/[^aeiou]y$/.test(h)?h.slice(0,-1)+'ies':h+'s';
  const j=x=>rest?x+' '+rest:x;return {base:j(h),s3:j(s3),past:j(r[0]),pp:j(r[1]),ing:j(r[2])}}
 function vbase(mean){let m=String(mean||'').split(/[;,]/)[0].replace(/\(.*?\)/g,'').replace(/^to /,'').trim();if(/^(be able)$/.test(m))return 'be able';return m||'do'}
 const SUBJ={1:{sg:'I',pl:'we'},2:{sg:'you',pl:'you (all)'},3:{sg:'he / she / it',pl:'they'}};
 function eng(a,h){
  if(a.k==='v'){let b=vbase(h.mean);if(a.irr==='sum')b='be';if(a.irr==='possum')b='be able';const V=vparts(b),sj=SUBJ[a.p][a.n],third=a.p===3&&a.n==='sg',act=a.vo==='A'||a.dep;
   const be={pres:a.p===1&&a.n==='sg'?'am':third?'is':'are',past:(a.p===1||third)&&a.n==='sg'?'was':'were'};
   if(b==='be'){const T={pres:be.pres,impf:be.past,fut:'will be',perf:be.past,plup:'had been',futp:'will have been'};if(a.m==='sub')return sj+' '+({pres:'may be',impf:'would be / were',perf:'may have been',plup:'would have been / had been'}[a.t]||'');return sj+' '+T[a.t]}
   if(b==='be able'){const T={pres:be.pres+' able, can',impf:be.past+' able, could',fut:'will be able',perf:'was able, could',plup:'had been able',futp:'will have been able'};if(a.m==='sub')return sj+' '+({pres:'may be able',impf:'could / would be able',perf:'may have been able',plup:'could have / had been able'}[a.t]||'');return sj+' '+T[a.t]}
   if(a.m==='ind'){if(act)return sj+' '+({pres:third?V.s3:V.base,impf:be.past+' '+V.ing,fut:'will '+V.base,perf:V.past,plup:'had '+V.pp,futp:'will have '+V.pp}[a.t]);
    return sj+' '+({pres:be.pres+' '+V.pp,impf:be.past+' being '+V.pp,fut:'will be '+V.pp,perf:be.past+' '+V.pp,plup:'had been '+V.pp,futp:'will have been '+V.pp}[a.t])}
   if(act)return sj+' '+({pres:'may '+V.base,impf:'would / might '+V.base,perf:'may have '+V.pp,plup:'would have / had '+V.pp}[a.t]);
   return sj+' '+({pres:'may be '+V.pp,impf:'would / might be '+V.pp,perf:'may have been '+V.pp,plup:'would have been / had been '+V.pp}[a.t])}
  if(a.k==='imp'){const V=vparts(vbase(h.mean));return V.base+'!'+(a.n==='pl'?' (to several people)':' (to one person)')}
  if(a.k==='part'){const V=vparts(vbase(h.mean));if(a.pt==='pres')return V.ing;if(a.pt==='gerv')return 'to be '+V.pp+', needing to be '+V.pp;if(a.pt==='fut')return 'about to '+V.base;return a.dep?'having '+V.pp:'having been '+V.pp+', '+V.pp}
  if(a.k==='nf'){const V=vparts(vbase(h.mean)),l=a.lab;
   if(/gerundive/.test(l))return 'to be '+V.pp+', needing to be '+V.pp;if(/gerund/.test(l))return a.c==='Acc'?'(ad + ) for '+V.ing:a.c==='Dat'||a.c==='Abl'?'by '+V.ing+', for '+V.ing:'of '+V.ing;
   if(/future/.test(l))return 'to be about to '+V.base;if(/perfect passive/.test(l)||(/perfect/.test(l)&&a.dep))return a.dep?'to have '+V.pp:'to have been '+V.pp;if(/perfect/.test(l))return 'to have '+V.pp;
   if(/passive/.test(l))return 'to be '+V.pp;return 'to '+V.base}
  return null}
 const PLI={man:'men',woman:'women',child:'children',foot:'feet',person:'people',tooth:'teeth',mouse:'mice',ox:'oxen',wife:'wives',life:'lives',knife:'knives',leaf:'leaves',wolf:'wolves',half:'halves',thief:'thieves',sheep:'sheep',fish:'fish',deer:'deer',people:'peoples',goddess:'goddesses',army:'armies',city:'cities',enemy:'enemies'};
 function plur(w){const p=w.split(' '),l=p.pop();let r=PLI[l]||(/[^aeiou]y$/.test(l)?l.slice(0,-1)+'ies':/(s|x|z|ch|sh)$/.test(l)?l+'es':l+'s');return p.concat(r).join(' ')}
 function nbase(mean){return String(mean||'').split(/[;,]/)[0].replace(/\(.*?\)/g,'').replace(/^(a|an|the) /,'').trim()}
 function caseEng(c,num,word,proper){const the=proper?'':'the ';const W=num==='pl'&&!proper?plur(word):word;
  return {Nom:the+W+' (subject: doing the action)',Gen:'of '+the+W,Dat:'to / for '+the+W,Acc:the+W+' (object: receiving the action)',Abl:'by / with / from '+the+W,Voc:'O '+W+'!'}[c]}
 function degEng(W,d){const w=W.split(/[,;]/)[0].trim(),IR={good:['better','best'],bad:['worse','worst'],big:['bigger','biggest'],great:['greater','greatest'],small:['smaller','smallest'],much:['more','most'],many:['more','most']};if(IR[w])return IR[w][d==='comp'?0:1];
  if(w.split(' ').length>1||w.length>7)return (d==='comp'?'more ':'most / very ')+w;const b=/e$/.test(w)?w.slice(0,-1):/[^aeiou]y$/.test(w)?w.slice(0,-1)+'i':/^[^aeiou]*[aeiou][bdgmnpt]$/.test(w)?w+w.slice(-1):w;return d==='comp'?b+'er':b+'est, very '+w}
 function adjEng(a,W){const who=(a.n==='sg'?'one ':'several ')+({m:'masculine',f:'feminine',n:'neuter'}[a.g]||'')+(a.n==='sg'?' thing':' things');const x=W+' …';
  return ({Nom:'the '+x+' (subject)',Gen:'of the '+x,Dat:'to / for the '+x,Acc:'the '+x+' (object)',Abl:'by / with / from the '+x,Voc:'O '+x+'!'}[a.c])+'  — describing '+who}
 const PRW={'ego / tū':{ego:['I','me','of me','to / for me','by / with / from me'],'tū':['you','you','of you','to / for you','by / with / from you'],'nōs':['we','us','of us','to / for us','by / with / from us'],'vōs':['you (all)','you (all)','of you (all)','to / for you (all)','by / with / from you (all)']},
  'suī (reflexive)':{'*':['—','himself / herself / themselves','of himself / herself','to / for himself / herself','by / with / from himself / herself']}};
 const PRB={'hic, haec, hoc':'this','ille, illa, illud':'that','ipse, ipsa, ipsum':'… himself / herself / itself','īdem, eadem, idem':'the same','quī, quae, quod':'who / which','quis, quid (interrogative)':'who? / what?','ūnus, duo, trēs':'one / two / three'};
 function pronEng(a,h){const nm=h.pron,ci={Nom:0,Acc:1,Gen:2,Dat:3,Abl:4}[a.c];if(ci==null)return null;
  if(PRW[nm]){const t=PRW[nm][a.col]||PRW[nm]['*'];return t&&t[ci]}
  if(nm==='is, ea, id'){const pl=/pl/.test(a.col),g=(a.col||'')[0];const sub=pl?'they':g==='f'?'she':g==='n'?'it':'he',obj=pl?'them':g==='f'?'her':g==='n'?'it':'him',pos=pl?'their':g==='f'?'her':g==='n'?'its':'his';
   return [sub+' (subject) / this, that',obj+' (object)',pos+' (of '+obj+')','to / for '+obj,'by / with / from '+obj][ci]}
  const b=PRB[nm]||nbase(h.mean);return [b+' (subject)',b+' (object)','of '+b,'to / for '+b,'by / with / from '+b][ci]+(a.col?'  — '+a.col:'')}
 const CL={Nom:'subject',Gen:'"of"',Dat:'"to / for"',Acc:'object',Abl:'"by / with / from"',Voc:'calling'};
 const CN={Nom:'nominative',Gen:'genitive',Dat:'dative',Acc:'accusative',Abl:'ablative',Voc:'vocative'};
 const GN={m:'masculine',f:'feminine',n:'neuter',mf:'masculine / feminine'};
 const TN={pres:'present',impf:'imperfect',fut:'future',perf:'perfect',plup:'pluperfect',futp:'future perfect'};
 function family(h){const w=h.w,c=w&&w.code||'';
  if(h.noun||/^n[1-5]/.test(c)){const d=(h.noun&&h.noun.d)||+c[1];const g=h.noun?h.noun.g:(w&&(w.lem.match(/, (m|f|n)\b/)||[])[1]);return 'noun · '+['','1st','2nd','3rd','4th','5th'][d]+' declension'+(g?' · '+GN[g]:'')}
  if(h.verb){return (h.verb.dep?'deponent verb':'verb')+' · '+({1:'1st',2:'2nd',3:'3rd','3io':'3rd (-iō)',4:'4th'}[h.verb.c])+' conjugation'}
  if(h.irr)return 'irregular verb';if(h.adj)return 'adjective · '+(h.adj.t==='12'?'1st/2nd declension (-us, -a, -um)':'3rd declension');if(h.pron)return 'pronoun';
  return ({adv:'adverb',prep:'preposition',conj:'conjunction',num:'number',pron:'pronoun'})[c]||(c?POS(c):'')||''}
 function dict(h){const w=h.w;if(w)return w.lem;return h.lemma}
 function tableFor(h){try{if(h.noun)return nounTable(h.noun);if(h.adj)return adjTable(h.adj);if(h.verb){const v=h.verb;return verbTable(v,'ind',v.dep?'P':'A',TENSES.ind)+verbTable(v,'sub',v.dep?'P':'A',TENSES.sub)+(v.dep?'':verbTable(v,'ind','P',TENSES.ind))+nfList(v)}if(h.irr)return irrTable(h.irr);if(h.pron)return pronTable(h.pron)}catch(e){}return ''}
 window.LEX={look,exactAn,eng,family,CN,CL};
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
 function scan(){pend=0;try{wrapLatin(main);if(window.tagAll)window.tagAll(main);wrapTerms(main)}catch(e){}}
 new MutationObserver(()=>{if(!pend)pend=requestAnimationFrame(scan)}).observe(main,{childList:true,subtree:true});
 scan();

 // ---------- the bubble ----------
 const gb=document.createElement('div');gb.id='gb';gb.setAttribute('role','dialog');gb.hidden=true;document.body.appendChild(gb);
 let cur=null,hideT=0;
 function html(el){
  if(el.classList.contains('gt')){const k=el.dataset.k;return '<div class="gbk">Grammar</div><div class="gbh">'+esc(k.charAt(0).toUpperCase()+k.slice(1))+'</div><div class="gbx gbt">'+esc(G[k]||'')+'</div>';}
  const r=look(el.textContent);if(!r)return null;TAB=[];
  const hits=r.hits.slice(0,2);const RC={subj:'Nom',pred:'Nom',obj:'Acc',accs:'Acc',gen:'Gen',dat:'Dat',abl:'Abl',abs:'Abl',voc:'Voc'}[(el.dataset.role||'').split('|')[0]];
  const out=hits.map((h,hi)=>{const ex=exactAn(h,r.word);
   const lines=[],tech=[];const seenL=new Set();
   ex.forEach(a=>{let e=null,t='';
    if(a.k==='n'){const W=nbase(h.mean);e=caseEng(a.c,a.n,W,/^[A-ZĀ-Ū]/.test(h.lemma));t=CN[a.c]+' '+(a.n==='sg'?'singular':'plural')}
    else if(a.k==='adj'){let W=nbase(h.mean);if(a.deg)W=degEng(W,a.deg);e=adjEng(a,W);t=(a.deg==='comp'?'comparative · ':a.deg==='sup'?'superlative · ':'')+GN[a.g]+' '+CN[a.c]+' '+(a.n==='sg'?'singular':'plural')}
    else if(a.k==='pron'){e=pronEng(a,h)||CL[a.c]+' form';t=CN[a.c]+(a.col?' · '+a.col:'')}
    else{e=eng(a,h);t=a.k==='v'?(a.p+(a.p===1?'st':a.p===2?'nd':'rd')+' person '+(a.n==='sg'?'singular':'plural')+' · '+TN[a.t]+(a.dep||a.irr?'':a.vo==='A'?' active':' passive')+(a.m==='ind'?'':' subjunctive')):a.k==='part'?({pres:'present participle',perf:a.dep?'perfect participle':'perfect passive participle',fut:'future participle',gerv:'gerundive'}[a.pt])+(a.c&&a.pt!=='pres'?' · '+GN[a.g]+' '+CN[a.c]+' '+(a.n==='sg'?'sg.':'pl.'):''):a.k==='imp'?'imperative':a.lab+(a.c?' · '+CN[a.c]:'')}
    if(a.k==='n'&&a.c==='Voc'&&ex.some(b=>b.k==='n'&&b.c==='Nom'&&b.n===a.n))return;
    if(e&&!seenL.has(e)){seenL.add(e);lines.push([e,t,RC&&a.c===RC])}});
   const nOn=lines.filter(x=>x[2]).length;if(nOn&&nOn<lines.length)lines.sort((a,b)=>b[2]-a[2]);else lines.forEach(x=>x[2]=false);const anyOn=lines.some(x=>x[2]);
   const fam=family(h),tb=tableFor(h);if(tb)TAB[hi]={h,tb};
   return '<div class="gbi"><div class="gbtop"><span class="gbh la">'+esc(r.word)+'</span>'+(fam?'<span class="gbpos">'+esc(fam)+'</span>':'')+'</div>'+
    '<div class="gbm">'+esc(meanLine(h.mean))+'</div>'+
    (lines.length?'<div class="gbk2">'+(lines.length>1?'Here it can mean':'Here it means')+'</div><ul class="gbl2">'+lines.slice(0,5).map(x=>'<li'+(x[2]?' class="on"':'')+'><span>'+esc(x[0])+'</span>'+(x[1]?'<small>'+esc(x[1])+'</small>':'')+'</li>').join('')+'</ul>':'')+
    (lines.length>1?'<div class="gbhint">'+(anyOn?'Highlighted: the meaning it has in this sentence.':'Which one? The rest of the sentence decides.')+'</div>':'')+
    '<div class="gbd"><span>Dictionary:</span> <span class="la">'+esc(dict(h))+'</span></div>'+
    '<div class="gbb">'+(tb?'<button class="gbbtn" data-tab="'+hi+'">Full table</button>':'')+(h.w&&typeof S!=='undefined'?'<button class="gbbtn ghost" data-srs="'+h.w.id+'">'+(S.srs[h.w.id]?'In your words ✓':'Add to my words')+'</button>':'')+'</div></div>'}).join('');
  const ri=window.roleInfo&&window.roleInfo(el.dataset.role);
  return (ri?'<div class="gbrole r-'+el.dataset.role.split('|')[0]+'"><b>In this sentence: '+esc(ri.name)+'</b><span>'+esc(ri.why)+'</span></div>':'')+out+(r.enc?'<div class="gbx">+ <b>-'+r.enc+'</b> on the end = '+({que:'"and" (joins this word to the one before)',ne:'turns the sentence into a yes/no question',ve:'"or"'}[r.enc])+'</div>':'')+
   (r.hits.length>2?'<div class="gbx">Also could be: '+r.hits.slice(2).map(h=>esc(h.lemma.split(',')[0])+' ('+esc(meanLine(h.mean))+')').join(', ')+'</div>':'');}
 let TAB=[];
 function tableSheet(i){const t=TAB[i];if(!t)return;hide();const sh=document.createElement('div');sh.className='tsh';sh.innerHTML='<div class="tsc"></div><div class="tsp"><div class="tsg"></div><div class="tshd"><div><div class="gbk">Full table</div><div class="gbh la">'+esc(dict(t.h))+'</div><div class="gbm">'+esc(meanLine(t.h.mean))+'</div></div><button class="ic tsx" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div><div class="tsb">'+t.tb.replace(/<table/g,'<div class=scroll><table').replace(/<\/table>/g,'</table></div>')+'</div></div>';
  document.body.appendChild(sh);requestAnimationFrame(()=>sh.classList.add('in'));const close=()=>{sh.classList.remove('in');sh.classList.add('out');setTimeout(()=>sh.remove(),230)};
  sh.querySelector('.tsc').onclick=close;sh.querySelector('.tsx').onclick=close;window.addEventListener('hashchange',close,{once:true})}
 document.addEventListener('click',e=>{const b=e.target.closest('#gb [data-tab]');if(b){tableSheet(+b.dataset.tab);return}
  const s2=e.target.closest('#gb [data-srs]');if(s2&&typeof S!=='undefined'){const id=+s2.dataset.srs;if(!S.srs[id]){S.srs[id]={b:0,due:today()};save()}s2.textContent='In your words ✓'}},true);
 function show(el){const h=html(el);if(!h)return;clearTimeout(hideT);if(cur)cur.classList.remove('gon');cur=el;el.classList.add('gon');
  gb.innerHTML=h;gb.hidden=false;gb.classList.remove('out');gb.style.visibility='hidden';gb.style.left='0px';gb.style.top='0px';
  const r=el.getBoundingClientRect(),w=Math.min(innerWidth>=1000?360:320,innerWidth-24);gb.style.width=w+'px';const bh=gb.offsetHeight;
  const lm=innerWidth>=1000?260:12;let x=Math.max(lm,Math.min(innerWidth-w-12,r.left+r.width/2-w/2)),below=r.bottom+10+bh<innerHeight-80,y=below?r.bottom+10:r.top-10-bh;
  if(y<64)y=r.bottom+10;
  gb.style.left=x+'px';gb.style.top=y+'px';gb.style.setProperty('--ax',Math.max(18,Math.min(w-18,r.left+r.width/2-x))+'px');gb.classList.toggle('up',!below&&y<r.top);
  gb.style.visibility='';gb.classList.remove('in');void gb.offsetWidth;gb.classList.add('in');}
 function hide(){if(gb.hidden)return;if(cur){cur.classList.remove('gon');cur=null}gb.classList.remove('in');gb.classList.add('out');clearTimeout(hideT);hideT=setTimeout(()=>{gb.hidden=true;gb.classList.remove('out')},180);}
 // hover to explain (mouse / trackpad): fades in after a moment, fades out when the pointer leaves the word and the bubble
 const HOV=matchMedia('(hover:hover) and (pointer:fine)');let hovT=0,outT=0,pinned=false;
 const leaveSoon=()=>{clearTimeout(hovT);if(pinned)return;clearTimeout(outT);outT=setTimeout(()=>{if(!pinned)hide()},260)};
 document.addEventListener('mouseover',e=>{if(!HOV.matches)return;if(e.target.closest('#gb')){clearTimeout(outT);return}
  const w=e.target.closest('.gw,.gt');if(!w)return;clearTimeout(outT);if(w===cur)return;if(pinned&&!gb.hidden)return;
  clearTimeout(hovT);hovT=setTimeout(()=>{pinned=false;show(w)},170)});
 document.addEventListener('mouseout',e=>{if(!HOV.matches)return;const from=e.target.closest('.gw,.gt,#gb');if(!from)return;const to=e.relatedTarget&&e.relatedTarget.closest&&e.relatedTarget.closest('.gw,.gt,#gb');
  if(to===from)return;if(to&&to.id==='gb'||to===cur)return;leaveSoon()});
 document.addEventListener('click',e=>{const w=e.target.closest('.gw,.gt');if(w&&!e.target.closest('#gb')){clearTimeout(hovT);clearTimeout(outT);if(w===cur){if(HOV.matches&&!pinned){pinned=true;return}pinned=false;hide();return}pinned=HOV.matches;e.preventDefault();show(w);return}if(!e.target.closest('#gb')){pinned=false;hide()}},true);
 window.addEventListener('scroll',hide,{passive:true});window.addEventListener('hashchange',hide);window.addEventListener('resize',hide);
 document.addEventListener('keydown',e=>{if(e.key==='Escape')hide()});
})();

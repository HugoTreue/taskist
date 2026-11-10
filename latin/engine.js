// ===== Latin morphology engine =====
const CASES=['Nom','Gen','Dat','Acc','Abl','Voc'];
const CASEFULL={Nom:'Nominative',Gen:'Genitive',Dat:'Dative',Acc:'Accusative',Abl:'Ablative',Voc:'Vocative'};
const PERS=['1st sg','2nd sg','3rd sg','1st pl','2nd pl','3rd pl'];
function plain(s){return (s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z\s]/g,' ').replace(/\s+/g,' ').trim();}

// ---------- Nouns ----------
function declineNoun(n){
  const {nom,gen,g,d,i}=n; let s,sg,pl;
  if(d==1){s=gen.slice(0,-2);sg=[nom,s+'ae',s+'ae',s+'am',s+'ā',nom];pl=[s+'ae',s+'ārum',s+'īs',s+'ās',s+'īs',s+'ae'];}
  else if(d==2){s=gen.slice(0,-1);
    if(g=='n'){sg=[nom,gen,s+'ō',nom,s+'ō',nom];pl=[s+'a',s+'ōrum',s+'īs',s+'a',s+'īs',s+'a'];}
    else{let voc=nom;if(nom.endsWith('ius'))voc=nom.slice(0,-3)+'ī';else if(nom.endsWith('us'))voc=nom.slice(0,-2)+'e';
      sg=[nom,gen,s+'ō',s+'um',s+'ō',voc];pl=[s+'ī',s+'ōrum',s+'īs',s+'ōs',s+'īs',s+'ī'];}}
  else if(d==3){s=gen.slice(0,-2);
    if(g=='n'){const np=s+(i?'ia':'a');sg=[nom,gen,s+'ī',nom,s+(i?'ī':'e'),nom];pl=[np,s+(i?'ium':'um'),s+'ibus',np,s+'ibus',np];}
    else{sg=[nom,gen,s+'ī',s+'em',s+'e',nom];pl=[s+'ēs',s+(i?'ium':'um'),s+'ibus',s+'ēs',s+'ibus',s+'ēs'];}}
  else if(d==4){s=gen.slice(0,-2);
    if(g=='n'){sg=[nom,gen,s+'ū',nom,s+'ū',nom];pl=[s+'ua',s+'uum',s+'ibus',s+'ua',s+'ibus',s+'ua'];}
    else{sg=[nom,gen,s+'uī',s+'um',s+'ū',nom];pl=[s+'ūs',s+'uum',s+'ibus',s+'ūs',s+'ibus',s+'ūs'];}}
  else if(d==5){s=gen.slice(0,-2);sg=[nom,gen,gen,s+'em',s+'ē',nom];pl=[nom,s+'ērum',s+'ēbus',nom,s+'ēbus',nom];}
  return {sg,pl};
}

// ---------- Adjectives ----------
function declineAdj(a){
  if(a.t=='12'){const [m,f,n]=a.parts,st=f.slice(0,-1);
    return {m:declineNoun({nom:m,gen:st+'ī',g:'m',d:2}),f:declineNoun({nom:f,gen:st+'ae',g:'f',d:1}),n:declineNoun({nom:n,gen:st+'ī',g:'n',d:2})};}
  // third declension (i-stem)
  let mN,fN,nN,st,p=a.parts;
  if(p.length==3){mN=p[0];fN=p[1];nN=p[2];st=fN.slice(0,-2);}
  else if(p[1].endsWith('e')&&p[0].endsWith('is')){mN=fN=p[0];nN=p[1];st=p[0].slice(0,-2);}
  else{mN=fN=nN=p[0];st=p[1].slice(0,-2);}
  const mf=(nom)=>({sg:[nom,st+'is',st+'ī',st+'em',st+'ī',nom],pl:[st+'ēs',st+'ium',st+'ibus',st+'ēs',st+'ibus',st+'ēs']});
  return {m:mf(mN),f:mf(fN),n:{sg:[nN,st+'is',st+'ī',nN,st+'ī',nN],pl:[st+'ia',st+'ium',st+'ibus',st+'ia',st+'ibus',st+'ia']}};
}

// ---------- Verbs ----------
const VE={
 presA:{1:['ō','ās','at','āmus','ātis','ant'],2:['eō','ēs','et','ēmus','ētis','ent'],3:['ō','is','it','imus','itis','unt'],'3io':['iō','is','it','imus','itis','iunt'],4:['iō','īs','it','īmus','ītis','iunt']},
 presP:{1:['or','āris','ātur','āmur','āminī','antur'],2:['eor','ēris','ētur','ēmur','ēminī','entur'],3:['or','eris','itur','imur','iminī','untur'],'3io':['ior','eris','itur','imur','iminī','iuntur'],4:['ior','īris','ītur','īmur','īminī','iuntur']},
 futA:{1:['ābō','ābis','ābit','ābimus','ābitis','ābunt'],2:['ēbō','ēbis','ēbit','ēbimus','ēbitis','ēbunt'],3:['am','ēs','et','ēmus','ētis','ent'],'3io':['iam','iēs','iet','iēmus','iētis','ient'],4:['iam','iēs','iet','iēmus','iētis','ient']},
 futP:{1:['ābor','āberis','ābitur','ābimur','ābiminī','ābuntur'],2:['ēbor','ēberis','ēbitur','ēbimur','ēbiminī','ēbuntur'],3:['ar','ēris','ētur','ēmur','ēminī','entur'],'3io':['iar','iēris','iētur','iēmur','iēminī','ientur'],4:['iar','iēris','iētur','iēmur','iēminī','ientur']},
 subA:{1:['em','ēs','et','ēmus','ētis','ent'],2:['eam','eās','eat','eāmus','eātis','eant'],3:['am','ās','at','āmus','ātis','ant'],'3io':['iam','iās','iat','iāmus','iātis','iant'],4:['iam','iās','iat','iāmus','iātis','iant']},
 subP:{1:['er','ēris','ētur','ēmur','ēminī','entur'],2:['ear','eāris','eātur','eāmur','eāminī','eantur'],3:['ar','āris','ātur','āmur','āminī','antur'],'3io':['iar','iāris','iātur','iāmur','iāminī','iantur'],4:['iar','iāris','iātur','iāmur','iāminī','iantur']}
};
const IMPV={1:'ā',2:'ē',3:'ē','3io':'iē',4:'iē'};
const SUM={pres:['sum','es','est','sumus','estis','sunt'],impf:['eram','erās','erat','erāmus','erātis','erant'],fut:['erō','eris','erit','erimus','eritis','erunt'],spres:['sim','sīs','sit','sīmus','sītis','sint'],simpf:['essem','essēs','esset','essēmus','essētis','essent']};
const THEMV={1:'ā',2:'ē',3:'e','3io':'e',4:'ī'};
// normalise a vocab verb into {root,c,inf,pst,ppp,dep}
function makeVerb(parts,c,dep){
  if(dep){const pinf=parts[1];const root=(c==3||c=='3io')?pinf.slice(0,-1):pinf.slice(0,-3);
    return {root,c,inf:root+THEMV[c]+'re',pst:null,ppp:parts[2].split(' ')[0].slice(0,-2),dep:true,parts};}
  const inf=parts[1];const p4=parts[3];
  return {root:inf.slice(0,-3),c,inf,pst:parts[2]?parts[2].slice(0,-1):null,ppp:(p4&&p4.endsWith('um'))?p4.slice(0,-2):null,dep:false,parts};
}
const TENSES={ind:['pres','impf','fut','perf','plup','futp'],sub:['pres','impf','perf','plup']};
const TNAME={pres:'Present',impf:'Imperfect',fut:'Future',perf:'Perfect',plup:'Pluperfect',futp:'Future Perfect'};
function conj(v,mood,t,voice){
  const r=v.root,c=v.c;
  if(mood=='ind'){
    if(voice=='A'){
      if(t=='pres')return VE.presA[c].map(e=>r+e);
      if(t=='impf')return ['bam','bās','bat','bāmus','bātis','bant'].map(e=>r+IMPV[c]+e);
      if(t=='fut')return VE.futA[c].map(e=>r+e);
      if(!v.pst)return null;
      if(t=='perf')return ['ī','istī','it','imus','istis','ērunt'].map(e=>v.pst+e);
      if(t=='plup')return SUM.impf.map(e=>v.pst+e);
      if(t=='futp')return ['erō','eris','erit','erimus','eritis','erint'].map(e=>v.pst+e);
    }else{
      if(t=='pres')return VE.presP[c].map(e=>r+e);
      if(t=='impf')return ['bar','bāris','bātur','bāmur','bāminī','bantur'].map(e=>r+IMPV[c]+e);
      if(t=='fut')return VE.futP[c].map(e=>r+e);
      if(!v.ppp)return null;
      const s=SUM[{perf:'pres',plup:'impf',futp:'fut'}[t]];
      return s.map((x,i)=>v.ppp+(i<3?'us ':'ī ')+x);
    }
  }else{
    const ib=v.inf.slice(0,-1);
    if(voice=='A'){
      if(t=='pres')return VE.subA[c].map(e=>r+e);
      if(t=='impf')return ['em','ēs','et','ēmus','ētis','ent'].map(e=>ib+e);
      if(!v.pst)return null;
      if(t=='perf')return ['erim','erīs','erit','erīmus','erītis','erint'].map(e=>v.pst+e);
      if(t=='plup')return ['issem','issēs','isset','issēmus','issētis','issent'].map(e=>v.pst+e);
    }else{
      if(t=='pres')return VE.subP[c].map(e=>r+e);
      if(t=='impf')return ['er','ēris','ētur','ēmur','ēminī','entur'].map(e=>ib+e);
      if(!v.ppp)return null;
      const s=SUM[t=='perf'?'spres':'simpf'];
      return s.map((x,i)=>v.ppp+(i<3?'us ':'ī ')+x);
    }
  }
  return null;
}
function nonFinite(v){
  const r=v.root,c=v.c,o={};
  const pp={1:['āns','antis'],2:['ēns','entis'],3:['ēns','entis'],'3io':['iēns','ientis'],4:['iēns','ientis']}[c];
  const gv={1:'and',2:'end',3:'end','3io':'iend',4:'iend'}[c];
  const pinf={1:'ārī',2:'ērī',3:'ī','3io':'ī',4:'īrī'}[c];
  if(!v.dep){o['Present active infinitive']=v.inf;o['Present passive infinitive']=r+pinf;
    if(v.pst)o['Perfect active infinitive']=v.pst+'isse';
    if(v.ppp){o['Perfect passive infinitive']=v.ppp+'us esse';o['Future active infinitive']=v.ppp+'ūrus esse';}
    o['Present imperative']=v.inf.slice(0,-2)+', '+r+{1:'āte',2:'ēte',3:'ite','3io':'ite',4:'īte'}[c];
  }else{o['Present infinitive']=r+pinf+' (active meaning)';o['Perfect infinitive']=v.ppp+'us esse';o['Future infinitive']=v.ppp+'ūrus esse';
    o['Imperative']=v.inf.slice(0,-2)+'re, '+r+{1:'āminī',2:'ēminī',3:'iminī','3io':'iminī',4:'īminī'}[c];}
  o['Present participle']=r+pp[0]+', '+r+pp[1];
  if(v.ppp){o[v.dep?'Perfect participle (active meaning)':'Perfect passive participle']=v.ppp+'us, -a, -um';o['Future active participle']=v.ppp+'ūrus, -a, -um';}
  o['Gerundive']=r+gv+'us, -a, -um';o['Gerund (gen.)']=r+gv+'ī';
  return o;
}

// ---------- Static tables ----------
const PRON={
 'ego / tū':{cols:['ego','tū','nōs','vōs'],rows:{Nom:['ego','tū','nōs','vōs'],Gen:['meī','tuī','nostrum / nostrī','vestrum / vestrī'],Dat:['mihi','tibi','nōbīs','vōbīs'],Acc:['mē','tē','nōs','vōs'],Abl:['mē','tē','nōbīs','vōbīs']}},
 'suī (reflexive)':{cols:['sg & pl'],rows:{Nom:['—'],Gen:['suī'],Dat:['sibi'],Acc:['sē (sēsē)'],Abl:['sē (sēsē)']}},
 'is, ea, id':{cols:['m sg','f sg','n sg','m pl','f pl','n pl'],rows:{Nom:['is','ea','id','eī/iī','eae','ea'],Gen:['eius','eius','eius','eōrum','eārum','eōrum'],Dat:['eī','eī','eī','eīs/iīs','eīs/iīs','eīs/iīs'],Acc:['eum','eam','id','eōs','eās','ea'],Abl:['eō','eā','eō','eīs/iīs','eīs/iīs','eīs/iīs']}},
 'hic, haec, hoc':{cols:['m sg','f sg','n sg','m pl','f pl','n pl'],rows:{Nom:['hic','haec','hoc','hī','hae','haec'],Gen:['huius','huius','huius','hōrum','hārum','hōrum'],Dat:['huic','huic','huic','hīs','hīs','hīs'],Acc:['hunc','hanc','hoc','hōs','hās','haec'],Abl:['hōc','hāc','hōc','hīs','hīs','hīs']}},
 'ille, illa, illud':{cols:['m sg','f sg','n sg','m pl','f pl','n pl'],rows:{Nom:['ille','illa','illud','illī','illae','illa'],Gen:['illīus','illīus','illīus','illōrum','illārum','illōrum'],Dat:['illī','illī','illī','illīs','illīs','illīs'],Acc:['illum','illam','illud','illōs','illās','illa'],Abl:['illō','illā','illō','illīs','illīs','illīs']}},
 'ipse, ipsa, ipsum':{cols:['m sg','f sg','n sg','m pl','f pl','n pl'],rows:{Nom:['ipse','ipsa','ipsum','ipsī','ipsae','ipsa'],Gen:['ipsīus','ipsīus','ipsīus','ipsōrum','ipsārum','ipsōrum'],Dat:['ipsī','ipsī','ipsī','ipsīs','ipsīs','ipsīs'],Acc:['ipsum','ipsam','ipsum','ipsōs','ipsās','ipsa'],Abl:['ipsō','ipsā','ipsō','ipsīs','ipsīs','ipsīs']}},
 'īdem, eadem, idem':{cols:['m sg','f sg','n sg','m pl','f pl','n pl'],rows:{Nom:['īdem','eadem','idem','eīdem','eaedem','eadem'],Gen:['eiusdem','eiusdem','eiusdem','eōrundem','eārundem','eōrundem'],Dat:['eīdem','eīdem','eīdem','eīsdem','eīsdem','eīsdem'],Acc:['eundem','eandem','idem','eōsdem','eāsdem','eadem'],Abl:['eōdem','eādem','eōdem','eīsdem','eīsdem','eīsdem']}},
 'quī, quae, quod':{cols:['m sg','f sg','n sg','m pl','f pl','n pl'],rows:{Nom:['quī','quae','quod','quī','quae','quae'],Gen:['cuius','cuius','cuius','quōrum','quārum','quōrum'],Dat:['cui','cui','cui','quibus','quibus','quibus'],Acc:['quem','quam','quod','quōs','quās','quae'],Abl:['quō','quā','quō','quibus','quibus','quibus']}},
 'quis, quid (interrogative)':{cols:['m/f sg','n sg','plural'],rows:{Nom:['quis','quid','= quī, quae, quae'],Gen:['cuius','cuius','quōrum, quārum…'],Dat:['cui','cui','quibus'],Acc:['quem','quid','quōs, quās, quae'],Abl:['quō','quō','quibus']}},
 'ūnus, duo, trēs':{cols:['ūnus m','ūna f','ūnum n','duo m','duae f','duo n','trēs m/f','tria n'],rows:{Nom:['ūnus','ūna','ūnum','duo','duae','duo','trēs','tria'],Gen:['ūnīus','ūnīus','ūnīus','duōrum','duārum','duōrum','trium','trium'],Dat:['ūnī','ūnī','ūnī','duōbus','duābus','duōbus','tribus','tribus'],Acc:['ūnum','ūnam','ūnum','duōs','duās','duo','trēs','tria'],Abl:['ūnō','ūnā','ūnō','duōbus','duābus','duōbus','tribus','tribus']}}
};
const IRR={
 sum:{pp:'sum, esse, fuī, futūrus',mean:'be',ind:{pres:'sum es est sumus estis sunt',impf:'eram erās erat erāmus erātis erant',fut:'erō eris erit erimus eritis erunt',perf:'fuī fuistī fuit fuimus fuistis fuērunt'},sub:{pres:'sim sīs sit sīmus sītis sint',impf:'essem essēs esset essēmus essētis essent'},other:'Inf. esse, fuisse, futūrus esse (= fore). Imper. es, este. Fut. part. futūrus.'},
 possum:{pp:'possum, posse, potuī',mean:'be able, can',ind:{pres:'possum potes potest possumus potestis possunt',impf:'poteram poterās poterat poterāmus poterātis poterant',fut:'poterō poteris poterit poterimus poteritis poterunt',perf:'potuī potuistī potuit potuimus potuistis potuērunt'},sub:{pres:'possim possīs possit possīmus possītis possint',impf:'possem possēs posset possēmus possētis possent'},other:'pot- + sum; t becomes s before s. Inf. posse, potuisse. No imperative, no passive.'},
 'eō':{pp:'eō, īre, iī (īvī), itum',mean:'go',ind:{pres:'eō īs it īmus ītis eunt',impf:'ībam ībās ībat ībāmus ībātis ībant',fut:'ībō ībis ībit ībimus ībitis ībunt',perf:'iī īstī iit iimus īstis iērunt'},sub:{pres:'eam eās eat eāmus eātis eant',impf:'īrem īrēs īret īrēmus īrētis īrent'},other:'Inf. īre, īsse, itūrus esse. Imper. ī, īte. Pres. part. iēns, euntis. Gerund eundī. Compounds: abeō, adeō, exeō, redeō, pereō.'},
 'volō':{pp:'volō, velle, voluī',mean:'want, be willing',ind:{pres:'volō vīs vult volumus vultis volunt',impf:'volēbam volēbās volēbat volēbāmus volēbātis volēbant',fut:'volam volēs volet volēmus volētis volent',perf:'voluī voluistī voluit voluimus voluistis voluērunt'},sub:{pres:'velim velīs velit velīmus velītis velint',impf:'vellem vellēs vellet vellēmus vellētis vellent'},other:'Inf. velle, voluisse. Pres. part. volēns.'},
 'nōlō':{pp:'nōlō, nōlle, nōluī',mean:'not want, be unwilling',ind:{pres:'nōlō nōn vīs nōn vult nōlumus nōn vultis nōlunt',impf:'nōlēbam nōlēbās nōlēbat nōlēbāmus nōlēbātis nōlēbant',fut:'nōlam nōlēs nōlet nōlēmus nōlētis nōlent',perf:'nōluī nōluistī nōluit nōluimus nōluistis nōluērunt'},sub:{pres:'nōlim nōlīs nōlit nōlīmus nōlītis nōlint',impf:'nōllem nōllēs nōllet nōllēmus nōllētis nōllent'},other:'Imper. nōlī, nōlīte + infinitive = "don\'t…" (nōlī timēre = don\'t be afraid).'},
 'mālō':{pp:'mālō, mālle, māluī',mean:'prefer',ind:{pres:'mālō māvīs māvult mālumus māvultis mālunt',impf:'mālēbam mālēbās mālēbat mālēbāmus mālēbātis mālēbant',fut:'mālam mālēs mālet mālēmus mālētis mālent',perf:'māluī māluistī māluit māluimus māluistis māluērunt'},sub:{pres:'mālim mālīs mālit mālīmus mālītis mālint',impf:'māllem māllēs māllet māllēmus māllētis māllent'},other:'= magis volō. Often with quam: mālō vincere quam vincī.'},
 'ferō':{pp:'ferō, ferre, tulī, lātum',mean:'carry, bear',ind:{pres:'ferō fers fert ferimus fertis ferunt',impf:'ferēbam ferēbās ferēbat ferēbāmus ferēbātis ferēbant',fut:'feram ferēs feret ferēmus ferētis ferent',perf:'tulī tulistī tulit tulimus tulistis tulērunt'},sub:{pres:'feram ferās ferat ferāmus ferātis ferant',impf:'ferrem ferrēs ferret ferrēmus ferrētis ferrent'},other:'Pres. passive: feror ferris fertur ferimur feriminī feruntur. Inf. ferre, ferrī (pass.), tulisse, lātus esse. Imper. fer, ferte. Otherwise a regular 3rd-conjugation verb.'},
 'fīō':{pp:'fīō, fierī, factus sum',mean:'become, be made, happen',ind:{pres:'fīō fīs fit fīmus fītis fīunt',impf:'fīēbam fīēbās fīēbat fīēbāmus fīēbātis fīēbant',fut:'fīam fīēs fīet fīēmus fīētis fīent',perf:'factus sum, es, est; factī sumus, estis, sunt'},sub:{pres:'fīam fīās fīat fīāmus fīātis fīant',impf:'fierem fierēs fieret fierēmus fierētis fierent'},other:'Serves as the passive of faciō. Inf. fierī. Impersonal fit ut… = it happens that…'},
 'dō':{pp:'dō, dare, dedī, datum',mean:'give',ind:{pres:'dō dās dat damus datis dant',impf:'dabam dabās dabat dabāmus dabātis dabant',fut:'dabō dabis dabit dabimus dabitis dabunt',perf:'dedī dedistī dedit dedimus dedistis dedērunt'},sub:{pres:'dem dēs det dēmus dētis dent',impf:'darem darēs daret darēmus darētis darent'},other:'1st conjugation but with SHORT a everywhere except dās, dā (imper.).'}
};

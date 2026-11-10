// Reader: each text = words "form|gloss" separated by "~"; "/" = line break
const READER=[
{t:'Rōma',lvl:'Level 1 · after lesson 9',src:'Graded text',w:`Rōma|Rōma, -ae f: Rome (nom.)~in|in + abl.: in~Italiā|Italia, -ae f: Italy (abl.)~est.|sum: is~Italia|Italy (nom.)~in|in~Eurōpā|Eurōpa, -ae f: Europe (abl.)~est.|is~Rōma|Rome~magna|magnus, -a, -um: great (fem. nom. sg.)~urbs|urbs, urbis f: city (nom.)~est.|is~In|in~Rōmā|Rome (abl.)~multī|multus: many (masc. nom. pl.)~virī|vir, virī m: men (nom. pl.)~et|and~multae|many (fem. nom. pl.)~fēminae|fēmina: women (nom. pl.)~habitant.|habitō: they live~Mārcus|Marcus (nom.)~puer|puer, -ī m: boy (nom.)~Rōmānus|Roman (masc. nom.)~est.|is~Iūlia|Julia (nom.)~puella|girl (nom.)~Rōmāna|Roman (fem. nom.)~est.|is~Mārcus|Marcus~et|and~Iūlia|Julia~amīcī|amīcus: friends (nom. pl., masc. because mixed)~sunt.|sum: they are`},
{t:'Agricola et lupus',lvl:'Level 2 · after lesson 14',src:'Graded text',w:`Agricola|agricola, -ae m: farmer (nom.)~in|in~agrō|ager, agrī m: field (abl.)~labōrābat.|labōrō: was working (impf.)~Subitō|suddenly~lupum|lupus, -ī m: wolf (acc.)~magnum|big (masc. acc. sg.)~vīdit.|videō: he saw (perf.)~Lupus|wolf (nom.)~ad|ad + acc.: toward~agricolam|farmer (acc.)~currēbat.|currō: was running (impf.)~Agricola|farmer~timēbat,|timeō: was afraid (impf.)~sed|but~nōn|not~fūgit.|fugiō: fled (perf.)~Saxum|saxum, -ī n: rock (acc.)~cēpit|capiō: took (perf.)~et|and~in|in + acc.: at, against~lupum|wolf (acc.)~iēcit.|iaciō: threw (perf.)~Lupus|wolf~territus|terreō: frightened (perf. pass. part., nom.)~in|in + acc.: into~silvam|silva: forest (acc.)~fūgit.|fled~Posteā|afterwards~agricola|farmer~fīliīs|fīlius: to (his) sons (dat. pl.)~suīs|suus: his own (dat. pl.)~omnia|omnis: all things (n. acc. pl.)~nārrāvit.|nārrō: told (perf.)`},
{t:'Lupus et agnus',lvl:'Level 3 · Phaedrus, Fables 1.1.1–3',src:'Phaedrus (1st c. AD), iambic senarii',w:`Ad|ad + acc.: to~rīvum|rīvus, -ī m: stream (acc.)~eundem|īdem: the same (masc. acc.)~lupus|wolf (nom.)~et|and~agnus|agnus, -ī m: lamb (nom.)~vēnerant,|veniō: had come (plup.)~/|~sitī|sitis, -is f: thirst (abl. of cause; i-stem abl. -ī)~compulsī.|compellō: driven (perf. pass. part., nom. pl.)~Superior|higher up (comparative, nom.)~stābat|stō: was standing~lupus,|wolf~/|~longēque|longē: far + -que: and~īnferior|lower down (comparative, nom.)~agnus.|lamb (supply stābat)`},
{t:'Gallia',lvl:'Level 4 · Caesar, Dē Bellō Gallicō 1.1',src:'Julius Caesar (58–50 BC)',w:`Gallia|Gallia, -ae f: Gaul (nom.)~est|is~omnis|omnis: as a whole (nom.)~dīvīsa|dīvidō: divided (perf. pass. part.; est dīvīsa = is divided)~in|in + acc.: into~partēs|pars, partis f: parts (acc. pl.)~trēs,|trēs: three (acc.)~quārum|quī: of which (gen. pl., partitive)~ūnam|ūnus: one (fem. acc.)~incolunt|incolō: (they) inhabit~Belgae,|Belgae: the Belgae (nom.)~aliam|alius: another (fem. acc.)~Aquītānī,|the Aquitani (supply incolunt)~tertiam|tertius: the third (fem. acc.)~quī|who (nom. pl.; antecedent "those" understood)~ipsōrum|ipse: their own (gen. pl.)~linguā|lingua: in language (abl.)~Celtae,|Celts (nom., complement)~nostrā|noster: in our (language) (abl.)~Gallī|Gauls (nom.)~appellantur.|appellō: are called (pres. pass.)~Hī|hic: these (nom. pl.)~omnēs|all~linguā,|in language (abl. of respect)~īnstitūtīs,|īnstitūtum: customs (abl.)~lēgibus|lēx: laws (abl.)~inter|inter + acc.: among~sē|themselves (acc.)~differunt.|differō: differ`},
{t:'Vīvāmus, mea Lesbia',lvl:'Level 4 · Catullus 5.1–3',src:'Catullus (c. 84–54 BC), hendecasyllables',w:`Vīvāmus,|vīvō: let us live (hortatory pres. subj.)~mea|meus: my (voc.)~Lesbia,|Lesbia (voc.)~atque|and~amēmus,|amō: let us love (hortatory subj.)~/|~rūmōrēsque|rūmor, -ōris m: rumours (acc. pl.) + -que~senum|senex, senis m: of old men (gen. pl.)~sevēriōrum|sevērus: rather strict (comparative, gen. pl.)~/|~omnēs|all (acc. pl., with rūmōrēs)~ūnius|ūnus: at one (gen. of value; ī short for meter)~aestimēmus|aestimō: let us value (subj.)~assis!|as, assis m: a penny (gen. of value)`},
{t:'Quō usque tandem',lvl:'Level 5 · Cicero, In Catilīnam 1.1',src:'Cicero (63 BC)',w:`Quō|quō usque: how far, how long~usque|up to~tandem|tandem (in questions): pray, at last~abūtēre,|abūtor (dep. + abl.): will you abuse (fut. 2 sg., = abūtēris)~Catilīna,|Catiline (voc.)~patientiā|patientia: patience (abl. with abūtor)~nostrā?|our (abl.)~Quam|how~diū|long~etiam|still~furor|furor, -ōris m: madness (nom.)~iste|iste: that (of yours) (nom.)~tuus|your (nom.)~nōs|us (acc.)~ēlūdet?|ēlūdō: will mock (fut.)~Quem|quī: what (masc. acc., with fīnem)~ad|ad + acc.: to~fīnem|fīnis, -is m: end (acc.)~sēsē|sē: itself (acc.)~effrēnāta|effrēnātus: unbridled (fem. nom.)~iactābit|iactō: will toss, flaunt (fut.)~audācia?|audācia: recklessness (nom.)`},
{t:'Arma virumque canō',lvl:'Level 6 · Vergil, Aeneid 1.1–4',src:'Vergil (29–19 BC), dactylic hexameter',w:`Arma|arma, -ōrum n pl: arms, warfare (acc.)~virumque|vir: the man (acc.) + -que~canō,|canō: I sing (of)~Trōiae|Trōia: of Troy (gen.)~quī|who (nom.)~prīmus|first (nom.)~ab|ab + abl.: from~ōrīs|ōra, -ae f: shores (abl. pl.)~/|~Ītaliam,|Italia: to Italy (acc. of motion, no prep. in poetry)~fātō|fātum: by fate (abl. of cause)~profugus,|profugus: exiled, a fugitive (nom.)~Lāvīniaque|Lāvīnius: Lavinian (n. acc. pl.) + -que~vēnit|veniō: came (perf.)~/|~lītora,|lītus, -oris n: shores (acc. of motion)~multum|much (adverbial acc.)~ille|he (nom.)~et … et|both … and~terrīs|terra: on lands (abl. of place)~iactātus|iactō: tossed (perf. pass. part.)~et|and~altō|altum, -ī n: on the deep sea (abl.)~/|~vī|vīs f: by the force (abl.)~superum|superī: of the gods above (gen. pl. = superōrum)~saevae|saevus: cruel (gen., with Iūnōnis)~memorem|memor: unforgetting (acc., with īram)~Iūnōnis|Iūnō, -ōnis f: of Juno (gen.)~ob|ob + acc.: on account of~īram;|īra: anger (acc.)`}
];

// Composition: English | accepted Latin answers separated by ";" | lesson #
const COMP_RAW=`The girl is good.|puella bona est|7
The farmers love the land.|agricolae terram amant|5
The sailor is calling the girls.|nauta puellās vocat|5
We are friends.|amīcī sumus;nōs amīcī sumus|6
The boy sees the horse.|puer equum videt|6
The slaves carry water into the town.|servī aquam in oppidum portant|8
The gifts of the gods are great.|dōna deōrum magna sunt|7
The queen was warning the people.|rēgīna populum monēbat|9
The soldiers will fight with the enemy.|mīlitēs cum hostibus pugnābunt|12
The king gives the law to the citizens.|rēx lēgem cīvibus dat|12
We came into the city at night.|nocte in urbem vēnimus|14
He praises himself.|sē laudat|15
These men are not afraid of that danger.|hī illud perīculum nōn timent;hī virī illud perīculum nōn timent|16
The man whom you see is my father.|vir quem vidēs pater meus est|17
The army was led across the river.|exercitus trāns flūmen ductus est|20
Don't be afraid, friends!|nōlīte timēre amīcī|21
I want to read the books of Cicero.|librōs Cicerōnis legere volō|22
Nothing is more beautiful than the sea.|nihil est pulchrius marī;nihil pulchrius est quam mare;nihil est pulchrius quam mare|24
The Romans, having been conquered, fled.|Rōmānī victī fūgērunt|26
After the city was captured, the soldiers departed.|urbe captā mīlitēs discessērunt|27
The poet says that he (himself) is happy.|poēta dīcit sē laetum esse;poēta sē laetum esse dīcit|28
I have heard that the enemy are coming.|audīvī hostēs venīre|28
He uses a sword.|gladiō ūtitur|29
Let us live and let us love.|vīvāmus atque amēmus;vīvāmus et amēmus|31
He came to Rome to see the senate.|Rōmam vēnit ut senātum vidēret;Rōmam vēnit ad senātum videndum|32
The storm was so great that the ships were destroyed.|tanta erat tempestās ut nāvēs dēlērentur;tempestās tanta erat ut nāvēs dēlērentur|33
When Caesar had seen the enemy, he ordered the soldiers to fight.|cum Caesar hostēs vīdisset mīlitēs pugnāre iussit|34
I asked him why he was afraid.|eum rogāvī cūr timēret|35
The general urged the soldiers to fight bravely.|dux mīlitēs hortātus est ut fortiter pugnārent|36
If you were here, you would be happy.|sī hīc essēs laetus essēs;sī hīc essēs laeta essēs|37
I fear that the enemy may come.|timeō nē hostēs veniant|38
We must defend the city.|urbs nōbīs dēfendenda est|39
On the third day they arrived at Rome.|tertiō diē Rōmam pervēnērunt|45`;
const COMP=COMP_RAW.split('\n').map(l=>{const [en,la,ls]=l.split('|');return {en,ans:la.split(';'),ls:+ls};});

// 2-year plan
const PLAN=[
{m:'Months 1–2',l:[1,9],words:120,read:'Rōma (Reader). Companion: Lingua Latina (Ørberg) ch. 1–5.',goal:'Pronounce Latin correctly; 1st & 2nd declensions; present, imperfect, future of 1st/2nd conj.'},
{m:'Months 3–4',l:[10,14],words:250,read:'Agricola et lupus. LLPSI ch. 6–12.',goal:'All 5 declensions; all 4 conjugations; perfect system.'},
{m:'Months 5–6',l:[15,20],words:400,read:'Re-read early texts at speed. LLPSI ch. 13–18.',goal:'Pronouns, relative clauses, the passive.'},
{m:'Months 7–8',l:[21,24],words:550,read:'Phaedrus, Lupus et agnus. LLPSI ch. 19–24.',goal:'Irregular verbs, imperatives, numbers, comparison.'},
{m:'Months 9–10',l:[25,29],words:700,read:'LLPSI ch. 25–30; Fābulae Faciles (Ritchie).',goal:'Infinitives, participles, ablative absolute, indirect statement, deponents.'},
{m:'Months 11–13',l:[30,35],words:850,read:'Finish Familia Rōmāna (ch. 35); Catullus 5.',goal:'Subjunctive forms and main clause types.'},
{m:'Months 14–16',l:[36,40],words:1000,read:'Roma Aeterna (LLPSI II) early chapters; Eutropius.',goal:'Indirect commands, conditionals, gerund/gerundive, relative clauses with the subjunctive.'},
{m:'Months 17–18',l:[41,46],words:1150,read:'Caesar, Dē Bellō Gallicō 1.1–10 (with notes).',goal:'Full syntax of the cases; place & time; impersonal verbs.'},
{m:'Months 19–20',l:[47,48],words:1300,read:'Caesar continued; Cicero, In Catilīnam 1 (selections); Nepos.',goal:'Oratio obliqua, style; read 1 page per day.'},
{m:'Months 21–22',l:[49,50],words:1450,read:'Ovid, Metamorphoses (Pyramus & Thisbe, Daedalus); Catullus.',goal:'Scan hexameter & elegiacs; poetic word order.'},
{m:'Months 23–24',l:[50,50],words:1600,read:'Vergil, Aeneid 1–2; Livy book 1 selections.',goal:'Read authentic authors with a dictionary only. Write one short Latin paragraph per week.'}
];
const DAILY=[['10 min','Words: spaced-repetition review + up to 10 new'],['20 min','Learn: current lesson, then its drill & quiz'],['15–20 min','Read: a Reader text or your companion book'],['5–10 min','Write: 2–3 composition sentences']];

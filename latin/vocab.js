// lemma | meaning | code. Codes: n1 n2 n2n n3 n3i n3n n3ni n4 n4n n5 (x = irregular, kept out of drills)
// v1 v2 v3 v3io v4 (verbs), d1 d2 d3 d3io d4 (deponents), vx irregular, vsd semi-deponent
// a12 a3 (adjectives), a12x/a3x irregular; other: pron adv prep conj num
const VOCAB_RAW=`puella, puellae, f|girl|n1
fēmina, fēminae, f|woman|n1
aqua, aquae, f|water|n1
terra, terrae, f|land, earth|n1
via, viae, f|road, way|n1
vīta, vītae, f|life|n1
patria, patriae, f|homeland|n1
fīlia, fīliae, f|daughter|n1
īra, īrae, f|anger|n1
fāma, fāmae, f|report, rumour, fame|n1
fortūna, fortūnae, f|fortune, luck|n1
glōria, glōriae, f|glory|n1
poena, poenae, f|punishment, penalty|n1
causa, causae, f|cause, reason; case|n1
silva, silvae, f|forest|n1
īnsula, īnsulae, f|island|n1
turba, turbae, f|crowd|n1
cūra, cūrae, f|care, concern|n1
amīcitia, amīcitiae, f|friendship|n1
lingua, linguae, f|tongue, language|n1
littera, litterae, f|letter (of alphabet); pl. a letter, literature|n1
hōra, hōrae, f|hour|n1
porta, portae, f|gate|n1
rēgīna, rēgīnae, f|queen|n1
nauta, nautae, m|sailor|n1
agricola, agricolae, m|farmer|n1
poēta, poētae, m|poet|n1
cōpia, cōpiae, f|abundance; pl. troops, supplies|n1
victōria, victōriae, f|victory|n1
sententia, sententiae, f|opinion, sentence|n1
memoria, memoriae, f|memory|n1
dea, deae, f|goddess|n1
umbra, umbrae, f|shadow, shade|n1
mora, morae, f|delay|n1
amīcus, amīcī, m|friend|n2
dominus, dominī, m|master, lord|n2
servus, servī, m|slave|n2
fīlius, fīliī, m|son|n2
populus, populī, m|people, nation|n2
animus, animī, m|mind, spirit, courage|n2
puer, puerī, m|boy|n2
ager, agrī, m|field|n2
vir, virī, m|man, husband|n2
liber, librī, m|book|n2
oculus, oculī, m|eye|n2
locus, locī, m|place|n2
numerus, numerī, m|number|n2
equus, equī, m|horse|n2
gladius, gladiī, m|sword|n2
nūntius, nūntiī, m|messenger, message|n2
annus, annī, m|year|n2
lūdus, lūdī, m|game; school|n2
mūrus, mūrī, m|wall|n2
socius, sociī, m|ally, companion|n2
lupus, lupī, m|wolf|n2
ventus, ventī, m|wind|n2
cibus, cibī, m|food|n2
deus, deī, m|god (pl. dī, deōrum, dīs)|n2x
bellum, bellī, n|war|n2n
dōnum, dōnī, n|gift|n2n
verbum, verbī, n|word|n2n
cōnsilium, cōnsiliī, n|plan, advice|n2n
perīculum, perīculī, n|danger|n2n
rēgnum, rēgnī, n|kingdom, royal power|n2n
caelum, caelī, n|sky, heaven|n2n
oppidum, oppidī, n|town|n2n
templum, templī, n|temple|n2n
officium, officiī, n|duty|n2n
auxilium, auxiliī, n|help; pl. auxiliary troops|n2n
imperium, imperiī, n|command, power, empire|n2n
studium, studiī, n|eagerness, study|n2n
saxum, saxī, n|rock|n2n
signum, signī, n|sign, signal, standard|n2n
tēlum, tēlī, n|weapon, spear|n2n
ōtium, ōtiī, n|leisure, peace|n2n
arma, armōrum, n pl|arms, weapons|n2x
rēx, rēgis, m|king|n3
lēx, lēgis, f|law|n3
pater, patris, m|father|n3
māter, mātris, f|mother|n3
frāter, frātris, m|brother|n3
soror, sorōris, f|sister|n3
homō, hominis, m|human being, man|n3
mīles, mīlitis, m|soldier|n3
dux, ducis, m|leader, general|n3
cīvitās, cīvitātis, f|state, citizenship|n3
virtūs, virtūtis, f|courage, virtue|n3
lūx, lūcis, f|light|n3
pāx, pācis, f|peace|n3
vōx, vōcis, f|voice|n3
amor, amōris, m|love|n3
labor, labōris, m|work, toil|n3
mōs, mōris, m|custom; pl. character|n3
mulier, mulieris, f|woman|n3
uxor, uxōris, f|wife|n3
cōnsul, cōnsulis, m|consul|n3
legiō, legiōnis, f|legion|n3
ōrātiō, ōrātiōnis, f|speech|n3
ratiō, ratiōnis, f|reason, method|n3
arbor, arboris, f|tree|n3
sōl, sōlis, m|sun|n3
honor, honōris, m|honour, office|n3
timor, timōris, m|fear|n3
pēs, pedis, m|foot|n3
tempestās, tempestātis, f|storm; weather|n3
Caesar, Caesaris, m|Caesar|n3
Cicerō, Cicerōnis, m|Cicero|n3
tempus, temporis, n|time|n3n
corpus, corporis, n|body|n3n
nōmen, nōminis, n|name|n3n
caput, capitis, n|head|n3n
flūmen, flūminis, n|river|n3n
genus, generis, n|kind, race, origin|n3n
iter, itineris, n|journey, route|n3n
opus, operis, n|work|n3n
carmen, carminis, n|song, poem|n3n
scelus, sceleris, n|crime|n3n
lītus, lītoris, n|shore|n3n
cīvis, cīvis, m|citizen|n3i
hostis, hostis, m|enemy (pl. the enemy)|n3i
nāvis, nāvis, f|ship|n3i
urbs, urbis, f|city|n3i
mors, mortis, f|death|n3i
pars, partis, f|part|n3i
gēns, gentis, f|clan, people|n3i
mōns, montis, m|mountain|n3i
ignis, ignis, m|fire|n3i
nox, noctis, f|night|n3i
fīnis, fīnis, m|end; pl. territory|n3i
ars, artis, f|skill, art|n3i
mēns, mentis, f|mind|n3i
caedēs, caedis, f|slaughter|n3i
animal, animālis, n|animal|n3ni
mare, maris, n|sea|n3ni
vīs, —, f|force, violence (acc. vim, abl. vī; pl. vīrēs = strength)|n3x
manus, manūs, f|hand; band of men|n4
exercitus, exercitūs, m|army|n4
cāsus, cāsūs, m|fall, chance, misfortune|n4
senātus, senātūs, m|senate|n4
frūctus, frūctūs, m|fruit, profit|n4
impetus, impetūs, m|attack|n4
metus, metūs, m|fear|n4
spīritus, spīritūs, m|breath, spirit|n4
adventus, adventūs, m|arrival|n4
cornū, cornūs, n|horn; wing of an army|n4n
domus, domūs, f|house, home (loc. domī)|n4x
rēs, reī, f|thing, matter, affair|n5
diēs, diēī, m|day|n5
spēs, speī, f|hope|n5
fidēs, fideī, f|faith, trust|n5
faciēs, faciēī, f|face, appearance|n5
amō, amāre, amāvī, amātum|love|v1
vocō, vocāre, vocāvī, vocātum|call|v1
laudō, laudāre, laudāvī, laudātum|praise|v1
portō, portāre, portāvī, portātum|carry|v1
parō, parāre, parāvī, parātum|prepare|v1
pugnō, pugnāre, pugnāvī, pugnātum|fight|v1
nāvigō, nāvigāre, nāvigāvī, nāvigātum|sail|v1
ambulō, ambulāre, ambulāvī, ambulātum|walk|v1
cōgitō, cōgitāre, cōgitāvī, cōgitātum|think|v1
spectō, spectāre, spectāvī, spectātum|watch, look at|v1
servō, servāre, servāvī, servātum|save, keep|v1
superō, superāre, superāvī, superātum|overcome, surpass|v1
stō, stāre, stetī, statum|stand|v1
nārrō, nārrāre, nārrāvī, nārrātum|tell, narrate|v1
appellō, appellāre, appellāvī, appellātum|call, name|v1
nūntiō, nūntiāre, nūntiāvī, nūntiātum|announce|v1
līberō, līberāre, līberāvī, līberātum|free|v1
oppugnō, oppugnāre, oppugnāvī, oppugnātum|attack|v1
imperō, imperāre, imperāvī, imperātum|command (+dat.)|v1
rogō, rogāre, rogāvī, rogātum|ask|v1
exspectō, exspectāre, exspectāvī, exspectātum|wait for, expect|v1
habitō, habitāre, habitāvī, habitātum|live, dwell|v1
labōrō, labōrāre, labōrāvī, labōrātum|work|v1
temptō, temptāre, temptāvī, temptātum|try, attempt|v1
dēmōnstrō, dēmōnstrāre, dēmōnstrāvī, dēmōnstrātum|show, point out|v1
iuvō, iuvāre, iūvī, iūtum|help|v1
dō, dare, dedī, datum|give|vx
moneō, monēre, monuī, monitum|warn, advise|v2
habeō, habēre, habuī, habitum|have, hold; consider|v2
videō, vidēre, vīdī, vīsum|see; passive: seem|v2
teneō, tenēre, tenuī, tentum|hold|v2
timeō, timēre, timuī|fear|v2
doceō, docēre, docuī, doctum|teach|v2
maneō, manēre, mānsī, mānsum|remain|v2
respondeō, respondēre, respondī, respōnsum|answer|v2
iubeō, iubēre, iussī, iussum|order|v2
moveō, movēre, mōvī, mōtum|move|v2
terreō, terrēre, terruī, territum|frighten|v2
dēbeō, dēbēre, dēbuī, dēbitum|owe; ought|v2
sedeō, sedēre, sēdī, sessum|sit|v2
placeō, placēre, placuī, placitum|please (+dat.)|v2
noceō, nocēre, nocuī, nocitum|harm (+dat.)|v2
persuādeō, persuādēre, persuāsī, persuāsum|persuade (+dat.)|v2
rīdeō, rīdēre, rīsī, rīsum|laugh|v2
augeō, augēre, auxī, auctum|increase|v2
prohibeō, prohibēre, prohibuī, prohibitum|prevent, keep off|v2
dēleō, dēlēre, dēlēvī, dēlētum|destroy|v2
regō, regere, rēxī, rēctum|rule|v3
dūcō, dūcere, dūxī, ductum|lead; consider|v3
mittō, mittere, mīsī, missum|send|v3
scrībō, scrībere, scrīpsī, scrīptum|write|v3
legō, legere, lēgī, lēctum|read; choose|v3
dīcō, dīcere, dīxī, dictum|say|v3
agō, agere, ēgī, āctum|do, drive; spend (time)|v3
petō, petere, petīvī, petītum|seek, ask, attack|v3
vincō, vincere, vīcī, victum|conquer|v3
pōnō, pōnere, posuī, positum|put, place|v3
relinquō, relinquere, relīquī, relictum|leave behind|v3
gerō, gerere, gessī, gestum|carry on, wage (bellum gerere)|v3
currō, currere, cucurrī, cursum|run|v3
cognōscō, cognōscere, cognōvī, cognitum|learn, get to know; perf. know|v3
dēfendō, dēfendere, dēfendī, dēfēnsum|defend|v3
vīvō, vīvere, vīxī, vīctum|live|v3
trādō, trādere, trādidī, trāditum|hand over|v3
quaerō, quaerere, quaesīvī, quaesītum|seek, ask|v3
crēdō, crēdere, crēdidī, crēditum|believe, trust (+dat.)|v3
cadō, cadere, cecidī, cāsum|fall|v3
discēdō, discēdere, discessī, discessum|depart|v3
ostendō, ostendere, ostendī, ostentum|show|v3
surgō, surgere, surrēxī, surrēctum|rise|v3
occīdō, occīdere, occīdī, occīsum|kill|v3
incendō, incendere, incendī, incēnsum|set on fire|v3
tangō, tangere, tetigī, tāctum|touch|v3
cōnstituō, cōnstituere, cōnstituī, cōnstitūtum|decide, establish|v3
tollō, tollere, sustulī, sublātum|raise, remove|v3
contendō, contendere, contendī, contentum|hurry, strive, fight|v3
trahō, trahere, trāxī, tractum|drag, draw|v3
colō, colere, coluī, cultum|cultivate, worship|v3
canō, canere, cecinī, cantum|sing|v3
capiō, capere, cēpī, captum|take, capture|v3io
faciō, facere, fēcī, factum|make, do (imper. fac)|v3io
fugiō, fugere, fūgī, fugitum|flee|v3io
iaciō, iacere, iēcī, iactum|throw|v3io
accipiō, accipere, accēpī, acceptum|receive|v3io
cupiō, cupere, cupīvī, cupītum|desire|v3io
incipiō, incipere, incēpī, inceptum|begin|v3io
rapiō, rapere, rapuī, raptum|seize, snatch|v3io
interficiō, interficere, interfēcī, interfectum|kill|v3io
cōnspiciō, cōnspicere, cōnspexī, cōnspectum|catch sight of|v3io
audiō, audīre, audīvī, audītum|hear|v4
veniō, venīre, vēnī, ventum|come|v4
sentiō, sentīre, sēnsī, sēnsum|feel, perceive|v4
sciō, scīre, scīvī, scītum|know|v4
inveniō, invenīre, invēnī, inventum|find|v4
dormiō, dormīre, dormīvī, dormītum|sleep|v4
mūniō, mūnīre, mūnīvī, mūnītum|fortify|v4
perveniō, pervenīre, pervēnī, perventum|arrive|v4
aperiō, aperīre, aperuī, apertum|open|v4
pūniō, pūnīre, pūnīvī, pūnītum|punish|v4
hortor, hortārī, hortātus sum|encourage, urge|d1
cōnor, cōnārī, cōnātus sum|try|d1
arbitror, arbitrārī, arbitrātus sum|think, judge|d1
mīror, mīrārī, mīrātus sum|wonder at, admire|d1
vereor, verērī, veritus sum|fear, respect|d2
loquor, loquī, locūtus sum|speak|d3
sequor, sequī, secūtus sum|follow|d3
proficīscor, proficīscī, profectus sum|set out|d3
ūtor, ūtī, ūsus sum|use (+abl.)|d3
nāscor, nāscī, nātus sum|be born|d3
morior, morī, mortuus sum|die|d3io
patior, patī, passus sum|suffer, allow|d3io
ēgredior, ēgredī, ēgressus sum|go out|d3io
aggredior, aggredī, aggressus sum|attack|d3io
experior, experīrī, expertus sum|test, try|d4
potior, potīrī, potītus sum|gain possession of (+abl.)|d4
audeō, audēre, ausus sum|dare|vsd
gaudeō, gaudēre, gāvīsus sum|rejoice|vsd
sum, esse, fuī, futūrus|be|vx
possum, posse, potuī|be able|vx
eō, īre, iī, itum|go|vx
volō, velle, voluī|want|vx
nōlō, nōlle, nōluī|not want|vx
mālō, mālle, māluī|prefer|vx
ferō, ferre, tulī, lātum|carry, bear|vx
fīō, fierī, factus sum|become, happen|vx
bonus, bona, bonum|good|a12
malus, mala, malum|bad|a12
magnus, magna, magnum|great, big|a12
parvus, parva, parvum|small|a12
multus, multa, multum|much; pl. many|a12
novus, nova, novum|new|a12
longus, longa, longum|long|a12
altus, alta, altum|high, deep|a12
lātus, lāta, lātum|wide|a12
cārus, cāra, cārum|dear|a12
clārus, clāra, clārum|bright, famous|a12
dūrus, dūra, dūrum|hard|a12
laetus, laeta, laetum|happy|a12
miser, misera, miserum|wretched|a12
līber, lībera, līberum|free|a12
pulcher, pulchra, pulchrum|beautiful|a12
noster, nostra, nostrum|our|a12
vester, vestra, vestrum|your (pl.)|a12
meus, mea, meum|my (voc. m. mī)|a12
tuus, tua, tuum|your (sg.)|a12
suus, sua, suum|his/her/its/their own|a12
antīquus, antīqua, antīquum|ancient|a12
certus, certa, certum|sure, fixed|a12
dignus, digna, dignum|worthy (+abl.)|a12
plēnus, plēna, plēnum|full|a12
medius, media, medium|middle (of)|a12
summus, summa, summum|highest, top of|a12
prīmus, prīma, prīmum|first|a12
superbus, superba, superbum|proud, arrogant|a12
sacer, sacra, sacrum|sacred|a12
aeger, aegra, aegrum|sick|a12
Rōmānus, Rōmāna, Rōmānum|Roman|a12
vērus, vēra, vērum|true|a12
īrātus, īrāta, īrātum|angry|a12
reliquus, reliqua, reliquum|remaining|a12
tantus, tanta, tantum|so great|a12
tōtus, tōta, tōtum|whole (gen. tōtīus, dat. tōtī)|a12x
sōlus, sōla, sōlum|alone, only (gen. -īus)|a12x
nūllus, nūlla, nūllum|no, none (gen. -īus)|a12x
alius, alia, aliud|other, another (gen. alterīus)|a12x
alter, altera, alterum|the other (of two)|a12x
omnis, omne|all, every|a3
fortis, forte|brave, strong|a3
brevis, breve|short|a3
gravis, grave|heavy, serious|a3
facilis, facile|easy|a3
difficilis, difficile|difficult|a3
similis, simile|like, similar (+gen./dat.)|a3
tristis, triste|sad|a3
dulcis, dulce|sweet|a3
nōbilis, nōbile|noble, famous|a3
turpis, turpe|shameful, ugly|a3
mortālis, mortāle|mortal|a3
ācer, ācris, ācre|sharp, fierce|a3
celer, celeris, celere|swift|a3
ingēns, ingentis|huge|a3
potēns, potentis|powerful|a3
fēlīx, fēlīcis|lucky, happy|a3
audāx, audācis|bold|a3
sapiēns, sapientis|wise|a3
vetus, veteris|old (abl. -e, gen.pl. -um)|a3x
ego, meī|I|pron
tū, tuī|you (sg.)|pron
is, ea, id|he, she, it; this, that|pron
hic, haec, hoc|this|pron
ille, illa, illud|that; he, she, it|pron
ipse, ipsa, ipsum|-self, the very|pron
īdem, eadem, idem|the same|pron
quī, quae, quod|who, which, that|pron
quis, quid|who? what?|pron
aliquis, aliquid|someone, something|pron
quisque, quidque|each|pron
nēmō, nēminis|no one|pron
nihil|nothing|pron
suī, sibi, sē|himself, herself, itself, themselves|pron
nōn|not|adv
iam|now, already|adv
nunc|now|adv
tum|then|adv
semper|always|adv
numquam|never|adv
saepe|often|adv
etiam|also, even|adv
tamen|however, nevertheless|adv
sīc|thus, so|adv
ita|so, in this way|adv
tam|so (with adj./adv.)|adv
quam|how; than; as … as possible (+superl.)|adv
bene|well|adv
male|badly|adv
fortiter|bravely|adv
ubi|where; when|adv
ibi|there|adv
hīc|here|adv
deinde|then, next|adv
diū|for a long time|adv
mox|soon|adv
statim|immediately|adv
hodiē|today|adv
crās|tomorrow|adv
herī|yesterday|adv
iterum|again|adv
nōndum|not yet|adv
vix|scarcely|adv
magis|more|adv
maximē|most, especially|adv
quoque|also (follows its word)|adv
cūr|why|adv
nūper|recently|adv
umquam|ever|adv
procul|far off|adv
frūstrā|in vain|adv
paene|almost|adv
ōlim|once, formerly|adv
subitō|suddenly|adv
posteā|afterwards|adv
ā, ab|from, away from; by (agent) (+abl.)|prep
ad|to, toward; for the purpose of (+acc.)|prep
ante|before, in front of (+acc.)|prep
apud|among, at the house of (+acc.)|prep
circum|around (+acc.)|prep
contrā|against (+acc.)|prep
cum|with (+abl.)|prep
dē|down from; about, concerning (+abl.)|prep
ē, ex|out of, from (+abl.)|prep
in|into, onto, against (+acc.); in, on (+abl.)|prep
inter|between, among (+acc.)|prep
ob|on account of (+acc.)|prep
per|through (+acc.)|prep
post|after, behind (+acc.)|prep
prō|in front of; on behalf of (+abl.)|prep
propter|on account of (+acc.)|prep
sine|without (+abl.)|prep
sub|under (+abl. place; +acc. motion)|prep
trāns|across (+acc.)|prep
prope|near (+acc.)|prep
et|and; et … et both … and|conj
atque, ac|and (also)|conj
-que|and (attached to 2nd word)|conj
sed|but|conj
aut|or; aut … aut either … or|conj
nam|for|conj
enim|for, indeed (2nd word)|conj
igitur|therefore (2nd word)|conj
itaque|and so, therefore|conj
autem|however, moreover (2nd word)|conj
quod|because|conj
quia|because|conj
cum|when, since, although (+subj.)|conj
ut|as, when (+indic.); so that, in order that (+subj.)|conj
nē|lest, so that … not, not to (+subj.)|conj
sī|if|conj
nisi|unless, if not|conj
dum|while, until|conj
postquam|after|conj
antequam|before|conj
quamquam|although|conj
neque, nec|and not, nor|conj
-ne|question marker (attached)|conj
nōnne|surely? (expects yes)|conj
num|surely not? (expects no); whether|conj
ūnus|one|num
duo|two|num
trēs|three|num
quattuor|four|num
quīnque|five|num
sex|six|num
septem|seven|num
octō|eight|num
novem|nine|num
decem|ten|num
centum|hundred|num
mīlle (pl. mīlia)|thousand|num
canis, canis, m|dog|n3
mordeō, mordēre, momordī, morsum|bite|v2
cantō, cantāre, cantāvī, cantātum|sing|v1
rosa, rosae, f|rose|n1
Rōma, Rōmae, f|Rome (Rōmae = at Rome)|n1
Mārcus, Mārcī, m|Marcus (a man's name)|n2
Gallia, Galliae, f|Gaul (roughly modern France)|n1
Carthāgō, Carthāginis, f|Carthage|n3
Trōia, Trōiae, f|Troy|n1
mel, mellis, n|honey|n3
pugna, pugnae, f|fight, battle|n1
lēgātus, lēgātī, m|envoy, ambassador|n2
ōra, ōrae, f|shore, coast|n1
stultus, stulta, stultum|foolish|a12
dīves, dīvitis|rich|a3
hūmānus, hūmāna, hūmānum|human|a12
pūblicus, pūblica, pūblicum|public (rēs pūblica = the state)|a12
adversus, adversa, adversum|opposite, hostile|a12
salūtō, salūtāre, salūtāvī, salūtātum|greet|v1
emō, emere, ēmī, ēmptum|buy|v3
errō, errāre, errāvī, errātum|wander; make a mistake|v1
ōrō, ōrāre, ōrāvī, ōrātum|beg, pray|v1
putō, putāre, putāvī, putātum|think|v1
nesciō, nescīre, nescīvī, nescītum|not know|v4
dubitō, dubitāre, dubitāvī, dubitātum|doubt, hesitate|v1
aestimō, aestimāre, aestimāvī, aestimātum|value, judge|v1
discō, discere, didicī|learn|v3
fleō, flēre, flēvī, flētum|weep|v2
impediō, impedīre, impedīvī, impedītum|hinder, block|v4
committō, committere, commīsī, commissum|commit; begin (a battle)|v3
excēdō, excēdere, excessī, excessum|go out, leave|v3
vulnerō, vulnerāre, vulnerāvī, vulnerātum|wound|v1
mentior, mentīrī, mentītus sum|lie, tell a lie|d4
coepī, coepisse|began (perfect only)|vx
pluit, pluere, pluit|it rains|vx
pudet, pudēre, puduit|it shames (mē pudet = I am ashamed)|vx
miseret, miserēre|it moves to pity (mē miseret = I pity)|vx
hūc|to here, hither|adv
satis|enough|adv
quīn|that … not; but that (after doubting)|conj
quōminus|so that … not (after hindering)|conj
orior, orīrī, ortus sum|rise|d4`;
const VOCAB=VOCAB_RAW.split('\n').map((l,ix)=>{const [lem,mean,code]=l.split('|');return {id:ix,lem,mean,code};});
const POS=c=>c[0]=='n'&&c!='num'?'noun':c[0]=='v'||c[0]=='d'?'verb':c[0]=='a'?'adjective':{pron:'pronoun',adv:'adverb',prep:'preposition',conj:'conjunction',num:'numeral'}[c];
function nounOf(w){if(!/^n[1-5]/.test(w.code)||w.code.endsWith('x'))return null;const p=w.lem.split(', ');
  return {nom:p[0],gen:p[1],g:p[2][0],d:+w.code[1],i:w.code.includes('i'),mean:w.mean,lem:w.lem};}
function verbOf(w){const m=w.code.match(/^([vd])(1|2|3io|3|4)$/);if(!m)return null;const v=makeVerb(w.lem.split(', '),m[2]=='3io'?'3io':+m[2],m[1]=='d');v.mean=w.mean;v.lem=w.lem;return v;}
function adjOf(w){if(w.code!='a12'&&w.code!='a3')return null;return {t:w.code.slice(1),parts:w.lem.split(', '),mean:w.mean,lem:w.lem};}
const NOUNS=VOCAB.map(nounOf).filter(Boolean),VERBS=VOCAB.map(verbOf).filter(Boolean),ADJS=VOCAB.map(adjOf).filter(Boolean);

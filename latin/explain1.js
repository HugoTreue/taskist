// Extra explanations per lesson. p = plain-English overview, s = step by step, e = worked examples [latin, english, why], m = mistakes to avoid, h = memory hook
var EXPL=window.EXPL||{};
EXPL[1]={p:'Before grammar, learn to <b>say</b> Latin. It is very regular: every letter is pronounced, always the same way. The only real new skill is noticing <b>long</b> and <b>short</b> vowels. A long vowel is simply held about twice as long, and it is marked with a line (a macron). Getting this right now makes every ending later easier to hear and remember.',
 s:['Say every letter — there are no silent letters. <span class=la>Caesar</span> is "KYE-sar".','<b>c</b> and <b>g</b> are always hard: <span class=la>Cicerō</span> is "KIK-eh-roh".','<b>v</b> sounds like English "w": <span class=la>vīnum</span> = "WEE-num".','Hold long vowels (ā ē ī ō ū) twice as long as short ones.','Stress: if the second-to-last syllable is long, stress it; otherwise stress the one before.'],
 e:[['amīcus','friend','The ī is long, so the stress falls on it: a-MEE-kus.'],['puella / puellā','the girl / by the girl','Only the length of the final a separates two different cases.']],
 m:['Saying c like s (as in "city"). In Classical Latin it is always k.','Ignoring macrons. They are not decoration; they change meaning.'],
 h:'Read every Latin example out loud. Five minutes a day of speaking does more than an hour of silent reading.'};
EXPL[2]={p:'English shows who does what with <b>word order</b>: "the dog bites the man" is different from "the man bites the dog". Latin shows it with <b>endings</b> instead. The end of each word is a label telling you its job. That is why Latin word order can move around freely: the labels travel with the words.',
 s:['Look at the end of each noun first: it tells you the noun\'s job (subject, object…).','Find the verb, usually at the end of the sentence, and check its ending to see who is doing it.','Only then put the sentence into natural English order.'],
 e:[['Canis virum mordet.','The dog bites the man.','canis is the subject form; virum is the object form.'],['Virum canis mordet.','The dog bites the man (and not someone else).','Same endings, so same meaning; moving virum to the front just adds emphasis.']],
 m:['Translating word by word left to right. Read the endings first, then rearrange.','Assuming the first noun is the subject. Check its ending.'],
 h:'Think of endings as name badges: "SUBJECT", "OBJECT". The badge, not the seat, tells you the role.'};
EXPL[3]={p:'A <b>case</b> is the form a noun takes for a particular job. Latin has six. You do not need to memorise abstract rules yet — just link each case to a small English word that it replaces.',
 s:['<b>Nominative</b> = the subject (who does it).','<b>Genitive</b> = "of" (whose).','<b>Dative</b> = "to / for" (who receives).','<b>Accusative</b> = the direct object (what is acted on), and after some prepositions.','<b>Ablative</b> = "by / with / from / in".','<b>Vocative</b> = calling someone by name.'],
 e:[['Puella fīliae rēgīnae rosam dat.','The girl gives a rose to the daughter of the queen.','puella nom. (subject), fīliae dat. (to), rēgīnae gen. (of), rosam acc. (object).']],
 m:['Mixing up dative and ablative: ask whether it means "to/for" (dative) or "by/with/from" (ablative).','Thinking a case equals one English word. The ablative alone covers many ideas; context decides.'],
 h:'Nominative names, Genitive gets ("of"), Dative delivers, Accusative is acted on, Ablative answers "by what?", Vocative calls.'};
EXPL[4]={p:'Nouns come in five families called <b>declensions</b>. The first declension is the easiest: almost all its nouns end in <b>-a</b> and are feminine, like <span class=la>puella</span> (girl). Learn this one pattern well; the other four follow the same idea with different endings.',
 s:['Find the stem: take the genitive <span class=la>puellae</span> and drop -ae → puell-.','Add the endings: sg. -a, -ae, -ae, -am, -ā; pl. -ae, -ārum, -īs, -ās, -īs.','Use context to pick between forms that look the same (puellae can be three things).'],
 e:[['Fēminae aquam portant.','The women carry water.','fēminae must be nominative plural here because the verb portant is plural.'],['Poēta rosās puellae dat.','The poet gives roses to the girl.','poēta is 1st declension but masculine — a handful (poet, sailor, farmer) are.']],
 m:['Forgetting the macron on ablative -ā.','Assuming every -a noun is feminine: nauta, agricola and poēta are masculine.'],
 h:'Chant "a, ae, ae, am, ā — ae, ārum, īs, ās, īs" five times today and once tomorrow. It will stick for life.'};
EXPL[5]={p:'Latin verbs change their ending to show <b>who</b> is doing the action, so the subject pronoun is usually left out: <span class=la>amō</span> already means "I love". This lesson covers the present tense of the two easiest verb families, plus <span class=la>sum</span> (I am), the most common verb of all.',
 s:['Find the stem from the infinitive: <span class=la>amāre</span> → amā-, <span class=la>monēre</span> → monē-.','Add the personal endings: -ō/-m (I), -s (you), -t (he/she/it), -mus (we), -tis (you all), -nt (they).','For sum, just memorise it: sum, es, est, sumus, estis, sunt.'],
 e:[['Amīcōs vocāmus.','We call (our) friends.','-mus = "we", so no word for "we" is needed.'],['Puella laeta est.','The girl is happy.','est links subject and description; laeta stays nominative.']],
 m:['Adding ego for "I" every time. Only use it for emphasis.','Forgetting the ō in 2nd conjugation: it is moneō, not monō.'],
 h:'"-ō, -s, -t, -mus, -tis, -nt" — the same six endings return in almost every tense you will learn.'};
EXPL[6]={p:'The second declension holds most masculine nouns, ending in <b>-us</b> (or -er), like <span class=la>amīcus</span> (friend). Its endings mirror the first declension\'s logic, just with o-sounds. Together, 1st and 2nd declension cover a huge share of everyday Latin.',
 s:['Stem from the genitive: <span class=la>amīcī</span> → amīc-.','Endings: sg. -us, -ī, -ō, -um, -ō; pl. -ī, -ōrum, -īs, -ōs, -īs.','-er nouns: keep or drop the e as the genitive shows (puer, puerī; ager, agrī).','The vocative of -us nouns ends in -e: Mārce!'],
 e:[['Dominus servōs vocat.','The master calls the slaves.','servōs is accusative plural, so it is the object.'],['Puerī in agrō labōrant.','The boys work in the field.','agrō is ablative after in ("in, on"); the e of ager has dropped.']],
 m:['Confusing -ī (genitive singular) with -ī (nominative plural). The verb usually tells you which.','Keeping the e in ager: it is agrī, not agerī.'],
 h:'-ōrum and -ārum both mean "of the …s". Spot "-rum" and think "of".'};
EXPL[7]={p:'Neuter nouns (like <span class=la>bellum</span>, war) follow the 2nd declension but with one golden rule: the nominative and accusative are always the same, and the plural of both ends in <b>-a</b>. This lesson also introduces <b>agreement</b>: an adjective copies the gender, number and case of its noun.',
 s:['Neuter: bellum, bellī, bellō, bellum, bellō; pl. bella, bellōrum, bellīs, bella, bellīs.','To make an adjective agree, find its noun\'s gender, number and case, then pick the matching adjective ending.','The ending may not look the same: agricola bonus (a masculine noun in -a with a masculine adjective in -us).'],
 e:[['Dōna magna sunt.','The gifts are great.','dōna is neuter plural, so magna takes the neuter plural -a.'],['Nauta bonus nāvigat.','The good sailor sails.','nauta is masculine, so the adjective is bonus, not bona.']],
 m:['Reading neuter plural -a as feminine singular.','Matching endings by sight instead of by gender, number and case.'],
 h:'Neuters never "change their face" between subject and object, and in the plural they always wear an -a.'};
EXPL[8]={p:'Prepositions are small words like "in", "to", "from". In Latin each one demands a particular case after it — either the <b>accusative</b> (usually motion towards) or the <b>ablative</b> (usually position or motion away). Learn each preposition together with its case.',
 s:['Learn each preposition with its case: ad + acc. (to), ā/ab + abl. (from), cum + abl. (with), in + acc. (into) / in + abl. (in).','Ask: is there movement towards? Usually accusative. Being somewhere, or moving away? Usually ablative.','Put the noun in that case.'],
 e:[['In silvam currit.','He runs into the forest.','Motion into → in + accusative.'],['In silvā habitat.','He lives in the forest.','Position in → in + ablative.'],['Cum amīcīs ambulō.','I walk with friends.','cum always takes the ablative.']],
 m:['Using the same case after in for both meanings.','Forgetting that ā becomes ab before a vowel (ab urbe).'],
 h:'Accusative = arrow (going towards). Ablative = anchor (staying, or leaving from).'};
EXPL[9]={p:'Two new tenses. The <b>imperfect</b> describes ongoing or repeated past action ("was doing", "used to do"). The <b>future</b> describes what will happen. For the first two conjugations both are easy to spot: <b>-ba-</b> means imperfect, <b>-bi-/-bō/-bu-</b> means future.',
 s:['Imperfect: stem + -ba- + endings (-m, -s, -t, -mus, -tis, -nt): amābam, amābās…','Future (1st/2nd conj.): stem + -bō, -bis, -bit, -bimus, -bitis, -bunt.','sum: imperfect eram…, future erō… (memorise).'],
 e:[['Puellae cantābant.','The girls were singing.','-ba- = imperfect: an ongoing scene.'],['Crās nāvigābimus.','Tomorrow we will sail.','-bi- = future; -mus = we.']],
 m:['Translating the imperfect as a simple one-off past. Prefer "was ___ing" or "used to ___".','Using -bō for 3rd conjugation verbs — they form the future differently (next lessons).'],
 h:'"ba-ba" = back then (imperfect). "bo, bi, bu" = by and by (future).'};
EXPL[10]={p:'The third declension is the biggest and most varied. The nominative can look like almost anything (<span class=la>rēx, corpus, homō</span>), so <b>always learn the genitive</b>: it reveals the real stem. Once you have the stem, the endings are regular.',
 s:['Learn nominative + genitive together: rēx, rēgis.','Stem = genitive minus -is: rēg-.','Endings: sg. (nom.), -is, -ī, -em, -e; pl. -ēs, -um, -ibus, -ēs, -ibus.','Neuters: nom. = acc., plural in -a (corpora).'],
 e:[['Rēx mīlitēs laudat.','The king praises the soldiers.','mīles, mīlitis → stem mīlit-; mīlitēs is accusative plural here.'],['Corpora hominum','the bodies of people','corpus, corporis is neuter: plural -a; hominum = of people.']],
 m:['Guessing the stem from the nominative. Always check the genitive.','Taking -is as a 2nd-person verb ending — in nouns it is the genitive singular.'],
 h:'Third declension: "nominative is a costume, the genitive shows the real face".'};
EXPL[11]={p:'The remaining verb families: 3rd (<span class=la>regō, regere</span>), 3rd -iō (<span class=la>capiō, capere</span>) and 4th (<span class=la>audiō, audīre</span>). Their present tense is a little less tidy than the 1st and 2nd, and their future uses <b>-am, -ēs, -et</b> instead of -bō.',
 s:['Spot the family by the infinitive: -ere with short e (3rd) vs -ēre (2nd); -īre = 4th.','Present 3rd: regō, regis, regit, regimus, regitis, regunt.','Future 3rd/4th: regam, regēs, reget, regēmus, regētis, regent.','3rd -iō and 4th keep an i: capiunt, capiam; audiunt, audiam.'],
 e:[['Dux exercitum dūcet.','The general will lead the army.','dūcet: 3rd conjugation future (-et), not present.'],['Mīlitēs urbem capiunt.','The soldiers capture the city.','capiō is 3rd -iō, so the 3rd pl is capiunt.']],
 m:['Reading 3rd-conjugation futures (-ēs, -et) as presents of 2nd-conjugation verbs. Know which family the verb is.','Forgetting the i in capiunt / audiunt.'],
 h:'For 3rd and 4th, the future goes "a, e, e, e, e, e": regam, regēs, reget…'};
EXPL[12]={p:'Some 3rd-declension nouns are <b>i-stems</b>: they slip an i into a few endings (genitive plural -ium, neuter plural -ia). The same pattern drives 3rd-declension adjectives like <span class=la>fortis</span> (brave), which use one set of endings for all genders except neuter.',
 s:['i-stem clue: the nominative and genitive have the same number of syllables (cīvis, cīvis), or the stem ends in two consonants (urbs, urbis).','i-stem differences: gen. pl. -ium; neuter abl. sg. -ī and nom./acc. pl. -ia.','3rd-declension adjectives: abl. sg. -ī, gen. pl. -ium, neuter pl. -ia.'],
 e:[['Cīvium urbs','the city of the citizens','cīvis is an i-stem, so gen. pl. cīvium.'],['Mīlitēs fortēs','brave soldiers','fortis agrees: masculine accusative/nominative plural.']],
 m:['Writing cīvum instead of cīvium.','Expecting 3rd-declension adjectives to look like their nouns. They agree in case, not in spelling.'],
 h:'"Same syllables or double consonant → slip in an i".'};
EXPL[13]={p:'The last two declensions are small. The <b>4th</b> is full of u\'s (<span class=la>manus, exercitus</span>); the <b>5th</b> is full of e\'s (<span class=la>rēs, diēs, spēs</span>). <span class=la>Rēs</span> is everywhere and means "thing, matter, affair" — translate it flexibly.',
 s:['4th: manus, manūs, manuī, manum, manū; pl. manūs, manuum, manibus, manūs, manibus.','5th: rēs, reī, reī, rem, rē; pl. rēs, rērum, rēbus, rēs, rēbus.','Use the long ū to tell 4th-declension genitive sg. (manūs) from nominative (manus).'],
 e:[['Rēs pūblica','the state (lit. "the public thing")','rēs is very flexible; choose the natural English word.'],['Multīs diēbus','for many days / in many days','diēbus ablative plural (5th decl.).']],
 m:['Confusing manus (nom.) with manūs (gen. sg./plural) when macrons are missing — use context.','Translating rēs always as "thing".'],
 h:'4th declension "u-u-u", 5th declension "e-e-e".'};
EXPL[14]={p:'The <b>perfect</b> system gives completed past actions. Every verb\'s 3rd principal part (e.g. <span class=la>amāvī</span>) gives you the perfect stem, and three tenses are built on it: perfect ("I loved"), pluperfect ("I had loved") and future perfect ("I will have loved").',
 s:['Take the 3rd principal part and drop -ī: amāvī → amāv-.','Perfect: -ī, -istī, -it, -imus, -istis, -ērunt.','Pluperfect: perfect stem + eram, erās, erat…','Future perfect: perfect stem + erō, eris, erit… (3rd pl -erint).'],
 e:[['Caesar urbem cēpit.','Caesar captured the city.','cēpī is the 3rd principal part of capiō; -it = he.'],['Hostēs fūgerant.','The enemy had fled.','fūg- + -erant = pluperfect.']],
 m:['Trying to build the perfect from the present stem. Always use the 3rd principal part.','Mixing up -erant (pluperfect) and -ērunt (perfect).'],
 h:'"Learn four parts, unlock every tense."'};
EXPL[15]={p:'Personal pronouns are words like I, you, we. Latin has them, but the verb ending already shows the person, so they are mainly used for <b>emphasis</b> or in non-subject cases (me, to you, with us). <b>Reflexive</b> pronouns point back to the subject ("himself"). <b>Possessives</b> (my, your, our) are just adjectives.',
 s:['Learn ego / tū and nōs / vōs in all cases.','For "himself/herself/themselves" use sē, suī, sibi — it always refers back to the subject.','Possessive adjectives agree with the thing owned: mea māter (my mother).'],
 e:[['Ego labōrō, tū dormīs.','I am working; you are sleeping.','The pronouns add contrast.'],['Sē laudat.','He praises himself.','sē refers back to the subject.']],
 m:['Using eius for "his own". Use suus when it refers to the subject; eius when it is someone else\'s.','Making a possessive agree with the owner instead of the thing owned.'],
 h:'suus = "his OWN" (subject owns it); eius = "his" (someone else).'};
EXPL[16]={p:'Demonstratives point: "this", "that", "the same", "himself". <span class=la>Hic</span> = this (near me), <span class=la>ille</span> = that (over there), <span class=la>is</span> = this/that or simply "he, she, it", <span class=la>ipse</span> = himself (emphatic), <span class=la>īdem</span> = the same.',
 s:['Learn hic, haec, hoc and ille, illa, illud fully — they appear constantly.','Note the special genitive -īus and dative -ī in all of them.','Used alone, they act as pronouns (ille = he, that man).'],
 e:[['Hic liber meus est, ille tuus.','This book is mine, that one is yours.','Contrast between near and far.'],['Caesar ipse vēnit.','Caesar himself came.','ipse emphasises; it is not reflexive.']],
 m:['Confusing ipse (emphatic "himself") with sē (reflexive "himself").','Mixing hoc (this, neuter) with hōc (ablative).'],
 h:'hic = here, ille = yonder.'};
EXPL[17]={p:'The relative pronoun <span class=la>quī, quae, quod</span> means "who, which, that". It starts a clause that describes a noun. The key rule: it takes its <b>gender and number</b> from the noun it refers to, but its <b>case</b> from its job inside its own clause.',
 s:['Find the antecedent (the noun being described).','Match gender and number to it.','Work out the relative\'s job in its own clause (subject? object?) and choose that case.'],
 e:[['Vir quem vidēs pater meus est.','The man whom you see is my father.','quem is masculine singular (vir) but accusative because it is the object of vidēs.'],['Puella cui librum dedī','the girl to whom I gave the book','cui is dative inside its clause.']],
 m:['Copying the antecedent\'s case.','Translating quod as "because" when it is a relative pronoun (neuter "which").'],
 h:'"Gender and number from the noun; case from its own clause."'};
EXPL[18]={p:'Latin asks questions in a few ways: question words (<span class=la>quis, quid, cūr, ubi</span>), or little markers that show what answer is expected: <span class=la>-ne</span> (neutral), <span class=la>nōnne</span> (expects yes), <span class=la>num</span> (expects no).',
 s:['Neutral yes/no question: add -ne to the first word: Venisne? = Are you coming?','Expecting "yes": nōnne… = surely…?','Expecting "no": num… = surely … not?','Who/what: quis, quid; why: cūr; where: ubi; when: quandō.'],
 e:[['Nōnne fēlīx es?','Surely you are happy? / You are happy, aren\'t you?','nōnne expects yes.'],['Num servus es?','Surely you are not a slave?','num expects no.']],
 m:['Translating num as "now". It marks a question expecting "no".','Forgetting that -ne attaches to the first word.'],
 h:'nōnne = "nod yes", num = "nope".'};
EXPL[19]={p:'In the <b>passive</b>, the subject receives the action: "the city <b>is captured</b>". In the present, imperfect and future, Latin forms the passive just by switching to passive endings: <b>-r, -ris, -tur, -mur, -minī, -ntur</b>. The doer, if mentioned, goes in the ablative with ā/ab (a person) or alone (a thing).',
 s:['Swap the active endings for passive ones: amat → amātur.','Agent (a person): ā/ab + ablative: ā rēge = by the king.','Means (a thing): plain ablative: gladiō = by/with a sword.'],
 e:[['Urbs ab hostibus oppugnātur.','The city is being attacked by the enemy.','-tur = passive; ab hostibus = the agent.'],['Mīles gladiō vulnerātur.','The soldier is wounded by a sword.','gladiō = means, so no preposition.']],
 m:['Using ā/ab for things.','Mistaking -ris (passive 2nd sg) for an adjective ending.'],
 h:'Passive endings sound like a growl: "r, ris, tur, mur, minī, ntur".'};
EXPL[20]={p:'The passive of the perfect tenses is made with two words: the <b>perfect passive participle</b> (4th principal part, e.g. <span class=la>amātus</span>) plus a form of <span class=la>sum</span>. The participle acts like an adjective and agrees with the subject.',
 s:['Perfect passive: participle + sum, es, est…: amātus est = he was loved.','Pluperfect passive: participle + eram…','Future perfect passive: participle + erō…','Make the participle agree with the subject.'],
 e:[['Urbs capta est.','The city was captured.','capta is feminine to agree with urbs.'],['Mīlitēs laudātī erant.','The soldiers had been praised.','laudātī erant = pluperfect passive, masculine plural.']],
 m:['Translating capta est as "is captured". It is past: "was captured / has been captured".','Forgetting agreement on the participle.'],
 h:'"Participle + sum = done to it in the past."'};
EXPL[21]={p:'The <b>imperative</b> gives orders: "Come!", "Listen!". It is usually just the verb stem (one person) or stem + -te (several people). The <b>vocative</b> is the form of a name or noun used when you speak to someone.',
 s:['Singular: drop -re from the infinitive: amāre → amā!','Plural: add -te: amāte!','Negative command: nōlī / nōlīte + infinitive: nōlī timēre! = don\'t be afraid!','Vocative: same as the nominative, except -us → -e and -ius → -ī.'],
 e:[['Audīte, amīcī!','Listen, friends!','Plural command + vocative plural.'],['Nōlī flēre, Mārce.','Don\'t cry, Marcus.','nōlī + infinitive; Mārce is vocative.']],
 m:['Making a negative command with nōn + imperative. Use nōlī/nōlīte + infinitive.','Forgetting the short irregular imperatives: dīc, dūc, fac, fer.'],
 h:'The four short ones: "dīc, dūc, fac, fer — say, lead, make, bring".'};
EXPL[22]={p:'A few very common verbs do not follow the regular patterns: <span class=la>sum</span> (be), <span class=la>possum</span> (can), <span class=la>eō</span> (go), <span class=la>volō</span> (want), <span class=la>ferō</span> (carry) and others. They are irregular because they are used so often. Learn them as fixed sets.',
 s:['possum = pot- + sum (with t → s before s): possum, potes, potest…','eō: eō, īs, it, īmus, ītis, eunt; imperfect ībam; future ībō.','volō: volō, vīs, vult, volumus, vultis, volunt.','ferō is regular 3rd conjugation except for some short forms: fers, fert, fertis, ferre.'],
 e:[['Venīre nōn possum.','I cannot come.','possum + infinitive = be able to.'],['Quid vīs?','What do you want?','vīs = you want (also "force", from vīs, vim — context decides).']],
 m:['Treating eō as 2nd conjugation.','Confusing vīs (you want) with vīs (force).'],
 h:'Make a one-page sheet of these verbs and read it daily for a week.'};
EXPL[23]={p:'Latin numbers: <span class=la>ūnus, duo, trēs</span> change their endings like adjectives; 4 to 100 do not change at all. Ordinal numbers (first, second…) are normal -us, -a, -um adjectives. Roman numerals are built by adding and subtracting letters.',
 s:['ūnus, duo, trēs agree with their noun (duae puellae).','quattuor to centum never change.','mīlle (1000) is indeclinable; mīlia (thousands) is a neuter noun + genitive: tria mīlia mīlitum.','Roman numerals: a smaller letter before a bigger one subtracts (IV = 4).'],
 e:[['Duae puellae et trēs puerī','two girls and three boys','duae feminine, trēs masculine.'],['Tria mīlia hominum','three thousand people','mīlia + genitive.']],
 m:['Writing duo puellae. It must agree: duae.','Reading MCM as 1100. CM = 900, so it is 1900.'],
 h:'I V X L C D M = 1, 5, 10, 50, 100, 500, 1000: "I Value Xylophones Like Cows Dig Milk".'};
EXPL[24]={p:'Comparison makes "bigger" and "biggest". Latin adds <b>-ior</b> for "more / -er" and <b>-issimus</b> for "most / very". Adverbs ("quickly") come from adjectives with -ē or -iter.',
 s:['Comparative: stem + -ior (m./f.), -ius (n.): longior, longius.','Superlative: stem + -issimus: longissimus. -er adjectives: -errimus (pulcherrimus).','"Than": quam + same case, or plain ablative: altior quam mōns / altior monte.','Irregulars: bonus, melior, optimus; malus, peior, pessimus; magnus, maior, maximus; parvus, minor, minimus.'],
 e:[['Nihil est dulcius melle.','Nothing is sweeter than honey.','melle = ablative of comparison.'],['Fortissimē pugnāvit.','He fought very bravely.','Superlative adverb.']],
 m:['Reading -ius as a genitive. On a comparative it is the neuter form.','Forgetting the irregular comparatives.'],
 h:'"-ior = more, -issimus = most."'};
EXPL[25]={p:'An <b>infinitive</b> is the "to ___" form. Latin has six: present, perfect and future, each active and passive. Besides "to love", they show <b>time relative to the main verb</b> — which matters a lot in indirect statement (lesson 28).',
 s:['Present active: amāre (to love); passive: amārī (to be loved).','Perfect active: amāvisse (to have loved); passive: amātus esse (to have been loved).','Future active: amātūrus esse (to be about to love).','Present = same time, perfect = earlier, future = later than the main verb.'],
 e:[['Legere amō.','I love to read / I love reading.','Infinitive as a noun.'],['Videor errāvisse.','I seem to have made a mistake.','Perfect infinitive = earlier action.']],
 m:['Confusing amārī (to be loved) with amāre (to love).','Ignoring the time relationship.'],
 h:'"-re = do, -rī/-ī = be done, -isse = have done."'};

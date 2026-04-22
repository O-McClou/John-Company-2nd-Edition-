// === EXTRAHIERTE DATEN ===

/* ══════════════════════ HILFSFUNKTIONEN ══════════════════════ */
const $ = id => document.getElementById(id);
const box  = (cls,h) => `<div class="box ${cls}">${h}</div>`;
const bi   = h => box('box-i',h);
const bw   = h => box('box-w',h);
const bg   = h => box('box-g',h);
const bb   = h => box('box-b',h);
const bAction = h => `<div class="box-action"><span class="box-action-lbl">✅ AKTION</span>${h}</div>`;
const bRule   = h => `<div class="box-rule"><span class="box-rule-lbl">📌 REGELDETAIL</span>${h}</div>`;
const bExcept = h => `<div class="box-except"><span class="box-except-lbl">⚠️ AUSNAHME</span>${h}</div>`;
const dt = rows => `<div class="dt">${rows.map(r=>`<div class="dt-row"><div class="dt-k">${r[0]}</div><div class="dt-v">${r[1]}</div></div>`).join('')}</div>`;
const acc = (id,t,body,open=false) => `<div class="acc${open?' open':''}" id="acc-${id}"><div class="acc-hd" onclick="tAcc('acc-${id}')"><span>${t}</span><span class="ic">▼</span></div><div class="acc-bd">${body}</div></div>`;
const cl  = items => `<ul class="cl">${items.map(i=>`<li><input type="checkbox" onchange="this.closest('li').classList.toggle('done',this.checked)"> <span>${i}</span></li>`).join('')}</ul>`;
const chbtn = (ic,t,s,fn) => `<button class="chbtn" onclick="${fn}"><div class="chbtn-ic">${ic}</div><div class="chbtn-body"><div class="chbtn-t">${t}</div>${s?`<div class="chbtn-s">${s}</div>`:''}</div><div class="chbtn-ar">▶</div></button>`;
const trail = (...p) => `<div class="trail">${p.map((t,i)=>`<span class="trail-i">${t}</span>${i<p.length-1?'<span class="trail-sep">›</span>':''}`).join('')}</div>`;
const cb = (atk,def,tie) => `<div class="cb"><div class="cb-row"><div class="cb-lbl">⚔ Angreifer</div><div class="cb-val">${atk}</div></div><hr class="cb-div"><div class="cb-row"><div class="cb-lbl">🛡 Verteidiger</div><div class="cb-val">${def}</div></div>${tie?`<div class="cb-tie">🔸 Gleichstand: ${tie}</div>`:''}</div>`;

function tAcc(id){$(id)?.classList.toggle('open')}

function stratBox(id, histOnly){
const s      = id ? STRATEGY_TIPS[id] : null;
const tip    = s?.tip    || null;
const hist   = histOnly  || s?.hist || null;
if(!tip && !hist) return '';
const uid    = id ? 'strat-' + id : 'sacc-' + Math.random().toString(36).substr(2, 8);
const tipHtml  = tip  ? `<p>${tip}</p>`               : '';
const histHtml = hist ? `<div class="hist">${hist}</div>` : '';
return `<div class="acc strat-acc kompakt-hide" id="${uid}">`
+ `<div class="acc-hd" onclick="tAcc('${uid}')">`
+   `<span>💡 Strategie &amp; Historie</span>`
+   `<span class="ic">▼</span>`
+ `</div>`
+ `<div class="acc-bd">${tipHtml}${histHtml}</div>`
+ `</div>`;
}

/* ══════════════════════ STRATEGY_TIPS ══════════════════════ */
const STRATEGY_TIPS={
'ph1-attrition':{tip:'Ämter mit Ermattungs-Markern sind riskant. Rechtzeitig befördern, bevor +2/+3 Ruhestand fast sicher macht.',hist:'Viele EIC-Angestellte blieben nur wenige Jahre in Indien. Krankheiten und Intrigen sorgten für hohe Fluktuation.'},
'ph1-retire':{tip:'Die Höhe der Ausgaben bestimmt die Zugreihenfolge. Manchmal lohnt Mehrausgabe für eine wertvolle Karte (Ehegatte, Unternehmen).',hist:'John Johnstone erwarb nach seiner Rückkehr 1765 die Güter Alva, Hangingshaw und Denovan in Schottland und ließ Alva House von Robert Adam umbauen. Warren Hastings blieb trotz seiner Verdienste verschuldet – der Unterhalt von Anwesen und Titeln ruin…'},
'ph1-prestige':{tip:'Erpressungskarten darf man vor der Entscheidung ansehen. Ehegatten bieten dauerhafte Rabatte – besonders wertvoll bei mehreren Ruhestandsplänen.',hist:'Die „Nabobs" nutzten ihr Vermögen, um in die britische Elite aufzusteigen.'},
'ph2-family':{tip:'Betriebe (£5): sichere £1/Runde + 2 Parlamentsstimmen. Werften (£2): günstiger, aber Bonus hängt vom Flottenverwalter ab.',hist:'Der „private trade" war für EIC-Angestellte eine Haupteinnahmequelle. Offiziere und Gouverneure nutzten ihre Position, um auf Kompanie-Schiffen eigene Waren zu transportieren. John Johnstone wurde 1764 entlassen, weil er private Geschäfte mit den Nawabs von Bengalen betrieben hatte – ein klassischer Interessenkonflikt.'},
'ph2-shares':{tip:'Anteile aktivieren sich, wenn die Kompanie Schulden hat. Wer darauf spekuliert, kann günstig kaufen und profitiert früh von Dividenden.',hist:'EIC-Anteile brachten nicht nur Dividenden, sondern auch politischen Einfluss. John Johnstone nutzte seine 1767, um Strafverfahren zu verhindern.'},
'firms':{tip:'Firmengründung kostet einen Anteil oder Betrieb. Droht die Kompanie zu scheitern (Anteile = –1 SP), wird ein Anteil für eine Firma opfern attraktiv.',hist:'Die Charter Act von 1813 öffnete Indien für private Handelshäuser und untergrub die Kompanie von innen.'},
'ph3-hiring':{tip:'Wer einen Rivalen befördern lässt, kann im Gegenzug etwas verlangen. Manchmal ist der Aufstieg des Gegners taktisch klug.',hist:'Die Familie Johnstone kontrollierte so viele EIC-Positionen, dass Historiker sie in „every major event in the British Empire" sehen.'},
'ph4-chairman':{tip:'Der Vorsitzende kann Ämter durch Mittelkürzung schwächen. Ein Rivale mit £0 kann kaum handeln. Verbündete bevorzugen, Gegner aushungern.',hist:'Warren Hastings nahm 1780 Schulden auf, um den Krieg gegen Hyder Ali zu finanzieren – eine Entscheidung, die später zu seinem Impeachment beitrug. Die Schuldenaufnahme war die Lebensader der Kompanie: 1813 betrugen die Schulden der EIC über £30 Millionen. Der Vorsitzende konnte durch die Budgetverteilung Rivalen aushungern und Verbündete bevorzugen – ein mächtiges politisches Instrument.'},
'ph4-director':{tip:'China-Handel früh eröffnen und das Amt selbst besetzen. Jede kontrollierte Region = £1/Runde für den Superintendent.',hist:'Der Opiumhandel nach China finanzierte zwischen 1760 und 1834 praktisch die gesamte Indien-Administration.'},
'ph4-shipping':{tip:'Der Flottenverwalter kann private Werften (eigene oder verbündete) auf Kompanie-Kosten ausrüsten – eine legale Direktsubvention!',hist:'John Johnstone transportierte auf Kompanie-Schiffen eigene Waren, bevor er 1764 entlassen wurde.'},
'ph4-mil':{tip:'Wer die meisten Figuren in einer Armee hat, stellt den Kommandanten (+1 Macht/Trophäe). Gezielte Bewegungen können die Kommandantenschaft wechseln.',hist:'Nach Plassey 1757 begann der Aufstieg der Kompanie zur Militärmacht.'},
'ph4-bombay':{tip:'Präsident legt die Reihenfolge fest – taktischer Vorteil! Schreiber auf hohen Auftragswerten maximieren persönliche Einnahmen.',hist:'Die Präsidentschaften waren faktisch eigenständige Kolonialverwaltungen. Ihre Rivalität war Hauptgrund für EIC-Ineffizienz.'},
'ph4-madras':{tip:'Schreiber anderer Familien auf Aufträge zu bringen schafft Verbündete – ignoriert man sie, schafft man Feinde.',hist:'Madras war das älteste britische Fort in Indien (Fort St. George, 1644).'},
'ph4-bengal':{tip:'Bengalen ist die reichste Präsidentschaft – hohe Auftragswerte, viele Exportsymbole. Der China-Superintendent verdient direkt von hier.',hist:'Nach der Plünderung Bengalens 1757 erhielt Robert Clive allein £234.000 aus der Schatzkammer des Nawab.'},
'ph4-china':{tip:'Jedes Exportsymbol bringt £4 → Kompanie UND £1 → Superintendent persönlich. Je mehr Expansion, desto profitabler das Amt.',hist:'Der Superintendent war der „Opiumzar" der Kompanie. Der Opiumkrieg (1839–42) war direkte Folge.'},
'ph5-bonus':{tip:'Regelmäßiges Basiseinkommen – Grundlage aller langfristigen Ausgaben. Wer viele Betriebe hat, ist unabhängiger von Amtserfolgen.',hist:'John Johnstone finanzierte seinen Lebensstil aus Investitionserträgen – nicht aus offiziellem Gehalt.'},
'ph6-expenses':{tip:'Formel: £1/Schuld + £1/Regiment + £1/Offizier + £1/Schiff. Diese Zahl VOR Phase IV kennen – damit man weiß, wie viel Ertrag die Kompanie braucht.',hist:'1813 betrugen allein die EIC-Zinsen über £5 Millionen. Chronische Unterkapitalisierung war Hauptgrund für staatliche Eingriffe.'},
'ph6-dividends':{tip:'Dividenden sind EINZIGER Weg, Ansehen zu erhöhen (Öffentliche Euphorie). Anteilsinhaber setzen den Vorsitzenden unter Druck!',hist:'Zwischen 1793 und 1813 wurden EIC-Dividenden aus Schulden finanziert – ein frühes Beispiel für „financial engineering".'},
'ph8-parli':{tip:'Als PM: Gesetz wählen, das Rivalen besteuert. Als Opposition: Stimmenkauf dosiert – eine glaubwürdige Drohung reicht oft.',hist:'Stimmenkauf war im 18. Jahrhundert in Großbritannien allgegenwärtig. John Johnstone sicherte sich seinen Parlamentssitz 1774 durch Bestechung der Delegierten von Burntisland und Kinghorn. Der Regulating Act (1773) und Pitts India Act (1784) unterwarfen die Kompanie immer stärker staatlicher Kontrolle – jede Abstimmung war damals wie heute ein Handel aus Eigeninteressen.'},
'ph9-upkeep':{tip:'Kurz vor Spielende Belohnungen kaufen? Nur wenn keine weitere Unterhaltsphase folgt. Genau zählen: letzte Runde = kein Unterhalt mehr.',hist:'Warren Hastings wurde durch die Kosten seines Impeachment-Verfahrens (1787–1795) finanziell ruiniert.'},
'ph10-scoring':{tip:'Macht-Prämie kann entscheidend sein: Trophäen früh sammeln. PM-Position (+2 Macht) wird oft unterschätzt.',hist:'Die Schlusswertung spiegelt das Lebenswerk der „Nabobs" wider: Robert Clive, John Johnstone, Warren Hastings. Wer die Mechanismen des Systems zu seinen Gunsten nutzte – Ämter, Dividenden, politische Macht – kehrte als Gewinner heim. Die EIC wurde 1874 endgültig aufgelöst, nachdem die Meuterei von 1857 zur Verstaatlichung geführt hatte. Das Spiel gibt keine moralische Bewertung vor – die Mechanismen sprechen für sich.'}
};

/* ══════════════════════ CHECKLISTS ══════════════════════ */
const CHECKLISTS={
'ph1-attrition':['<strong>Alle gleichzeitig würfeln:</strong> 1 W6 pro besetztem Amt','Ermattungs-Marker auf Ämterkarte? → Ergebnis <strong>+1</strong> pro Marker','Vorsitzender würfelt? → Ergebnis immer <strong>zusätzlich +1</strong>','1–2: Nichts · 3–4: Ermattungs-Marker · <strong>5+: Ruhestand</strong>'],
'ph1-retire':['<strong>Reihenfolge:</strong> Vorsitzender zuerst, dann im Uhrzeigersinn','Belohnung wählen · Kosten zahlen · Figur auf Belohnung','<strong>SP sofort eintragen</strong>','Restliche Ruheständler-Marker → zurück in Familienvorrat'],
'ph1-prestige':['Berechtigt: <strong>Familien mit mind. 1 Ruheständler</strong> dieser Phase','Reihenfolge: Höchste Ruhestand-Ausgaben zuerst','Karte nehmen oder passen','<strong>Auslage immer auf 3 Karten auffüllen</strong>'],
'ph2-family':['<strong>Vorsitzender zuerst</strong>, dann im Uhrzeigersinn','Chancen-Marker auf Aktion · Bereits dort? → Aktion <strong>2× ausführen</strong>','1 Familienaktion: Schreiber · Offizier · Werft · Luxusgut · Betrieb · Anteil'],
'ph2-shares':['Kompanie hat <strong>Schulden?</strong> → Rechtestes Mitglied → Kollegium · Schulden –1','Wiederholen bis Schulden getilgt','Keine Schulden: Mitglieder <strong>so weit rechts wie möglich</strong>'],
'firms':['<strong>Schritt 1:</strong> Firma gründen · investieren · Schiffe · Übernahme · Fusion','<strong>Schritt 2:</strong> Alle gleichzeitig & geheim: Seeregion + Heimathafen + Einsatz'],
'ph3-hiring':['Freie Ämter in <strong>aufsteigender Nummerfolge</strong>','<strong>Vorsitz:</strong> Kollegium-Mehrheit · kein Konsens → alter Vorsitzender wählt','Ernennungs-Hierarchie beachten','<strong>⚠ Alle Ämter MÜSSEN besetzt werden!</strong>'],
'ph4-chairman':['Optional: <strong>Schulden erhöhen</strong> (max. 3× ohne Abstimmung) → je +£5','<strong>Pflicht:</strong> Gesamtes Kompanie-Vermögen vollständig auf Amtsschatullen verteilen'],
'ph4-director':['Aktion A (opt.): <strong>Sondergesandter</strong> – £1/Würfel · Erfolg: Auftrag öffnen oder China','Aktion B (immer): <strong>Bis zu 2 Bewegungen</strong> (Schreiber oder Schiff)'],
'ph4-shipping':['<strong>⚠ Pflicht:</strong> Ausgeben bis max. <strong>£2</strong> übrig!','Charter £2 · Privat £3 · Kompanie-Schiff £5 (nur wenn kein blaues Schiff auf Werft!)'],
'ph4-mil':['Schritt 1 (opt.): <strong>Bis zu 2 Bewegungen</strong> zwischen Armeen','Schritt 2 (Pflicht): <strong>Alle Offiziersanwärter</strong> zuweisen','Schritt 3: Kommandanten prüfen'],
'ph4-bombay':['Präsident legt <strong>Reihenfolge</strong> fest','<strong>Handel</strong> (1×/Runde): £1/Würfel · –1W/Fremd-Region','<strong>Einsatz</strong> (opt.): 1W/erschöpftem Offizier/Regiment','<strong>Verwalten</strong> (opt.): Würfelvorrat sinkt je Versuch'],
'ph4-madras':['Präsident legt <strong>Reihenfolge</strong> fest','<strong>Handel</strong> (1×/Runde): £1/Würfel · –1W/Fremd-Region','<strong>Einsatz</strong> (opt.): 1W/erschöpftem Offizier/Regiment','<strong>Verwalten</strong> (opt.): Würfelvorrat sinkt je Versuch'],
'ph4-bengal':['Präsident legt <strong>Reihenfolge</strong> fest','<strong>Handel</strong> (1×/Runde): £1/Würfel · –1W/Fremd-Region','<strong>Einsatz</strong> (opt.): 1W/erschöpftem Offizier/Regiment','<strong>Verwalten</strong> (opt.): Würfelvorrat sinkt je Versuch'],
'ph4-china':['<strong>Voraussetzung:</strong> mind. 1 Schiff in China-Schatulle + mind. 1 Exportsymbol','<strong>Handel</strong> (1×/Runde): 1W/Schiff · kein Abzug','Erfolg: +£4/Export → Kompanie · Superintendent +£1/Export'],
'ph5-bonus':['Jede Familie: <strong>£1/Werft</strong> mit ausgerüstetem Schiff','Jede Familie: <strong>£1/Betrieb</strong> (Familienversion, nicht investierte DEREG-Betriebe)'],
'ph6-expenses':['<strong>Ausgaben:</strong> £1/Schuld + £1/Regiment + £1/Offizier (kein Kommandant!) + £1/Schiff','Notkredite: +1 Schuld · +£5 → wiederholen → <strong>Vermögen auf 0!</strong>','1–2 Notkredite → –1 Ansehen · 3+ → –2 Ansehen','<strong>⚠ Ansehen ganz links = Kompanie gescheitert!</strong>'],
'ph6-dividends':['Vermögen < Erwartungswert? → <strong>Ansehen –1</strong>','Optional: <strong>Dividenden zahlen</strong> (£1/Anteil inkl. Vorsitzender)','Dividende > Erwartungswert? → <strong>Öffentliche Euphorie: Ansehen +1!</strong>','<strong>⚠ Ansehen ganz links = Kompanie gescheitert!</strong>'],
'ph7-india':['Sturmwürfel · Stürme für <strong>blaue Schiffe</strong> abhandeln','Ereigniskarten festlegen · ziehen · abhandeln','Nach jedem Ereignis: <strong>Marsch des Elefanten</strong>'],
'ph8-parli':['PM zieht Karten (max. 3) · <strong>Dilemma</strong> stoppt sofort · wählen','PM-Scheibe drehen','Abstimmung: £1 = 1 Stimme · Für oder Gegen','≥0 → <strong>Beschlossen</strong> · <0 → <strong>Abgelehnt</strong> (neuer PM)'],
'ph9-upkeep':['Unterhalt zahlen: weiße Zahl · nicht zahlen = Figur + SP verlieren','<strong>Letzte Runde?</strong> → Schlusswertung (Phase X)','Schreiber/Erfüllt-Marker/Teiler/Charter → zurück','Erschöpfte Offiziere & Regimenter aktivieren · <strong>Rundenmarker vorrücken</strong>'],
'ph10-scoring':['<strong>1.</strong> SP auf Punkte-Leiste','<strong>2.</strong> Anteile/Betriebe laut Tabelle','<strong>3.</strong> Macht: Trophäen/PM/Gesetze/Karten','<strong>4.</strong> Macht-Prämie: Top-2 SP laut Spielplan-Tabelle']
};

const GUIDED_PHASES=new Set(['ph4-chairman','ph4-director','ph4-shipping','ph4-mil','ph4-bombay','ph4-madras','ph4-bengal','ph4-china','ph6-expenses','ph6-dividends','ph8-parli','ph9-upkeep']);

/* ══════════════════════ STEPS (buildSteps) ══════════════════════ */
// STEPS[] wird dynamisch via buildSteps() erzeugt – hier die vollständige Funktion:
let steps=[],cur=0;

function buildSteps(){
const r1=$('tog-r1').checked,dr=$('tog-dr').checked,gg=$('tog-gg').checked,cn=$('tog-cn').checked;
const all=[
{id:'ph1-attrition',phase:'Phase I',  title:'Personalabbau',            skip:r1, render:()=>s_ph1_attrition()},
{id:'ph1-retire',   phase:'Phase I',  title:'Ruhestand',                skip:r1, render:()=>s_ph1_retire()},
{id:'ph1-prestige', phase:'Phase I',  title:'Prestige-Karten',          skip:r1, render:()=>s_ph1_prestige()},
{id:'ph2-family',   phase:'Phase II', title:'Familienaktionen',         skip:false,render:()=>s_ph2_family()},
{id:'ph2-shares',   phase:'Phase II', title:'Neue Anteile',             skip:false,render:()=>s_ph2_shares()},
{id:'firms',        phase:'Firmen',   title:'Firmen-Phase',             skip:!dr, render:()=>s_firms()},
{id:'ph3-hiring',   phase:'Phase III',title:'Ämter besetzen',           skip:r1, render:()=>s_ph3_hiring()},
{id:'ph4-chairman', phase:'Phase IV', title:'Vorsitz',                  skip:false,render:()=>s_ph4_chairman()},
{id:'ph4-director', phase:'Phase IV', title:gg?'General-Gouverneur':'Direktor des Handels', skip:false,render:()=>s_ph4_director(gg)},
{id:'ph4-shipping', phase:'Phase IV', title:'Flottenverwalter',         skip:false,render:()=>s_ph4_shipping()},
{id:'ph4-mil',      phase:'Phase IV', title:'Militärische Belange',     skip:false,render:()=>s_ph4_mil()},
{id:'ph4-bombay',   phase:'Phase IV', title:'Bombay',                   skip:false,render:()=>s_ph4_pres('Bombay','Westindischer Ozean')},
{id:'ph4-madras',   phase:'Phase IV', title:'Madras',                   skip:false,render:()=>s_ph4_pres('Madras','Südindischer Ozean')},
{id:'ph4-bengal',   phase:'Phase IV', title:'Bengalen',                 skip:false,render:()=>s_ph4_pres('Bengalen','Ostindischer Ozean')},
{id:'ph4-china',    phase:'Phase IV', title:'Superintendent China',     skip:!cn, render:()=>s_ph4_china()},
{id:'ph5-bonus',    phase:'Phase V',  title:'Familien-Boni',            skip:false,render:()=>s_ph5()},
{id:'ph6-expenses', phase:'Phase VI', title:'Ausgaben & Notkredite',    skip:false,render:()=>s_ph6_expenses()},
{id:'ph6-dividends',phase:'Phase VI', title:'Erwartungen & Dividenden', skip:false,render:()=>s_ph6_dividends()},
{id:'ph7-india',    phase:'Phase VII',title:'Ereignisse in Indien',     skip:false,render:()=>s_ph7()},
{id:'ph8-parli',    phase:'Phase VIII',title:'Parlamentssitzung',       skip:false,render:()=>s_ph8()},
{id:'ph9-upkeep',   phase:'Phase IX', title:'Unterhalt & Auffrischung', skip:false,render:()=>s_ph9()},
{id:'ph10-scoring', phase:'Phase X',  title:'Spielende & Schlusswertung',skip:false,render:()=>s_ph10()},
];
steps=all.filter(s=>!s.skip);
}

/* ══════════════════════ RENDER-FUNKTIONEN s_ph1_* bis s_ph9_* ══════════════════════ */

function s_ph1_attrition(){return `

<div class="step-badge"><span class="step-num">Phase I</span><span class="step-phase">Londoner Season</span></div>
<div class="step-title">Personalabbau – Würfeln</div>
<div class="card">
${bExcept('<strong>Kein Erfolgstest!</strong> Einfacher W6 – kein Pool. Alle würfeln <em>gleichzeitig</em>.')}
<p>Wirf für jedes besetzte Amt genau <strong>einen W6</strong>. Ermattungs-Marker +1 auf das Ergebnis:</p>
${dt([['1 – 2','Nichts passiert.'],['3 – 4','1 Ermattungs-Marker auf Ämterkarte.'],['5+','<strong>Ruhestand:</strong> Familienmitglied → Ruheständler-Feld. Ämterkarte → freie Ämter. <strong>Alle Ermattungs-Marker zurück in Vorrat!</strong>']])}
${bExcept('<strong>Vorsitzender:</strong> Würfelergebnis immer +1 – zusätzlich zu Ermattungs-Markern!')}
</div>`;}

function s_ph1_retire(){return `

<div class="step-badge"><span class="step-num">Phase I</span><span class="step-phase">Londoner Season</span></div>
<div class="step-title">Ruhestand</div>
<div class="card">
<h3>Reihenfolge</h3>
<ul><li>Beginnend mit dem <strong>(ehemaligen) Vorsitzenden</strong>, dann im Uhrzeigersinn.</li><li>Nur wer mind. 1 Ruheständler hat, darf einen in Rente schicken.</li></ul>
${bRule('<strong>Wichtig:</strong> Das bezahlte Ruhestandsgeld <em>noch nicht</em> in die Bank – wird für Prestige-Kartenreihenfolge benötigt!')}
<h3>Ablauf</h3>
<ol><li>Belohnung aus dem Angebot wählen.</li><li>Kosten zahlen → Familienmitglied auf die Belohnung.</li><li>Siegpunkte sofort eintragen.</li></ol>
${bRule('<strong>Ehegatten-Rabatte:</strong> Nur 1× pro Londoner Season nutzbar.')}
${bExcept('<strong>Beachten:</strong> Belohnungen verursachen Unterhalt (Phase IX) und ggfs. Fenstersteuer!')}
<p>Nicht verwendete Ruheständler-Marker → zurück in den Familienvorrat.</p>
</div>`;}

function s_ph1_prestige(){return `

<div class="step-badge"><span class="step-num">Phase I</span><span class="step-phase">Londoner Season</span></div>
<div class="step-title">Prestige-Karten</div>
<div class="card">
<h3>Wer darf wählen?</h3>
<p>Nur Familien mit mind. 1 Ruheständler dieser Phase.</p>
<h3>Zugreihenfolge</h3>
<ol><li><strong>Meiste Kosten</strong> für Ruhestand ausgegeben.</li><li>Gleichstand: Meiste <strong>Fenster-Symbole</strong>.</li><li>Noch Gleichstand: Vom PM im Uhrzeigersinn.</li></ol>
${acc('pr-types','Ehegatten, Unternehmen, Erpressungskarten',`<ul><li><strong>Ehegatten:</strong> SP + dauerhafte Einschränkung. Rabatt nur 1×/Season. Nicht tauschbar.</li><li><strong>Unternehmen:</strong> Fähigkeiten + Stimmen + Macht. Tauschbar.</li><li><strong>Erpressungskarten:</strong> Einmalige Sondereffekte. Verdeckt – darf vor Tausch angesehen werden. Nach Nutzung: offen im Spielbereich ablegen, <strong>nicht mehr tauschbar</strong>. Zählt am Ende als Machtwert (offen oder verdeckt).</li></ul>`)}
<h3>Auslage auffrischen</h3>
<p>Immer auf <strong>3 Karten</strong> auffüllen – auch wenn keine genommen wurde!</p>
</div>`;}

function s_ph2_family(){return `

<div class="step-badge"><span class="step-num">Phase II</span><span class="step-phase">Familie</span></div>
<div class="step-title">Familienaktionen</div>
<div class="card">
${bRule('<strong>Chancen-Marker:</strong> Liegt er auf der gewählten Aktion (gleiche wie letzte Runde) → <strong>2× ausführen</strong>. Kosten für beide Ausführungen. Erst ab Runde 2.')}
<p>Vorsitzender zuerst, im Uhrzeigersinn: <strong>1 Familienaktion</strong> (bei doppeltem Marker: 2×).</p>
<h3>Die 6 Aktionen</h3>
${acc('fam-w','Schreiber anheuern',`<p>1 Familienmitglied auf Schreiberposten. ${bi('Bei 4+ freien Ämtern: kostenlos 1 weiterer Schreiber (max. 3/Zug).')}</p>`)}
${acc('fam-o','Offizier rekrutieren',`<p>1 Familienmitglied in Offiziersanwärter-Feld → wird in Phase IV.4 zugewiesen.</p>`)}
${acc('fam-y','Werft kaufen',`<ul><li><strong>£2</strong> → Werftkarte</li><li>£1/Runde wenn ausgerüstet</li><li>1 Parlamentsstimme</li></ul>`)}
${acc('fam-l','Luxusgut kaufen',`<p><strong>£4</strong> → sofort <strong>+2 SP</strong>. ${bw('Fenstersteuer beachten!')}</p>`)}
${acc('fam-ws','Betrieb kaufen',`<ul><li><strong>£5</strong> → <strong>2 Parlamentsstimmen</strong></li><li>Bei Scheitern der Kompanie: +1 SP</li><li>DEREG: als investierter Betrieb umwandelbar</li></ul>`)}
${acc('fam-sh','Anteile erlangen',`<p>Familienmitglied auf freies Feld der <strong>Börsenleiste oberhalb des Kollegiums</strong>. Preis zahlen: laut aufgedrucktem Betrag auf dem Feld (steigt von links £1 bis rechts £6). ${bw('Kompanie scheitert → –1 SP/Anteil!')}</p>`)}
${bExcept('<strong>Keine Familienmitglieder mehr?</strong> Eines von Belohnung entfernen – SP gehen sofort verloren.')}
</div>`;}

function s_ph2_shares(){return `

<div class="step-badge"><span class="step-num">Phase II</span><span class="step-phase">Familie</span></div>
<div class="step-title">Neue Anteile schaffen</div>
<div class="card">
<h3>Hat die Kompanie Schulden?</h3>
<ol><li>Für jeden Schuldenschritt: <strong>rechtestes</strong> Familienmitglied → Kollegium-Anteil.</li><li>Schuldenmarker –1.</li><li>Wiederholen bis Schulden getilgt oder keine Mitglieder mehr.</li></ol>
<h3>Keine Schulden (mehr)?</h3>
<p>Verbleibende Mitglieder so weit wie möglich <strong>nach rechts</strong>.</p>
</div>`;}

function s_firms(){return `

<div class="step-badge"><span class="step-num">Firmen</span><span class="step-phase">Deregulierung</span></div>
<div class="step-title">Firmen-Phase <span class="badge bd">DEREG</span></div>
<div class="card">
${bi('Keine feste Reihenfolge. Zwei Schritte: Investitionen, dann Strategie.')}
${bw('<strong>Schwache Anteile:</strong> Ansehen/Schulden auf gestricheltem Feld → keine Anteile verwenden.')}
${bw('<strong>Unreife Anteile:</strong> In dieser Runde neu entstandene Anteile dürfen nicht investiert werden.')}
<h3>Die zwei Firmenschatullen</h3>
${bRule('<strong>London-Schatulle:</strong> Für Ausgaben und neue Schiffe. Hier landet das Geld aus Investitionen. <em>Kein Transfer zwischen Familienvermögen und Firmenschatullen!</em>')}
${bRule('<strong>Indien-Schatulle:</strong> Hier landen Handelseinnahmen. Aus ihr werden Dividenden gezahlt. Rest → London-Schatulle am Ende der Phase VI.')}
<h3>1. Investitionen</h3>
${acc('fi-found','Firma gründen',`<ol><li>1 Anteil zurückgeben <em>oder</em> 1 Betrieb auf investierte Seite.</li><li>Familientableau umdrehen.</li><li>1 Familienmitglied als Firmen-Anteil.</li><li>Würfel auf Firmenwert-Leiste links.</li><li><strong>£5</strong> aus Bank → London-Schatulle.</li></ol>${bi('Investierte Betriebe generieren keinen Bonus mehr und zählen nicht bei Kompanie-Scheitern.')}`)}
${acc('fi-inv','Investieren (mit Zustimmung)',`<ol><li>1 Anteil oder Betrieb abgeben.</li><li>1 Familienmitglied als Anteil.</li><li>£5 → London-Schatulle.</li></ol>${bi('Max. 10 Anteile. Weitere Investitionen möglich, aber ohne neue Anteile.')}`)}
${acc('fi-ships','Schiffe ausrüsten / Rückkauf',`<p>£3 aus London-Schatulle. <strong>Zustimmung des Werftbesitzers erforderlich!</strong></p>${bi('<strong>Rückkauf von Kompanie-Schiffen:</strong> Unbeschädigt £3, beschädigt £2. Geld → Flottenverwalter-Schatulle. Keine Kompanie- oder Charterschiffe.')}`)}
${acc('fi-takeover','Feindliche Übernahme',`<p>Zustimmung der <strong>Mehrheit</strong> der Anteilsinhaber. Nur möglich für Nicht-Verwalter.</p>`)}
${acc('fi-merger','Fusion',`<p><strong>Alle</strong> Anteilsinhaber müssen zustimmen. Höchster Firmenwert = Primärfirma. Max. 10 Anteile.</p>`)}
<h3>2. Strategie</h3>
<p>Alle gleichzeitig & geheim: <strong>Seeregion + Heimathafen + Einsatzbetrag</strong>.</p>
${bi('<strong>Hobnob-Strategie:</strong> Nicht handeln, kein Geld, Dividenden-Marker bleibt. Schiffe sicher vor Stürmen.')}
<h3>Aufträge erfüllen (zu Beginn der Präsidentschafts-Operationen)</h3>
<p>Erfolgstest mit Würfeln = Geld der Strategie. <strong>Initiativwert</strong> = Schiffe minus Anzahl Erfolge (1er/2er). Niedriger Wert = früher dran. Firmen füllen <strong>Schiffe + 1</strong> Aufträge, Heimathafen zuerst.</p>
${bRule('<strong>Bereits erfüllte Aufträge:</strong> Nur halber Wert (abrunden). Firmenwert +1 pro £6 in Indien-Schatulle.')}
<h3>Ausgaben (Beginn Phase VI, vor Kompanie)</h3>
${bExcept('<strong>Formel:</strong> £1/Schiff + max(£1 pro Anteil, Firmenwert). Aus London- oder Indien-Schatulle.')}
${bw('<strong>Auflösung bei Zahlungsunfähigkeit:</strong> Alle Anteile ins Schuldner-Turm (–1 SP/Anteil!). Schiffe zurück auf Werften. Investierte Betriebe bleiben investiert.')}
${acc('fi-emergency','Notinvestition & Notfusion',`<p><strong>Notinvestition:</strong> Dritte investieren um Auflösung zu verhindern. Firmenwert –1 pro Notinvestition. Überschuss verfällt.</p><p><strong>Notfusion:</strong> Andere Firma übernimmt Ausgaben. Nur 1 Firma als Partner.</p>`)}
<h3>Dividenden (Phase VI, nach Ausgaben)</h3>
${bg('<strong>Optional.</strong> £1/Anteil für Inhaber + <strong>£1 extra für Verwalter</strong> (als hätte er einen Extra-Anteil). Nur aus Indien-Schatulle. Anteilsinhaber dürfen mit Zustimmung des Verwalters auf Auszahlung verzichten.')}
${bRule('<strong>Dividenden-Marker</strong> auf Kompanie-Vermögen-Leiste setzen. Bestimmt die max. Höhe des speziellen Ruhestands!')}
<h3>Spezieller Ruhestand (Londoner Season)</h3>
<p>1 zusätzliches Familienmitglied aus Vorrat in Rente. Ausgaben ≤ höchste ausgezahlte Dividende einer Firma, an der man Anteile hält. Nur 1× pro Familie, auch bei mehreren Firmen.</p>
<h3>Firmen in der Schlusswertung</h3>
${bAction('<strong>Zuerst:</strong> SP pro Anteil laut Firmenwert. Anteile im Schuldner-Turm → –SP statt +SP. Dann spezieller Ruhestand ohne Prestige-Karten.')}
</div>`;}

function s_ph3_hiring(){return `

<div class="step-badge"><span class="step-num">Phase III</span><span class="step-phase">Ämter besetzen</span></div>
<div class="step-title">Ämter besetzen</div>
<div class="card">
${bExcept('<strong>Erste Runde:</strong> Diese Phase wird übersprungen!')}
<p>Ämterkarten in <strong>aufsteigender Nummerfolge</strong>.</p>
${bRule('<strong>Nepotismus:</strong> Eigenes Mitglied ernennen? Zustimmung aller anderen im Pool. Gilt nicht beim Vorsitz.')}
${bExcept('<strong>Nur 1 Kandidat im Pool?</strong> Gibt es nur einen einzigen Kandidaten im Pool, entfällt die Nepotismus-Regel vollständig – Ernennung ohne Zustimmung der anderen möglich.')}
${bRule('<strong>Beförderungen:</strong> Alte Ämterkarte sofort (in Nummernreihenfolge) in freie Ämter einordnen und ggf. neu besetzen. <strong>Ermattungs-Marker von der alten auf die neue Ämterkarte übertragen!</strong> <span class="badge bo">ERRATA</span>')}
${bExcept('<strong>Kommandanten können nicht Gouverneur werden!</strong> Sie sind von der Gouverneurs-Ernennung ausgeschlossen.')}
<h3>Wer ernennt wen?</h3>
${acc('hr-chair','Vorsitz',`<p>Kollegium wählt (Mehrheit). ${bw('Kein Konsens → ehemaliger Vorsitzender wählt selbst.')}</p>`)}
${acc('hr-dir','Direktor/GG',`<p>Vorsitzender → aus besetzten Ämtern außer Vorsitz, Gouverneure, Kommandanten.</p>`)}
${acc('hr-ship','Flottenverwalter',`<p>Vorsitzender → aus Schreibern aller Präsidentschaften.</p>`)}
${acc('hr-mil','Militärische Belange',`<p>Vorsitzender → Kommandant → Offizier → Offiziersanwärter.</p>`)}
${acc('hr-pres','Präsidenten',`<p>Direktor/GG → aus Schreibern oder Gouverneuren der Präsidentschaft.</p>`)}
${acc('hr-gov','Gouverneure',`<p>Präsident → Schreiber oder Offiziere der Region. <strong>Kommandanten kommen nicht in Frage!</strong></p>`)}
${bExcept('<strong>Pflicht:</strong> Alle Ämter müssen besetzt werden, wenn Kandidaten vorhanden.')}
</div>`;}

function s_ph4_chairman(){return `

<div class="step-badge"><span class="step-num">Phase IV · 1</span><span class="step-phase">Kompanie agiert</span></div>
<div class="step-title">Vorsitz</div>
<div class="card">
${bRule('<strong>⚠ Keine toten Aktionen:</strong> Eine Aktion darf nur durchgeführt werden, wenn sie eine Wirkung haben kann (z.B. kein Handeln ohne Schiff, kein Einsatz ohne Würfel/Offiziere).')}
${bRule('Ämter von <strong>links nach rechts</strong>. Privates Geld darf nicht für Amtszwecke verwendet werden.')}
<h3>Schritt 1: Schulden erhöhen (optional)</h3>
<p>Bis zu <strong>3× ohne Abstimmung</strong>. Jeder Schritt: Schuldenmarker +1 → Kompanie-Vermögen +<strong>£5</strong>.</p>
${bRule('<strong>Mehr als 3×?</strong> Zustimmung der Mehrheit aller Kollegiums-Mitglieder nötig. <strong>Schuldenmarker darf nie über das Ende der Leiste hinaus!</strong> Hinweis: Schulden können auch während der Budgetverteilung noch aufgenommen werden.')}
<h3>Schritt 2: Vermögen verteilen (Pflicht)</h3>
<p>Das <strong>gesamte</strong> Kompanie-Vermögen vollständig auf Amtsschatullen verteilen. Nichts bleibt auf der Leiste.</p>
${bExcept('<strong>Kein Bestechungsgeld:</strong> Amtsvermögen und Familienvermögen immer strikt getrennt.')}
</div>`;}

function s_ph4_director(gg){
if(!gg)return `

<div class="step-badge"><span class="step-num">Phase IV · 2</span><span class="step-phase">Kompanie agiert</span></div>
<div class="step-title">Direktor des Handels</div>
<div class="card">
<h3>Aktion A: Sondergesandter (beliebig oft)</h3>
<p>Erfolgstest: £1 = 1 Würfel, kein Abzug.</p>
${bg('<ul><li><strong>Auftrag öffnen:</strong> 1 geschlossenen Auftrag in Nicht-Kompanie-Region öffnen.</li><li><strong>China-Handel eröffnen:</strong> Superintendent-Amt entsteht. Sofort vom Vorsitzenden besetzen.</li></ul>')}
${bRule('Pro Aktion nur <em>eine</em> Option. Weitere → Aktion nochmals starten.')}
<h3>Aktion B: Bewegungen (immer danach)</h3>
<p>Bis zu <strong>2 Bewegungen</strong>: Je 1 Schreiber oder Schiff in andere Region.</p>
</div>`;
return `
<div class="step-badge"><span class="step-num">Phase IV · 2</span><span class="step-phase">Kompanie agiert</span></div>
<div class="step-title">General-Gouverneur <span class="badge bg2">GG</span></div>
<div class="card">
${bg('<strong>Soforteffekt bei GG-Einführung:</strong> Alle Gouverneure → Ruheständler-Feld. Gouverneurs-Plättchen entfernen. Halbfertige Schiffe entfernen. Direktor-Karte → GG-Karte.')}
<h3>Automatischer Einnahmenbonus (immer)</h3>
${bg('<strong>+£3 ins Kompanie-Vermögen</strong> für jede kontrollierte Region.')}
<h3>Aktion: Regieren (1× erfolgreich/Runde)</h3>
<p>Erfolgstest: £1 = 1 Würfel.</p>
${bw('Für jede gewürfelte 6 (auch bei Erfolg!): 1 Unruhe in <em>jeder</em> kontrollierten Region!')}
<p><strong>Bei Erfolg:</strong> £1 pro kontrollierter Region. Dann pro Region:</p>
${bg('<ul><li><strong>Steuern:</strong> +£2 → Kompanie oder Schatulle. Dann 1 Unruhe. Jede weitere in anderer Region!</li><li><strong>Regiment ausheben:</strong> 1 Regiment in beliebige Armee.</li><li><strong>Schiff bauen:</strong> 1 Kompanie-Schiff in beliebiger Seeregion.</li></ul>')}
${bw('<strong>Bei Misserfolg:</strong> 1 Unruhe in <em>jeder</em> kontrollierten Region!')}
</div>`;}

function s_ph4_shipping(){return `

<div class="step-badge"><span class="step-num">Phase IV · 3</span><span class="step-phase">Kompanie agiert</span></div>
<div class="step-title">Flottenverwalter</div>
<div class="card">
${bw('<strong>Pflicht:</strong> So viel ausgeben, bis max. <strong>£2</strong> übrig bleiben!')}
<h3>Option 1: Charterschiff mieten (schwarz) – £2 <span class="badge bo">ERRATA</span></h3>
<p>In eine Seeregion. Wird in Phase IX automatisch zurückgelegt.</p>
<h3>Option 2: Privates Schiff ausrüsten (blau) – £3</h3>
<p>Von beliebiger Werft. <strong>Keine Zustimmung des Werftbesitzers nötig!</strong> <em>(Diese Regelausnahme gilt nur für die Kompanie/den Flottenverwalter – nicht für private Firmen!)</em> £3 gehen an die Bank.</p>
<h3>Option 3: Kompanie-Schiff kaufen (rot) – £5</h3>
${bw('<strong>Nur möglich, wenn kein Schiff (blau oder rot) auf irgendeiner Werft liegt!</strong>')}
</div>`;}

function s_ph4_mil(){return `

<div class="step-badge"><span class="step-num">Phase IV · 4</span><span class="step-phase">Kompanie agiert</span></div>
<div class="step-title">Militärische Belange</div>
<div class="card">
<h3>Schritt 1: Bewegungen (optional)</h3>
<p>Bis zu <strong>2 Bewegungen</strong>: Je 1 Offizier oder Regiment zwischen Armeen. Werden nicht erschöpft.</p>
<h3>Schritt 2: Offiziersanwärter zuweisen (Pflicht)</h3>
<p>Alle Figuren im Anwärter-Feld <strong>müssen</strong> einer der 3 Armeen zugewiesen werden → werden Offiziere.</p>
<h3>Schritt 3: Kommandanten ernennen</h3>
<p>Familie mit den <strong>meisten Figuren</strong> in der Armee stellt den Kommandanten. Gleichstand: Amt für Militärische Belange entscheidet.</p>
${bRule('Kommandanten sind keine Ämter – Nepotismus-Regel gilt hier nicht.')}
</div>`;}

function s_ph4_pres(name,sea){return `

<div class="step-badge"><span class="step-num">Phase IV · 5</span><span class="step-phase">Präsidentschaft</span></div>
<div class="step-title">${name}</div>
<div class="card">
${bRule(`Vollständig abhandeln, dann zur nächsten. Reihenfolge: Bombay → Madras → Bengalen.<br>Seeregion: <strong>${sea}</strong>.`)}
${bExcept('Kein Präsident? Vorsitzender legt Reihenfolge fest, kann aber selbst weder handeln noch Allianzen genehmigen.')}
<h3>Aktionsreihenfolge</h3>
<p style="font-size:.88rem;color:var(--ink2);margin-bottom:10px">Präsident legt die Reihenfolge der 3 Ämter fest. Tippe zum Aufklappen.</p>
<div class="pres-combined">
  <div class="pres-cb" id="pcb-president">
    <div class="pres-cb-hd" onclick="togglePresBlock('president')">
      <div class="pres-cb-num">I</div>
      <div class="pres-cb-info"><div class="pres-cb-title">👤 Präsident – Handel treiben</div><div class="pres-cb-hint">1× erfolgreich/Runde · mehrere Versuche erlaubt</div></div>
      <button class="pres-cb-done" id="pslot-president" onclick="event.stopPropagation();tPresSlot('president')">○</button>
      <span class="pres-cb-arrow">▶</span>
    </div>
    <div class="pres-cb-body" id="pbbody-president" style="display:none">
      <h4>Aktion: Handel treiben</h4>
      <p>Nur <strong>1× pro Runde erfolgreich</strong>. Mehrere Versuche erlaubt.</p>
      <ul><li>Pflicht: Eigene <strong>Heimatregion</strong>.</li><li>Optional: weitere Regionen der Präsidentschaft und angrenzende.</li><li>Nie Heimatregion einer anderen Präsidentschaft!</li></ul>
      <p><strong>Test:</strong> £1 = 1 Würfel. –1W pro Fremd-Region.</p>
      ${bg('<strong>Bei Erfolg:</strong><ul><li>Pro Schiff in Seeregion: 1 offenen Auftrag belegen. <strong>1. Schreiber auf Heimathafen. Weitere nur angrenzend an bereits belegte Aufträge!</strong> <em>Heimatregionen anderer Präsidentschaften sind tabu!</em></li><li>Kompanie: +£ laut Auftragswert.</li><li>Präsident: +£1/Auftrag.</li><li>Familie: +£1/eigenem Schreiber auf erfülltem Auftrag.</li></ul>')}
    </div>
  </div>
  <div class="pres-cb" id="pcb-commander">
    <div class="pres-cb-hd" onclick="togglePresBlock('commander')">
      <div class="pres-cb-num">II</div>
      <div class="pres-cb-info"><div class="pres-cb-title">⚔ Kommandant – Einsatz</div><div class="pres-cb-hint">Beliebig oft · Beute · Regionen übernehmen</div></div>
      <button class="pres-cb-done" id="pslot-commander" onclick="event.stopPropagation();tPresSlot('commander')">○</button>
      <span class="pres-cb-arrow">▶</span>
    </div>
    <div class="pres-cb-body" id="pbbody-commander" style="display:none">
      <h4>Lokale Allianzen (optional)</h4>
      <p>Kommandant fordert Geld aus Schatulle (Zustimmung des Präsidenten). Für Einsatz <em>oder</em> Verteidigung.</p>
      <h4>Aktion: Einsatz</h4>
      <p><strong>Test:</strong> 1W/erschöpftem Offizier/Regiment + Allianzen. –1W/Turmstufe der Zielregion.</p>
      ${bg('<strong>Bei Erfolg (5 Schritte):</strong><ol><li>Beute: +£4/Turmstufe + Modifikator. Minimum: Offiziere +1.</li><li>Beute verteilen (Kommandant, Offiziere, Regimenter).</li><li>Trophäen: 1/Turmstufe. Turm + Kuppel entfernen.</li><li>Ordnung: Aufträge öffnen. Unruhe entfernen.</li><li>Gouverneurschaft einrichten (neue Region).</li></ol>')}
      ${bw('<strong>Offizier-Verluste:</strong> 1W6 pro erschöpftem Offizier – bei 6: zurück.')}
      ${bw('<strong>Katastrophaler Misserfolg (5–6):</strong> Kommandant gibt Hälfte Trophäen ab.')}
    </div>
  </div>
  <div class="pres-cb" id="pcb-governor">
    <div class="pres-cb-hd" onclick="togglePresBlock('governor')">
      <div class="pres-cb-num">III</div>
      <div class="pres-cb-info"><div class="pres-cb-title">🏛 Gouverneur(e) – Verwalten</div><div class="pres-cb-hint">Steuern · Regiment · Schiff</div></div>
      <button class="pres-cb-done" id="pslot-governor" onclick="event.stopPropagation();tPresSlot('governor')">○</button>
      <span class="pres-cb-arrow">▶</span>
    </div>
    <div class="pres-cb-body" id="pbbody-governor" style="display:none">
      <h4>Aktion: Verwalten (wiederholbar)</h4>
      <p>Ausgangswürfel laut Ämterkarte. Nach jeder Runde –1 Würfel.</p>
      ${bg('<strong>Bei Erfolg:</strong> £1 (+ £1 extra nach Misserfolg). Dann wählen:<ul><li><strong>Steuern:</strong> +£2 → Kompanie oder Schatulle. Ab 2. Steuer/Region/Runde: +1 Unruhe!</li><li><strong>Regiment:</strong> 1 Regiment in assoziierte Armee.</li><li><strong>Schiff bauen</strong> (2 Schritte).</li></ul>')}
      ${bw('<strong>Misserfolg:</strong> 1 Unruhe. –1 Würfel.')}
      ${bw('<strong>Katastrophaler Misserfolg (5–6):</strong> Gouverneur sofort entlassen!')}
    </div>
  </div>
</div>
<button class="ot-reset" onclick="resetPresOrder()">↺ Reihenfolge zurücksetzen</button>
</div>`;}

function s_ph4_china(){return `

<div class="step-badge"><span class="step-num">Phase IV · 6</span><span class="step-phase">China</span></div>
<div class="step-title">Superintendent des Handels in China</div>
<div class="card">
${bi('Amt entsteht durch Sondergesandter oder Gesetz. Agiert nach dem Präsidenten von Bengalen.')}
<h3>Voraussetzungen</h3>
<ul><li>Mind. <strong>1 Schiff</strong> in der China-Schatulle.</li><li>Mind. <strong>1 Exportsymbol</strong> in kontrollierter Region.</li></ul>
<h3>Aktion: Handel in China (1×/Runde)</h3>
<p>Erfolgstest: 1W/Schiff in China-Schatulle. Kein Abzug.</p>
${bg('<strong>Bei Erfolg:</strong><ul><li>Kompanie: +£4 pro Exportsymbol in allen kontrollierten Regionen.</li><li>Superintendent persönlich: +£1 pro Exportsymbol.</li></ul>')}
${bi('Schiffe in China gelten für Stürme als in der <strong>Ostindischen Seeregion</strong>.')}
</div>`;}

function s_ph5(){return `

<div class="step-badge"><span class="step-num">Phase V</span><span class="step-phase">Boni</span></div>
<div class="step-title">Familien-Boni</div>
<div class="card">
${bg('<ul><li><strong>£1</strong> pro Werft mit ausgerüstetem Schiff in einer Seeregion.</li><li><strong>£1</strong> pro eigenem Betrieb (nur nicht-investierte Familienbetriebe).</li></ul>')}
${bi('Investierte DEREG-Betriebe (umgedreht) zählen <strong>nicht</strong> für den Bonus.')}
${bi('Geht direkt ins Familienvermögen.')}
</div>`;}

function s_ph6_expenses(){return `

<div class="step-badge"><span class="step-num">Phase VI · 1</span><span class="step-phase">Einkommen</span></div>
<div class="step-title">Ausgaben & Notkredite</div>
<div class="card">
${$('tog-dr').checked?bb('<strong>Firmen zahlen ZUERST</strong> <span class="badge bd">DEREG</span><br>Firmen-Ausgaben: £1/Schiff + max(£1/Anteil, Firmenwert).'):''}
<h3>Schritt 1: Kompanie-Ausgaben</h3>
<p>Kompanie-Vermögen –<strong>£1</strong> für jeden: Schuldenmarker-Schritt · Regiment · Offizier · Schiff</p>
${bw('<strong>⚠ Kommandanten zählen NICHT zu den Ausgaben!</strong> Nur reguläre Offiziere (nicht der Kommandant der Armee) fließen in die Unterhaltskosten ein.')}
<h3>Schritt 2: Notkredite (falls nötig)</h3>
${bExcept('Gesetz „Königlicher Schutz" kann alle Notkredite verhindern.')}
<ol><li>Schuldenmarker +1 (auch bei Maximum!) → +£5.</li><li>Wiederholen bis bezahlt.</li><li><strong>Danach: Vermögen auf 0!</strong></li></ol>
${bExcept('<strong>Ansehen-Verlust:</strong> 1–2 Notkredite → –1 · 3+ → –2')}
${bExcept('<strong>Ansehen ganz links = Kompanie gescheitert!</strong>')}
<button class="btn btn-r mt" onclick="goToFinalScoring()">⚠ Kompanie gescheitert → Schlusswertung</button>
</div>`;}

function s_ph6_dividends(){return `

<div class="step-badge"><span class="step-num">Phase VI · 2</span><span class="step-phase">Einkommen</span></div>
<div class="step-title">Erwartungen & Dividenden</div>
<div class="card">
<h3>Schritt 3: Markterwartungen</h3>
<p>Vermögen <strong>unter Erwartungswert</strong>? → <strong>Ansehen –1</strong>.</p>
${bExcept('Ansehen ganz links = Kompanie gescheitert!')}
<h3>Schritt 4: Dividenden zahlen (optional)</h3>
<p>Einziger Weg, Ansehen zu erhöhen! Pro Ausschüttung: <strong>£1/Anteil</strong> (inkl. Vorsitzender).</p>
${bExcept('Das Kompanievermögen wird nach Notkrediten auf <strong>0 gesetzt</strong> bevor Dividenden möglich sind – Dividenden können also nur gezahlt werden, wenn vorher noch Geld übrig ist!')}
${bAction('<strong>Öffentliche Euphorie:</strong> Dividende gesamt > Erwartungswert → <strong>Ansehen +1!</strong>')}
<button class="btn btn-r mt" onclick="goToFinalScoring()">⚠ Kompanie gescheitert → Schlusswertung</button>
</div>`;}

function s_ph7(){return `

<div class="step-badge"><span class="step-num">Phase VII</span><span class="step-phase">Indien</span></div>
<div class="step-title">Ereignisse in Indien</div>
<div class="card">
<p>Stürme abhandeln, dann Ereigniskarten ziehen und abarbeiten.</p>
<button class="btn btn-r mt" onclick="startIndia()">🐘 Indien-Ereignisse starten</button>
</div>`;}

function s_ph8(){return `

<div class="step-badge"><span class="step-num">Phase VIII</span><span class="step-phase">Parlament</span></div>
<div class="step-title">Parlamentssitzung</div>
<div class="card">
<h3>1. Gesetz wählen</h3>
<p>PM zieht Karten (max. 3).</p>
${bExcept('<strong>Dilemma-Karte:</strong> Stoppt sofort – muss gewählt werden!')}
<h3>2. Politik bestimmen</h3>
<p>PM dreht PM-Scheiben-Zeiger auf das Feld laut Gesetz.</p>
<h3>3. Abstimmung</h3>
<p>PM markiert <strong>anfängliche Unterstützung</strong>. Dann im Uhrzeigersinn:</p>
<ul><li><strong>Dafür:</strong> £1 = 1 Stimme, oder Karten erschöpfen.</li><li><strong>Dagegen:</strong> Gleiche Ressourcen → Marker sinkt.</li><li><strong>PM darf für ‚Dafür'-Stimmen nicht seine eigenen Unternehmen nutzen</strong> – außer mit einer passenden Versprechen-Karte. Er darf auch <strong>nicht dagegen stimmen</strong>, außer bei der Deregulierung. <span class="badge bo">ERRATA</span></li></ul>
${acc('ph8-opp','Opposition & Koalitionen',`<ul><li>Gegen = Opposition. Einmal dagegen, nicht mehr dafür.</li><li><strong>Oppositionsführer:</strong> Meiste Gegenstimmen.</li><li><strong>Koalition:</strong> Spieler können Stimmen im Namen eines anderen Spielers abgeben – dieser muss aber bereits gegen das Gesetz gestimmt haben oder dies commiten. Diese Stimmen zählen zu seinen Gegenstimmen (→ Oppositionsführer).</li></ul>`)}
<h3>4. Ergebnis</h3>
<ul><li><strong>Beschlossen (≥ 0):</strong> PM erhält 1 Gesetz-Marker (+1 Macht). Soforteffekte ausführen.</li><li><strong>Abgelehnt (< 0):</strong> Oppositionsführer → neuer PM. Dreht Zeiger 1 Position.</li></ul>
${acc('ph8-pol','Folgen der Politik',`${dt([['STEUER','£1/Zielobjekt. Nicht zahlen → zurück.'],['BONUS','£1/Zielobjekt aus Bank.'],['MACHT','Macht-Marker mit nächsthöherem tauschen.']])}`)}
${acc('ph8-dereg','Deregulierungs-Abstimmung <span class="badge bd">1758 · Lang-1710</span>',`
<p><strong>Wann:</strong> Zu Beginn jeder Runde, <em>vor</em> Phase I, wenn Ansehen- oder Schuldenmarker auf einem gestrichelten Feld steht.</p>
${bw('<strong>Sternfeld:</strong> Wenn mind. ein Marker auf einem Sternfeld steht, <em>muss</em> der PM eine Deregulierungs-Sitzung einberufen!')}
<h4>Abstimmung</h4>
<p>Wie normale Abstimmung, aber: <strong>PM darf gegen das Gesetz stimmen.</strong> Keine Politik-Folgen. Gesetz bleibt im Falle einer Ablehnung im Spiel (nicht abwerfen).</p>
<h4>Bei Annahme</h4>
${bg('<ul><li>Schuldenmarker: –1 pro 2 Schulden (abrunden).</li><li>Ansehen-Marker auf das Feld „S" setzen.</li><li>PM erhält 1 Gesetz-Marker.</li><li>Deregulierungsregeln gelten ab sofort!</li></ul>')}
<h4>Bei Ablehnung</h4>
${bw('<ul><li>Wert der Kompanie-Anteile um 1 erhöhen (Marker umdrehen/verschieben). Max. ±3 SP.</li><li>PM bleibt. Gesetz bleibt.</li></ul>')}
`)}
</div>`;}

function s_ph9(){return `

<div class="step-badge"><span class="step-num">Phase IX</span><span class="step-phase">Auffrischung</span></div>
<div class="step-title">Unterhalt & Auffrischung</div>
<div class="card">
${cl(['<strong>Unterhalt zahlen:</strong> Weiße Zahl pro Belohnung. Nicht zahlen → Figur zurück + SP abziehen.','<strong>Letzte Runde?</strong> → Schlusswertung (Phase X).','<strong>Schreiber-Marker</strong> → zurück in Vorrat.','<strong>Erfüllt-Marker & Präsidentschafts-Teiler</strong> → zurück.','<strong>Charterschiffe</strong> (schwarz) → zurück auf Schachtel.','Erschöpfte <strong>Offiziere & Regimenter</strong> wieder aktivieren.','Aktivierte lokale <strong>Allianzen</strong> → erschöpfen.','<strong>Rundenmarker</strong> vorrücken.'])}
</div>`;}

function s_ph10(){return `

<div class="step-badge"><span class="step-num">Phase X</span><span class="step-phase">Spielende</span></div>
<div class="step-title">Spielende & Schlusswertung</div>
<div class="card">
${bRule('Endet nach letzter Runde <em>oder sofort</em> wenn Ansehen ganz links.')}
${$('tog-dr').checked ? bAction('<strong>DEREG – Schlusswertung Zusatz (ZUERST ausführen):</strong><ol><li>Firmen-Wertung: Punkte pro Firmen-Anteil laut Firmenwert-Tabelle. Anteile im Schuldner-Turm geben Minus-Punkte.</li><li>Spezieller Ruhestand für Anteilsinhaber (keine Prestige-Karten).</li><li>Dann normale Schlusswertung.</li></ol>') : ''}
<h3>Schlusswertung – Reihenfolge</h3>
<ol>
  ${$('tog-dr').checked ? '<li><em>(Schritt 0: Firmen-Wertung + spezieller Ruhestand – siehe oben)</em></li>' : ''}
  <li><strong>SP auf der Punkte-Leiste</strong> zählen.</li>
  <li><strong>Anteile/Betriebe:</strong> Überlebt → Kollegium-Tabelle. Scheitert → –1 SP/Anteil; +1 SP/Betrieb.</li>
  <li><strong>Macht:</strong> Trophäen (+1), PM (+2), Gesetze (+1), Karten laut Aufdruck.</li>
  <li><strong>Macht-Prämie:</strong> Top-2 Familien → SP laut Tabelle oben links am Spielplan.</li>
</ol>
${bRule('<strong>Gleichstand Gesamt:</strong> Fenster-Symbole → PM-Reihenfolge.')}
<div class="btn-row mt">
  <button class="btn btn-g" onclick="showEndResult(true)">✓ Kompanie überlebt</button>
  <button class="btn btn-r" onclick="showEndResult(false)">✗ Kompanie gescheitert</button>
</div>
<div id="end-result"></div>
</div>`;}

/* ══════════════════════ INDIEN STATE MACHINE ══════════════════════ */
let IS={};
let indiaStandalone=false;
const LS_KEY='jc2e_state_v1';
let currentAppMode='menu';

function startIndia(){IS={step:'storm',evTotal:0,evDone:0,invSuccess:false,isInv:false,lostReg:0,fromStorm:false,_afterLoss:null,stormReg:[],stormIdx:0,curReg:'',crType:''};$('guide-nav').classList.add('hidden');saveState();renderIndia();}
function renderIndia(){saveState();const v=IV[IS.step];if(!v)return;let html=`<div class="step-badge"><span class="step-num">${v.label||'Indien'}</span><span class="step-phase">Phase VII</span></div><div class="step-title">${v.title}</div>`;if(IS.evTotal>0&&!['summary','storm'].includes(IS.step))html+=`<div class="ev-cnt">Ereignis ${IS.evDone} / ${IS.evTotal}</div>`;html+=`<div class="card">${v.render()}</div>`;$('M').innerHTML=html;$('H-ph').textContent='Phase VII · Indien';const tc=$('tab-content');if(tc)tc.scrollTop=0;if(IS.step==='ev_ausland')setTimeout(auslandUpdate,50);switchTab('guide');}
function iGo(key,tmp){IS.step=key;if(tmp)IS.temp=tmp;saveState();renderIndia();}
function tLoss(isInv,after){IS.lostReg=(IS.lostReg||0)+1;IS.isInv=isInv;IS._afterLoss=after||'el_march';IS.step='region_loss';saveState();renderIndia();}
function afterLoss(){const n=IS._afterLoss||'el_march';IS._afterLoss=null;IS.isInv=false;iGo(n);}
function getStormReg(pfx){const r=[];if($(pfx+'b')?.checked)r.push('Bombay');if($(pfx+'m')?.checked)r.push('Madras');if($(pfx+'e')?.checked)r.push('Bengalen');return r.length?r:['Region der Ereignisscheibe'];}
function startStormInv(regs){IS.stormReg=regs;IS.stormIdx=0;IS.curReg=regs[0];iGo('fi_loop');}
function nextStormReg(){IS.stormIdx++;if(IS.stormReg&&IS.stormIdx<IS.stormReg.length){IS.curReg=IS.stormReg[IS.stormIdx];iGo('fi_loop');}else{IS.invSuccess=false;IS.stormReg=[];IS.stormIdx=0;IS.curReg='';if(IS.fromStorm){IS.fromStorm=false;IS.evDone=1;IS.step='draw';renderIndia();}else{finishEvent();}}}
function finishEvent(){IS.invSuccess=false;IS.crType='';IS.temp={};if(IS.evDone<IS.evTotal){IS.evDone++;IS.step='draw';}else{IS.step='summary';}renderIndia();}
function endIndiaPhase(){$('guide-nav').classList.remove('hidden');if(indiaStandalone){backToMenu();}else{IS={};saveState();nav(1);}}
function evOverview(){return `<div class="ev-grid"><div class="ev-tile" onclick="iGo('ev_tumulte')"><div class="ev-tile-ic">🌪</div><div class="ev-tile-n">Tumulte</div><div class="ev-tile-d">Aufträge schließen</div></div><div class="ev-tile" onclick="iGo('ev_geldregen')"><div class="ev-tile-ic">💰</div><div class="ev-tile-n">Geldregen</div><div class="ev-tile-d">£1/Schreiber</div></div><div class="ev-tile" onclick="iGo('ev_anfuehrer')"><div class="ev-tile-ic">👑</div><div class="ev-tile-n">Anführer</div><div class="ev-tile-d">Turm +1 oder Rebellion</div></div><div class="ev-tile" onclick="iGo('ev_frieden')"><div class="ev-tile-ic">🕊</div><div class="ev-tile-n">Frieden</div><div class="ev-tile-d">Aufträge öffnen</div></div><div class="ev-tile" onclick="IS.invSuccess=false;IS.crType='';iGo('ev_krise')"><div class="ev-tile-ic">⚔</div><div class="ev-tile-n">Krise</div><div class="ev-tile-d">Kampf laut Elefant</div></div><div class="ev-tile" onclick="IS.fromStorm=false;iGo('ev_ausland')"><div class="ev-tile-ic">🛡</div><div class="ev-tile-n">Ausländ. Invasion</div><div class="ev-tile-d">Angriff von außen</div></div><div class="ev-tile" onclick="iGo('ev_mischen')"><div class="ev-tile-ic">♻</div><div class="ev-tile-n">Neu Mischen</div><div class="ev-tile-d">Stapel mischen</div></div></div>`;}
function kssText(){return bi('Kein Kommandant besetzt? → Militärische Belange übernimmt. Kein MA? → Vorsitzender.');}
function cascadeBox(suf){const body=`<p>Eine <strong>Kettenreaktion</strong> tritt auf, wenn alle Aufträge einer Region geschlossen sind und noch einer geschlossen werden müsste.</p><ol><li>Nachbar-Aufträge schließen, die verbunden sind. Schreiber → Familienvorrat.</li><li>Verbundener Auftrag bereits geschlossen? → Nördlichsten offenen Auftrag der Nachbarregion schließen.</li><li>Alle Nachbar-Aufträge geschlossen? → Diese löst ihrerseits Kettenreaktion aus.</li></ol>${bw('Jede Region kann pro Ereignis nur 1× eine Kettenreaktion <em>auslösen</em>.')}`;return `<div class="xref-acc">${acc('casc-'+suf,'🔗 Kettenreaktion – Regeldetails',body)}</div>`;}
function branchBox(frage, ja_ziel, nein_ziel, weiter_ziel){
const wz = weiter_ziel || nein_ziel;
return `<div class="box box-i" style="margin:8px 0">
<span class="box-action-lbl">❓ ENTSCHEIDUNG</span>

<p style="font-weight:600;color:var(--ink);margin-bottom:8px">${frage}</p>
<div class="btn-row" style="margin-bottom:6px">
  <button class="btn btn-g" style="flex:1;margin-bottom:0" onclick="iGo('${ja_ziel}')">✓ Ja</button>
  <button class="btn btn-r" style="flex:1;margin-bottom:0" onclick="iGo('${nein_ziel}')">✗ Nein</button>
</div>
<button class="btn btn-d" style="margin-bottom:0;font-size:.72rem;opacity:.65" onclick="iGo('${wz}')">→ Einfach Weiter (überspringen)</button>
</div>`;}
function regionLossRuleBox(suf){const body=`<p>Wenn eine Kompanie-Region verloren geht:</p><ol><li><strong>Kommandant:</strong> Hälfte Trophäen abgeben. Figur zurück.</li><li><strong>Offizier-Verluste:</strong> 1W6 pro Offizier – bei 6: zurück. Regimenter: kein Wurf.</li><li><strong>Gouverneur:</strong> Zurück, Ämterkarte → freie Ämter. (Entfällt bei GG.)</li><li><strong>Aufräumen:</strong> Gouverneurs-Plättchen, Kompanie-Schiffe, Unruhe entfernen. <em>Nur bei Invasions-Krise:</em> <strong>Zuerst alle offenen Aufträge schließen (Kettenreaktion prüfen!)</strong>, bevor Trophäen/Offiziere abgehandelt werden. Alle offenen Aufträge der Region schließen. Falls danach alle Aufträge geschlossen → Kettenreaktion!</li><li><strong>Lokale Autorität:</strong> Je nach Ereignistyp.</li><li><strong>Ansehen:</strong> 1. Region –1 · 2. –2 weitere · 3.+ –3 weitere.</li></ol>`;return `<div class="xref-acc">${acc('rloss-'+suf,'⚠ Region-Verlust – alle Schritte',body)}</div>`;}

/* ══════════════════════ IV – INDIEN EVENT HANDLERS ══════════════════════ */
const IV={
storm:{title:'Sturmwürfel & Stürme',label:'Schritt 1',render:()=>`
${evOverview()}

<h3>Sturmwürfel werfen</h3>
${bw('Nur <strong>blaue Spieler-Schiffe</strong>! Charter und Kompanie-Schiffe nicht betroffen.')}
${dt([['1–2','Nichts.'],['3–4','Schiff auf Schaden-Seite drehen. Bereits beschädigt → zurück auf Werft (<strong>reparierte Seite</strong>).'],['5–6','Sofort zurück auf Werft – <strong>reparierte (nicht-erschöpfte) Seite!</strong>']])}
<h3>Wie viele Ereigniskarten?</h3>
<div class="storm-cnt-grid">
  <button class="storm-cnt-btn" onclick="IS.evTotal=1;IS.evDone=1;IS.fromStorm=false;IS.step='draw';renderIndia()">
    <span class="storm-cnt-ic">①</span>
    <span class="storm-cnt-lbl">Ereignis</span>
  </button>
  <button class="storm-cnt-btn" onclick="IS.evTotal=2;IS.evDone=1;IS.fromStorm=false;IS.step='draw';renderIndia()">
    <span class="storm-cnt-ic">②</span>
    <span class="storm-cnt-lbl">Ereignisse</span>
  </button>
  <button class="storm-cnt-btn" onclick="IS.evTotal=3;IS.evDone=1;IS.fromStorm=false;IS.step='draw';renderIndia()">
    <span class="storm-cnt-ic">③</span>
    <span class="storm-cnt-lbl">Ereignisse</span>
  </button>
</div>`},
draw:{title:'Ereigniskarte ziehen',label:'Karte wählen',render:()=>`
${bi('<strong>Rückseite zuerst:</strong> Region auf Rückseite notieren. Ausnahme: bei Krise/Frieden zählt Elefantenposition.')}
<p>Karte umdrehen und Typ wählen:</p>
${chbtn('🌪','Tumulte','Aufträge schließen','iGo(\'ev_tumulte\')')}
${chbtn('💰','Geldregen','Familien erhalten Geld','iGo(\'ev_geldregen\')')}
${chbtn('👑','Anführer','Turm +1 oder Rebellion','iGo(\'ev_anfuehrer\')')}
${chbtn('🕊','Frieden','Aufträge öffnen','iGo(\'ev_frieden\')')}
${chbtn('⚔','Krise','Kampf laut Elefant','IS.invSuccess=false;IS.crType=\'\';iGo(\'ev_krise\')')}
${chbtn('🛡','Ausländ. Invasion','Angriff von außen','IS.fromStorm=false;iGo(\'ev_ausland\')')}
${chbtn('♻','Neu Mischen','Stapel mischen','iGo(\'ev_mischen\')')}
`},
ev_tumulte:{title:'Tumulte',label:'Ereignis',render:()=>`
${trail('Ereigniskarte','Tumulte')}
<p><strong>Nördlichsten offenen Auftrag</strong> der Region schließen. Schreiber zurück. Kettenreaktion prüfen.</p>
${cascadeBox('tumulte')}
<button class="btn btn-d mt" onclick="iGo('el_march')">→ Marsch des Elefanten</button>`},
ev_geldregen:{title:'Geldregen',label:'Ereignis',render:()=>`
${trail('Ereigniskarte','Geldregen')}
<p>Jede Familie: <strong>£1 pro eigenem Schreiber</strong> in der Region und direkt angrenzenden.</p>
${bi('Schreiber auf geschlossenen Aufträgen zählen!')}
<button class="btn btn-d mt" onclick="iGo('el_march')">→ Marsch des Elefanten</button>`},
ev_anfuehrer:{title:'Anführer',label:'Ereignis',render:()=>`
${trail('Ereigniskarte','Anführer')}
${chbtn('🏛','Souveräne Region','Hauptstadt/keine Flagge → Turmstufe +1','iGo(\'ev_anf_sov\')')}
${chbtn('⚔','Dominierte Region','Kleine Flagge → Rebellion gegen Souverän','iGo(\'ev_anf_reb\')')}
`},
ev_anf_sov:{title:'Anführer – Souveräne Region',label:'Ergebnis',render:()=>`
${trail('Anführer','Souveräne Region')}
${bg('<strong>1 Turmstufe</strong> zur Region hinzufügen. Kein Kampf.')}
${bi('Elefant bewegt sich bei diesem Zweig nicht.')}
<button class="btn btn-d mt" onclick="finishEvent()">Ereignis abschließen ✓</button>`},
ev_anf_reb:{title:'Anführer – Rebellion',label:'Kampf',render:()=>`
${trail('Anführer','Dominierte Region','Rebellion')}
${cb('Turmstufen der <strong>angreifenden Region</strong> + Modifikator.','Turmstufen der <strong>Hauptstadt des Souveräns</strong>.','Verteidiger gewinnt.')}
<div class="btn-row mt">
  <button class="btn btn-r" style="flex:1" onclick="iGo('ev_anf_reb_win')">Angreifer siegt</button>
  <button class="btn btn-d" style="flex:1" onclick="iGo('ev_anf_reb_lose')">Verteidiger siegt</button>
</div>`},
ev_anf_reb_win:{title:'Anführer – Angreifer siegt',label:'Ergebnis',render:()=>`
${trail('Anführer','Rebellion','Angreifer siegt')}
${bg('<ul><li>Angreifer entfernt kleine Flagge → wird souverän.</li><li>Alle offenen Aufträge schließen. Kettenreaktion prüfen.</li></ul>')}
${cascadeBox('anf-reb-win')}
${chbtn('🐘','Kompanie-Region & Elefant war drin','Elefanten-Marsch','iGo(\'el_march\')')}
${chbtn('✓','Externe Region oder Elefant nicht drin','Kein Marsch','finishEvent()')}
`},
ev_anf_reb_lose:{title:'Anführer – Verteidiger siegt',label:'Ergebnis',render:()=>`
${trail('Anführer','Rebellion','Verteidiger siegt')}
${bw('<strong>Hauptstadt verliert 1 Turmstufe.</strong>')}
${bi('Elefant bewegt sich nicht.')}
<button class="btn btn-d mt" onclick="finishEvent()">Ereignis abschließen ✓</button>`},
ev_frieden:{title:'Frieden',label:'Ereignis',render:()=>`
${trail('Ereigniskarte','Frieden')}
${bw('<strong>Elefanten-Position entscheidet – nicht die Karten-Region!</strong>')}
${chbtn('🐘','Elefant in Kompanie-Region','Aufträge öffnen + Unruhe entfernen','iGo(\'ev_frie_center\')')}
${chbtn('🔀','Elefant auf Grenze','Aufträge über diese Grenze öffnen','iGo(\'ev_frie_border\')')}
`},
ev_frie_center:{title:'Frieden – Elefant in Region',label:'Ergebnis',render:()=>`
${trail('Frieden','Elefant in Kompanie-Region')}
${bg('<ul><li>Alle geschlossenen Aufträge öffnen.</li><li>Alle Unruhe-Marker entfernen.</li></ul>')}
<button class="btn btn-d mt" onclick="iGo('el_march')">→ Marsch des Elefanten</button>`},
ev_frie_border:{title:'Frieden – Elefant auf Grenze',label:'Ergebnis',render:()=>`
${trail('Frieden','Elefant auf Grenze')}
${bg('<ul><li>Aufträge öffnen, deren Verbindung über diese Grenze führt.</li><li>Für jede angrenzende Nicht-Kompanie-Region: +1 Turmstufe.</li></ul>')}
<button class="btn btn-d mt" onclick="iGo('el_march')">→ Marsch des Elefanten</button>`},
ev_krise:{title:'Krise',label:'Krise',render:()=>`
${trail('Ereigniskarte','Krise')}
<div class="crisis-badge cr-reb">⚔ KRISE</div>
${bi('<strong>Schwanz = Angreifer · Kopf = Verteidiger.</strong> Modifikator = Position der Ereignisscheibe.')}
${chbtn('🔴','MITTEN in Kompanie-Region','Rebellion von innen','IS.crType=\'reb\';iGo(\'k_co_reb\')')}
${chbtn('🟠','Auf GRENZE einer Kompanie-Region','Invasion von außen','IS.crType=\'inv\';iGo(\'k_co_inv\')')}
${chbtn('🟡','KEINE Kompanie-Region berührt','Einheimische Krise','IS.crType=\'nat\';iGo(\'k_nat_q\')')}
`},
k_co_reb:{title:'Krise – Rebellion',label:'Krise · Rebellion',render:()=>`
${trail('Krise','Elefant in Kompanie-Region','Rebellion')}
<div class="crisis-badge cr-reb">🔴 REBELLION VON INNEN</div>
${cb('Unruhe-Marker + <strong>Modifikator</strong>.','Offiziere + Regimenter + lokale Allianzen.','Kompanie gewinnt.')}
${kssText()}
<div class="btn-row mt">
  <button class="btn btn-g" style="flex:1" onclick="iGo('k_co_reb_win')">✓ Kompanie siegt</button>
  <button class="btn btn-r" style="flex:1" onclick="tLoss(false,'k_follow')">✗ Region verloren</button>
</div>
<div class="box box-w" style="border-left-color:#b86010;background:#fff8ee;color:#4a2800;margin:8px 0"><strong>⚠ Wenn verloren – ZUERST:</strong> Alle offenen Aufträge schließen → Kettenreaktion prüfen.</div>
${cascadeBox('co-reb-pre')}
${regionLossRuleBox('co-reb')}`},
k_co_reb_win:{title:'Rebellion abgewehrt',label:'Ergebnis',render:()=>`
${trail('Krise','Rebellion','Kompanie siegt')}
${bg('<ul><li>Alle Unruhe-Marker entfernen.</li><li>Kommandant: <strong>1 Trophäe</strong>.</li></ul>')}
<button class="btn btn-d mt" onclick="iGo('k_follow')">→ Folge-Rebellionen prüfen</button>`},
k_co_inv:{title:'Krise – Invasion',label:'Krise · Invasion',render:()=>`
${trail('Krise','Elefant auf Grenze','Invasion gegen Kompanie')}
<div class="crisis-badge cr-inv">🟠 INVASION VON AUSSEN</div>
${bi('Stärke Angreifer = ALLE Turmstufen im gesamten Reich!')}
${cb('Alle Turmstufen im <strong>Reich</strong> + Unruhe + <strong>Modifikator</strong>.','Offiziere + Regimenter + lokale Allianzen.','Kompanie gewinnt.')}
${kssText()}
<div class="btn-row mt">
  <button class="btn btn-g" style="flex:1" onclick="iGo('k_co_inv_win')">✓ Kompanie hält stand</button>
  <button class="btn btn-r" style="flex:1" onclick="IS.invSuccess=true;tLoss(true,'k_follow')">✗ Region verloren</button>
</div>
${regionLossRuleBox('co-inv')}
${cascadeBox('co-inv-rloss')}`},
k_co_inv_win:{title:'Invasion abgewehrt',label:'Ergebnis',render:()=>`
${trail('Krise','Invasion','Kompanie siegt')}
${bg('<ul><li>Alle Unruhe-Marker entfernen.</li><li>Kommandant: <strong>1 Trophäe</strong>.</li><li>Angreifer verliert <strong>1 Turmstufe</strong> in Hauptstadt.</li></ul>')}
<button class="btn btn-d mt" onclick="iGo('k_follow')">→ Folge-Rebellionen prüfen</button>`},
k_nat_q:{title:'Einheimische Krise',label:'Krise · Einheimisch',render:()=>`
${trail('Krise','Keine Kompanie-Region')}
<div class="crisis-badge cr-nat">🟡 EINHEIMISCHE KRISE</div>
${chbtn('⚔','Angreifer dominiert Verteidiger','Kleine Flagge vorhanden','iGo(\'k_nat_dom\')')}
${chbtn('🏛','Souverän greift Souverän an','Beide haben keine oder eigene Flagge','iGo(\'k_nat_sov\')')}
`},
k_nat_dom:{title:'Einheimisch – Unterwerfung',label:'Krise',render:()=>`
${trail('Einheimische Krise','Dominierung')}
${cb('Turmstufen des <strong>Angreifers</strong> + Modifikator.','Turmstufen des <strong>Verteidigers</strong>.','Verteidiger gewinnt.')}
<div class="btn-row mt">
  <button class="btn btn-r" style="flex:1" onclick="iGo('k_nat_dom_win')">Angreifer siegt</button>
  <button class="btn btn-d" style="flex:1" onclick="iGo('el_march')">Verteidiger siegt → Marsch</button>
</div>`},
k_nat_dom_win:{title:'Einheimisch – Angreifer siegt',label:'Ergebnis',render:()=>`
${trail('Einheimische Krise','Angreifer siegt')}
${bg('<ul><li>Verteidiger verliert 1 Turmstufe. Alle Aufträge schließen. Kettenreaktion prüfen.</li><li>Souveräne Region → kleine Flagge des Angreifers setzen.</li></ul>')}
${cascadeBox('nat-dom-win')}
<button class="btn btn-d mt" onclick="iGo('el_march')">→ Marsch des Elefanten</button>`},
k_nat_sov:{title:'Einheimisch – Souverän vs Souverän',label:'Krise',render:()=>`
${trail('Einheimische Krise','Souverän vs. Souverän')}
${cb('Turmstufen des <strong>Angreifers</strong> + Modifikator.','Turmstufen des <strong>Verteidigers</strong> (Hauptstadt).','Verteidiger gewinnt.')}
<div class="btn-row mt">
  <button class="btn btn-r" style="flex:1" onclick="iGo('k_nat_sov_win')">Angreifer siegt</button>
  <button class="btn btn-d" style="flex:1" onclick="iGo('el_march')">Verteidiger siegt → Marsch</button>
</div>`},
k_nat_sov_win:{title:'Einheimisch – Souverän besiegt',label:'Ergebnis',render:()=>`
${trail('Einheimische Krise','Souverän siegt')}
${bg('<ul><li>Verteidiger –1 Turmstufe. Aufträge schließen → Kettenreaktion.</li><li>Angreifer dominiert: kleine Flagge setzen.</li></ul>')}
${cascadeBox('nat-sov-win')}
<button class="btn btn-d mt" onclick="iGo('el_march')">→ Marsch des Elefanten</button>`},
k_follow:{title:'Folge-Rebellionen',label:'Krise · Folge',render:()=>`
${trail('Krise','Primärkampf','Folge-Rebellionen')}
${bi('Alle anderen Kompanie-Regionen mit Unruhe kämpfen. Reihenfolge: Bombay → Madras → Bengalen.')}
${chbtn('⚔','Kompanie-Region mit Unruhe vorhanden','Folge-Rebellion','iGo(\'k_follow_combat\')')}
${chbtn('✓','Keine weiteren Unruhe-Regionen','Alle Kämpfe done','iGo(\'k_post\')')}
`},
k_follow_combat:{title:'Folge-Rebellion – Kampf',label:'Folge-Rebellion',render:()=>`
${trail('Krise','Folge-Rebellion')}
<div class="crisis-badge cr-reb">🔴 FOLGE-REBELLION</div>
${bi('Erschöpfte Kräfte aus Primärkrise bleiben erschöpft.')}
${cb('Unruhe-Marker + Modifikator.','Offiziere + Regimenter + lokale Allianzen.','Kompanie gewinnt.')}
${kssText()}
<div class="btn-row mt">
  <button class="btn btn-g" style="flex:1" onclick="iGo('k_follow_win')">✓ Kompanie siegt</button>
  <button class="btn btn-r" style="flex:1" onclick="tLoss(false,'k_follow')">✗ Region verloren</button>
</div>
<div class="box box-w" style="border-left-color:#b86010;background:#fff8ee;color:#4a2800;margin:8px 0"><strong>⚠ Wenn verloren – ZUERST:</strong> Aufträge schließen → Kettenreaktion prüfen.</div>
${cascadeBox('follow-pre')}
${regionLossRuleBox('follow')}`},
k_follow_win:{title:'Folge-Rebellion abgewehrt',label:'Ergebnis',render:()=>`
${trail('Folge-Rebellion','Kompanie siegt')}
${bg('<ul><li>Alle Unruhe-Marker entfernen.</li><li>Kommandant: <strong>1 Trophäe</strong>.</li></ul>')}
<button class="btn btn-d mt" onclick="iGo('k_follow')">→ Nächste Folge-Rebellion prüfen</button>`},
k_post:{title:'Nach der Krise',label:'Krise · Abschluss',render:()=>`
${trail('Krise','Alle Kämpfe abgeschlossen')}
${bg('<strong>Alle Kämpfe dieser Krise beendet.</strong>')}
<button class="btn btn-d mt" onclick="iGo('el_march')">→ Marsch des Elefanten</button>`},
ev_ausland:{title:'Ausländische Invasion',label:'Ereignis',render:()=>`
${trail('Ereigniskarte','Ausländ. Invasion')}
<div class="crisis-badge cr-inv">🛡 AUSLÄNDISCHE INVASION</div>
<p>Welche Kompanie-Regionen werden angegriffen? (laut Sturmwürfel)</p>
<div class="box box-g">
<label style="display:flex;gap:10px;align-items:center;cursor:pointer;padding:4px 0"><input type="checkbox" id="ausb" style="width:18px;height:18px;accent-color:var(--red);flex-shrink:0" onchange="auslandUpdate()"><span>Westindischer Ozean → <strong>Bombay</strong></span></label>
<label style="display:flex;gap:10px;align-items:center;cursor:pointer;padding:4px 0"><input type="checkbox" id="ausm" style="width:18px;height:18px;accent-color:var(--red);flex-shrink:0" onchange="auslandUpdate()"><span>Südindischer Ozean → <strong>Madras</strong></span></label>
<label style="display:flex;gap:10px;align-items:center;cursor:pointer;padding:4px 0"><input type="checkbox" id="ause" style="width:18px;height:18px;accent-color:var(--red);flex-shrink:0" onchange="auslandUpdate()"><span>Ostindischer Ozean → <strong>Bengalen</strong></span></label>
</div>
<div id="ausland-no-storm" style="display:none;margin:8px 0">
${bw('<strong>⚠ Kein Sturmsymbol:</strong> Invasion in der Region der obersten Ereigniskarte.')}
<label style="display:block;font-size:.85rem;color:var(--ink2);margin:6px 0 4px">Region der Ereignisscheibe wählen:</label>
<select id="aus-region-sel" style="width:100%;padding:9px 10px;border:1px solid var(--border);border-radius:var(--r-s);background:var(--surface);color:var(--ink);font-size:.9rem;cursor:pointer">
<option value="">– Region auswählen –</option>
<option value="Bombay">Bombay</option><option value="Madras">Madras</option>
<option value="Bengalen">Bengalen</option><option value="Hyderabad">Hyderabad</option>
<option value="Maratha">Maratha</option><option value="Mysore">Mysore</option>
<option value="Delhi">Delhi</option><option value="Punjab">Punjab</option>
</select>
</div>
<button class="btn btn-r mt" onclick="auslandStart()">⚔ Invasionen starten</button>
`},
fi_loop:{title:'Ausländ. Invasion – Kampf',label:'Invasion · Kampf',render:()=>`
${trail('Ausländische Invasion',IS.curReg||'Region')}
<div class="crisis-badge cr-inv">🛡 INVASION: ${IS.curReg||''}</div>
${cb('Sturmwürfel-Stärke + Unruhe in der Region.','Offiziere + Regimenter + lokale Allianzen.','Kompanie gewinnt.')}
${kssText()}
<div class="box box-w" style="border-left-color:#b86010;background:#fff8ee;color:#4a2800;margin:8px 0"><strong>⚠ Wenn verloren – ZUERST:</strong> Aufträge schließen → Kettenreaktion prüfen.</div>
${cascadeBox('fi-loop-pre')}
<div class="btn-row mt">
  <button class="btn btn-g" style="flex:1" onclick="iGo('fi_win')">✓ Kompanie siegt</button>
  <button class="btn btn-r" style="flex:1" onclick="IS.isInv=true;IS.invSuccess=true;IS._afterLoss='fi_follow';IS.lostReg=(IS.lostReg||0)+1;IS.step='region_loss';saveState();renderIndia()">✗ Region verloren</button>
</div>
${regionLossRuleBox('fi-loop')}`},
fi_win:{title:'Invasion abgewehrt',label:'Ergebnis',render:()=>`
${trail('Ausländ. Invasion','Kompanie siegt')}
${bg('<ul><li>Alle Unruhe-Marker entfernen.</li><li>Kommandant: <strong>1 Trophäe</strong>.</li></ul>')}
<button class="btn btn-d mt" onclick="nextStormReg()">→ Nächste Region / Abschließen</button>`},
fi_follow:{title:'Weitere Invasionen?',label:'Invasion · Weiter',render:()=>`
${trail('Ausländ. Invasion','Weiterer Angriff?')}
${chbtn('⚔','Weitere Region angegriffen','Kampf fortsetzen','nextStormReg()')}
${chbtn('✓','Alle Regionen abgehandelt','Invasion abgeschlossen','finishEvent()')}
`},
ev_mischen:{title:'Neu Mischen',label:'Ereignis',render:()=>`
${trail('Ereigniskarte','Neu Mischen')}
${bi('<strong>Leerer Stapel:</strong> Elefanten-Marsch als letzten Schritt.')}
<p><strong>Schritt 1:</strong> Elefanten-Marsch (Oberseite des Nachziehstapels gibt Ziel).</p>
<p><strong>Schritt 2:</strong> Shuffle-Plättchen zurück in Stapel mischen.</p>
<p><strong>Schritt 3:</strong> Ablage mischen und oben auf Stapel legen.</p>
<button class="btn btn-d mt" onclick="finishEvent()">Ereignis abschließen ✓</button>`},
region_loss:{title:'Region-Verlust',label:'Ergebnis: Region verloren',render:()=>{
  const isForeignInv=IS.isInv&&(IS._afterLoss==='fi_follow'||IS._afterLoss==='fi_co_el_check');
  const isInvCrisis=IS.isInv&&!isForeignInv;
  const step5=isInvCrisis
    ?'<strong>Lokale Autorität (Invasionskrise):</strong> Flagge des Angreifers auf Kuppel. Kuppel mit 1 Turmstufe. Kontroll-Marker zurück. <strong>Alle offenen Aufträge schließen → Kettenreaktion!</strong>'
    :isForeignInv
      ?'<strong>Lokale Autorität (Ausländ. Invasion):</strong> Kuppel zurück auf Region. Kontroll-Marker zurück (Beute-Seite nach unten). ✅ Aufträge/Kettenreaktion bereits ausgeführt. <span class="badge bo">Neu</span> <strong>Regionsstärke auf die Hälfte der Angriffsstärke setzen (abrunden).</strong>'
      :'<strong>Lokale Autorität (Rebellion):</strong> Kuppel mit 1 Turmstufe. Kontroll-Marker zurück. Keine neue Flagge. ✅ Aufträge/Kettenreaktion bereits ausgeführt.';
  return `
<p>Schritte <strong>in dieser Reihenfolge</strong>:</p>
<div class="loss-steps"><ol>
<li><strong>Kommandant:</strong> Hälfte Trophäen (aufrunden) abgeben. Figur zurück.</li>
<li><strong>Offizier-Verluste:</strong> 1W6 pro Offizier – bei 6: zurück. Regimenter: kein Wurf.</li>
<li><strong>Gouverneur:</strong> Figur zurück, Ämterkarte → freie Ämter. (Entfällt bei GG.)</li>
<li><strong>Aufräumen:</strong> Gouverneurs-Plättchen, Kompanie-Schiffe, Unruhe entfernen.</li>
<li>${step5}</li>
<li><strong>Ansehen:</strong> 1. Region –1 · 2. Region –2 weitere · 3.+ –3 weitere.</li>
</ol></div>
${isInvCrisis?cascadeBox('rloss-inv'):''}
${isForeignInv ? bw('<strong>⚠ Ausländ. Invasion – Regionsstärke:</strong> Nach dem Verlust die Turmstufen der Region auf die Hälfte der Würfelstärke des Angriffs setzen (abrunden). Z.B. Angriffsstärke 5 → Kuppel + 2 Turmstufen.') : ''}
<div style="background:var(--red-bg);border:2px solid var(--red);border-radius:var(--r-s);padding:11px 13px;margin-top:10px">
<p style="font-weight:700;color:var(--red-l);margin-bottom:7px">⚠ Ansehen ganz links = Kompanie gescheitert!</p>
<button class="btn btn-r" style="margin-bottom:0" onclick="goToFinalScoring()">⚠ Zur Schlusswertung</button>
</div>
<button class="btn btn-d mt" onclick="afterLoss()">✓ Alle Schritte erledigt → Weiter</button>`;}},
el_march:{title:'Marsch des Elefanten',label:'Schritt 3',render:()=>`
${trail('Ereignis abgeschlossen','Marsch des Elefanten')}
<p>Elefant in die Region der <strong>Oberseite des Nachziehstapels</strong>.</p>
${bg('<ul><li><strong>Dominierte Region:</strong> Grenze, Kopf zur Hauptstadt des Souveräns.</li><li><strong>Kompanie-Region:</strong> Mitten in die Region. Fertig.</li><li><strong>Souveräne Region:</strong> Grenze mit Symbol, Kopf in dahinterliegende Region.<ul><li><span class="badge bo">ERRATA</span> Zeigt auf bereits dominierte Region → erste im Uhrzeigersinn.</li><li><span class="badge bo">ERRATA</span> <strong>Vollreich:</strong> Alle Nachbarn dominiert → Kopf nach innen zur Hauptstadt.</li></ul></li></ul>')}
<button class="btn btn-p mt" onclick="finishEvent()">Ereignis abschließen ✓</button>`},
summary:{title:'Indien-Phase abgeschlossen',label:'Fertig',render:()=>`
<div style="text-align:center;padding:18px 0">
<div style="font-size:2rem;margin-bottom:9px">✅</div>
<p style="font-size:.98rem;font-weight:600;color:var(--green);margin-bottom:4px">Alle Ereignisse abgehandelt!</p>
<p class="smtxt" style="margin-bottom:16px">Phase VII vollständig abgeschlossen.</p>
</div>
${indiaStandalone?`<button class="btn btn-d" onclick="backToMenu()">← Zurück zum Menü</button>`:`<button class="btn btn-p" onclick="endIndiaPhase()">Weiter zur Parlamentssitzung →</button>`}
`},
}; // end IV

/* ══ ausland helpers ══ */
function auslandUpdate(){
const any=$('ausb')?.checked||$('ausm')?.checked||$('ause')?.checked;
const ns=$('ausland-no-storm');
if(ns)ns.style.display=any?'none':'block';
}
function auslandStart(){
IS.fromStorm=false;
const r=[];
if($('ausb')?.checked)r.push('Bombay');
if($('ausm')?.checked)r.push('Madras');
if($('ause')?.checked)r.push('Bengalen');
if(r.length){startStormInv(r);return;}
const sel=$('aus-region-sel'),chosen=sel?sel.value:'';
if(!chosen){alert('Bitte eine Region auswählen!');return;}
startStormInv([chosen]);
}

/* ══════════════════════ REFERENZ-TAB HTML (Template-Literal-Strings) ══════════════════════ */

const reftab_tests = `

<div class="ref-item">
  <h3>Erfolgstest (Phase IV – Ämter)</h3>
  <div class="box box-i"><strong>ACHTUNG:</strong> Der Personalabbau (Phase I) ist ein einfacher W6, kein Pool!</div>
  <p>Kaufe Würfel aus der Amtsschatulle: <strong>£1 = 1 Würfel</strong>. Das <strong>niedrigste</strong> Ergebnis im Pool zählt:</p>
  <div class="dt">
    <div class="dt-row dr-success"><div class="dt-k">1–2</div><div class="dt-v"><strong>Erfolg!</strong></div></div>
    <div class="dt-row dr-fail"><div class="dt-k">3–4</div><div class="dt-v"><strong>Misserfolg:</strong> Kein Effekt – erneut Würfel kaufen möglich (alle bisherigen verloren).</div></div>
    <div class="dt-row dr-crit"><div class="dt-k">5–6</div><div class="dt-v"><strong>Katastrophal:</strong> Amtsinhaber sofort entlassen → Familienvorrat. Amt kann keine weiteren Aktionen ausführen.</div></div>
  </div>
  <p class="smtxt">Ermattungs-Marker: Jeder zählt beim Wurf als +1 auf das Ergebnis.</p>
</div>
<div class="ref-item">
  <h3>Personalabbau (Phase I) – einfacher W6</h3>
  <div class="dt">
    <div class="dt-row dr-success"><div class="dt-k">1–2</div><div class="dt-v">Nichts.</div></div>
    <div class="dt-row dr-fail"><div class="dt-k">3–4</div><div class="dt-v">1 Ermattungs-Marker auf Ämterkarte.</div></div>
    <div class="dt-row dr-crit"><div class="dt-k">5+</div><div class="dt-v">Ruhestand: Figur + Karte in Ruheständler-/Freie-Ämter-Felder. Ermattungs-Marker zurück.</div></div>
  </div>
  <div class="box box-w"><strong>Vorsitzender:</strong> Ergebnis immer +1 (zusätzlich zu Ermattungs-Markern).</div>
</div>`;

const reftab_verhandlungen = `

<div class="ref-item">
  <h3>Was darf verhandelt werden?</h3>
  <div class="box box-g"><strong>Erlaubt:</strong> Unternehmen, verdeckte Erpressungskarten (darf vor Tausch angesehen werden), Geld im Familienvermögen, Anteile, Versprechen-Karten.</div>
  <div class="box box-w"><strong>Nicht erlaubt:</strong> Inhabe eines Amtes, Schreiber, Offiziere, Belohnungen, Ehegatten, beschlossene Gesetze, gespielte Erpressungskarten, PM-Scheibe, Trophäen.</div>
  <p><strong>Bindend:</strong> Nur sofortiger Tausch. Im Endspiel keine Versprechen-Karten mehr einlösen.</p>
</div>
<div class="ref-item">
  <h3>Wer ernennt wen?</h3>
  <ul>
    <li><strong>Vorsitz:</strong> Kollegium wählt (Mehrheit). Kein Konsens → ehemaliger Vorsitzender wählt selbst.</li>
    <li><strong>Direktor/GG:</strong> Vorsitzender → aus allen besetzten Ämtern außer Vorsitz, Gouverneure, Kommandanten.</li>
    <li><strong>Flottenverwalter:</strong> Vorsitzender → aus Schreibern aller Präsidentschaften.</li>
    <li><strong>Militärische Belange:</strong> Vorsitzender → bevorzugt Kommandant → Offizier → Offiziersanwärter.</li>
    <li><strong>Superintendent China:</strong> Vorsitzender → aus Schreibern.</li>
    <li><strong>Präsidenten:</strong> Direktor/GG → aus Schreibern der Präsidentschaft oder deren Gouverneuren.</li>
    <li><strong>Gouverneure:</strong> Präsident → aus Schreibern oder Offizieren der Region. <em>Nie ein Kommandant!</em></li>
  </ul>
  <div class="box box-i"><strong>Nepotismus:</strong> Eigenes Familienmitglied ernennen? Zustimmung aller anderen im Anwärter-Pool nötig. Gilt nicht beim Vorsitz. Gibt es nur einen Kandidaten → kein Nepotismus-Problem.</div>
</div>`;

const reftab_indien = `

<div class="ref-item">
  <h3>Stürme (Phase VII)</h3>
  <div class="box box-w">Nur <strong>blaue Spieler-Schiffe</strong>! Charter- (schwarz) und Kompanie-Schiffe (rot) nicht betroffen.</div>
  <div class="dt">
    <div class="dt-row dr-success"><div class="dt-k">1–2</div><div class="dt-v">Nichts.</div></div>
    <div class="dt-row dr-fail"><div class="dt-k">3–4</div><div class="dt-v">Schiff auf „Schaden"-Seite. Bereits beschädigt → zurück auf Werft (repariert).</div></div>
    <div class="dt-row dr-crit"><div class="dt-k">5–6</div><div class="dt-v">Schiff zurück auf Werft (repariert).</div></div>
  </div>
</div>
<div class="ref-item">
  <h3>Ereignis-Überblick</h3>
  <ul>
    <li><strong>Tumulte:</strong> Aufträge schließen, Kettenreaktion prüfen.</li>
    <li><strong>Geldregen:</strong> £1 pro Schreiber in der Region und angrenzenden Regionen.</li>
    <li><strong>Anführer:</strong> Turmstufe +1 oder Rebellion.</li>
    <li><strong>Frieden:</strong> Aufträge öffnen; Elefant-Position entscheidet.</li>
    <li><strong>Krise:</strong> Kampf laut Elefanten-Position.</li>
    <li><strong>Ausländ. Invasion:</strong> Sturmwürfel gibt Region, dann Kampf.</li>
    <li><strong>Neu Mischen:</strong> Stapel neu mischen, dann Marsch.</li>
  </ul>
  <div class="box box-i">Nach jedem Ereignis: <strong>Marsch des Elefanten</strong> ausführen.</div>
</div>`;

const reftab_begriffe = `

<div class="ref-item">
  <h3>Schlüsselbegriffe</h3>
  <ul>
    <li><strong>Anteil:</strong> Familienmitglied im Kollegium.</li>
    <li><strong>Kollegium:</strong> Alle Familienmitglieder auf der Börsenleiste + Vorsitzender.</li>
    <li><strong>Präsidentschaft:</strong> Bombay, Madras, Bengalen – jede mit eigenem Präsidenten, Kommandanten, Gouverneuren.</li>
    <li><strong>Souverän:</strong> Hauptstadt (große Fahne oder keine Fahne).</li>
    <li><strong>Dominiert:</strong> Region mit kleiner Fahne eines Souveräns.</li>
    <li><strong>Ruheständler:</strong> Figur, die in Phase I pensioniert wurde.</li>
    <li><strong>Ermattungs-Marker:</strong> Auf Ämterkarte; +1 pro Marker auf Phase-I-Würfelergebnis.</li>
    <li><strong>Chancen-Marker:</strong> Glasstein; liegt auf gleicher Aktion wie Vorrunde = Aktion 2× ausführen.</li>
  </ul>
</div>
<div class="ref-item">
  <h3>Kampf – Grundprinzip</h3>
  <p>Angreifer vs. Verteidiger: Das höhere Ergebnis gewinnt. <strong>Gleichstand → Verteidiger gewinnt.</strong></p>
  <div class="box box-i"><strong>Offizier-Verluste bei Niederlage:</strong> Für jeden Offizier in der Armee 1W6 – bei 6: zurück in Familienvorrat. Kommandant: Hälfte Trophäen abgeben + Rückkehr.</div>
</div>`;

const reftab_wertung = `

<div class="ref-item">
  <h3>Schlusswertung – Reihenfolge</h3>
  <ol>
    <li><strong>[DEREG]</strong> Firmen-Wertung (Punkte per Anteil) + spezieller Ruhestand.</li>
    <li><strong>Macht-Prämie:</strong> Macht berechnen. Die 2 stärksten Familien → SP laut Tabelle oben links am Spielplan.</li>
    <li><strong>Kollegium &amp; Betriebe:</strong> Überlebt → SP laut Kollegium-Tabelle. Gescheitert → –1 SP/Anteil; +1 SP/Betrieb (nicht-investiert).</li>
    <li><strong>Finaler Ruhestand</strong> (Kompanie überlebt) oder <strong>Scheitern-Karte</strong> ziehen.</li>
  </ol>
  <div class="box box-i"><strong>Gleichstand:</strong> Fenster-Symbole → PM-Reihenfolge (im Uhrzeigersinn).</div>
</div>
<div class="ref-item">
  <h3>Macht-Quellen im Überblick</h3>
  <div class="dt">
    <div class="dt-row"><div class="dt-k">Trophäe</div><div class="dt-v">+1 Macht (durch Kommandant-Siege)</div></div>
    <div class="dt-row"><div class="dt-k">PM</div><div class="dt-v">+2 Macht (Premierminister-Scheibe)</div></div>
    <div class="dt-row"><div class="dt-k">Gesetz</div><div class="dt-v">+1 Macht pro beschlossenem Gesetz</div></div>
    <div class="dt-row"><div class="dt-k">Unternehmen</div><div class="dt-v">Macht laut aktuellem Macht-Token auf der Macht-Leiste (0–2)</div></div>
    <div class="dt-row"><div class="dt-k">Anteile</div><div class="dt-v">Macht laut aktuellem Macht-Token auf der Macht-Leiste (0–2)</div></div>
    <div class="dt-row"><div class="dt-k">Karten</div><div class="dt-v">Ehegatten, Erpressungskarten – laut Kartenaufdruck</div></div>
  </div>
  <div class="box box-i"><strong>Macht-Leiste:</strong> Die untersten zwei Felder der Leiste geben 0 Macht. Je höher ein Marker, desto mehr Macht pro Einheit.</div>
</div>`;

const reftab_literatur = `

<div class="ref-item">
  <h3>Weiterführende Literatur (laut Spielregel S. 48)</h3>
  <ul>
    <li><strong>John Keay</strong> – <em>The Honourable Company</em> (1991). Das beste einbändige Werk zur EIC.</li>
    <li><strong>William Dalrymple</strong> – <em>The Anarchy</em> (2019). Der dramatische Aufstieg der Kompanie, sehr lesbar.</li>
    <li><strong>Shashi Tharoor</strong> – <em>Inglorious Empire</em> (2018). Kritische Analyse des britischen Kolonialismus.</li>
    <li><strong>Margot Finn &amp; Kate Smith</strong> – <em>The East India Company at Home</em> (2018). Die Familien hinter der Kompanie.</li>
    <li><strong>Barbara Harlow &amp; Mia Carter</strong> – <em>Archives of Empire, Vol. I</em> (2003). Primärdokumente.</li>
    <li><strong>Benedict Anderson</strong> – <em>Imagined Communities</em> (1983). Theoretische Grundlagen zu Kolonialismus und Nation.</li>
  </ul>
  <div class="box box-i" style="margin-top:10px"><em>John Company ist ein Werk historischer Fiktion. Es enthüllt sein Sujet und ermutigt Spieler, tiefer zu graben.</em></div>
</div>

// reftab_ereignisse: Combines tests, verhandlungen and indien reference content
const reftab_ereignisse = reftab_tests + reftab_verhandlungen + reftab_indien;

`;

/* ══════════════════════ STRATEGIE-TAB HTML (Template-Literal-String) ══════════════════════ */

const panel_strategy = `

<div class="sec-head">Die drei Geldsphären</div>
<div class="card" style="padding:12px 14px;margin-bottom:10px">
  <p style="font-size:.9rem;color:var(--ink2);line-height:1.7;margin-bottom:0">In <em>John Company</em> ist Geld nicht einfach eine Ressource, sondern ein <strong>Instrument der Verflechtung</strong>. Der Historiker John Keay beschreibt die EIC als „Staat im Staate" – eine Handelsgesellschaft mit eigener Armee, eigenem Geldwesen und eigener Steuerpolitik. Der schottische Nabob John Johnstone kehrte 1765 mit einem Vermögen von £300.000 nach Schottland zurück. <em>Wer versteht, wie Geld zwischen den drei Sphären wandert, beherrscht das Spiel.</em></p>
</div>
<div class="money-sphere">
  <div class="ms-title">💰 Familienvermögen – privat</div>
  <div class="ms-sub">Das persönliche Geld. Einziges Mittel für Ruhestand, Bestechung, Unternehmen.</div>
  <ul class="ms-list">
    <li>Boni (Phase V), Dividenden (Phase VI), Gouverneur-Handel</li>
    <li>Kann nicht für Amtsaktionen verwendet werden</li>
    <li>Endziel: In Siegpunkte umwandeln (Ruhestand, Belohnungen)</li>
  </ul>
</div>
<div class="money-sphere">
  <div class="ms-title">🏛 Kompanievermögen – institutionell</div>
  <div class="ms-sub">Zentraler Geldtopf der EIC. Für Expansion, Armee, Schuldenunterhalt.</div>
  <ul class="ms-list">
    <li>Schuldenaufnahme (Vorsitz), Handel, China-Handel</li>
    <li>Wird auf Ämter verteilt, nicht direkt ausgegeben</li>
    <li>Dividenden sind der einzige Weg zurück ins Familienvermögen</li>
  </ul>
</div>
<div class="money-sphere">
  <div class="ms-title">⚖ Amtsschatullen – operativ</div>
  <div class="ms-sub">Jedem Amt zugewiesenes Geld. Nur der Amtsinhaber darf es ausgeben.</div>
  <ul class="ms-list">
    <li>Aus Kompanievermögen zugeteilt (Phase IV – Vorsitz)</li>
    <li>Wird für Würfel, Schiffe, Verwaltung ausgegeben</li>
    <li>Vorsitzender kann Rivalen durch Mittelentzug schwächen</li>
  </ul>
</div>
<div class="sec-head">Strategische Prioritäten pro Phase</div>
<div class="acc strat-phase-acc" id="stracc-ph1">
  <div class="acc-hd" onclick="tAcc('stracc-ph1')"><span>Phase I · Londoner Season</span><span class="ic">▼</span></div>
  <div class="acc-bd">
    <div class="strat-tip-box"><strong>Ruhestand &amp; Prestige-Karten:</strong> Die Höhe der Ruhestandsausgabe bestimmt die Reihenfolge beim Kartenzug. Manchmal lohnt es sich, mehr auszugeben als nötig, um eine wertvolle Karte (Ehegatte mit Rabatt, Unternehmen) zu sichern.</div>
    <div class="strat-tip-box"><strong>Belohnungsunterhalt:</strong> Jede Belohnung kostet in Phase IX Unterhalt. Wer zu viele Belohnungen ohne ausreichendes Einkommen hat, verliert später Punkte. Langfristig planen!</div>
    <div class="strat-hist-box">Historisch kauften zurückkehrende „Nabobs" Ländereien und Adelstitel – John Johnstone ließ Alva House von Robert Adam umbauen. Ehegatten aus einflussreichen Familien waren wichtige Mittel zum sozialen Aufstieg.</div>
  </div>
</div>
<div class="acc strat-phase-acc" id="stracc-ph2">
  <div class="acc-hd" onclick="tAcc('stracc-ph2')"><span>Phase II · Familie &amp; Anteile</span><span class="ic">▼</span></div>
  <div class="acc-bd">
    <div class="strat-tip-box"><strong>Chancen-Marker nutzen:</strong> Liegt der Marker bereits auf der geplanten Aktion? → 2× ausführen. Besonders wertvoll bei Betrieben (£5 × 2 = teuer aber mächtig) oder Anteilen.</div>
    <div class="strat-tip-box"><strong>Anteile – kalkuliertes Risiko:</strong> Je früher man kauft, desto günstiger. Aber: Scheitert die Kompanie, werden Anteile zu –1 SP. Wer viele Anteile hält, kann den Vorsitz und Dividenden kontrollieren.</div>
    <div class="strat-tip-box"><strong>Betrieb vs. Werft:</strong> Betriebe bringen sichere £1/Runde + 2 Parlamentsstimmen. Werften sind günstiger, aber der Bonus hängt vom Flottenverwalter ab – mit dem muss man sich gut stellen.</div>
    <div class="strat-hist-box">Die „private trade" war für EIC-Angestellte eine Haupteinnahmequelle. John Johnstone wurde 1764 entlassen, weil er private Geschäfte mit den Nawabs betrieben hatte – ein klassischer Interessenkonflikt.</div>
  </div>
</div>
<div class="acc strat-phase-acc" id="stracc-ph3">
  <div class="acc-hd" onclick="tAcc('stracc-ph3')"><span>Phase III · Ämter besetzen</span><span class="ic">▼</span></div>
  <div class="acc-bd">
    <div class="strat-tip-box"><strong>Nepotismus als Investition:</strong> Eigene Familienmitglieder in Ämter zu bringen kostet Zustimmung – die man durch Geld, Karten oder Gegenseitigkeit erkauft. Die richtige Auszahlung hängt vom Wert des Amtes ab.</div>
    <div class="strat-tip-box"><strong>Beförderungen taktisch nutzen:</strong> Durch Beförderung eines Rivalen kann man dessen Amt neu besetzen – mit einem eigenen Kandidaten. Manchmal ist ein Aufstieg des Gegners der beste Weg zur Macht.</div>
    <div class="strat-hist-box">Die Familie Johnstone kontrollierte in den 1750ern so viele EIC-Positionen, dass Historiker schreiben, sie sei „involved in every major event in the British Empire" gewesen.</div>
  </div>
</div>`;

/* ══════════════════════ INDIEN_STEPS (INDIA_STEPS[]) ══════════════════════ */
// Die Indien-State-Machine verwendet das IV-Objekt oben (kein separates INDIA_STEPS[]-Array).
// Die logische Abfolge der Schritte ist:
const INDIA_STEPS = [
'storm',        // Schritt 1: Sturmwürfel & Stürme + Anzahl Ereignisse wählen
'draw',         // Karte ziehen
// Ereignis-Zweige:
'ev_tumulte','ev_geldregen','ev_anfuehrer','ev_anf_sov','ev_anf_reb',
'ev_anf_reb_win','ev_anf_reb_lose','ev_frieden','ev_frie_center',
'ev_frie_border','ev_krise',
// Krisen-Zweige:
'k_co_reb','k_co_reb_win','k_co_inv','k_co_inv_win',
'k_nat_q','k_nat_dom','k_nat_dom_win','k_nat_sov','k_nat_sov_win',
'k_follow','k_follow_combat','k_follow_win','k_post',
// Ausländische Invasion:
'ev_ausland','fi_loop','fi_win','fi_follow',
// Sonstiges:
'ev_mischen','region_loss','el_march','summary'
];

/* ══════════════════════ SETUP_STEPS (renderSetup) ══════════════════════ */
// SETUP_STEPS[] ist kein separates Array – Setup wird durch renderSetup() gerendert.
// Die Schritte der Spielvorbereitung als Array:
const SETUP_STEPS = [
{id:'sc-1710',   label:'🕰 1710 – Die frühe Kompanie',    note:'Empfohlen zum Lernen. Keine Schulden. DEREG- und GG-Toggles ausschalten.'},
{id:'sc-1758',   label:'⚔ 1758 – Gefährliche Zeiten',     note:'Mittlere Komplexität. Schulden vorhanden, Krieg in Indien.'},
{id:'sc-1813',   label:'🏭 1813 – Das Zeitalter der Firmen',note:'Erfahrene Spieler. Deregulierung aktiv. DEREG-Toggle aktivieren.'},
{id:'sc-long1710',label:'🕰 Langes 1710 – Die volle Geschichte',note:'Erfahrene Spieler · bis zu 8 Runden. Wie 1710, aber mit DEREG-Werkzeugen.'},
];
// Setup-Aufbaureihenfolge:
const SETUP_SEQUENCE = [
{step:1, title:'Spielplan',        items:['Spielplan · Marker auf Startfelder laut Szenariokarte.','Ansehen · Schulden · Rundenmarker auf Startfelder.','Kompanie-Vermögen auf 0 · PM-Scheibe · PM-Marker setzen.','Macht-Marker · Gesetzesstapel mischen.']},
{step:2, title:'Präsidentschaften',items:['Tableaus aufbauen.','Schreiber · Offiziere · Regimenter · Amtskarten laut Szenario.']},
{step:3, title:'Indien',           items:['Türme · Kuppeln · Flaggen laut Szenario.','Elefant auf Startregion · Ereignisstapel mischen.','Beute-Token: Jeden Beute-Token in die entsprechende Region legen – £-Seite nach oben! [ERRATA]']},
{step:4, title:'Familien',         items:['Setup-Karten gleichzeitig abhandeln.','Familienmitglieder in Ämter · Versprechen-Karten (5 Stück) · Startgeld.']},
];
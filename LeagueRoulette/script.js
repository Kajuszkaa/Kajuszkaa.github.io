// --- ANIMACJA JESIENNA ---
function playAutumnTransition(callback) {
    const emojis = [
        '🍁','🍂','🍃','🎃','🍄','☕',
        '🌙','⭐','✨','💫','🌟','🎯',
        '🗡️','⚔️','🛡️','🏆','👑','🎲',
        '🐉','🦊','🌊','🔥','❄️','⚡',
        '🎭','🎪','🎠','🌀','💎','🪄'
    ];

    // Jeśli callback to reload — odpalamy go od razu, animacja leci równolegle
    if (typeof callback === 'function') {
        setTimeout(callback, 50);
        return;
    }

    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;overflow:hidden;';
    document.body.appendChild(container);

    const PARTICLE_COUNT = 45;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particle = document.createElement('div');
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        const startY   = Math.random() * 90 + 5;   // 5vh – 95vh
        const size     = Math.random() * 22 + 16;   // 16px – 38px
        const duration = Math.random() * 1.2 + 0.9; // 0.9s – 2.1s
        const delay    = Math.random() * 0.6;        // 0s – 0.6s rozłożony start
        const rot      = Math.random() * 720 - 360;
        const wobbleY  = (Math.random() * 40 - 20) + 'px';

        particle.style.cssText = `
            position: absolute;
            left: -8%;
            top: ${startY}vh;
            font-size: ${size}px;
            will-change: transform, opacity;
            opacity: 0;
            animation: flyAcross ${duration}s ${delay}s ease-in-out forwards;
            --rot: ${rot}deg;
            --wobble: ${wobbleY};
        `;
        container.appendChild(particle);
    }

    // Wstrzyknij keyframes jeśli jeszcze nie ma
    if (!document.getElementById('autumn-keyframes')) {
        const style = document.createElement('style');
        style.id = 'autumn-keyframes';
        style.textContent = `
            @keyframes flyAcross {
                0%   { transform: translateX(0vw)    translateY(0)              rotate(0deg);     opacity: 0; }
                5%   { opacity: 1; }
                50%  { transform: translateX(55vw)   translateY(var(--wobble))  rotate(calc(var(--rot) * 0.5)); opacity: 1; }
                95%  { opacity: 1; }
                100% { transform: translateX(115vw)  translateY(0)              rotate(var(--rot)); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    const totalDuration = (0.6 + 2.1) * 1000 + 200; // max delay + max duration + buffer
    setTimeout(() => container.remove(), totalDuration);
}

// --- DŹWIĘKI ---
const AUDIO_SPARKLE_PATH = "sparkle.mp3";
const AUDIO_EARRAPE_PATH = "earrape.mp3";
const AUDIO_BATTLE_PATH  = "battle.mp3";
const AUDIO_WIN_PATH     = "win.mp3";

const audioSparkle = new Audio(AUDIO_SPARKLE_PATH); audioSparkle.volume = 0.5;
const audioEarrape = new Audio(AUDIO_EARRAPE_PATH); audioEarrape.volume = 1.0;
const audioBattle  = new Audio(AUDIO_BATTLE_PATH);  audioBattle.volume  = 0.3;
const audioWin     = new Audio(AUDIO_WIN_PATH);      audioWin.volume     = 1.0;

function playRevealSound() {
    const isTroll = Math.random() < 0.05;
    let s = isTroll ? audioEarrape.cloneNode() : audioSparkle.cloneNode();
    s.volume = isTroll ? 1.0 : 0.5;
    s.play().catch(() => {});
}

// --- DANE ---
const ROLES = ["Top", "Jungle", "Mid", "ADC", "Support"];

const TEAM_COLORS = [
    { css: 'blue-team',   dot: 'var(--blue-team)',   label: 'Niebieska Drużyna' },
    { css: 'red-team',    dot: 'var(--red-team)',    label: 'Czerwona Drużyna'  },
    { css: 'green-team',  dot: 'var(--green-team)',  label: 'Zielona Drużyna'   },
    { css: 'purple-team', dot: 'var(--purple-team)', label: 'Fioletowa Drużyna' },
];

const rolePools = {
    "Top":     ["Aatrox","Akali","Aurora","Camille","Chogath","Darius","DrMundo","Fiora","Garen","Gnar","Gragas","Gwen","Illaoi","Irelia","Jax","Jayce","KSante","Kayle","Kennen","Kled","Malphite","Mordekaiser","Nasus","Olaf","Ornn","Pantheon","Poppy","Quinn","Renekton","Riven","Rumble","Sett","Shen","Singed","Sion","TahmKench","Teemo","Trundle","Tryndamere","Urgot","Vayne","Volibear","MonkeyKing","Yasuo","Yone","Yorick"],
    "Jungle":  ["Amumu","Belveth","Briar","Diana","Ekko","Elise","Evelynn","Fiddlesticks","Gragas","Graves","Hecarim","Ivern","JarvanIV","Karthus","Kayn","Khazix","Kindred","LeeSin","Lillia","MasterYi","Nidalee","Nocturne","Nunu","Pantheon","Poppy","Rammus","RekSai","Rengar","Sejuani","Shaco","Shyvana","Skarner","Sylas","Taliyah","Talon","Trundle","Udyr","Vi","Viego","Volibear","Warwick","MonkeyKing","XinZhao","Zac"],
    "Mid":     ["Ahri","Akali","Akshan","Anivia","Annie","Aurora","AurelionSol","Azir","Cassiopeia","Corki","Diana","Ekko","Fizz","Galio","Heimerdinger","Hwei","Irelia","Kassadin","Katarina","Leblanc","Lissandra","Lux","Malzahar","Naafiri","Neeko","Orianna","Qiyana","Ryze","Smolder","Sylas","Syndra","Taliyah","Talon","TwistedFate","Veigar","Vex","Viktor","Vladimir","Xerath","Yasuo","Yone","Zed","Ziggs","Zoe"],
    "ADC":     ["Aphelios","Ashe","Caitlyn","Draven","Ezreal","Jhin","Jinx","Kaisa","Kalista","KogMaw","Lucian","MissFortune","Nilah","Samira","Sivir","Smolder","Tristana","Twitch","Varus","Vayne","Xayah","Zeri"],
    "Support": ["Alistar","Ashe","Bard","Blitzcrank","Brand","Braum","Heimerdinger","Janna","Karma","Leona","Lulu","Lux","Maokai","Milio","Morgana","Nami","Nautilus","Pantheon","Pyke","Rakan","Rell","Renata","Senna","Seraphine","Sona","Soraka","Swain","TahmKench","Taric","Thresh","Velkoz","Xerath","Yuumi","Zilean","Zyra"]
};

// Stan gry
let teams = [[], []];           // teams[0..3] - tablice graczy
let teamNames = [];             // finalne nazwy drużyn
let isMode4 = false;
let isCustomTeams = false;
let latestPatch = "";
let allChampsData = [];
const usedChampions = [];

// Bracket state
const bracketWinners = { sf1: null, sf2: null };

// ===================== INICJALIZACJA =====================

function shuffleArray(array) {
    let s = [...array];
    for (let i = s.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
}

function getRandomChampionForRole(role) {
    const validIds = rolePools[role] || [];
    let pool = allChampsData.filter(c => validIds.includes(c.id));
    if (pool.length === 0) pool = allChampsData;
    let avail = pool.filter(c => !usedChampions.includes(c.name));
    if (avail.length === 0) avail = pool;
    return avail[Math.floor(Math.random() * avail.length)];
}

function initInputs() {
    const container = document.getElementById('inputs-container');
    container.innerHTML = '';
    const count = isMode4 ? 20 : 10;
    for (let i = 1; i <= count; i++) {
        container.innerHTML += `
            <div class="player-tile" id="tile${i}">
                <div class="player-num">${i}.</div>
                <input type="text" id="player${i}" placeholder="Nick gracza ${i}..." autocomplete="off" />
                <button class="beginner-btn" title="Oznacz jako początkującego" onclick="toggleBeginner(${i})">🛡️</button>
            </div>
        `;
    }
    // Aktualizacja opisu
    document.getElementById('step1-subtitle').innerText = isMode4
        ? 'Wprowadź 20 graczy, aby wylosować 4 zbalansowane drużyny.'
        : 'Wprowadź 10 graczy, aby wylosować zbalansowaną grę.';
}

window.onload = initInputs;

function toggleBeginner(index) {
    document.getElementById(`tile${index}`).classList.toggle('beginner');
}

function toggleMode4() {
    isMode4 = document.getElementById('mode4-toggle').checked;

    // Pokaż/ukryj pola nazw Team 3 i 4
    document.getElementById('team3-name-wrap').style.display = isMode4 ? 'flex' : 'none';
    document.getElementById('team4-name-wrap').style.display = isMode4 ? 'flex' : 'none';

    // Jeśli włączony tryb 4 drużyn, resetuj custom-teams
    if (isMode4) {
        document.getElementById('custom-teams-toggle').checked = false;
        isCustomTeams = false;
    }

    initInputs();
    applyGridMode();
}

function toggleCustomTeams() {
    isCustomTeams = document.getElementById('custom-teams-toggle').checked;

    // Jeśli custom, wyłącz tryb 4
    if (isCustomTeams && isMode4) {
        document.getElementById('mode4-toggle').checked = false;
        isMode4 = false;
        document.getElementById('team3-name-wrap').style.display = 'none';
        document.getElementById('team4-name-wrap').style.display = 'none';
        initInputs();
    }

    applyGridMode();
}

function applyGridMode() {
    const grid = document.getElementById('inputs-container');
    grid.classList.remove('custom-mode-2', 'custom-mode-4');

    if (isMode4) {
        grid.classList.add('custom-mode-4');
        // Kolorowe obramowania wg drużyny (5 graczy na drużynę)
        const colors = ['var(--blue-team)', 'var(--red-team)', 'var(--green-team)', 'var(--purple-team)'];
        for (let t = 0; t < 4; t++) {
            for (let p = 1; p <= 5; p++) {
                const idx = t * 5 + p;
                const tile = document.getElementById(`tile${idx}`);
                if (tile) {
                    tile.style.borderLeft = `4px solid ${colors[t]}`;
                    const btn = tile.querySelector('.beginner-btn');
                    if (btn) btn.style.display = 'none';
                }
            }
        }
    } else if (isCustomTeams) {
        grid.classList.add('custom-mode-2');
        for (let i = 1; i <= 5; i++) {
            const t = document.getElementById(`tile${i}`);
            if (t) { t.style.borderLeft = '4px solid var(--blue-team)'; t.querySelector('.beginner-btn').style.display = 'none'; }
        }
        for (let i = 6; i <= 10; i++) {
            const t = document.getElementById(`tile${i}`);
            if (t) { t.style.borderLeft = '4px solid var(--red-team)'; t.querySelector('.beginner-btn').style.display = 'none'; }
        }
    } else {
        for (let i = 1; i <= 10; i++) {
            const t = document.getElementById(`tile${i}`);
            if (t) { t.style.borderLeft = ''; t.querySelector('.beginner-btn').style.display = 'inline-block'; }
        }
    }
}

function slideToStep(stepIndex) {
    document.getElementById('app').style.transform = `translateX(-${stepIndex * 100}vw)`;
}

// ===================== KROK 1 → 2 =====================

document.getElementById('btn-step1').addEventListener('click', () => {
    const count = isMode4 ? 4 : 2;

    // Pobierz nazwy drużyn
    teamNames = [];
    const defaults = TEAM_COLORS.map(c => c.label);
    for (let t = 0; t < count; t++) {
        const inp = document.getElementById(`team${t+1}-name`);
        const val = inp ? inp.value.trim() : '';
        teamNames.push(val !== '' ? val : defaults[t]);
    }

    // Zaktualizuj wszystkie nagłówki
    for (let t = 0; t < count; t++) {
        document.querySelectorAll(`.${TEAM_COLORS[t].css} h2`).forEach(el => el.innerText = teamNames[t]);
    }

    if (isMode4) {
        buildTeams4();
    } else if (isCustomTeams) {
        buildTeams2Custom();
    } else {
        buildTeams2Random();
    }

    renderRolesStep();
    playAutumnTransition();
    slideToStep(1);
});

function buildTeams2Random() {
    let weak = [], good = [];
    for (let i = 1; i <= 10; i++) {
        const name = document.getElementById(`player${i}`).value.trim() || `Gracz ${i}`;
        const beg  = document.getElementById(`tile${i}`).classList.contains('beginner');
        beg ? weak.push(name) : good.push(name);
    }
    weak = shuffleArray(weak);
    good = shuffleArray(good);

    let t1 = [], t2 = [];
    weak.forEach((wp, i) => {
        if (i % 2 === 0) { (t1.length < 5 ? t1 : t2).push(wp); }
        else              { (t2.length < 5 ? t2 : t1).push(wp); }
    });
    good.forEach(gp => (t1.length < 5 ? t1 : t2).push(gp));

    const r1 = shuffleArray(ROLES), r2 = shuffleArray(ROLES);
    teams = [
        t1.map((p, i) => ({ name: p, role: r1[i] })),
        t2.map((p, i) => ({ name: p, role: r2[i] })),
    ];
}

function buildTeams2Custom() {
    let t1 = [], t2 = [];
    for (let i = 1; i <= 5; i++)  t1.push(document.getElementById(`player${i}`).value.trim() || `Gracz N${i}`);
    for (let i = 6; i <= 10; i++) t2.push(document.getElementById(`player${i}`).value.trim() || `Gracz C${i-5}`);
    const r1 = shuffleArray(ROLES), r2 = shuffleArray(ROLES);
    teams = [
        t1.map((p, i) => ({ name: p, role: r1[i] })),
        t2.map((p, i) => ({ name: p, role: r2[i] })),
    ];
}

function buildTeams4() {
    teams = [];
    for (let t = 0; t < 4; t++) {
        const tArr = [];
        for (let p = 1; p <= 5; p++) {
            const idx = t * 5 + p;
            tArr.push(document.getElementById(`player${idx}`).value.trim() || `Gracz ${idx}`);
        }
        const roles = shuffleArray(ROLES);
        teams.push(tArr.map((name, i) => ({ name, role: roles[i] })));
    }
}

// ===================== KROK 2: ROLE =====================

function renderRolesStep() {
    const wrapper = document.getElementById('roles-teams-wrapper');
    wrapper.innerHTML = '';
    const count = isMode4 ? 4 : 2;
    for (let t = 0; t < count; t++) {
        wrapper.innerHTML += `
            <div class="team ${TEAM_COLORS[t].css}">
                <h2>${teamNames[t]}</h2>
                <div id="roles-team${t}"></div>
            </div>
        `;
    }
    for (let t = 0; t < count; t++) {
        renderRolesCards(teams[t], `roles-team${t}`);
    }
}

function renderRolesCards(teamArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    teamArray.forEach(player => {
        container.innerHTML += `
            <div class="player-row">
                <div class="player-name">${player.name}</div>
                <div class="flip-container role-flip" onclick="revealRoleCard(this)">
                    <div class="flipper">
                        <div class="front">?</div>
                        <div class="back">${player.role}</div>
                    </div>
                </div>
            </div>
        `;
    });
}

function revealRoleCard(el) {
    if (!el.classList.contains('revealed')) {
        el.classList.add('revealed');
        playRevealSound();
    }
}

// ===================== KROK 2 → 3 =====================

document.getElementById('btn-step2').addEventListener('click', async () => {
    const btn = document.getElementById('btn-step2');
    btn.innerText = "Łączenie z API Riotu...";
    btn.disabled = true;

    try {
        const versionRes = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        latestPatch = (await versionRes.json())[0];

        const champsRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/pl_PL/champion.json`);
        allChampsData = Object.values((await champsRes.json()).data);

        usedChampions.length = 0;

        const count = isMode4 ? 4 : 2;
        for (let t = 0; t < count; t++) {
            teams[t].forEach(player => {
                const champ = getRandomChampionForRole(player.role);
                usedChampions.push(champ.name);
                player.champion = champ;
            });
        }

        renderChampsStep();

        // Pokaż właściwą sekcję bitwy
        document.getElementById('battle-2team-section').style.display = isMode4 ? 'none' : 'block';
        document.getElementById('battle-4team-section').style.display = isMode4 ? 'block' : 'none';

        playAutumnTransition();
        slideToStep(2);
    } catch (err) {
        console.error(err);
        btn.innerText = "Błąd pobierania API. Spróbuj ponownie!";
        btn.disabled = false;
    }
});

function renderChampsStep() {
    const wrapper = document.getElementById('champs-teams-wrapper');
    wrapper.innerHTML = '';
    const count = isMode4 ? 4 : 2;
    for (let t = 0; t < count; t++) {
        wrapper.innerHTML += `
            <div class="team ${TEAM_COLORS[t].css}">
                <h2>${teamNames[t]}</h2>
                <div id="champs-team${t}"></div>
            </div>
        `;
    }
    for (let t = 0; t < count; t++) {
        renderChampsCards(teams[t], `champs-team${t}`, t);
    }
}

function renderChampsCards(teamArray, containerId, teamNum) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    teamArray.forEach((player, index) => {
        const champImgUrl = `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${player.champion.image.full}`;
        const flipperId  = `t${teamNum}-p${index}-flipper`;
        const cardBackId = `t${teamNum}-p${index}-back`;
        const btnId      = `t${teamNum}-p${index}-reroll`;
        container.innerHTML += `
            <div class="player-row">
                <div>
                    <div class="player-name">${player.name}</div>
                    <div class="player-role-small">${player.role}</div>
                </div>
                <div style="display:flex;align-items:center;">
                    <div class="flip-container champ-flip" onclick="revealChampCard(this, '${btnId}')">
                        <div class="flipper" id="${flipperId}">
                            <div class="front">?</div>
                            <div class="back champ-back" id="${cardBackId}">
                                <img src="${champImgUrl}" class="champ-portrait" alt="" loading="lazy">
                                <span>${player.champion.name}</span>
                            </div>
                        </div>
                    </div>
                    <button id="${btnId}" class="reroll-btn" title="Wylosuj nową postać"
                        onclick="rerollChampion(${teamNum}, ${index}, this, '${cardBackId}', '${flipperId}')">🎲</button>
                </div>
            </div>
        `;
    });
}

function revealChampCard(el, btnId) {
    if (!el.classList.contains('revealed')) {
        el.classList.add('revealed');
        playRevealSound();
        const btn = document.getElementById(btnId);
        if (btn) btn.style.display = 'block';
    }
}

function rerollChampion(teamNum, playerIndex, btnEl, cardBackId, flipperId) {
    const player = teams[teamNum][playerIndex];
    const idx = usedChampions.indexOf(player.champion.name);
    if (idx !== -1) usedChampions.splice(idx, 1);

    const newChamp = getRandomChampionForRole(player.role);
    usedChampions.push(newChamp.name);
    player.champion = newChamp;

    playRevealSound();
    const flipper = document.getElementById(flipperId);
    flipper.classList.remove('coin-flip-anim');
    void flipper.offsetWidth;
    flipper.classList.add('coin-flip-anim');

    setTimeout(() => {
        const champImgUrl = `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${newChamp.image.full}`;
        document.getElementById(cardBackId).innerHTML = `
            <img src="${champImgUrl}" class="champ-portrait" alt="" loading="lazy">
            <span>${newChamp.name}</span>
        `;
    }, 400);

    if (flipper.dataset.animTimeout) clearTimeout(flipper.dataset.animTimeout);
    flipper.dataset.animTimeout = setTimeout(() => flipper.classList.remove('coin-flip-anim'), 800);
}

// ===================== BITWA 2 DRUŻYNY =====================

function startBattle() {
    const btn = document.getElementById('btn-battle');
    const battleContainer = document.getElementById('battle-container');
    const battleFill = document.getElementById('battle-fill');
    const winnerText = document.getElementById('winner-text');

    btn.style.display = 'none';
    battleContainer.style.display = 'block';
    winnerText.style.opacity = '0';
    winnerText.innerText = '';

    audioBattle.currentTime = 0;
    audioBattle.play().catch(() => {});

    const winnerNum = Math.random() < 0.5 ? 0 : 1;
    const finalWidth = winnerNum === 0 ? '100%' : '0%';
    let elapsed = 0;
    const battleDuration = 5500, intervalTime = 600;

    const iv = setInterval(() => {
        elapsed += intervalTime;
        if (elapsed < battleDuration - 1000) {
            battleFill.style.width = (Math.floor(Math.random() * 60) + 20) + '%';
        } else {
            clearInterval(iv);
            battleFill.style.width = finalWidth;
            audioBattle.pause();
            audioWin.currentTime = 0;
            audioWin.play().catch(() => {});

            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 200, spread: 120, origin: { y: 0.6 },
                    colors: ['#c8aa6e', winnerNum === 0 ? '#0ac8b9' : '#e84057', '#ffffff'],
                    disableForReducedMotion: true
                });
            }
            setTimeout(() => {
                winnerText.innerText = `Maszyna przewiduje zwycięstwo: ${teamNames[winnerNum]}!`;
                winnerText.style.opacity = '1';
            }, 600);
        }
    }, intervalTime);
}

// ===================== DRABINKA 4 DRUŻYN =====================

function initBracket() {
    // Wpisz nazwy drużyn w sloty półfinałów
    document.getElementById('sf1-t1-name').innerText = teamNames[0];
    document.getElementById('sf1-t2-name').innerText = teamNames[1];
    document.getElementById('sf2-t1-name').innerText = teamNames[2];
    document.getElementById('sf2-t2-name').innerText = teamNames[3];

    // Aktualizuj kolory kropek
    document.querySelector('#sf1-team1 .bracket-team-dot').style.background = 'var(--blue-team)';
    document.querySelector('#sf1-team2 .bracket-team-dot').style.background = 'var(--red-team)';
    document.querySelector('#sf2-team1 .bracket-team-dot').style.background = 'var(--green-team)';
    document.querySelector('#sf2-team2 .bracket-team-dot').style.background = 'var(--purple-team)';

    // Przywróć klikalność półfinałów
    ['sf1-team1','sf1-team2','sf2-team1','sf2-team2'].forEach(id => {
        const el = document.getElementById(id);
        el.className = 'bracket-team-slot bracket-clickable';
    });

    // Reset finału
    bracketWinners.sf1 = null;
    bracketWinners.sf2 = null;
    document.getElementById('final-t1-name').innerText = 'Zwycięzca PF1';
    document.getElementById('final-t2-name').innerText = 'Zwycięzca PF2';
    document.getElementById('final-team1').className = 'bracket-team-slot tbd';
    document.getElementById('final-team2').className = 'bracket-team-slot tbd';
    // Usuń onclick z finału żeby nie był klikalny zanim oba PF skończone
    document.getElementById('final-team1').onclick = null;
    document.getElementById('final-team2').onclick = null;

    document.getElementById('champion-name').innerText = '???';
    document.getElementById('champion-display').className = 'bracket-team-slot tbd';
    document.getElementById('champion-display').style.justifyContent = 'center';
}

function slideToStep(stepIndex) {
    if (stepIndex === 3 && isMode4) initBracket();
    document.getElementById('app').style.transform = `translateX(-${stepIndex * 100}vw)`;
}

const SF_CONFIG = {
    sf1: {
        teams: [0, 1],
        colors: ['var(--blue-team)', 'var(--red-team)'],
        slots: ['sf1-team1', 'sf1-team2'],
        finalSlot: 'final-team1', finalName: 'final-t1-name',
    },
    sf2: {
        teams: [2, 3],
        colors: ['var(--green-team)', 'var(--purple-team)'],
        slots: ['sf2-team1', 'sf2-team2'],
        finalSlot: 'final-team2', finalName: 'final-t2-name',
    }
};

// winnerIdx = 0 lub 1 (który slot w meczu wygrał)
function pickWinner(matchId, winnerIdx) {
    const cfg = SF_CONFIG[matchId];
    if (!cfg) return;

    // Zablokuj oba sloty w tym meczu (żeby nie kliknąć drugi raz)
    cfg.slots.forEach((slotId, i) => {
        const el = document.getElementById(slotId);
        el.onclick = null;
        el.classList.remove('bracket-clickable');
        if (i === winnerIdx) {
            el.className = 'bracket-team-slot winner-slot';
        } else {
            el.className = 'bracket-team-slot loser-slot';
        }
    });

    const winTeamIdx = cfg.teams[winnerIdx];
    const winColor   = cfg.colors[winnerIdx];
    bracketWinners[matchId] = { name: teamNames[winTeamIdx], color: winColor };

    // Wstaw zwycięzcę do slotu finałowego
    const finalSlotEl = document.getElementById(cfg.finalSlot);
    finalSlotEl.className = 'bracket-team-slot';
    document.getElementById(cfg.finalName).innerText = teamNames[winTeamIdx];
    finalSlotEl.querySelector('.bracket-team-dot').style.background = winColor;

    playRevealSound();

    // Jeśli oba półfinały rozegrane → uaktywnij finał
    if (bracketWinners.sf1 && bracketWinners.sf2) {
        const f1 = document.getElementById('final-team1');
        const f2 = document.getElementById('final-team2');
        f1.className = 'bracket-team-slot bracket-clickable';
        f2.className = 'bracket-team-slot bracket-clickable';
        f1.onclick = () => pickFinalWinner(0);
        f2.onclick = () => pickFinalWinner(1);
    }
}

function pickFinalWinner(winnerIdx) {
    const w1 = bracketWinners.sf1;
    const w2 = bracketWinners.sf2;
    const winnerObj = winnerIdx === 0 ? w1 : w2;

    const f1 = document.getElementById('final-team1');
    const f2 = document.getElementById('final-team2');

    // Zablokuj oba sloty finału
    f1.onclick = null; f2.onclick = null;
    f1.classList.remove('bracket-clickable');
    f2.classList.remove('bracket-clickable');

    if (winnerIdx === 0) {
        f1.className = 'bracket-team-slot winner-slot';
        f2.className = 'bracket-team-slot loser-slot';
    } else {
        f2.className = 'bracket-team-slot winner-slot';
        f1.className = 'bracket-team-slot loser-slot';
    }

    // Pokaż mistrza
    const champDisplay = document.getElementById('champion-display');
    champDisplay.className = 'bracket-team-slot winner-slot';
    champDisplay.style.justifyContent = 'center';
    champDisplay.style.fontSize = '20px';
    document.getElementById('champion-name').innerText = '🏆 ' + winnerObj.name;

    playRevealSound();

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 250, spread: 130, origin: { y: 0.5 },
            colors: ['#c8aa6e', winnerObj.color, '#ffffff'],
            disableForReducedMotion: true
        });
    }

    audioWin.currentTime = 0;
    audioWin.play().catch(() => {});
}

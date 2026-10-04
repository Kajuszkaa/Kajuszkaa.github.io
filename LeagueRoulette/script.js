// ========================================================
// CUSTOM ROULETTE 67 - LEAGUE OF LEGENDS
// Logic: Themes, Team Builder, Player Basket, Shuffle & 2026 Pools
// ========================================================

// --- ANIMACJA PRZEJŚCIA CZĄSTECZEK (AUTUMN / CHAOS) ---
function playAutumnTransition(callback) {
    const normalEmojis = [
        '🍁','🍂','🍃','🎃','🍄','☕',
        '🌙','⭐','✨','💫','🌟','🎯',
        '🗡️','⚔️','🛡️','🏆','👑','🎲',
        '🐉','🦊','🌊','🔥','❄️','⚡',
        '🎭','🎪','🎠','🌀','💎','🪄'
    ];

    const chaosEmojis = [
        '🤡','🤪','💣','💥','🍄','💀',
        '🦄','⚡','🍕','🍌','💩','🐸',
        '🚀','🔥','🧟','🌪️','🪄','🍭',
        '🎲','👾','🛸','🥊','🧲','🧨'
    ];

    const emojis = gameMode === 'pojeby' ? chaosEmojis : normalEmojis;

    if (typeof callback === 'function') {
        setTimeout(callback, 60);
        return;
    }

    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;overflow:hidden;';
    document.body.appendChild(container);

    const PARTICLE_COUNT = 45;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particle = document.createElement('div');
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        const startY   = Math.random() * 90 + 5;
        const size     = Math.random() * 22 + 18;
        const duration = Math.random() * 1.2 + 0.9;
        const delay    = Math.random() * 0.6;
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

    if (!document.getElementById('fly-keyframes')) {
        const style = document.createElement('style');
        style.id = 'fly-keyframes';
        style.textContent = `
            @keyframes flyAcross {
                0%   { transform: translateX(0vw) translateY(0) rotate(0deg); opacity: 0; }
                5%   { opacity: 1; }
                50%  { transform: translateX(55vw) translateY(var(--wobble)) rotate(calc(var(--rot) * 0.5)); opacity: 1; }
                95%  { opacity: 1; }
                100% { transform: translateX(115vw) translateY(0) rotate(var(--rot)); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    const totalDuration = (0.6 + 2.1) * 1000 + 200;
    setTimeout(() => container.remove(), totalDuration);
}

// --- DŹWIĘKI ---
const AUDIO_SPARKLE_PATH = "sparkle.mp3";
const AUDIO_BATTLE_PATH  = "battle.mp3";
const AUDIO_WIN_PATH     = "win.mp3";

const audioSparkle = new Audio(AUDIO_SPARKLE_PATH); audioSparkle.volume = 0.5;
const audioBattle  = new Audio(AUDIO_BATTLE_PATH);  audioBattle.volume  = 0.3;
const audioWin     = new Audio(AUDIO_WIN_PATH);      audioWin.volume     = 1.0;

function playRevealSound() {
    const s = audioSparkle.cloneNode();
    s.volume = 0.5;
    s.play().catch(() => {});
}

// --- DANE RÓL I KOLORÓW DRUŻYN ---
const ROLES = ["Top", "Jungle", "Mid", "ADC", "Support"];

const TEAM_COLORS = [
    { css: 'blue-team',   dot: 'var(--blue-team)',   label: 'Skład 1 (Niebieski)'  },
    { css: 'red-team',    dot: 'var(--red-team)',    label: 'Skład 2 (Czerwony)'   },
    { css: 'green-team',  dot: 'var(--green-team)',  label: 'Skład 3 (Zielony)'    },
    { css: 'purple-team', dot: 'var(--purple-team)', label: 'Skład 4 (Fioletowy)'  },
];

// --- AKTUALNY, PEŁNY SPIS POSTACI LEAGUE OF LEGENDS (STAN NA PAŹDZIERNIK 2026 - 173 BOHATERÓW) ---
const rolePools = {
    "Top": [
        "Aatrox", "Akali", "Ambessa", "Aurora", "Briar", "Camille", "Chogath", "Darius", "DrMundo", "Fiora", "Gangplank",
        "Garen", "Gnar", "Gragas", "Gwen", "Heimerdinger", "Illaoi", "Irelia", "Jax", "Jayce",
        "KSante", "Kayle", "Kennen", "Kled", "Locke", "Malphite", "Mordekaiser", "Nasus", "Olaf", "Ornn",
        "Pantheon", "Poppy", "Quinn", "Renekton", "Riven", "Rumble", "Ryze", "Sett", "Shen",
        "Singed", "Sion", "TahmKench", "Teemo", "Trundle", "Tryndamere", "Urgot", "Vayne", "Volibear",
        "MonkeyKing", "Yasuo", "Yone", "Yorick", "Zac", "Zaahen"
    ],
    "Jungle": [
        "Amumu", "Belveth", "Briar", "Diana", "Ekko", "Elise", "Evelynn", "Fiddlesticks", "Gragas",
        "Graves", "Hecarim", "Ivern", "JarvanIV", "Karthus", "Kayn", "Khazix", "Kindred", "LeeSin",
        "Lillia", "MasterYi", "Nidalee", "Nocturne", "Nunu", "Pantheon", "Poppy", "Rammus", "RekSai",
        "Rengar", "Sejuani", "Shaco", "Shyvana", "Skarner", "Sylas", "Taliyah", "Talon", "Trundle",
        "Udyr", "Vi", "Viego", "Volibear", "Warwick", "MonkeyKing", "XinZhao", "Zac", "Brand", "Morgana",
        "Zyra", "Jax"
    ],
    "Mid": [
        "Ahri", "Akali", "Akshan", "Anivia", "Annie", "AurelionSol", "Aurora", "Azir", "Cassiopeia",
        "Corki", "Diana", "Ekko", "Fizz", "Galio", "Gangplank", "Heimerdinger", "Hwei", "Irelia",
        "Jayce", "Kassadin", "Katarina", "Leblanc", "Lissandra", "Locke", "Lux", "Malzahar", "Mel",
        "Naafiri", "Neeko", "Orianna", "Pantheon", "Qiyana", "Ryze", "Smolder", "Swain", "Sylas",
        "Syndra", "Taliyah", "Talon", "Tristana", "TwistedFate", "Veigar", "Velkoz", "Vex", "Viktor",
        "Vladimir", "Xerath", "Yasuo", "Yone", "Zed", "Ziggs", "Zoe"
    ],
    "ADC": [
        "Aphelios", "Ashe", "Caitlyn", "Corki", "Draven", "Ezreal", "Jhin", "Jinx", "Kaisa",
        "Kalista", "KogMaw", "Lucian", "MissFortune", "Nilah", "Samira", "Sivir", "Smolder",
        "Tristana", "Twitch", "Varus", "Vayne", "Xayah", "Yasuo", "Yunara", "Zeri", "Ziggs",
        "Seraphine", "Karthus", "Swain"
    ],
    "Support": [
        "Alistar", "Annie", "Ashe", "Bard", "Blitzcrank", "Brand", "Braum", "Camille", "Galio",
        "Heimerdinger", "Hwei", "Janna", "Karma", "Leona", "Lulu", "Lux", "Malphite", "Maokai",
        "Mel", "Milio", "Morgana", "Nami", "Nautilus", "Neeko", "Pantheon", "Poppy", "Pyke",
        "Rakan", "Rell", "Renata", "Senna", "Seraphine", "Sett", "Shaco", "Shen", "Sona",
        "Soraka", "Swain", "TahmKench", "Taric", "Thresh", "Velkoz", "Xerath", "Yuumi", "Zilean",
        "Zoe", "Zyra"
    ]
};

// Kultowe trolle w trybie "Dla Pojebów"
const ICONIC_TROLL_PICKS = {
    "Jungle":  ["Yuumi", "Zilean", "Sona", "Soraka", "Janna", "Milio", "Jinx", "Veigar", "Bard", "Lulu"],
    "ADC":     ["Lillia", "Singed", "Taric", "Braum", "Ivern", "Yuumi", "Kled", "Zac", "Rammus"],
    "Mid":     ["Braum", "Taric", "Leona", "Rammus", "Yuumi", "Soraka", "Blitzcrank", "Alistar"],
    "Top":     ["Yuumi", "Soraka", "Sona", "Janna", "Milio", "Nami", "Zilean", "Senna"],
    "Support": ["Darius", "MasterYi", "Tryndamere", "Garen", "Riven", "Draven", "Samira", "Kled"]
};



// --- STAN APLIKACJI ---
let gameMode = 'normal'; // 'normal' | 'pojeby'
let activeTeams = [
    { name: "Skład 1", players: ["", "", "", "", ""], beginners: [false, false, false, false, false] },
    { name: "Skład 2", players: ["", "", "", "", ""], beginners: [false, false, false, false, false] }
];

let basketPlayers = [];         // lista graczy w koszyku: { name: string, beginner: boolean }
let basketInputShieldActive = false; // stan tarczy dla nowo wpisywanego gracza w koszyku
let selectedSaveTeamIdx = 0;    // wybrany skład do zapisania w modalu
let teams = [];                 // struktura używana w krokach 2-4: teams[t] = [{name, role, champion}]
let teamNames = [];             // nazwy drużyn w krokach 2-4
let latestPatch = "";
let allChampsData = [];
const usedChampions = [];       // bohaterowie użyci w bieżącej grze
let recentPicksHistory = [];    // historia postaci z poprzedniej gry (zapobiega powtarzaniu Lux, itp.)

// Stan drabinki turniejowej
const bracketWinners = { sf1: null, sf2: null };

// Klucze LocalStorage
const STORAGE_PRESETS_KEY = 'league_roulette_presets_v2';
const STORAGE_MODE_KEY    = 'league_roulette_mode_v2';
const STORAGE_BASKET_KEY  = 'league_roulette_basket_v2';

// ===================== PRZEŁĄCZANIE TRYBÓW I MOTYWU =====================

function setGameMode(mode) {
    gameMode = mode;
    localStorage.setItem(STORAGE_MODE_KEY, mode);

    const normalCard = document.getElementById('mode-normal-card');
    const pojebyCard = document.getElementById('mode-pojeby-card');
    const chaosBadge = document.getElementById('chaos-badge');

    if (mode === 'pojeby') {
        document.body.className = 'theme-pojeby';
        if (normalCard) normalCard.classList.remove('active');
        if (pojebyCard) pojebyCard.classList.add('active');
        if (chaosBadge) chaosBadge.style.display = 'inline-block';
        showToast("Aktywowano Tryb Dla Pojebów! Totalny Chaos! 🤪");
    } else {
        document.body.className = 'theme-normal';
        if (normalCard) normalCard.classList.add('active');
        if (pojebyCard) pojebyCard.classList.remove('active');
        if (chaosBadge) chaosBadge.style.display = 'none';
        showToast("Aktywowano Tryb Normalny (Zbalansowany) 🛡️");
    }
}

// ===================== BUDOWNICZY SKŁADÓW (KROK 1) =====================

function renderTeamsBuilder() {
    const grid = document.getElementById('teams-builder-grid');
    if (!grid) return;
    grid.innerHTML = '';

    activeTeams.forEach((team, tIdx) => {
        const canRemove = activeTeams.length > 1;
        const colorClass = `team-color-${tIdx % 4}`;

        let playersHtml = '';
        for (let pIdx = 0; pIdx < 5; pIdx++) {
            const val = team.players[pIdx] || '';
            const isBeg = team.beginners[pIdx] || false;
            playersHtml += `
                <div class="player-builder-row ${isBeg ? 'beginner-active' : ''}" id="prow-${tIdx}-${pIdx}">
                    <span class="player-num-tag">${pIdx + 1}.</span>
                    <input type="text"
                        class="player-input-field"
                        id="pinput-${tIdx}-${pIdx}"
                        placeholder="Gracz ${pIdx + 1}..."
                        value="${escapeHtml(val)}"
                        autocomplete="off"
                        oninput="onPlayerInput(${tIdx}, ${pIdx}, this.value)" />
                    <button type="button"
                        class="beginner-toggle-btn"
                        title="Oznacz jako początkującego (pomaga w balansie)"
                        onclick="toggleBeginner(${tIdx}, ${pIdx})">🛡️</button>
                </div>
            `;
        }

        const card = document.createElement('div');
        card.className = `team-builder-card ${colorClass}`;
        card.id = `team-card-${tIdx}`;
        card.innerHTML = `
            <div class="team-builder-header">
                <input type="text"
                    class="team-name-input"
                    value="${escapeHtml(team.name)}"
                    placeholder="Nazwa Składu..."
                    autocomplete="off"
                    oninput="onTeamNameInput(${tIdx}, this.value)" />
                ${canRemove ? `<button type="button" class="team-remove-btn" title="Usuń ten skład" onclick="removeTeam(${tIdx})">✕</button>` : ''}
            </div>
            <div class="team-builder-players">
                ${playersHtml}
            </div>
        `;
        grid.appendChild(card);
    });

    if (activeTeams.length < 4) {
        const addCard = document.createElement('div');
        addCard.className = 'add-team-card';
        addCard.onclick = addTeam;
        addCard.innerHTML = `
            <div class="add-team-icon">➕</div>
            <div class="add-team-text">Dodaj skład</div>
            <div class="add-team-sub">Maksymalnie 4 składy</div>
        `;
        grid.appendChild(addCard);
    }

    const sub = document.getElementById('step1-subtitle');
    if (sub) {
        const total = activeTeams.length * 5;
        const teamLabel = activeTeams.length === 1 ? '1 skład (5 graczy)' : `${activeTeams.length} składy (${total} graczy)`;
        sub.innerText = `Skonfiguruj ${teamLabel} i wylosuj rozgrywkę!`;
    }
}

function onPlayerInput(tIdx, pIdx, value) {
    if (activeTeams[tIdx]) activeTeams[tIdx].players[pIdx] = value;
}

function onTeamNameInput(tIdx, value) {
    if (activeTeams[tIdx]) activeTeams[tIdx].name = value;
}

function toggleBeginner(tIdx, pIdx) {
    if (activeTeams[tIdx]) {
        activeTeams[tIdx].beginners[pIdx] = !activeTeams[tIdx].beginners[pIdx];
        const row = document.getElementById(`prow-${tIdx}-${pIdx}`);
        if (row) {
            row.classList.toggle('beginner-active', activeTeams[tIdx].beginners[pIdx]);
        }
    }
}

function addTeam() {
    if (activeTeams.length >= 4) return;
    const newIdx = activeTeams.length + 1;
    activeTeams.push({
        name: `Skład ${newIdx}`,
        players: ["", "", "", "", ""],
        beginners: [false, false, false, false, false]
    });
    renderTeamsBuilder();
    showToast(`Dodano Skład ${newIdx}!`);
}

function removeTeam(tIdx) {
    if (activeTeams.length <= 1) return;
    activeTeams.splice(tIdx, 1);
    renderTeamsBuilder();
    showToast("Usunięto skład.");
}

// ===================== ALGORYTM BALANSOWANIA TARCZ (SHIELD BALANCING) =====================

/**
 * Rozdziela graczy na wskazaną liczbę drużyn (każda po 5 miejsc).
 * GWARANCJA BALANSU TARCZ:
 * - Gracze z tarczą (beginner: true) są rozdzielani równomiernie (round-robin z losową kolejnością drużyn).
 * - Jeśli mamy np. 2 graczy z tarczą i 2 drużyny: każdy skład dostaje dokładnie 1 gracza z tarczą (nigdy nie będą razem!).
 * - Jeśli graczy z tarczą jest więcej, różnica liczby tarcz między drużynami wynosi maksymalnie 1.
 * - Gracze bez tarczy wypełniają pozostałe wolne miejsca w składach.
 * - Pozycje wewnątrz każdego składu są losowo tasowane, aby gracz z tarczą nie był przewidywalnie na 1. slocie.
 */
function distributePlayersWithShields(playersList, teamsCount) {
    if (teamsCount <= 1) {
        const shuffled = shuffleArray([...playersList]);
        while (shuffled.length < 5) {
            shuffled.push({ name: '', beginner: false });
        }
        return [shuffled.slice(0, 5)];
    }

    const shielded = shuffleArray(playersList.filter(p => !!p.beginner));
    const normal   = shuffleArray(playersList.filter(p => !p.beginner));

    const teams = Array.from({ length: teamsCount }, () => []);

    // Rozdziel graczy z tarczą round-robin z losową permutacją drużyn w każdej rundzie
    const rounds = Math.max(1, Math.ceil(shielded.length / teamsCount));
    const teamOrder = [];
    for (let r = 0; r < rounds; r++) {
        const roundIndices = shuffleArray([...Array(teamsCount).keys()]);
        teamOrder.push(...roundIndices);
    }

    shielded.forEach((p, idx) => {
        const tIdx = teamOrder[idx];
        teams[tIdx].push(p);
    });

    // Uzupełnij drużyny graczami normalnymi do 5 miejsc
    teams.forEach(team => {
        while (team.length < 5 && normal.length > 0) {
            team.push(normal.shift());
        }
    });

    // Dopełnij puste miejsca, jeśli graczy było mniej niż teamsCount * 5
    teams.forEach((team, idx) => {
        while (team.length < 5) {
            team.push({ name: '', beginner: false });
        }
        // Wymieszaj kolejność wewnątrz składu
        teams[idx] = shuffleArray(team);
    });

    return teams;
}

// ===================== SZYBKIE PRZETASOWANIE SKŁADÓW =====================

function shuffleCurrentPlayers() {
    syncInputsToState();

    const allFilled = [];
    activeTeams.forEach(t => {
        for (let i = 0; i < 5; i++) {
            const name = (t.players[i] || '').trim();
            if (name) {
                allFilled.push({
                    name: name,
                    beginner: !!t.beginners[i]
                });
            }
        }
    });

    if (allFilled.length === 0) {
        showToast("Najpierw wpisz nicki graczy, aby móc ich wymieszać! ✍️");
        return;
    }

    const teamsCount = activeTeams.length;
    const balancedTeams = distributePlayersWithShields(allFilled, teamsCount);

    balancedTeams.forEach((teamList, tIdx) => {
        if (activeTeams[tIdx]) {
            for (let pIdx = 0; pIdx < 5; pIdx++) {
                activeTeams[tIdx].players[pIdx] = teamList[pIdx]?.name || '';
                activeTeams[tIdx].beginners[pIdx] = !!teamList[pIdx]?.beginner;
            }
        }
    });

    renderTeamsBuilder();

    document.querySelectorAll('.player-builder-row').forEach(row => {
        row.classList.remove('shuffle-animate');
        void row.offsetWidth;
        row.classList.add('shuffle-animate');
    });

    showToast("Gracze przetasowani z balansem tarcz ochronnych! 🔀🛡️");
}

function syncInputsToState() {
    activeTeams.forEach((t, tIdx) => {
        for (let pIdx = 0; pIdx < 5; pIdx++) {
            const inp = document.getElementById(`pinput-${tIdx}-${pIdx}`);
            if (inp) t.players[pIdx] = inp.value;
        }
    });
}

// ===================== KOSZYK GRACZY (PLAYER BASKET) =====================

function loadBasketFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_BASKET_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            basketPlayers = parsed.map(item => {
                if (typeof item === 'string') {
                    return { name: item, beginner: false };
                }
                return { name: item.name || '', beginner: !!item.beginner };
            }).filter(p => p.name.trim() !== '');
        }
    } catch (e) {
        basketPlayers = [];
    }
}

function saveBasketToStorage() {
    try {
        localStorage.setItem(STORAGE_BASKET_KEY, JSON.stringify(basketPlayers));
    } catch (e) {
        console.error("Błąd zapisu koszyka", e);
    }
}

function toggleBasketInputShield() {
    basketInputShieldActive = !basketInputShieldActive;
    updateBasketInputShieldUI();
}

function updateBasketInputShieldUI() {
    const btn = document.getElementById('basket-shield-toggle-btn');
    if (btn) {
        btn.classList.toggle('active', basketInputShieldActive);
        btn.title = basketInputShieldActive
            ? "Tarcza zapalona (gracz otrzyma tarczę) — kliknij, aby wygasić 🛡️"
            : "Tarcza wygaszona — kliknij, aby zapalić i dodać gracza z tarczą 🛡️";
    }
}

function openBasketModal() {
    loadBasketFromStorage();

    // Jeśli koszyk jest pusty, zaimportuj graczy wpisanych obecnie na kafelkach
    if (basketPlayers.length === 0) {
        syncInputsToState();
        const activeFilled = [];
        activeTeams.forEach(t => {
            for (let i = 0; i < 5; i++) {
                const name = (t.players[i] || '').trim();
                if (name) {
                    activeFilled.push({ name: name, beginner: !!t.beginners[i] });
                }
            }
        });
        if (activeFilled.length > 0) {
            basketPlayers = [...activeFilled];
            saveBasketToStorage();
        }
    }

    basketInputShieldActive = false;
    updateBasketInputShieldUI();
    renderBasketUI();

    const modal = document.getElementById('basket-modal');
    if (modal) modal.style.display = 'flex';

    setTimeout(() => {
        const inp = document.getElementById('basket-player-input');
        if (inp) inp.focus();
    }, 100);
}

function renderBasketUI() {
    const countEl = document.getElementById('basket-count-number');
    const listContainer = document.getElementById('basket-players-list');
    const banner = document.getElementById('basket-status-banner');
    const submitBtn = document.getElementById('basket-submit-btn');

    const total = basketPlayers.length;
    if (countEl) countEl.innerText = total;

    // Renderuj listę graczy
    if (listContainer) {
        listContainer.innerHTML = '';
        if (total === 0) {
            listContainer.innerHTML = '<div style="color:var(--text-muted);font-size:0.9rem;padding:25px;text-align:center;">Koszyk jest pusty. Wpisz nick gracza powyżej i naciśnij Enter!</div>';
        } else {
            basketPlayers.forEach((p, idx) => {
                const item = document.createElement('div');
                item.className = `basket-player-item ${p.beginner ? 'has-shield' : ''}`;
                item.innerHTML = `
                    <div class="basket-player-left">
                        <span class="basket-player-num">${idx + 1}.</span>
                        <button type="button"
                            class="basket-player-shield-btn ${p.beginner ? 'active' : ''}"
                            title="${p.beginner ? 'Tarcza zapalona (aktywna) — kliknij, aby wygasić' : 'Tarcza wygaszona — kliknij, aby zapalić 🛡️'}"
                            onclick="toggleBasketPlayerShield(${idx})">🛡️</button>
                        <span class="basket-player-name">${escapeHtml(p.name)}</span>
                    </div>
                    <button type="button" class="basket-player-del" title="Usuń gracza" onclick="removeBasketPlayer(${idx})">✕</button>
                `;
                listContainer.appendChild(item);
            });
            listContainer.scrollTop = listContainer.scrollHeight;
        }
    }

    // Walidacja statusu
    if (banner && submitBtn) {
        banner.className = 'basket-status-banner';

        if (total === 0) {
            banner.classList.add('empty');
            banner.innerHTML = `Wpisz nick gracza i naciśnij Enter.`;
            submitBtn.disabled = true;
        } else if (total % 5 === 0) {
            banner.classList.add('valid');
            if (total === 5) {
                banner.innerHTML = `🟢 O, fajnie, 5 graczy w koszyku, można zacząć rozgrywkę!`;
            } else {
                const teamsCount = total / 5;
                banner.innerHTML = `🟢 O, fajnie, ${total} graczy w koszyku (${teamsCount} składy), można zacząć rozgrywkę!`;
            }
            submitBtn.disabled = false;
        } else {
            const remainder = total % 5;
            const needed = 5 - remainder;
            const nextTarget = total + needed;
            banner.classList.add('invalid');
            banner.innerHTML = `🔴 ${total} graczy w koszyku — brakuje ${needed} graczy do pełnego składu (${nextTarget} graczy)!`;
            submitBtn.disabled = true;
        }
    }
}

function handleBasketInputKey(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addSinglePlayerToBasket();
    }
}

function addSinglePlayerToBasket() {
    const input = document.getElementById('basket-player-input');
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;

    basketPlayers.push({
        name: val,
        beginner: basketInputShieldActive
    });
    saveBasketToStorage();

    input.value = '';
    basketInputShieldActive = false;
    updateBasketInputShieldUI();

    renderBasketUI();
    input.focus();
}

function toggleBasketPlayerShield(idx) {
    if (basketPlayers[idx]) {
        basketPlayers[idx].beginner = !basketPlayers[idx].beginner;
        saveBasketToStorage();
        renderBasketUI();
    }
}

function removeBasketPlayer(idx) {
    if (idx >= 0 && idx < basketPlayers.length) {
        basketPlayers.splice(idx, 1);
        saveBasketToStorage();
        renderBasketUI();
        const input = document.getElementById('basket-player-input');
        if (input) input.focus();
    }
}

function clearBasket() {
    basketPlayers = [];
    saveBasketToStorage();
    renderBasketUI();
    const input = document.getElementById('basket-player-input');
    if (input) input.focus();
    showToast("Wyczyszczono koszyk graczy.");
}

function generateTeamsFromBasket() {
    const total = basketPlayers.length;
    if (total < 5 || total % 5 !== 0) {
        showToast("Liczba graczy musi być wielokrotnością 5 (np. 5, 10, 15, 20)! ⚠️");
        return;
    }

    const teamsCount = Math.min(4, Math.floor(total / 5));
    const balancedTeams = distributePlayersWithShields(basketPlayers, teamsCount);

    activeTeams = balancedTeams.map((teamPlayers, idx) => ({
        name: `Skład ${idx + 1}`,
        players: teamPlayers.map(p => p.name),
        beginners: teamPlayers.map(p => !!p.beginner)
    }));

    renderTeamsBuilder();
    closeModal('basket-modal');

    // Animacja na kafelkach
    document.querySelectorAll('.player-builder-row').forEach(row => {
        row.classList.remove('shuffle-animate');
        void row.offsetWidth;
        row.classList.add('shuffle-animate');
    });

    playRevealSound();
    const label = teamsCount === 1 ? '1 skład' : `${teamsCount} składy`;
    showToast(`Wymieszano ${total} graczy z balansem tarcz i stworzono ${label}! 🔀🛡️`);
}

// ===================== ZAPISYWANIE I WŁASNE SKŁADY =====================

function getSavedPresets() {
    try {
        const raw = localStorage.getItem(STORAGE_PRESETS_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            // Usuwamy wszelkie dawne domyślne/sztywne presety z bazy użytkownika
            const userOnly = parsed.filter(p => !p.isDefault && !p.id?.startsWith('preset_pro_') && !p.id?.startsWith('preset_chaos_') && !p.id?.startsWith('preset_tourney_'));
            if (userOnly.length !== parsed.length) {
                savePresetsToStorage(userOnly);
            }
            return userOnly;
        }
    } catch (e) {
        console.error("Błąd odczytu zapisanych składów", e);
    }
    return [];
}

function savePresetsToStorage(presets) {
    try {
        localStorage.setItem(STORAGE_PRESETS_KEY, JSON.stringify(presets));
    } catch (e) {
        console.error("Błąd zapisu składów", e);
    }
}

function openSaveModal() {
    syncInputsToState();
    selectedSaveTeamIdx = 0;

    const modal = document.getElementById('save-modal');
    const group = document.getElementById('save-team-select-group');

    if (group) {
        group.innerHTML = '';
        activeTeams.forEach((team, idx) => {
            const filledCount = team.players.filter(p => p.trim() !== '').length;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `save-team-choice-btn ${idx === 0 ? 'active' : ''}`;
            btn.innerText = `${team.name || `Skład ${idx + 1}`} (${filledCount}/5 graczy)`;
            btn.onclick = () => selectTeamToSave(idx);
            group.appendChild(btn);
        });
    }

    updateSaveModalInputs();
    if (modal) modal.style.display = 'flex';
}

function selectTeamToSave(tIdx) {
    selectedSaveTeamIdx = tIdx;
    const btns = document.querySelectorAll('.save-team-choice-btn');
    btns.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === tIdx);
    });
    updateSaveModalInputs();
}

function updateSaveModalInputs() {
    const input = document.getElementById('save-preset-name');
    const hint  = document.getElementById('save-preset-hint');
    const team  = activeTeams[selectedSaveTeamIdx];
    if (!team) return;

    if (input) {
        input.value = team.name || `Skład ${selectedSaveTeamIdx + 1}`;
        setTimeout(() => { input.focus(); input.select(); }, 100);
    }

    if (hint) {
        const names = team.players.filter(p => p.trim() !== '');
        const shieldCount = team.beginners.filter(b => !!b).length;
        const shieldText = shieldCount > 0 ? ` (w tym ${shieldCount} z tarczą 🛡️)` : '';
        if (names.length > 0) {
            hint.innerText = `Gracze: ${names.join(', ')}${shieldText}.`;
        } else {
            hint.innerText = `Zapisujesz ten skład wraz z jego nickami i tarczami ochronnymi.`;
        }
    }
}

function confirmSavePreset() {
    const input = document.getElementById('save-preset-name');
    const name = input ? input.value.trim() : '';
    if (!name) {
        showToast("Wpisz nazwę dla tego składu! ⚠️");
        return;
    }

    syncInputsToState();
    const teamToSave = activeTeams[selectedSaveTeamIdx];
    if (!teamToSave) return;

    const presets = getSavedPresets();

    const newSquad = {
        id: 'squad_' + Date.now(),
        name: name,
        date: new Date().toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
        players: [...teamToSave.players],
        beginners: [...teamToSave.beginners]
    };

    presets.unshift(newSquad);
    savePresetsToStorage(presets);

    closeModal('save-modal');
    playRevealSound();
    showToast(`Zapisano skład: "${name}"! 💾`);
}

function openPresetsModal() {
    const modal = document.getElementById('presets-modal');
    const list = document.getElementById('presets-list');
    if (!list) return;

    const presets = getSavedPresets();
    list.innerHTML = '';

    if (presets.length === 0) {
        list.innerHTML = `
            <div style="color:var(--text-muted);text-align:center;padding:35px 20px;">
                <div style="font-size:2.2rem;margin-bottom:12px;">📂</div>
                <div style="font-weight:700;font-size:1.1rem;margin-bottom:8px;color:var(--text-light);">Brak własnych zapisanych składów</div>
                <div style="font-size:0.9rem;max-width:380px;margin:0 auto;line-height:1.5;">Wpisz nicki swoich znajomych w kafelkach i kliknij <strong>💾 Zapisz skład</strong>, aby móc ich błyskawicznie wstawiać do gry!</div>
            </div>
        `;
    } else {
        presets.forEach(p => {
            const playersList = p.players || (p.teams && p.teams[0] ? p.teams[0].players : []);
            const beginnersList = p.beginners || (p.teams && p.teams[0] ? p.teams[0].beginners : []);

            let playersTagsHtml = '';
            for (let i = 0; i < 5; i++) {
                const pName = playersList[i] || `Gracz ${i + 1}`;
                const hasShield = !!beginnersList[i];
                playersTagsHtml += `
                    <span class="player-tag-pill ${hasShield ? 'has-shield' : ''}">
                        ${escapeHtml(pName)} ${hasShield ? '🛡️' : ''}
                    </span>
                `;
            }

            const card = document.createElement('div');
            card.className = 'preset-card';
            card.innerHTML = `
                <div class="preset-card-top">
                    <div class="preset-name">
                        <span>🛡️</span> ${escapeHtml(p.name)}
                    </div>
                    <div class="preset-date">${p.date || ''}</div>
                </div>
                <div class="preset-players-tags">
                    ${playersTagsHtml}
                </div>
                <div class="preset-card-bottom">
                    <div class="preset-slot-buttons">
                        <span class="preset-insert-label">Wstaw jako:</span>
                        <button type="button" class="preset-slot-btn" onclick="insertSavedSquadIntoTeam('${p.id}', 0)">➔ Skład 1</button>
                        <button type="button" class="preset-slot-btn" onclick="insertSavedSquadIntoTeam('${p.id}', 1)">➔ Skład 2</button>
                        <button type="button" class="preset-slot-btn" onclick="insertSavedSquadIntoTeam('${p.id}', 2)">➔ Skład 3</button>
                        <button type="button" class="preset-slot-btn" onclick="insertSavedSquadIntoTeam('${p.id}', 3)">➔ Skład 4</button>
                    </div>
                    <button type="button" class="preset-delete-btn" title="Usuń ten skład" onclick="deletePreset('${p.id}')">🗑️</button>
                </div>
            `;
            list.appendChild(card);
        });
    }

    if (modal) modal.style.display = 'flex';
}

function insertSavedSquadIntoTeam(squadId, targetSlotIdx) {
    const presets = getSavedPresets();
    const squad = presets.find(item => item.id === squadId);
    if (!squad) return;

    syncInputsToState();

    // Rozszerz activeTeams jeśli celowy slot nie istnieje
    while (activeTeams.length <= targetSlotIdx && activeTeams.length < 4) {
        const nextNum = activeTeams.length + 1;
        activeTeams.push({
            name: `Skład ${nextNum}`,
            players: ["", "", "", "", ""],
            beginners: [false, false, false, false, false]
        });
    }

    if (!activeTeams[targetSlotIdx]) return;

    const playersList = squad.players || (squad.teams && squad.teams[0] ? squad.teams[0].players : []);
    const beginnersList = squad.beginners || (squad.teams && squad.teams[0] ? squad.teams[0].beginners : []);

    activeTeams[targetSlotIdx].name = squad.name;
    for (let i = 0; i < 5; i++) {
        activeTeams[targetSlotIdx].players[i] = playersList[i] || "";
        activeTeams[targetSlotIdx].beginners[i] = !!beginnersList[i];
    }

    renderTeamsBuilder();
    closeModal('presets-modal');
    playRevealSound();
    showToast(`Wstawiono "${squad.name}" jako Skład ${targetSlotIdx + 1}! ✅`);
}

function deletePreset(id) {
    let presets = getSavedPresets();
    presets = presets.filter(p => p.id !== id);
    savePresetsToStorage(presets);
    openPresetsModal();
    showToast("Usunięto skład.");
}

function closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.style.display = 'none';
}

function handleModalBackdropClick(e, modalId) {
    if (e.target && e.target.id === modalId) {
        closeModal(modalId);
    }
}

// ===================== TOAST NOTIFICATIONS =====================

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ===================== POMOCNICZE =====================

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function shuffleArray(array) {
    let s = [...array];
    for (let i = s.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
}

function slideToStep(stepIndex) {
    if (stepIndex === 3 && activeTeams.length === 4) {
        initBracket();
    }
    document.getElementById('app').style.transform = `translateX(-${stepIndex * 100}vw)`;
}

// ===================== LOSOWANIE POSTACI (ZAAWANSOWANE) =====================

function getRandomChampionForRole(role) {
    if (gameMode === 'pojeby') {
        // --- TRYB DLA POJEBÓW: KULTOWE TROLLE I PEŁNY CHAOS ---
        const standardRoleIds = rolePools[role] || [];
        const iconicTrolls = ICONIC_TROLL_PICKS[role] || [];

        // 1. Sprawdź czy dostępny jest któryś z kultowych trolli (np. Yuumi jungle, Lillia ADC)
        const availableIconic = allChampsData.filter(c =>
            iconicTrolls.includes(c.id) &&
            !usedChampions.includes(c.id) &&
            !usedChampions.includes(c.name)
        );

        // 75% szansy na kultowy troll pick, jeśli dostępny
        if (availableIconic.length > 0 && Math.random() < 0.75) {
            return availableIconic[Math.floor(Math.random() * availableIconic.length)];
        }

        // 2. W przeciwnym razie wybierz DOWOLNĄ postać, która NIE GRA na tej linii!
        let offMetaPool = allChampsData.filter(c =>
            !standardRoleIds.includes(c.id) &&
            !usedChampions.includes(c.id) &&
            !usedChampions.includes(c.name)
        );

        if (offMetaPool.length > 0) {
            return offMetaPool[Math.floor(Math.random() * offMetaPool.length)];
        }

        // 3. Fallback: dowolna wolna postać
        let freePool = allChampsData.filter(c => !usedChampions.includes(c.id) && !usedChampions.includes(c.name));
        if (freePool.length === 0) freePool = allChampsData;
        return freePool[Math.floor(Math.random() * freePool.length)];

    } else {
        // --- TRYB NORMALNY: PRAWDZIWE POSTACIE Z LINII + ANTY-POWTÓRZENIA (BRAK LUX CO CHWILĘ!) ---
        const validIds = rolePools[role] || [];
        let pool = allChampsData.filter(c => validIds.includes(c.id));
        if (pool.length === 0) pool = allChampsData;

        // Wyklucz postacie używane w tej grze
        let avail = pool.filter(c => !usedChampions.includes(c.id) && !usedChampions.includes(c.name));
        if (avail.length === 0) avail = pool;

        // Wyklucz postacie wylosowane w poprzednich grach, aby losowały się inne postacie
        let nonRecent = avail.filter(c => !recentPicksHistory.includes(c.id));
        if (nonRecent.length >= 3) {
            avail = nonRecent;
        }

        // Przetasuj porządnie pulę i wylosuj
        avail = shuffleArray(avail);
        return avail[Math.floor(Math.random() * avail.length)];
    }
}

// ===================== KROK 1 → 2 (PRZEJŚCIE DO RÓL) =====================

document.getElementById('btn-step1').addEventListener('click', () => {
    syncInputsToState();

    teamNames = [];
    teams = [];

    activeTeams.forEach((t, tIdx) => {
        const fallbackName = TEAM_COLORS[tIdx % 4].label;
        const finalName = t.name.trim() !== "" ? t.name.trim() : fallbackName;
        teamNames.push(finalName);

        const shuffledRoles = shuffleArray(ROLES);
        const teamPlayers = [];

        for (let i = 0; i < 5; i++) {
            const playerName = t.players[i].trim() !== "" ? t.players[i].trim() : `Gracz ${i + 1}`;
            teamPlayers.push({
                name: playerName,
                role: shuffledRoles[i],
                beginner: t.beginners[i] || false
            });
        }

        teams.push(teamPlayers);
    });

    renderRolesStep();
    playRevealSound();
    playAutumnTransition();
    slideToStep(1);
});

// ===================== KROK 2: ROLE =====================

function renderRolesStep() {
    const wrapper = document.getElementById('roles-teams-wrapper');
    wrapper.innerHTML = '';

    teams.forEach((tArray, tIdx) => {
        const color = TEAM_COLORS[tIdx % 4];
        wrapper.innerHTML += `
            <div class="team ${color.css}">
                <h2>${escapeHtml(teamNames[tIdx])}</h2>
                <div id="roles-team${tIdx}"></div>
            </div>
        `;
    });

    teams.forEach((tArray, tIdx) => {
        renderRolesCards(tArray, `roles-team${tIdx}`);
    });
}

function renderRolesCards(teamArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    teamArray.forEach(player => {
        container.innerHTML += `
            <div class="player-row">
                <div class="player-name">${escapeHtml(player.name)}</div>
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
    }
}

// ===================== KROK 2 → 3 (LOSOWANIE POSTACI) =====================

document.getElementById('btn-step2').addEventListener('click', async () => {
    playRevealSound();
    const btn = document.getElementById('btn-step2');
    btn.innerText = "Łączenie z API Riotu...";
    btn.disabled = true;

    try {
        if (!latestPatch || allChampsData.length === 0) {
            const versionRes = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
            latestPatch = (await versionRes.json())[0];

            const champsRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/pl_PL/champion.json`);
            allChampsData = Object.values((await champsRes.json()).data);
        }

        usedChampions.length = 0;

        // Zapisz wybrane postacie do historii nie-powtarzania
        const currentBatchIds = [];

        teams.forEach(tArray => {
            tArray.forEach(player => {
                const champ = getRandomChampionForRole(player.role);
                usedChampions.push(champ.id);
                usedChampions.push(champ.name);
                currentBatchIds.push(champ.id);
                player.champion = champ;
            });
        });

        // Zaktualizuj historię ostatnich picków
        recentPicksHistory = [...currentBatchIds];

        renderChampsStep();

        const b2 = document.getElementById('battle-2team-section');
        const b3 = document.getElementById('battle-3team-section');
        const b4 = document.getElementById('battle-4team-section');

        if (b2) b2.style.display = teams.length === 2 ? 'block' : 'none';
        if (b3) b3.style.display = teams.length === 3 ? 'block' : 'none';
        if (b4) b4.style.display = teams.length === 4 ? 'block' : 'none';

        playAutumnTransition();
        slideToStep(2);
    } catch (err) {
        console.error("Błąd API Riotu:", err);
        btn.innerText = "Błąd pobierania API. Spróbuj ponownie!";
        btn.disabled = false;
        return;
    }

    btn.innerText = "Dalej: Losuj Championów ➔";
    btn.disabled = false;
});

// ===================== KROK 3: POSTACIE =====================

function renderChampsStep() {
    const wrapper = document.getElementById('champs-teams-wrapper');
    wrapper.innerHTML = '';

    teams.forEach((tArray, tIdx) => {
        const color = TEAM_COLORS[tIdx % 4];
        wrapper.innerHTML += `
            <div class="team ${color.css}">
                <h2>${escapeHtml(teamNames[tIdx])}</h2>
                <div id="champs-team${tIdx}"></div>
            </div>
        `;
    });

    teams.forEach((tArray, tIdx) => {
        renderChampsCards(tArray, `champs-team${tIdx}`, tIdx);
    });
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
                    <div class="player-name">${escapeHtml(player.name)}</div>
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
                    <button id="${btnId}" class="reroll-btn" title="Wylosuj inną postać"
                        onclick="rerollChampion(${teamNum}, ${index}, this, '${cardBackId}', '${flipperId}')">🎲</button>
                </div>
            </div>
        `;
    });
}

function revealChampCard(el, btnId) {
    if (!el.classList.contains('revealed')) {
        el.classList.add('revealed');
        const btn = document.getElementById(btnId);
        if (btn) btn.style.display = 'block';
    }
}

function rerollChampion(teamNum, playerIndex, btnEl, cardBackId, flipperId) {
    const player = teams[teamNum][playerIndex];

    const idxId = usedChampions.indexOf(player.champion.id);
    if (idxId !== -1) usedChampions.splice(idxId, 1);
    const idxName = usedChampions.indexOf(player.champion.name);
    if (idxName !== -1) usedChampions.splice(idxName, 1);

    const newChamp = getRandomChampionForRole(player.role);
    usedChampions.push(newChamp.id);
    usedChampions.push(newChamp.name);
    player.champion = newChamp;

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
}

// ===================== BITWA: 2 DRUŻYNY (BOKSOWANIE I PRZEPYCHANIE SIĘ) =====================

let battleAnimationTimer = null;

function startBattle() {
    const btn = document.getElementById('btn-battle');
    const battleContainer = document.getElementById('battle-container');
    const battleFill = document.getElementById('battle-fill');
    const clashMarker = document.getElementById('battle-clash-marker');
    const clashIcon = document.getElementById('clash-icon');
    const barOuter = document.getElementById('battle-bar-outer');
    const commentary = document.getElementById('battle-commentary');
    const resultCard = document.getElementById('battle-result-card');
    const winnerText = document.getElementById('winner-text');
    const winnerSubtitle = document.getElementById('winner-subtitle');
    const vsText = document.getElementById('battle-vs-text');

    const t0Name = teamNames[0] || "Skład 1";
    const t1Name = teamNames[1] || "Skład 2";

    // Nazwy i procenty w nagłówku
    const nameEl0 = document.getElementById('battle-team0-name');
    const nameEl1 = document.getElementById('battle-team1-name');
    const pctEl0  = document.getElementById('battle-team0-pct');
    const pctEl1  = document.getElementById('battle-team1-pct');

    if (nameEl0) nameEl0.innerText = t0Name;
    if (nameEl1) nameEl1.innerText = t1Name;
    if (pctEl0)  pctEl0.innerText  = '50%';
    if (pctEl1)  pctEl1.innerText  = '50%';

    // Reset stanu UI
    if (btn) btn.style.display = 'none';
    if (battleContainer) battleContainer.style.display = 'block';
    if (resultCard) resultCard.style.display = 'none';
    if (winnerText) winnerText.innerText = '';
    if (winnerSubtitle) winnerSubtitle.innerText = '';
    if (barOuter) barOuter.classList.remove('clash-heavy-hit');
    if (vsText) vsText.innerText = '🥊 VS 🥊';

    if (battleAnimationTimer) {
        clearInterval(battleAnimationTimer);
        battleAnimationTimer = null;
    }

    // Dźwięk bitwy
    audioBattle.currentTime = 0;
    audioBattle.play().catch(() => {});

    // Zwycięzca: 0 (Skład 1 -> 100%) lub 1 (Skład 2 -> 0%)
    const winnerNum = Math.random() < 0.5 ? 0 : 1;
    const winnerName = winnerNum === 0 ? t0Name : t1Name;
    const loserName  = winnerNum === 0 ? t1Name : t0Name;

    let currentPos = 50.0;
    let targetPos  = 50.0;
    let elapsedMs  = 0;
    const frameIntervalMs = 35; // ~28 FPS płynnego ruchu i wibracji

    // Scenariusz walki w 4 rundach
    const rounds = [
        {
            timeStart: 0,
            timeEnd: 1800,
            icon: "🥊",
            comment: () => `🥊 Rozpoczęcie walki! ${t0Name} i ${t1Name} rzucają się na siebie w centrum ringu!`
        },
        {
            timeStart: 1800,
            timeEnd: 3800,
            icon: "💥",
            shake: true,
            comment: () => `💥 Potężna seria ciosów! ${loserName} spycha rywali desperackim atakiem pod liny!`
        },
        {
            timeStart: 3800,
            timeEnd: 5600,
            icon: "⚡",
            shake: true,
            comment: () => `🛡️ NIEPRAWDOPODOBNA KONTRA! ${winnerName} zbiera siły i rusza z zabójczym kontratakiem!`
        },
        {
            timeStart: 5600,
            timeEnd: 7400,
            icon: "🥊",
            comment: () => `🔥 FINAŁOWY SZTURM! ${winnerName} łamie defensywę i bezlitośnie dociska rywali do ściany!`
        }
    ];

    let currentRoundIdx = -1;

    function updateDisplay(pos) {
        const clamped = Math.max(0, Math.min(100, pos));
        if (battleFill) battleFill.style.width = clamped + '%';
        if (clashMarker) clashMarker.style.left = clamped + '%';

        const p0 = Math.round(clamped);
        const p1 = 100 - p0;
        if (pctEl0) pctEl0.innerText = p0 + '%';
        if (pctEl1) pctEl1.innerText = p1 + '%';
    }

    updateDisplay(50.0);

    battleAnimationTimer = setInterval(() => {
        elapsedMs += frameIntervalMs;

        // Przełączanie fazy i komentarza na żywo
        const roundIdx = rounds.findIndex(r => elapsedMs >= r.timeStart && elapsedMs < r.timeEnd);
        if (roundIdx !== -1 && roundIdx !== currentRoundIdx) {
            currentRoundIdx = roundIdx;
            const r = rounds[roundIdx];
            if (commentary) commentary.innerText = r.comment();
            if (clashIcon) clashIcon.innerText = r.icon;
            if (r.shake && barOuter) {
                barOuter.classList.remove('clash-heavy-hit');
                void barOuter.offsetWidth;
                barOuter.classList.add('clash-heavy-hit');
            }
        }

        // Boksowanie i przeciąganie liny - dynamiczna fizyka walki
        if (elapsedMs < 1800) {
            // Runda 1: szybkie ciosy i wymiana w centrum (45% - 55%)
            const jab = Math.sin(elapsedMs / 130) * 4.5 + (Math.random() - 0.5) * 3;
            targetPos = 50 + jab;
        } else if (elapsedMs < 3800) {
            // Runda 2: pierwszy potężny push przegranego (spycha na 24% lub 76%)
            const pushDir = winnerNum === 0 ? -1 : 1;
            const progress = (elapsedMs - 1800) / 2000;
            const vibration = Math.sin(elapsedMs / 90) * 3.5;
            targetPos = 50 + (pushDir * 26 * Math.sin(progress * Math.PI / 2)) + vibration;
        } else if (elapsedMs < 5600) {
            // Runda 3: potężna kontra zwycięzcy - boksowanie przez całą długość paska
            const progress = (elapsedMs - 3800) / 1800;
            const startPush = winnerNum === 0 ? 24 : 76;
            const endPush   = winnerNum === 0 ? 74 : 26;
            const struggle = Math.sin(elapsedMs / 80) * 4;
            targetPos = startPush + (endPush - startPush) * (progress * progress) + struggle;
        } else if (elapsedMs < 7400) {
            // Runda 4: ostateczny nokautujący szturm do 100% lub 0%
            const progress = (elapsedMs - 5600) / 1800;
            const startFinish = winnerNum === 0 ? 74 : 26;
            const endFinish   = winnerNum === 0 ? 100 : 0;
            targetPos = startFinish + (endFinish - startFinish) * Math.pow(progress, 1.4);
        } else {
            // Zakończenie: Zwycięski nokaut!
            clearInterval(battleAnimationTimer);
            battleAnimationTimer = null;
            targetPos = winnerNum === 0 ? 100 : 0;
            currentPos = targetPos;
            updateDisplay(currentPos);

            audioBattle.pause();
            audioWin.currentTime = 0;
            audioWin.play().catch(() => {});

            if (clashIcon) clashIcon.innerText = "👑";
            if (vsText) vsText.innerText = `🏆 ${winnerName} WYGRYWA! 🏆`;
            if (commentary) commentary.innerText = `💥 CZYSTY NOKAUT! ${winnerName} posyła rywali na deski i wygrywa walkę!`;

            if (barOuter) {
                barOuter.classList.remove('clash-heavy-hit');
                void barOuter.offsetWidth;
                barOuter.classList.add('clash-heavy-hit');
            }

            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 220,
                    spread: 120,
                    origin: { y: 0.6 },
                    colors: ['#c8aa6e', winnerNum === 0 ? '#0ac8b9' : '#e84057', '#ffffff'],
                    disableForReducedMotion: true
                });
            }

            setTimeout(() => {
                if (resultCard) {
                    resultCard.style.display = 'block';
                    if (winnerText) winnerText.innerText = `Maszyna przewiduje zwycięstwo: ${winnerName}! 🏆`;
                    if (winnerSubtitle) winnerSubtitle.innerText = `Spektakularny nokaut po bezwzględnej przepychance w ringu!`;
                }
            }, 600);

            return;
        }

        // Płynne podążanie za celem z tłumieniem (smooth dampening)
        currentPos += (targetPos - currentPos) * 0.35;
        updateDisplay(currentPos);
    }, frameIntervalMs);
}

// ===================== BITWA: 3 DRUŻYNY =====================

function startBattle3() {
    const btn = document.getElementById('btn-battle-3');
    const box = document.getElementById('roulette-box');
    const container = document.getElementById('battle-3-container');
    const winnerText = document.getElementById('winner-3-text');

    btn.style.display = 'none';
    container.style.display = 'block';
    winnerText.style.opacity = '0';

    audioBattle.currentTime = 0;
    audioBattle.play().catch(() => {});

    let count = 0;
    const maxCycles = 25;
    const iv = setInterval(() => {
        const randIdx = count % 3;
        box.innerText = teamNames[randIdx];
        box.style.borderColor = `var(--${randIdx === 0 ? 'blue' : randIdx === 1 ? 'red' : 'green'}-team)`;
        count++;

        if (count >= maxCycles) {
            clearInterval(iv);
            const winnerIdx = Math.floor(Math.random() * 3);
            box.innerText = '👑 ' + teamNames[winnerIdx];
            audioBattle.pause();
            audioWin.currentTime = 0;
            audioWin.play().catch(() => {});

            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 220, spread: 120, origin: { y: 0.6 },
                    disableForReducedMotion: true
                });
            }

            setTimeout(() => {
                winnerText.innerText = `Zwycięzcą zostaje: ${teamNames[winnerIdx]}! 🏆`;
                winnerText.style.opacity = '1';
            }, 500);
        }
    }, 150);
}

// ===================== DRABINKA: 4 DRUŻYNY =====================

function initBracket() {
    document.getElementById('sf1-t1-name').innerText = teamNames[0] || 'Skład 1';
    document.getElementById('sf1-t2-name').innerText = teamNames[1] || 'Skład 2';
    document.getElementById('sf2-t1-name').innerText = teamNames[2] || 'Skład 3';
    document.getElementById('sf2-t2-name').innerText = teamNames[3] || 'Skład 4';

    ['sf1-team1','sf1-team2','sf2-team1','sf2-team2'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.className = 'bracket-team-slot bracket-clickable';
    });

    bracketWinners.sf1 = null;
    bracketWinners.sf2 = null;

    const f1 = document.getElementById('final-team1');
    const f2 = document.getElementById('final-team2');
    if (f1) { f1.className = 'bracket-team-slot tbd'; f1.onclick = null; }
    if (f2) { f2.className = 'bracket-team-slot tbd'; f2.onclick = null; }

    const finalT1 = document.getElementById('final-t1-name');
    const finalT2 = document.getElementById('final-t2-name');
    if (finalT1) finalT1.innerText = 'Zwycięzca PF1';
    if (finalT2) finalT2.innerText = 'Zwycięzca PF2';

    const champName = document.getElementById('champion-name');
    const champDisplay = document.getElementById('champion-display');
    if (champName) champName.innerText = '???';
    if (champDisplay) {
        champDisplay.className = 'bracket-team-slot tbd';
        champDisplay.style.justifyContent = 'center';
    }
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

function pickWinner(matchId, winnerIdx) {
    const cfg = SF_CONFIG[matchId];
    if (!cfg) return;

    cfg.slots.forEach((slotId, i) => {
        const el = document.getElementById(slotId);
        if (!el) return;
        el.onclick = null;
        el.classList.remove('bracket-clickable');
        el.className = i === winnerIdx ? 'bracket-team-slot winner-slot' : 'bracket-team-slot loser-slot';
    });

    const winTeamIdx = cfg.teams[winnerIdx];
    const winColor   = cfg.colors[winnerIdx];
    bracketWinners[matchId] = { name: teamNames[winTeamIdx], color: winColor };

    const finalSlotEl = document.getElementById(cfg.finalSlot);
    if (finalSlotEl) {
        finalSlotEl.className = 'bracket-team-slot';
        document.getElementById(cfg.finalName).innerText = teamNames[winTeamIdx];
        const dot = finalSlotEl.querySelector('.bracket-team-dot');
        if (dot) dot.style.background = winColor;
    }

    playRevealSound();

    if (bracketWinners.sf1 && bracketWinners.sf2) {
        const f1 = document.getElementById('final-team1');
        const f2 = document.getElementById('final-team2');
        if (f1 && f2) {
            f1.className = 'bracket-team-slot bracket-clickable';
            f2.className = 'bracket-team-slot bracket-clickable';
            f1.onclick = () => pickFinalWinner(0);
            f2.onclick = () => pickFinalWinner(1);
        }
    }
}

function pickFinalWinner(winnerIdx) {
    const w1 = bracketWinners.sf1;
    const w2 = bracketWinners.sf2;
    const winnerObj = winnerIdx === 0 ? w1 : w2;

    const f1 = document.getElementById('final-team1');
    const f2 = document.getElementById('final-team2');
    if (!f1 || !f2) return;

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

// ===================== PEŁNA LISTA POSTACI (KATALOG 173 BOHATERÓW) =====================

const CHAMPION_CANONICAL_NAMES = {
    "AurelionSol": "Aurelion Sol",
    "Belveth": "Bel'Veth",
    "Chogath": "Cho'Gath",
    "DrMundo": "Dr. Mundo",
    "JarvanIV": "Jarvan IV",
    "Kaisa": "Kai'Sa",
    "Khazix": "Kha'Zix",
    "KogMaw": "Kog'Maw",
    "KSante": "K'Sante",
    "Leblanc": "LeBlanc",
    "LeeSin": "Lee Sin",
    "MasterYi": "Master Yi",
    "MissFortune": "Miss Fortune",
    "MonkeyKing": "Wukong",
    "RekSai": "Rek'Sai",
    "TahmKench": "Tahm Kench",
    "TwistedFate": "Twisted Fate",
    "Velkoz": "Vel'Koz",
    "XinZhao": "Xin Zhao"
};

const NEW_CHAMPIONS_INFO = {
    "Locke":   { year: "2026", label: "✨ NOWY 2026" },
    "Zaahen":  { year: "2026", label: "✨ NOWY 2026" },
    "Yunara":  { year: "2026", label: "✨ NOWY 2026" },
    "Mel":     { year: "2025", label: "✨ NOWY 2025" },
    "Ambessa": { year: "2024", label: "✨ NOWY 2024" },
    "Aurora":  { year: "2024", label: "✨ NOWY 2024" },
    "Smolder": { year: "2024", label: "✨ NOWY 2024" },
    "Hwei":    { year: "2023", label: "✨ NOWY 2023" },
    "Briar":   { year: "2023", label: "✨ NOWY 2023" },
    "Naafiri": { year: "2023", label: "✨ NOWY 2023" },
    "Milio":   { year: "2023", label: "✨ NOWY 2023" },
    "KSante":  { year: "2022", label: "✨ 2022" },
    "Belveth": { year: "2022", label: "✨ 2022" },
    "Nilah":   { year: "2022", label: "✨ 2022" },
    "Renata":  { year: "2022", label: "✨ 2022" },
    "Zeri":    { year: "2022", label: "✨ 2022" }
};

let catalogAllChampions = [];
let currentCatalogRoleFilter = 'all';
let currentCatalogSearchText = '';

function getAllCatalogChampions() {
    if (catalogAllChampions.length > 0) return catalogAllChampions;

    const champMap = new Map();

    for (const role in rolePools) {
        rolePools[role].forEach(id => {
            if (!champMap.has(id)) {
                const displayName = CHAMPION_CANONICAL_NAMES[id] || id;
                const newInfo = NEW_CHAMPIONS_INFO[id] || null;
                champMap.set(id, {
                    id: id,
                    name: displayName,
                    roles: [role],
                    isNew: !!newInfo,
                    newInfo: newInfo,
                    isTroll: false
                });
            } else {
                const existing = champMap.get(id);
                if (!existing.roles.includes(role)) {
                    existing.roles.push(role);
                }
            }
        });
    }

    // Oznaczenia trolli
    for (const trollRole in ICONIC_TROLL_PICKS) {
        ICONIC_TROLL_PICKS[trollRole].forEach(trollId => {
            if (champMap.has(trollId)) {
                champMap.get(trollId).isTroll = true;
            }
        });
    }

    catalogAllChampions = Array.from(champMap.values()).sort((a, b) => a.name.localeCompare(b.name, 'pl'));
    return catalogAllChampions;
}

function openChampionsCatalogModal() {
    const modal = document.getElementById('champions-catalog-modal');
    if (!modal) return;

    currentCatalogRoleFilter = 'all';
    currentCatalogSearchText = '';

    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) searchInput.value = '';

    const clearBtn = document.getElementById('catalog-search-clear');
    if (clearBtn) clearBtn.style.display = 'none';

    updateCatalogFilterButtonsUI();
    renderChampionsCatalogGrid();

    modal.style.display = 'flex';

    setTimeout(() => {
        if (searchInput) searchInput.focus();
    }, 120);
}

function onCatalogSearchInput(val) {
    currentCatalogSearchText = (val || '').trim().toLowerCase();
    const clearBtn = document.getElementById('catalog-search-clear');
    if (clearBtn) clearBtn.style.display = currentCatalogSearchText ? 'block' : 'none';
    renderChampionsCatalogGrid();
}

function clearCatalogSearch() {
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
    }
    currentCatalogSearchText = '';
    const clearBtn = document.getElementById('catalog-search-clear');
    if (clearBtn) clearBtn.style.display = 'none';
    renderChampionsCatalogGrid();
}

function setCatalogRoleFilter(role) {
    currentCatalogRoleFilter = role;
    updateCatalogFilterButtonsUI();
    renderChampionsCatalogGrid();
}

function updateCatalogFilterButtonsUI() {
    const buttons = document.querySelectorAll('.catalog-filter-btn');
    buttons.forEach(btn => {
        const role = btn.getAttribute('data-role');
        btn.classList.toggle('active', role === currentCatalogRoleFilter);
    });
}

function renderChampionsCatalogGrid() {
    const grid = document.getElementById('champions-grid-container');
    const counter = document.getElementById('catalog-count-display');
    if (!grid) return;

    const allChamps = getAllCatalogChampions();

    const filtered = allChamps.filter(c => {
        if (currentCatalogRoleFilter === 'new') {
            if (!c.isNew) return false;
        } else if (currentCatalogRoleFilter === 'trolls') {
            if (!c.isTroll) return false;
        } else if (currentCatalogRoleFilter !== 'all') {
            if (!c.roles.includes(currentCatalogRoleFilter)) return false;
        }

        if (currentCatalogSearchText) {
            const nameMatch = c.name.toLowerCase().includes(currentCatalogSearchText);
            const idMatch   = c.id.toLowerCase().includes(currentCatalogSearchText);
            const roleMatch = c.roles.some(r => r.toLowerCase().includes(currentCatalogSearchText));
            const yearMatch = c.newInfo?.year?.includes(currentCatalogSearchText);
            if (!nameMatch && !idMatch && !roleMatch && !yearMatch) return false;
        }

        return true;
    });

    if (counter) counter.innerText = filtered.length;
    grid.innerHTML = '';

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: var(--text-muted);">
                <div style="font-size: 2.2rem; margin-bottom: 8px;">🔍</div>
                <div style="font-weight: 700; color: var(--text-light); font-size: 1.05rem;">Nie znaleziono bohatera</div>
                <div style="font-size: 0.85rem; margin-top: 4px;">Wpisz inną nazwę (np. Locke, Briar, Bel'Veth, Aurora)...</div>
            </div>
        `;
        return;
    }

    const patch = latestPatch || '14.19.1';

    filtered.forEach(c => {
        const card = document.createElement('div');
        card.className = `champion-catalog-card ${c.isNew ? 'is-new-champ' : ''}`;

        const imgUrl = `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${c.id}.png`;

        const rolesHtml = c.roles.map(r => {
            const rClass = `role-${r.toLowerCase()}`;
            return `<span class="catalog-role-badge ${rClass}">${r}</span>`;
        }).join('');

        const newBadgeHtml = c.isNew ? `<span class="new-champ-ribbon">${c.newInfo.label}</span>` : '';
        const trollIconHtml = c.isTroll ? `<span class="catalog-troll-icon" title="Możliwy szalony pick w Trybie Dla Pojebów! 🤪">🤪</span>` : '';

        card.innerHTML = `
            ${newBadgeHtml}
            <img src="${imgUrl}"
                alt="${escapeHtml(c.name)}"
                class="champion-catalog-avatar"
                loading="lazy"
                onerror="this.onerror=null; this.src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png';">
            <div class="champion-catalog-name" title="${escapeHtml(c.name)}">${escapeHtml(c.name)}${trollIconHtml}</div>
            <div class="champion-catalog-roles">${rolesHtml}</div>
        `;

        grid.appendChild(card);
    });
}

// ===================== INICJALIZACJA STRONY =====================

window.onload = () => {
    // 1. Wczytaj zapisany motyw
    const savedMode = localStorage.getItem(STORAGE_MODE_KEY);
    if (savedMode === 'pojeby') {
        setGameMode('pojeby');
    } else {
        setGameMode('normal');
    }

    // 2. Zainicjuj koszyk, presety i składy
    loadBasketFromStorage();
    getSavedPresets();
    renderTeamsBuilder();
};

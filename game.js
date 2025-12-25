const KEY = "TRAITORS_STATE";

function save(s) { localStorage.setItem(KEY, JSON.stringify(s)); }
function load() { return JSON.parse(localStorage.getItem(KEY)); }

function speak(text) {
  if (!load()?.useDisplay) return;
  const u = new SpeechSynthesisUtterance(text);
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function initGame(playerCount, useDisplay) {
  save({
    useDisplay,
    phase: "SETUP",
    players: Array.from({ length: playerCount }, (_, i) => ({
      id: i + 1,
      name: "",
      role: "",
      alive: true
    })),
    currentIndex: 0,
    nightChoices: [],
    votes: {},
    message: "",
    final: false
  });
}

function alivePlayers() {
  return load().players.filter(p => p.alive);
}
function aliveTraitors() {
  return alivePlayers().filter(p => p.role === "TRAITOR");
}
function faithfulAlive() {
  return alivePlayers().filter(p => p.role === "FAITHFUL");
}

function checkWin() {
  const s = load();
  if (aliveTraitors().length === 0) {
    s.phase = "END";
    s.message = "FAITHFUL HAVE WON THE GAME";
    speak(s.message);
    save(s);
    return true;
  }
  if (aliveTraitors().length >= faithfulAlive().length) {
    s.phase = "END";
    s.message = "TRAITORS HAVE WON THE GAME";
    speak(s.message);
    save(s);
    return true;
  }
  return false;
}

function nextAliveIndex(idx) {
  const alive = alivePlayers();
  return alive[idx + 1]?.id ?? null;
}

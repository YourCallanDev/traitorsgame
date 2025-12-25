const KEY = "TRAITORS_STATE";

function save(s) {
  localStorage.setItem(KEY, JSON.stringify(s));
}
function load() {
  return JSON.parse(localStorage.getItem(KEY));
}

function speak(text) {
  const s = load();
  if (!s || !s.useDisplay || s.paused) return;
  speechSynthesis.cancel();
  speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

function initGame(playerCount, useDisplay) {
  save({
    useDisplay,
    paused: false,
    adminConfirmed: false,
    phase: "SETUP",
    message: "",
    players: Array.from({ length: playerCount }, (_, i) => ({
      id: i + 1,
      name: "",
      role: "",
      alive: true
    })),
    currentPlayer: null,
    nightChoices: [],
    votes: {},
    final: false
  });
}

function alivePlayers() {
  return load().players.filter(p => p.alive);
}
function aliveTraitors() {
  return alivePlayers().filter(p => p.role === "TRAITOR");
}
function aliveFaithful() {
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
  if (aliveTraitors().length >= aliveFaithful().length) {
    s.phase = "END";
    s.message = "TRAITORS HAVE WON THE GAME";
    speak(s.message);
    save(s);
    return true;
  }
  return false;
}

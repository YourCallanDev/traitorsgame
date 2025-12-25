<script>
const GAME_KEY = "traitors_game_state";

function getState() {
  return JSON.parse(localStorage.getItem(GAME_KEY));
}

function setState(state) {
  localStorage.setItem(GAME_KEY, JSON.stringify(state));
}

function initGame(playerCount) {
  const players = [];
  for (let i = 1; i <= playerCount; i++) {
    players.push({
      id: i,
      name: "",
      role: "",
      alive: true
    });
  }

  setState({
    phase: "SETUP",
    players,
    nightChoices: [],
    votes: {},
    lastMurdered: null,
    lastBanished: null,
    message: ""
  });
}

function alivePlayers() {
  return getState().players.filter(p => p.alive);
}

function aliveTraitors() {
  return alivePlayers().filter(p => p.role === "TRAITOR");
}

function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(u);
}
</script>

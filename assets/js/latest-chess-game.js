// latest-chess-game.js

const USERNAME = "choccymilk4";

async function loadLatestGame() {
  try {
    // Get list of monthly archives
    const archivesRes = await fetch(
      `https://api.chess.com/pub/player/${USERNAME}/games/archives`
    );
    const archivesData = await archivesRes.json();
    const latestArchiveUrl =
      archivesData.archives[archivesData.archives.length - 1];

    // Fetch latest archive
    const gamesRes = await fetch(latestArchiveUrl);
    const gamesData = await gamesRes.json();

    // Get most recent game
    const latestGame = gamesData.games[gamesData.games.length - 1];
    const pgn = latestGame.pgn;

    // <><><><> Render PGN <><><><>
    new PgnViewer({
      boardName: "latest-game-board",
      pgn: pgn,
      theme: "brown",
      showCoordinates: true,
      orientation: "white"
    });
  } catch (err) {
    console.error("Failed to load latest chess game:", err);
    document.getElementById("chess-error").textContent =
      "Unable to load latest game.";
  }
}

document.addEventListener("DOMContentLoaded", loadLatestGame);

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

    // Fetch games from latest archive
    const gamesRes = await fetch(latestArchiveUrl);
    const gamesData = await gamesRes.json();

    // Get most recent game
    const latestGame = gamesData.games[gamesData.games.length - 1];
    const pgn = latestGame.pgn;

    // Determine which color I played
    const orientation =
      latestGame.white.username.toLowerCase() === USERNAME.toLowerCase()
        ? "white"
        : "black";

    // Render using pgnvjs (mliebelt's pgn-viewer)
    PGNV.pgnView("latest-game-board", {
      pgn: pgn,
      pieceStyle: "merida",
      orientation: orientation,
      showCoords: true,
      theme: "brown",
      layout: "top"
    });
  } catch (err) {
    console.error("Failed to load latest chess game:", err);
    const el = document.getElementById("chess-error");
    if (el) el.textContent = "Unable to load latest game.";
  }
}

document.addEventListener("DOMContentLoaded", loadLatestGame);

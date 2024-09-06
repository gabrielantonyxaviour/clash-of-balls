const fixtureId = args[0];

const playerOnePlayerOneGoalsId = args[1];
const playerOnePlayerTwoGoalsId = args[2];
const playerTwoPlayerOneGoalsId = args[3];
const playerTwoPlayerTwoGoalsId = args[4];

const playerOnePlayerOneYellowCardsId = args[5];
const playerOnePlayerTwoYellowCardsId = args[6];
const playerTwoPlayerOneYellowCardsId = args[7];
const playerTwoPlayerTwoYellowCardsId = args[8];

if (!secrets.apiKey) {
  throw Error("RAPID_API_KEY environment variable not set for Sports API.");
}

const rapidApiRequest = Functions.makeHttpRequest({
  url: `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${fixtureId}`,
  headers: {
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    "x-rapidapi-key": secrets.apiKey,
  },
});

const rapidApiResponse = await rapidApiRequest;
if (rapidApiResponse.error) {
  throw new Error("Sports API Error");
}

const fixture = rapidApiResponse.data.response[0];
console.log(fixture);
const halfTimeHomeGoals = fixture.score.halftime.home;
const halfTimeAwayGoals = fixture.score.halftime.away;

const fullTimeHomeGoals = fixture.score.fulltime.home;
const fullTimeAwayGoals = fixture.score.fulltime.away;

const totalShotsOnGoal =
  fixture.statistics[0].statistics[0].value +
  fixture.statistics[1].statistics[0].value;
const totalCornerKicks =
  fixture.statistics[0].statistics[7].value +
  fixture.statistics[1].statistics[7].value;

console.log(
  `Fixture ID: ${fixtureId}\nHalf Time Score: ${halfTimeHomeGoals} - ${halfTimeAwayGoals}\nFull Time Score: ${fullTimeHomeGoals} - ${fullTimeAwayGoals}\nTotal Shots on Goal: ${totalShotsOnGoal}\nTotal Corner Kicks: ${totalCornerKicks}`
);
let playerOnePlayerOneGoals = 0,
  playerOnePlayerTwoGoals = 0,
  playerTwoPlayerOneGoals = 0,
  playerTwoPlayerTwoGoals = 0,
  playerOnePlayerOneYellowCards = 0,
  playerOnePlayerTwoYellowCards = 0,
  playerTwoPlayerOneYellowCards = 0,
  playerTwoPlayerTwoYellowCards = 0;

const allPlayers = fixture.players[0].players.concat(
  fixture.players[1].players
);

if (playerOnePlayerOneGoalsId != "0")
  playerOnePlayerOneGoals =
    allPlayers.find((player) => player.player.id === playerOnePlayerOneGoalsId)
      .statistics[0].goals.total || 0;
else if (playerOnePlayerOneYellowCardsId != "0")
  playerOnePlayerOneYellowCards =
    allPlayers.find(
      (player) => player.player.id === playerOnePlayerOneYellowCardsId
    ).statistics[0].cards.yellow || 0;
else if (playerOnePlayerTwoGoalsId != "0")
  playerOnePlayerTwoGoals =
    allPlayers.find((player) => player.player.id === playerOnePlayerTwoGoalsId)
      .statistics[0].goals.total || 0;
else if (playerOnePlayerTwoYellowCardsId != "0")
  playerOnePlayerTwoYellowCards =
    allPlayers.find(
      (player) => player.player.id === playerOnePlayerTwoYellowCardsId
    ).statistics[0].cards.yellow || 0;
else if (playerTwoPlayerOneGoalsId != "0")
  playerTwoPlayerOneGoals =
    allPlayers.find((player) => player.player.id === playerTwoPlayerOneGoalsId)
      .statistics[0].goals.total || 0;
else if (playerTwoPlayerOneYellowCardsId != "0")
  playerTwoPlayerOneYellowCards =
    allPlayers.find(
      (player) => player.player.id === playerTwoPlayerOneYellowCardsId
    ).statistics[0].cards.yellow || 0;
else if (playerTwoPlayerTwoGoalsId != "0")
  playerTwoPlayerTwoGoals =
    allPlayers.find((player) => player.player.id === playerTwoPlayerTwoGoalsId)
      .statistics[0].goals.total || 0;
else if (playerTwoPlayerTwoYellowCardsId != "0")
  playerTwoPlayerTwoYellowCards =
    allPlayers.find(
      (player) => player.player.id === playerTwoPlayerTwoYellowCardsId
    ).statistics[0].cards.yellow || 0;

const encodedData =
  (BigInt(halfTimeHomeGoals) << 248n) | // Shift 248 bits
  (BigInt(halfTimeAwayGoals) << 240n) | // Shift 240 bits
  (BigInt(fullTimeHomeGoals) << 232n) | // Shift 232 bits
  (BigInt(fullTimeAwayGoals) << 224n) | // Shift 224 bits
  (BigInt(totalShotsOnGoal) << 216n) | // Shift 216 bits
  (BigInt(totalCornerKicks) << 208n) | // Shift 208 bits
  (BigInt(playerOnePlayerOneGoals) << 200n) | // Shift 200 bits
  (BigInt(playerOnePlayerTwoGoals) << 192n) | // Shift 192 bits
  (BigInt(playerTwoPlayerOneGoals) << 184n) | // Shift 184 bits
  (BigInt(playerTwoPlayerTwoGoals) << 176n) | // Shift 176 bits
  (BigInt(playerOnePlayerOneYellowCards) << 168n) | // Shift 168 bits
  (BigInt(playerOnePlayerTwoYellowCards) << 160n) | // Shift 160 bits
  (BigInt(playerTwoPlayerOneYellowCards) << 152n) | // Shift 152 bits
  (BigInt(playerTwoPlayerTwoYellowCards) << 144n) | // Shift 144 bits
  BigInt(0); // Set all remaining bits to 0

return Functions.encodeUint256(encodedData);

const { numberToBytes } = await import("npm:viem");

const fixtureId = args[0];

const playerOneGoalsId = args[1];
const playerTwoGoalsId = args[2];

const playerOneYellowCardsId = args[3];
const playerTwoYellowCardsId = args[4];

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
  console.log(rapidApiResponse);
  throw new Error("Sports API Error");
}

const fixture = rapidApiResponse.data.response[0];
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

let playerOneGoals = 0,
  playerTwoGoals = 0,
  playerOneYellowCards = 0,
  playerTwoYellowCards = 0;

const allPlayers = fixture.players[0].players.concat(
  fixture.players[1].players
);

if (playerOneGoalsId != "0")
  playerOneGoals =
    allPlayers.find((player) => player.player.id === parseInt(playerOneGoalsId))
      .statistics[0].goals.total || 0;
if (playerOneYellowCardsId != "0")
  playerOneYellowCards =
    allPlayers.find(
      (player) => player.player.id === parseInt(playerOneYellowCardsId)
    ).statistics[0].cards.yellow || 0;
if (playerTwoGoalsId != "0")
  playerTwoGoals =
    allPlayers.find((player) => player.player.id === parseInt(playerTwoGoalsId))
      .statistics[0].goals.total || 0;
if (playerTwoYellowCardsId != "0")
  playerTwoYellowCards =
    allPlayers.find(
      (player) => player.player.id === parseInt(playerTwoYellowCardsId)
    ).statistics[0].cards.yellow || 0;

const encodedData =
  (BigInt(halfTimeHomeGoals) << 120n) | // Shift 120 bits
  (BigInt(halfTimeAwayGoals) << 112n) | // Shift 112 bits
  (BigInt(fullTimeHomeGoals) << 104n) | // Shift 104 bits
  (BigInt(fullTimeAwayGoals) << 96n) | // Shift 96 bits
  (BigInt(totalShotsOnGoal) << 88n) | // Shift 88 bits
  (BigInt(totalCornerKicks) << 80n) | // Shift 80 bits
  (BigInt(playerOneGoals) << 72n) | // Shift 72 bits
  (BigInt(playerTwoGoals) << 64n) | // Shift 64 bits
  (BigInt(playerOneYellowCards) << 56n) | // Shift 56 bits
  (BigInt(playerTwoYellowCards) << 48n) | // Shift 48 bits
  BigInt(0); // Set all remaining bits to 0

return numberToBytes(encodedData, {
  size: 16,
});

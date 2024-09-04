const fixtureId = args[0];

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

if (rapidApiResponse.errors.length > 0) {
  throw new Error("Sports API Error");
}

const fixture = rapidApiResponse.data.response[0].fixture;

return Functions.encodeUint256(2);

// Send half time score
// Send full time score

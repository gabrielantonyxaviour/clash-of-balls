const coinMarketCapCoinId = args[0];
const currencyCode = args[1];

if (!secrets.apiKey) {
  throw Error(
    "COINMARKETCAP_API_KEY environment variable not set for CoinMarketCap API.  Get a free key from https://coinmarketcap.com/api/"
  );
}

const coinMarketCapRequest = Functions.makeHttpRequest({
  url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
  // Get a free API key from https://coinmarketcap.com/api/
  headers: {
    "Content-Type": "application/json",
    "X-CMC_PRO_API_KEY": secrets.apiKey,
  },
  params: {
    convert: currencyCode,
    id: coinMarketCapCoinId,
  },
});

// Make the HTTP request
const coinMarketCapResponse = await coinMarketCapRequest;

if (coinMarketCapResponse.error) {
  throw new Error("CoinMarketCap Error");
}

// fetch the price
const price =
  coinMarketCapResponse.data.data[coinMarketCapCoinId]["quote"][currencyCode][
    "price"
  ];

console.log(`Price: ${price.toFixed(2)} ${currencyCode}`);

// price * 100 to move by 2 decimals (Solidity doesn't support decimals)
// Math.round() to round to the nearest integer
// Functions.encodeUint256() helper function to encode the result from uint256 to bytes
return Functions.encodeUint256(Math.round(price * 100));

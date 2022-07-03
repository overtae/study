import { useEffect, useState } from "react";

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUSD] = useState(1);
  const [price, setPrice] = useState(1);
  const onChange = (event) => setPrice(event.target.value);
  const usdInput = (event) => setUSD(event.target.value);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers").then((response) =>
      response.json().then((json) => {
        setCoins(json);
        setLoading(false);
      })
    );
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(Total: ${coins.length} coins)`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChange}>
          <option>Select Option</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <h2>Dollor Input</h2>
      <input onChange={usdInput} value={usd} type="number" placeholder="dollor" />
      <h2>
        {usd} $ is {usd / price}
      </h2>
    </div>
  );
}

export default CoinTracker;

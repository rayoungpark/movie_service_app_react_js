import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [curCoin, setCurCoin] = useState(null);
  const [money, setMoney] = useState("");
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setCurCoin(json[0]);
        setLoading(false);
      });

    return () => {};
  }, []);

  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <>
          <select
            onChange={function (e) {
              const selectedIndex = e.target.selectedIndex;
              setCurCoin(coins[selectedIndex]);
            }}
          >
            {coins.map((coin, index) => {
              if (index > 100) return false;

              return (
                <option key={coin.id}>
                  {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
                </option>
              );
            })}
          </select>
          <hr />
          <label about="hasMoney">Money </label>
          <input value={money} name="hasMoney" onChange={(e) => setMoney(e.target.value)} />
          USD
          <p>
            You can buy {Math.floor(money / curCoin.quotes.USD.price)} {curCoin.symbol}s
          </p>
        </>
      )}
    </div>
  );
}

export default App;

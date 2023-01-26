import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Layout from "./Layout";
import Homepage from "./Homepage";
import NotFound from "./NotFound";
import Chain from "./Chain";
import Validators from "./Validators";
import Validator from "./Validator";
import Proposals from "./Proposals";
import { chains } from "../chains/chains";
import CoinsContext from "../contexts/CoinsContext";
import CurrentChainContext from "../contexts/CurrentChainContext";
import { getPath } from "../utils/formatting";
import coinGecko from "../api/CoinGeckoApi";

function App() {
  
  const [currentChain, setCurrentChain] = useState(null);
  const [coins, setCoins] = useState(null);

  // ПОЛУЧАЕМ ИНФОРМАЦИЮ О МОНЕТАХ
  const setCoinsData = () => {
    coinGecko.getCoins()
      .then(result => setCoins(result))
      .catch(error => setCoins(null))
  };
  
  // ОБНОВЛЯЕМ ДАННЫЕ ПО ТАЙМЕРУ
  useEffect(() => {
    setCoinsData();
    let coinsTimer = setInterval(setCoinsData, 60000); // 60 сек.
    return () => clearTimeout(coinsTimer);
  }, [])

  return (
    <div className="app">
      <CoinsContext.Provider value={coins}>
        <CurrentChainContext.Provider value={currentChain}>
          <Routes>
            <Route path="/oopsplorer" element={<Layout setCurrentChain={setCurrentChain} />}>

              <Route index element={<Homepage />} />
              <Route path="*" element={<NotFound />} />

              {chains.map(chain => {
                return <Route key={chain.chain} path={getPath(chain)} element={<Chain chain={chain} />}>
                  <Route path="validators" element={<Validators />}>
                    <Route path=":valoper" element={<Validator />} />
                  </Route>
                  <Route path="proposals" element={<Proposals />} />
                </Route>
              })}

            </Route>
          </Routes>
        </CurrentChainContext.Provider>
      </CoinsContext.Provider>
    </div>
  );
}

export default App;
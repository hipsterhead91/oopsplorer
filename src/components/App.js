import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./Layout";
import Homepage from "./Homepage";
import NotFound from "./NotFound";
import Chain from "./Chain";
import Validators from "./Validators";
import Validator from "./Validator";
import evmosMainnet from "../chains/evmosMainnet";
import evmosTestnet from "../chains/evmosTestnet";
import CurrentChainContext from "../contexts/CurrentChainContext";

function App() {

  const [currentChain, setCurrentChain] = React.useState(null);

  return (
    <div className="app">
      <CurrentChainContext.Provider value={currentChain}>
        <Routes>
          <Route path="/" element={<Layout setCurrentChain={setCurrentChain} />}>

            <Route index element={<Homepage />} />
            <Route path="*" element={<NotFound />} />

            <Route path="evmos-mainnet" element={<Chain chain={evmosMainnet} />}>
              <Route path="validators" element={<Validators />}>
                <Route path=":valoper" element={<Validator />} />
              </Route>
            </Route>

            <Route path="evmos-testnet" element={<Chain chain={evmosTestnet} />}>
              <Route path="validators" element={<Validators />}>
                <Route path=":valoper" element={<Validator />} />
              </Route>
            </Route>

          </Route>
        </Routes>
      </CurrentChainContext.Provider>
    </div>
  );
}

export default App;
import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./Layout";
import Homepage from "./Homepage";
import NotFound from "./NotFound";
import Chain from "./Chain";
import Validators from "./Validators";
import Validator from "./Validator";
import chains from "../chains/chains";
import CurrentChainContext from "../contexts/CurrentChainContext";
import { getPath } from "../utils/formatting";

function App() {

  const [currentChain, setCurrentChain] = React.useState(null);

  return (
    <div className="app">
      <CurrentChainContext.Provider value={currentChain}>
        <Routes>
          <Route path="/" element={<Layout setCurrentChain={setCurrentChain} />}>

            <Route index element={<Homepage />} />
            <Route path="*" element={<NotFound />} />

            {chains.map(chain => {
              return <Route key={chain.chain} path={getPath(chain)} element={<Chain chain={chain} />}>
                <Route path="validators" element={<Validators />}>
                  <Route path=":valoper" element={<Validator />} />
                </Route>
              </Route>
            })}

          </Route>
        </Routes>
      </CurrentChainContext.Provider>
    </div>
  );
}

export default App;
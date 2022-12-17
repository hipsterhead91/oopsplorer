import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import CosmosRestApi from "../api/CosmosRestApi";
import { capitalize, cutDecimals } from "../utils/formatting";

function Chain(props) {

  const chain = props.chain;
  const chainName = capitalize(chain.name) + ' ' + `${chain.isMain ? 'Mainnet' : 'Testnet'}`;
  const chainId = chain.chain;
  const chainApi = new CosmosRestApi(chain.api[0]);
  const [setCurrentChain] = useOutletContext();
  const [blockHeight, setBlockHeight] = useState('');
  const [totalBonded, setTotalBonded] = useState(''); // получается один раз для расчёта voting power валидаторов и больше не меняется
  const [totalBondedUpdating, setTotalBondedUpdating] = useState(''); // то же, что и totalBonded, но обновляется по таймеру

  // ОБНОВЛЯЕМ ТЕКУЩУЮ СЕТЬ 
  // Примечание: нужно для корректного отображения сети в выпадающем меню хедера в том случае, когда переход
  // на страницу сети осуществлён не "пошагово" с главной, а вводом полного пути в адресную строку браузера.
  useEffect(() => {
    setCurrentChain(chain)
  }, [])

  // ПОЛУЧАЕМ СУММУ ВСЕХ ЗАСТЕЙКАННЫХ МОНЕТ (единоразово, для расчёта voting power валидаторов)
  useEffect(() => {
    chainApi.getBondedTokens()
      .then(result => setTotalBonded(result))
  }, [chain])

  // ПОЛУЧАЕМ СУММУ ВСЕХ ЗАСТЕЙКАННЫХ МОНЕТ (для обновления по таймеру)
  const setCurrentTotalBonded = () => {
    chainApi.getBondedTokens()
      .then(result => setTotalBondedUpdating(result))
  }

  // ПОЛУЧАЕМ ПОСЛЕДНИЙ БЛОК
  const setLatestBlock = () => {
    chainApi.getLatestBlock()
      .then(result => setBlockHeight(result.block.last_commit.height))
  };

  // ОБНОВЛЯЕМ ДАННЫЕ ПО ТАЙМЕРУ
  // Примечание: return в конце хука необходим для того, чтобы выполнить некий код при размонтировании компонента.
  // В данном случае он сбрасывает мои таймеры - без этого при переключении между разными сетями дисплей с данными
  // начинали лагать, показывая попеременно информацию то из одной, то из другой сети. Как я понял, это происходило
  // потому, что если таймер не сбросить, то он сохраняет используемое им лексическое окружение, и простое переключение
  // между сетями/компонентами тут не поможет - оттуда и глюки. Странная тема, но интересная - буду знать.
  useEffect(() => {
    setLatestBlock();
    setCurrentTotalBonded();
    let latestBlockTimer = setInterval(setLatestBlock, 2000); // 2 сек.
    let currentTotalBondedTimer = setInterval(setCurrentTotalBonded, 10000); // 10 сек.
    return () => {
      clearTimeout(latestBlockTimer);
      clearTimeout(currentTotalBondedTimer);
    };
  }, [chain])

  return (
    <section className="chain">
      <h1 className="chain__heading">{chainName}</h1>
      <span className="chain__subheading">{chainId}</span>
      <div className="chain__common-info">
        <div className="chain__info">
          <span className="chain__info-heading">Current Block Height:</span>
          <span className="chain__info-data">{Number(blockHeight).toLocaleString('en')}</span>
        </div>
        <div className="chain__info">
          <span className="chain__info-heading">Total Bonded Tokens:</span>
          <span className="chain__info-data">
            {cutDecimals(totalBondedUpdating, chain.decimals).toLocaleString('en')}
            <span>{chain.symbol}</span>
          </span>
        </div>

      </div>

      <Outlet context={[chain, chainApi, totalBonded]} />

    </section>
  )
}

export default Chain;
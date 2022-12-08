import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

import Blockchain from '../utils/Blockchain';
import { getTweakedTokens } from "../utils/editingValidators";
import { capitalize } from "../utils/utils";

function Chain(props) {

  const chain = props.chain;
  const chainName = capitalize(chain.name) + ' ' + `${chain.isMain ? 'Mainnet' : 'Testnet'}`;
  const chainId = chain.chain;
  const chainApi = new Blockchain(chain.api[0]);
  const [setCurrentChain] = useOutletContext();
  const [blockHeight, setBlockHeight] = useState('');
  const [circulatingSupply, setCirculatingSupply] = useState('');
  const [totalBonded, setTotalBonded] = useState('');

  // ОБНОВЛЯЕМ ТЕКУЩУЮ СЕТЬ 
  // Примечание: нужно для корректного отображения сети в выпадающем меню хедера в том случае, когда переход
  // на страницу сети осуществлён не "пошагово" с главной, а вводом полного пути в адресную строку браузера.
  useEffect(() => {
    setCurrentChain(chain)
  }, [])

  // ВНИМАНИЕ: по идее, монеты в обороте и застейканные монеты должны возвращаться блокчейном в единообразном виде,
  // ибо это два числа одинакового порядка и близкие логически, но по какой-то причине значения выглядят так:
  // "361675742049669904812944450.000000000000000000" (в обороте)
  // "123127950813189051030410130" (застейкано)
  // Оба числа УЖЕ "переведены в копейки", то есть к числу монет прибавлено chain.decimals (для Evmos это 18 знаков 
  // после запятой), но монетам в обороте зачем-то ещё раз добавлена точка и 18 нулей, хотя так глубоко монета не
  // делится. Из-за этого полученные значения приходится обрабатывать по-разному, дополнительно обрезая монеты в обороте.

  // ПОЛУЧАЕМ ВСЕ МОНЕТЫ В ОБОРОТЕ
  const setCirculatingTokens = () => {
    chainApi.getCirculatingSupply()
      .then(result => {
        const cutted = result.slice(0, -(chain.decimals + 1)); // обрезаем строку на лишние нули плюс символ точки
        setCirculatingSupply(cutted);
      })
  }

  // ПОЛУЧАЕМ СУММУ ВСЕХ ЗАСТЕЙКАННЫХ МОНЕТ
  const setStakedTokens = () => {
    chainApi.getBondedTokens()
      .then(result => setTotalBonded(result));
  }

  // ПОЛУЧАЕМ ПОСЛЕДНИЙ БЛОК
  const setLatestBlock = () => {
    chainApi.getLatestBlock()
      .then(result => {
        setBlockHeight(result.block.last_commit.height)
      })
  };

  // ОБНОВЛЯЕМ ДАННЫЕ 
  // Примечание: return в конце хука необходим для того, чтобы выполнить некий код при размонтировании компонента.
  // В данном случае он сбрасывает мои таймеры - без этого при переключении между разными сетями дисплей с данными
  // начинали лагать, показывая попеременно информацию то из одной, то из другой сети. Как я понял, это происходило
  // потому, что если таймер не сбросить, то он сохраняет используемое им лексическое окружение, и простое переключение
  // между сетями/компонентами тут не поможет - оттуда и глюки. Странная тема, но интересная - буду знать.
  useEffect(() => {
    setLatestBlock();
    setStakedTokens();
    setCirculatingTokens();
    let latestBlockTimer = setInterval(setLatestBlock, 2000); // 2 сек.
    let stakedTokensTimer = setInterval(setStakedTokens, 10000); // 10 сек.
    let circulatingTokensTimer = setInterval(setCirculatingTokens, 300000); // 5 мин.
    // Примечание: токены в обороте обновляются так редко (если я правильно думаю, раз в сутки), что тут даже таймер
    // не обязателен, но я его добавил скорее ради общей структуры и красоты кода, нежели из реальной нужды.
    return () => {
      clearTimeout(latestBlockTimer);
      clearTimeout(stakedTokensTimer);
      clearTimeout(circulatingTokensTimer);
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
          <span className="chain__info-heading">Bonded Tokens:</span>
          <span className="chain__info-data">{getTweakedTokens(totalBonded, chain.decimals).toLocaleString('en')}<span>{chain.symbol}</span></span>
        </div>
        <div className="chain__info">
          <span className="chain__info-heading">Circulating Supply:</span>
          <span className="chain__info-data">{getTweakedTokens(circulatingSupply, chain.decimals).toLocaleString('en')}<span>{chain.symbol}</span></span>
        </div>
      </div>

      <Outlet context={[chain, chainApi, totalBonded]} />

    </section>
  )
}

export default Chain;
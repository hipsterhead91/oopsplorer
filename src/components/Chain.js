import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import CosmosRestApi from "../api/CosmosRestApi";
import CoinsContext from "../contexts/CoinsContext";
import { cutDecimals, cutExtra, filterActive } from "../utils/formatting";

function Chain(props) {

  const coins = React.useContext(CoinsContext);
  const chain = props.chain;
  const chainApi = new CosmosRestApi(chain.api[0]);
  const [setCurrentChain] = useOutletContext();
  const [activeSetLength, setActiveSetLength] = useState(null);
  const [wholeSetLength, setWholeSetLength] = useState(null);
  const [totalBonded, setTotalBonded] = useState(''); // получается один раз для расчёта voting power валидаторов и больше не меняется
  const [totalBondedUpdating, setTotalBondedUpdating] = useState('OOPS! No data'); // то же, что и totalBonded, но обновляется по таймеру
  const [unbondingTime, setUnbondingTime] = useState(null);
  const [activeProposalsLength, setActiveProposalsLength] = useState(null);
  const [allProposalsLength, setAllProposalsLength] = useState(null);
  const [blockHeight, setBlockHeight] = useState(null);
  const [inflation, setInflation] = useState(null);
  const [communityPool, setCommunityPool] = useState('OOPS! No data');
  const [price, setPrice] = useState('OOPS! No data');

  // ОБНОВЛЯЕМ ТЕКУЩУЮ СЕТЬ 
  // Примечание: нужно для корректного отображения сети в выпадающем меню хедера в том случае, когда переход
  // на страницу сети осуществлён не "пошагово" с главной, а вводом полного пути в адресную строку браузера.
  useEffect(() => {
    setCurrentChain(chain);
  }, [])

  // ПОЛУЧАЕМ КОЛИЧЕСТВО ВАЛИДАТОРОВ
  useEffect(() => {
    chainApi.getAllValidators()
      .then(result => {
        const active = filterActive(result).length;
        const total = result.length;
        setActiveSetLength(active);
        setWholeSetLength(total);
      })
      .catch(error => {
        setActiveSetLength(null);
        setWholeSetLength(null);
      })
  }, [chain])

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

  // ПОЛУЧАЕМ ВРЕМЯ АНБОНДА
  useEffect(() => {
    chainApi.getStakingParams()
      .then(result => {
        const seconds = result.unbonding_time.slice(0, -1);
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        setUnbondingTime(days);
      })
      .catch(error => setUnbondingTime(null))
  }, [chain])

  // ПОЛУЧАЕМ ВСЕ ГОЛОСОВАНИЯ
  useEffect(() => {
    chainApi.getProposals()
      .then(result => {
        const active = result.proposals.filter(p => p.status === 'PROPOSAL_STATUS_VOTING_PERIOD').length;
        const total = result.proposals.length;
        setActiveProposalsLength(active);
        setAllProposalsLength(total);
      })
      .catch(error => {
        setActiveProposalsLength(null);
        setAllProposalsLength(null);
      })
  }, [chain])

  // ПОЛУЧАЕМ ПОСЛЕДНИЙ БЛОК
  const setLatestBlock = () => {
    chainApi.getLatestBlock()
      .then(result => setBlockHeight(result.block.last_commit.height))
  };

  // ПОЛУЧАЕМ ИНФЛЯЦИЮ
  useEffect(() => {
    chainApi.getInflation()
      .then(result => setInflation(result.inflation))
      .catch(error => setInflation(null))
  }, [chain])



  // ПОЛУЧАЕМ ПУЛ СООБЩЕСТВА
  useEffect(() => {
    chainApi.getCommunityPool()
      .then(result => {
        const pool = result.pool.find(el => el.denom === chain.denom);
        const amount = pool.amount;
        const cutted = cutExtra(amount, 19); // точка + 18 символов
        setCommunityPool(cutted);
      })
      .catch(error => setCommunityPool('0'))
  }, [chain])





  // ПОЛУЧАЕМ ЦЕНУ ТОКЕНА
  useEffect(() => {
    if (coins && chain.coinGecko) {
      const currentCoin = coins.find(coin => coin.id === chain.coinGecko);
      setPrice('$' + currentCoin.current_price.toFixed(2));
    } else {
      setPrice('no data provided');
    }
  }, [coins, chain])





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




  const heading = chain.name;
  const subheading = `${chain.isMain ? 'mainnet' : 'testnet'} · ${chain.chain}`;
  const numOfValidators = (activeSetLength && wholeSetLength) ? `${activeSetLength}/${wholeSetLength}` : 'OOPS! No data';
  const daysToUnbond = unbondingTime ? `${unbondingTime} days` : 'OOPS! No data';
  const numOfProposals = (activeProposalsLength && allProposalsLength) ? `${activeProposalsLength}/${allProposalsLength}` : 'OOPS! No data';
  const currentBlockHeight = blockHeight ? Number(blockHeight).toLocaleString('en') : 'OOPS! No data';
  const currentInflation = inflation ? (inflation * 100).toFixed(2) + '%' : 'OOPS! No data';

  return (
    <section className="chain">
      <h1 className="chain__heading">{heading}</h1>
      <span className="chain__subheading">{subheading}</span>
      <div className="chain__common-info">

        <div className="chain__info">
          <span className="chain__info-heading">Validators:</span>
          <span className="chain__info-data">
            {numOfValidators}
          </span>
        </div>

        <div className="chain__info">
          <span className="chain__info-heading">Tokens Bonded:</span>
          <span className="chain__info-data">
            {Number(cutDecimals(totalBondedUpdating, chain.decimals)).toLocaleString('en')}
            <span>{chain.symbol}</span>
          </span>
        </div>

        <div className="chain__info">
          <span className="chain__info-heading">Unbonding Time:</span>
          <span className="chain__info-data">
            {daysToUnbond}
          </span>
        </div>

        <div className="chain__info">
          <span className="chain__info-heading">Active Proposals:</span>
          <span className="chain__info-data">
            {numOfProposals}
          </span>
        </div>

        <div className="chain__info">
          <span className="chain__info-heading">Block Height:</span>
          <span className="chain__info-data">{currentBlockHeight}</span>
        </div>

        <div className="chain__info">
          <span className="chain__info-heading">Inflation:</span>
          <span className="chain__info-data">
            { currentInflation}
          </span>
        </div>

        <div className="chain__info">
          <span className="chain__info-heading">Community Pool:</span>
          <span className="chain__info-data">
            {Number(cutDecimals(communityPool, chain.decimals)).toLocaleString('en')}
            <span>{chain.symbol}</span>
          </span>
        </div>

        <div className="chain__info">
          <span className="chain__info-heading">Current Price (by CoinGecko):</span>
          <span className="chain__info-data">
            {price}
          </span>
        </div>

      </div>

      <Outlet context={[chain, chainApi, totalBonded]} />

    </section>
  )
}

export default Chain;
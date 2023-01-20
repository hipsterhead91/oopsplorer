import React, { useState, useRef, useEffect } from "react";

function TableHeader(props) {

  const chain = props.chain;
  const isCurrentSetActive = props.isCurrentSetActive;
  const shownValidators = props.shownValidators;
  const setShownValidators = props.setShownValidators;
  const [validatorOrder, setValidatorOrder] = useState('ASC');
  const [votingPowerOrder, setVotingPowerOrder] = useState('ASC');
  const [commissionOrder, setCommissionOrder] = useState('ASC');
  const validatorSortIcon = useRef();
  const votingPowerSortIcon = useRef();
  const commissionSortIcon = useRef();

  // СБРОС СТИЛЕЙ ИКОНОК
  const resetIconStyles = () => {
    setValidatorOrder('ASC');
    setVotingPowerOrder('ASC');
    setCommissionOrder('ASC');
    validatorSortIcon.current.classList.remove('table-header__sort-icon_asc');
    validatorSortIcon.current.classList.remove('table-header__sort-icon_dsc');
    votingPowerSortIcon.current.classList.remove('table-header__sort-icon_asc');
    votingPowerSortIcon.current.classList.remove('table-header__sort-icon_dsc');
    commissionSortIcon.current.classList.remove('table-header__sort-icon_asc');
    commissionSortIcon.current.classList.remove('table-header__sort-icon_dsc');
  }

  // СБРОС СОРТИРОВКИ ПРИ СМЕНЕ СЕТИ
  useEffect(() => {
    resetIconStyles();
  }, [chain])

  useEffect(() => {
    resetIconStyles();
  }, [isCurrentSetActive])

  // СОРТИРОВКА ПО МОНИКЕРУ
  // Примечание: trim() обрезает пробелы в начале и конце строки, регулярное
  // выражение убирает спецсимволы и эмодзи - всё кроме букв и цифр.
  const sortByMoniker = () => {
    if (validatorOrder === 'ASC') {
      const sorted = [...shownValidators].sort((a, b) => {
        const monikerA = a.description.moniker.trim().replace(/[^A-Za-z0-9]+/g, "");
        const monikerB = b.description.moniker.trim().replace(/[^A-Za-z0-9]+/g, "");
        return monikerA.localeCompare(monikerB);
      });
      resetIconStyles();
      setValidatorOrder('DSC');
      setShownValidators(sorted);
      validatorSortIcon.current.classList.add('table-header__sort-icon_asc');
    }
    else if (validatorOrder === 'DSC') {
      const sorted = [...shownValidators].sort((a, b) => {
        const monikerA = a.description.moniker.trim().replace(/[^A-Za-z0-9]+/g, "");
        const monikerB = b.description.moniker.trim().replace(/[^A-Za-z0-9]+/g, "");
        return monikerB.localeCompare(monikerA);
      });
      resetIconStyles();
      setValidatorOrder('ASC');
      setShownValidators(sorted);
      validatorSortIcon.current.classList.add('table-header__sort-icon_dsc');
    }
  }

  // СОРТИРОВКА ПО ТОКЕНАМ
  const sortByTokens = () => {
    if (votingPowerOrder === 'ASC') {
      const sorted = [...shownValidators].sort((a, b) => {
        return Number(a.tokens) > Number(b.tokens) ? 1 : -1
      });
      resetIconStyles();
      setVotingPowerOrder('DSC');
      setShownValidators(sorted);
      votingPowerSortIcon.current.classList.add('table-header__sort-icon_asc');
    }
    else if (votingPowerOrder === 'DSC') {
      const sorted = [...shownValidators].sort((a, b) => {
        return Number(a.tokens) < Number(b.tokens) ? 1 : -1
      });
      resetIconStyles();
      setVotingPowerOrder('ASC');
      setShownValidators(sorted);
      votingPowerSortIcon.current.classList.add('table-header__sort-icon_dsc');
    }
  }

  // СОРТИРОВКА ПО КОМИССИИ
  const sortByCommission = () => {
    if (commissionOrder === 'ASC') {
      const sorted = [...shownValidators].sort((a, b) => {
        return Number(a.commission.commission_rates.rate) > Number(b.commission.commission_rates.rate) ? 1 : -1
      });
      resetIconStyles();
      setCommissionOrder('DSC');
      setShownValidators(sorted);
      commissionSortIcon.current.classList.add('table-header__sort-icon_asc');
    }
    else if (commissionOrder === 'DSC') {
      const sorted = [...shownValidators].sort((a, b) => {
        return Number(a.commission.commission_rates.rate) < Number(b.commission.commission_rates.rate) ? 1 : -1
      });
      resetIconStyles();
      setCommissionOrder('ASC');
      setShownValidators(sorted);
      commissionSortIcon.current.classList.add('table-header__sort-icon_dsc');
    }
  }

  return (
    <div className="table-header">

      {/* VALIDATOR */}
      <div id="th-validator" className="table-header__cell">
        <div onClick={() => sortByMoniker()} id="srt-validator" className="table-header__sort-button">
          <div ref={validatorSortIcon} className="table-header__sort-icon">
            <span className="table-header__sort-icon-asc"></span>
            <span className="table-header__sort-icon-dsc"></span>
          </div>
          <span className="table-header__column-name">Validator</span>
        </div>
      </div>

      {/* VOTING POWER */}
      <div id="th-power" className="table-header__cell">
        <div onClick={() => sortByTokens()} id="srt-power" className="table-header__sort-button">
          <div ref={votingPowerSortIcon} className="table-header__sort-icon">
            <span className="table-header__sort-icon-asc"></span>
            <span className="table-header__sort-icon-dsc"></span>
          </div>
          <span className="table-header__column-name">Voting Power</span>
        </div>
      </div>

      {/* COMMISSION */}
      <div id="th-commission" className="table-header__cell">
        <div onClick={() => sortByCommission()} id="srt-commission" className="table-header__sort-button">
          <div ref={commissionSortIcon} className="table-header__sort-icon">
            <span className="table-header__sort-icon-asc"></span>
            <span className="table-header__sort-icon-dsc"></span>
          </div>
          <span className="table-header__column-name">Commission</span>
        </div>
      </div>

    </div>
  )

}

export default TableHeader;
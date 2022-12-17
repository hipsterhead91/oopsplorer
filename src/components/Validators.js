import React, { useState, useEffect } from "react";
import { useOutletContext, Outlet } from "react-router-dom";
import getAvatarsData from "../api/getAvatarsData";
import { sortByTokens, addRanks, addVotingPower, addAvatars, filterActive, filterInactive } from "../utils/formatting";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

function Validators() {

  const [chain, chainApi, totalBonded] = useOutletContext();
  const [isCurrentSetActive, setIsCurrentSetActive] = useState(true);
  const [avatarsData, setAvatarsData] = useState([]);
  const [allValidators, setAllValidators] = useState([]);
  const [activeValidators, setActiveValidators] = useState([]);
  const [inactiveValidators, setInactiveValidators] = useState([]);
  const [shownValidators, setShownValidators] = useState([]);

  // ПОЛУЧАЕМ АВАТАРЫ В МАССИВЕ ОБЪЕКТОВ
  useEffect(() => {
    getAvatarsData(chain)
      .then(result => setAvatarsData(result))
  }, [])

  // ПОЛУЧАЕМ ВСЕХ ВАЛИДАТОРОВ, СОРТИРУЕМ И ДОБАВЛЯЕМ ПОЛЯ
  useEffect(() => {
    chainApi.getAllValidators()
      .then(async result => {
        const sorted = sortByTokens(result);
        const ranked = addRanks(sorted);
        const powered = addVotingPower(ranked, totalBonded);
        const pictured = addAvatars(powered, avatarsData);
        setAllValidators(pictured);
      })
  }, [chain, totalBonded, avatarsData]);

  // ДЕЛИМ ВАЛИДАТОРОВ НА АКТИВНЫХ И НЕАКТИВНЫХ
  useEffect(() => {
    const active = filterActive(allValidators);
    const inactive = filterInactive(allValidators);
    setActiveValidators(active);
    setInactiveValidators(inactive);
  }, [allValidators]);

  // РЕНДЕРИМ АКТИВНЫХ ВАЛИДАТОРОВ КОГДА ОНИ ПОЛУЧЕНЫ
  useEffect(() => {
    setShownValidators(activeValidators);
  }, [activeValidators])

  // СБРАСЫВАЕМ НАСТРОЙКИ ПРИ ПЕРЕКЛЮЧЕНИИ СЕТИ
  useEffect(() => {
    setIsCurrentSetActive(true);
  }, [chain])

  const switchToActive = () => {
    setShownValidators(activeValidators);
    setIsCurrentSetActive(true);
  }

  const switchToInactive = () => {
    setShownValidators(inactiveValidators);
    setIsCurrentSetActive(false);
  }

  const activeButtonStyle = isCurrentSetActive ? "validators__switcher-button validators__switcher-button_selected" : "validators__switcher-button"
  const inactiveButtonStyle = isCurrentSetActive ? "validators__switcher-button" : "validators__switcher-button validators__switcher-button_selected"

  return (
    <div className="validators">
      <Outlet context={[chain, allValidators]} />
      <div className="validators__switcher">
        <button onClick={switchToActive} className={activeButtonStyle}>Active</button>
        <button onClick={switchToInactive} className={inactiveButtonStyle}>Inactive</button>
      </div>
      <div className="validators__table">
        <TableHeader shownValidators={shownValidators} setShownValidators={setShownValidators} />
        <div className="validators__rows">
          {shownValidators.map(validator => {
            return <TableRow key={validator.operator_address} validators={validator} chain={chain} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Validators
import React, { useState, useEffect } from "react";
import { useOutletContext, Outlet } from "react-router-dom";
import getAvatarsData from "../api/getAvatarsData";
import { sortByTokens, addRanks, addVotingPower, addAvatars, filterActive, filterInactive } from "../utils/formatting";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

function Validators() {

  const [chain, chainApi, totalBonded, activeProposals] = useOutletContext();
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
  }, [chain])

  // ПОЛУЧАЕМ ВАЛИДАТОРОВ, СОРТИРУЕМ И ДОБАВЛЯЕМ ПОЛЯ
  useEffect(() => {
    chainApi.getAllValidators()
      .then(async result => {
        let active = filterActive(result);
        let inactive = filterInactive(result);
        active = sortByTokens(active);
        inactive = sortByTokens(inactive);
        let all = active.concat(inactive);
        all = addRanks(all);
        all = addVotingPower(all, totalBonded);
        all = addAvatars(all, avatarsData);
        setAllValidators(all);
        active = filterActive(all);
        inactive = filterInactive(all);
        setActiveValidators(active);
        setInactiveValidators(inactive);
      })
  }, [chain, totalBonded, avatarsData]);

  // РЕНДЕРИМ АКТИВНЫХ ВАЛИДАТОРОВ КОГДА ОНИ ПОЛУЧЕНЫ
  useEffect(() => {
    setShownValidators(activeValidators);
  }, [activeValidators])

  // СБРАСЫВАЕМ НАСТРОЙКИ ПРИ ПЕРЕКЛЮЧЕНИИ СЕТИ
  useEffect(() => {
    setIsCurrentSetActive(true);
  }, [chain])

  // ПЕРЕКЛЮЧАЕМСЯ НА АКТИВНЫЙ СЕТ
  const switchToActive = () => {
    setShownValidators(activeValidators);
    setIsCurrentSetActive(true);
  }

  // ПЕРЕКЛЮЧАЕМСЯ НА НЕАКТИВНЫЙ СЕТ
  const switchToInactive = () => {
    setShownValidators(inactiveValidators);
    setIsCurrentSetActive(false);
  }

  // СКРОЛЛИМ СТРАНИЦУ ВВЕРХ
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // СКРОЛЛИМ СТРАНИЦУ ВНИЗ
  const scrollToBottom = () => {
    window.scrollTo({
      top: 99999999,
      behavior: "smooth"
    });
  }

  const activeButtonStyle = isCurrentSetActive ? "validators__switcher-button validators__switcher-button_selected" : "validators__switcher-button"
  const inactiveButtonStyle = isCurrentSetActive ? "validators__switcher-button" : "validators__switcher-button validators__switcher-button_selected"

  return (
    <div className="validators">
      <Outlet context={[chain, allValidators]} />
      <div className="validators__switcher-wrapper">
        <div className="validators__switcher">
          <button onClick={switchToActive} className={activeButtonStyle}>Active</button>
          <button onClick={switchToInactive} className={inactiveButtonStyle}>Inactive</button>
        </div>
      </div>
      <div className="validators__table">
        <TableHeader shownValidators={shownValidators} setShownValidators={setShownValidators} chain={chain} isCurrentSetActive={isCurrentSetActive} />
        <div className="validators__rows">
          {shownValidators.map(validator => {
            return <TableRow key={validator.operator_address} validators={validator} chain={chain} />
          })}
        </div>
      </div>

      <div className="validators__scroll-buttons">
        <div onClick={scrollToTop} className="validators__scroll-button">
          <div className="validators__top-arrow"></div>
        </div>
        <div onClick={scrollToBottom} className="validators__scroll-button">
          <div className="validators__bottom-arrow"></div>
        </div>
      </div>
    </div>
  )
}

export default Validators
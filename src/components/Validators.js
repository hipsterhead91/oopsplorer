import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { sortBytokens, getAdditionalProps, filterByActivity, getRanks } from "../utils/editingValidators";

import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

function Validators() {

  const [chain, chainApi, totalBonded] = useOutletContext();
  const [allValidators, setAllValidators] = useState([]);
  const [activeValidators, setActiveValidators] = useState([]);
  const [inactiveValidators, setInactiveValidators] = useState([]);
  const [currentValidators, setCurrentValidators] = useState([]);
  const [isCurrentSetActive, setIsCurrentSetActive] = useState(true);
  const [order, setOrder] = React.useState('ASC');

  // ПОЛУЧАЕМ ВСЕХ ВАЛИДАТОРОВ, СОРТИРУЕМ И ДОБАВЛЯЕМ ПОЛЯ
  // Примечание: вообще, мне в зависимостях достаточно одного totalBonded, но VSCode подсказывает, что 
  // chain и chainApi тоже надо указать, поэтому пусть будут - как минимум, вроде ничего не ломают.
  useEffect(() => {
    chainApi.getAllValidators()
      .then(result => {
        const sorted = sortBytokens(result);
        const updated = sorted.map(validator => getAdditionalProps(chain, validator, totalBonded, chain.decimals));
        setAllValidators(updated);
      })
  }, [chain, chainApi, totalBonded]);

  // ДЕЛИМ ВАЛИДАТОРОВ НА АКТИВНЫХ И НЕАКТИВНЫХ
  useEffect(() => {
    let active = filterByActivity(allValidators, true);
    let inactive = filterByActivity(allValidators, false);
    active = getRanks(active, true);
    inactive = getRanks(inactive, false, active.length);
    setActiveValidators(active);
    setInactiveValidators(inactive);
  }, [allValidators]);

  // РЕНДЕРИМ АКТИВНЫХ ВАЛИДАТОРОВ КОГДА ОНИ ПОЛУЧЕНЫ
  useEffect(() => {
    setCurrentValidators(activeValidators);
  }, [activeValidators])

  // СБРАСЫВАЕМ НАСТРОЙКИ ПРИ ПЕРЕКЛЮЧЕНИИ СЕТИ
  useEffect(() => {
    setIsCurrentSetActive(true);
  }, [chain])

  const switchToActive = () => {
    setCurrentValidators(activeValidators);
    setIsCurrentSetActive(true);
  }

  const switchToInactive = () => {
    setCurrentValidators(inactiveValidators);
    setIsCurrentSetActive(false);
  }

  const activeButtonStyle = isCurrentSetActive ? "validators__switcher-button validators__switcher-button_selected" : "validators__switcher-button"
  const inactiveButtonStyle = isCurrentSetActive ? "validators__switcher-button" : "validators__switcher-button validators__switcher-button_selected"

  return (
    <div className="validators">
      <div className="validators__switcher">
        <button onClick={switchToActive} className={activeButtonStyle}>Active</button>
        <button onClick={switchToInactive} className={inactiveButtonStyle}>Inactive</button>
      </div>
      <div className="validators__table">
        <TableHeader currentValidators={currentValidators} setCurrentValidators={setCurrentValidators} />
        <div className="validators__rows">
          {currentValidators.map(validator => {
            return <TableRow key={validator.operator_address} validators={validator} chain={chain} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Validators
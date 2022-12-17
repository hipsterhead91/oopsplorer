import React from "react";
import { Link } from "react-router-dom";
import noAvatar from "../images/no-avatar.png";

function TableRow(props) {

  const validator = props.validators;
  const chain = props.chain;
  const network = chain.isMain ? 'mainnet' : 'testnet';
  const chainPath = chain.name + '-' + network;

  // ДАННЫЕ ДЛЯ РЕНДЕРА И СТИЛИ
  let avatar;
  avatar = (validator.avatar) ? validator.avatar : noAvatar;
  const activity = (validator.status_short === 'Bonded') ? 'Active' : 'Inactive';
  const warning = (validator.commission_num > 15) ? 'Commission > 15%' : '';
  const activityStyle = (validator.status_short === 'Bonded') ? 'validators__activity' : 'validators__activity validators__activity_inactive';
  let bondStyle;
  if (validator.status_short === 'Bonded') bondStyle = 'validators__bond';
  if (validator.status_short === 'Unbonded') bondStyle = 'validators__bond validators__bond_unbonded';
  if (validator.status_short === 'Unbonding') bondStyle = 'validators__bond validators__bond_unbonding';
  const jailStyle = (validator.jailed_str === 'Jailed') ? 'validators__jail' : 'validators__jail_hidden';
  const warningStyle = (validator.commission_num > 15) ? 'validators__warning' : 'validators__warning_hidden';

  return (
    <div className="validators__row">

      {/* ВАЛИДАТОР */}
      <div className="validators__row-cell">
        <div className="validators__validator">
          <div style={{ backgroundImage: `url("${avatar}")` }} className="validators__avatar" />
          <div className="validators__info">
            <div className="validators__main-info">
              <span className="validators__rank">#{validator.rank.toString().padStart(3, '0')}</span>
              <Link to={`/${chainPath}/validators/${validator.operator_address}`} state={validator} className="validators__moniker">{validator.description.moniker}</Link>
            </div>
            <div className="validators__statuses">
              <span className={activityStyle}>{activity}</span>
              <span className={bondStyle}>{validator.status_short}</span>
              <span className={jailStyle}>{validator.jailed_str}</span>
              <span className={warningStyle}>{warning}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ВЕС ГОЛОСА */}
      <div className="validators__row-cell validators__row-cell_right">
        <div className="validators__voting-power">
          <span className="validators__stake">{validator.tokens_num.toLocaleString('en')}<span>{chain.symbol.toUpperCase()}</span></span>
          <span className="validators__power">{validator.voting_power}%</span>
        </div>
      </div>

      {/* КОМИССИЯ */}
      <div className="validators__row-cell validators__row-cell_right">
        <span className="validators__commission">{validator.commission_num}%</span>
      </div>
    </div>
  )

}

export default TableRow;
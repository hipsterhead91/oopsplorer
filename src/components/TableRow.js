import React from "react";
import { Link } from "react-router-dom";
import noAvatar from "../images/no-avatar.png";
import { cutDecimals, tweakCommission } from "../utils/formatting";

function TableRow(props) {

  const validator = props.validators;
  const chain = props.chain;
  const network = chain.isMain ? 'mainnet' : 'testnet';
  const chainPath = chain.path + '-' + network;

  // РЕНДЕР АВАТАРА
  const avatarUrl = (validator.avatar) ? validator.avatar : noAvatar;

  // РЕНДЕР РЕЙТИНГА
  const rank = '#' + validator.rank.toString().padStart(3, '0');

  // РЕНДЕР МОНИКЕРА
  const moniker = validator.description.moniker;

  // РЕНДЕР АКТИВНОСТИ
  const activity = (validator.status === 'BOND_STATUS_BONDED') ? 'Active' : 'Inactive';
  const activityStyle = (validator.status === 'BOND_STATUS_BONDED') ? 'validators__activity' : 'validators__activity validators__activity_inactive';

  // РЕНДЕР БОНДА
  let bond, bondStyle;
  if (validator.status === 'BOND_STATUS_BONDED') { bond = 'Bonded'; bondStyle = 'validators__bond' }
  if (validator.status === 'BOND_STATUS_UNBONDED') { bond = 'Unbonded'; bondStyle = 'validators__bond validators__bond_unbonded' }
  if (validator.status === 'BOND_STATUS_UNBONDING') { bond = 'Unbonding'; bondStyle = 'validators__bond validators__bond_unbonding' }

  // РЕНДЕР ТЮРЬМЫ
  const jail = (validator.jailed) ? 'Jailed' : '';
  const jailStyle = (validator.jailed) ? 'validators__jail' : 'validators__jail_hidden';

  // РЕНДЕР ВЫСОКОЙ КОМИССИИ
  const highCommission = (validator.commission.commission_rates.rate > 0.1) ? 'High Commission' : '';
  const highCommissionStyle = (validator.commission.commission_rates.rate > 0.1) ? 'validators__warning' : 'validators__warning_hidden';

  // РЕНДЕР ВЕСА ГОЛОСА
  const stake = Number(cutDecimals(validator.tokens, chain.decimals)).toLocaleString('en');
  const symbol = chain.symbol;
  const votingPower = validator.voting_power + '%';

  // РЕНДЕР КОМИССИИ
  const commission = tweakCommission(validator.commission.commission_rates.rate) + '%';

  return (
    <div className="validators__row">

      {/* ВАЛИДАТОР */}
      <div className="validators__row-cell">
        <div className="validators__validator">
          <div style={{ backgroundImage: `url("${avatarUrl}")` }} className="validators__avatar" />
          <div className="validators__info">
            <div className="validators__main-info">
              <span className="validators__rank">{rank}</span>
              <Link to={`/${chainPath}/validators/${validator.operator_address}`} state={validator} className="validators__moniker">{moniker}</Link>
            </div>
            <div className="validators__statuses">
              <span className={activityStyle}>{activity}</span>
              <span className={bondStyle}>{bond}</span>
              <span className={jailStyle}>{jail}</span>
              <span className={highCommissionStyle}>{highCommission}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ВЕС ГОЛОСА */}
      <div className="validators__row-cell validators__row-cell_right">
        <div className="validators__voting-power">
          <span className="validators__stake">{stake}<span>{symbol}</span></span>
          <span className="validators__power">{votingPower}</span>
        </div>
      </div>

      {/* КОМИССИЯ */}
      <div className="validators__row-cell validators__row-cell_right">
        <span className="validators__commission">{commission}</span>
      </div>
    </div>
  )

}

export default TableRow;
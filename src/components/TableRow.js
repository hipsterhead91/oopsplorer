import React from "react";
import { Link } from "react-router-dom";
import { cutDecimals, tweakCommission } from "../utils/formatting";

function TableRow(props) {

  const validator = props.validators;
  const chain = props.chain;
  const network = chain.isMain ? 'mainnet' : 'testnet';
  const chainPath = chain.path + '-' + network;

  // РЕНДЕР АВАТАРА
  const avatarUrl = (validator.avatar) ? validator.avatar : `${process.env.PUBLIC_URL}/images/no-avatar.png`;

  // РЕНДЕР РЕЙТИНГА
  const rank = '#' + validator.rank.toString().padStart(3, '0');

  // РЕНДЕР МОНИКЕРА
  const moniker = validator.description.moniker;

  // РЕНДЕР АКТИВНОСТИ
  const activity = (validator.status === 'BOND_STATUS_BONDED') ? 'Active' : 'Inactive';
  const activityStyle = (validator.status === 'BOND_STATUS_BONDED') ? 'table-row__activity' : 'table-row__activity table-row__activity_inactive';

  // РЕНДЕР БОНДА
  let bond, bondStyle;
  if (validator.status === 'BOND_STATUS_BONDED') { bond = 'Bonded'; bondStyle = 'table-row__bond' }
  if (validator.status === 'BOND_STATUS_UNBONDED') { bond = 'Unbonded'; bondStyle = 'table-row__bond table-row__bond_unbonded' }
  if (validator.status === 'BOND_STATUS_UNBONDING') { bond = 'Unbonding'; bondStyle = 'table-row__bond table-row__bond_unbonding' }

  // РЕНДЕР ТЮРЬМЫ
  const jail = (validator.jailed) ? 'Jailed' : '';
  const jailStyle = (validator.jailed) ? 'table-row__jail' : 'table-row__jail_hidden';

  // РЕНДЕР ВЫСОКОЙ КОМИССИИ
  const highCommission = (validator.commission.commission_rates.rate > 0.1) ? 'High %' : '';
  const highCommissionStyle = (validator.commission.commission_rates.rate > 0.1) ? 'table-row__warning' : 'table-row__warning_hidden';

  // РЕНДЕР ВЕСА ГОЛОСА
  const stake = Number(cutDecimals(validator.tokens, chain.decimals)).toLocaleString('en');
  const symbol = chain.symbol;
  const votingPower = validator.voting_power + '%';

  // РЕНДЕР КОМИССИИ
  const commission = tweakCommission(validator.commission.commission_rates.rate) + '%';

  return (
    <div className="table-row">

      {/* ВАЛИДАТОР */}
      <div className="table-row__validator">
        <div style={{ backgroundImage: `url("${avatarUrl}")` }} className="table-row__avatar" />
        <div className="table-row__info">
          <div className="table-row__main-info">
            <span className="table-row__rank">{rank}</span>
            <Link to={`/oopsplorer/${chainPath}/validators/${validator.operator_address}`} state={validator} className="table-row__moniker">{moniker}</Link>
          </div>
          <div className="table-row__statuses">
            <span className={activityStyle}>{activity}</span>
            <span className={bondStyle}>{bond}</span>
            <span className={jailStyle}>{jail}</span>
            <span className={highCommissionStyle}>{highCommission}</span>
          </div>
          <div className="table-row__vp-adaptive">{stake}<span>{symbol}</span> ({votingPower})</div>
        </div>
      </div>

      {/* ВЕС ГОЛОСА */}
      <div className="table-row__voting-power">
        <span className="table-row__stake">{stake}<span>{symbol}</span></span>
        <span className="table-row__power">{votingPower}</span>
      </div>

      {/* КОМИССИЯ */}
      <span className="table-row__commission">{commission}</span>
    </div>
  )

}

export default TableRow;
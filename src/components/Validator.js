import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import noAvatar from "../images/no-avatar.png";
import { cutDecimals, tweakCommission } from "../utils/formatting";

function Validator() {

  const currentValoper = useParams().valoper; // из ссылки в браузерной строке получаем адрес текущего валидатора
  const [chain, allValidators] = useOutletContext([]);
  const [validator, setValidator] = useState();
  const network = chain.isMain ? 'mainnet' : 'testnet';
  const chainPath = chain.path + '-' + network;

  // ПОЛУЧАЕМ ОБЪЕКТ ТЕКУЩЕГО ВАЛИДАТОРА
  useEffect(() => {
    const validator = allValidators.find(val => val.operator_address === currentValoper);
    setValidator(validator);
  }, [chain, allValidators, currentValoper])

  let [avatar, rank, moniker, valoper, activity, activityStyle, bond, bondStyle, jail, jailStyle, highCommission, highCommissionStyle, stake, symbol, votingPower, commission, website, securityContact, details] = '';

  if (validator === undefined) {
    avatar = noAvatar;
    rank = '#000';
    moniker = "Validator Doesn't Exist";
    valoper = 'no validator operator address';
    activity = 'Inactive';
    activityStyle = 'validators__activity validators__activity_inactive';
    stake = '—';
    votingPower = '—';
    commission = '—';
    website = <p className="validator__data-text">—</p>;
    securityContact = '—';
    details = '—';
  }

  else if (validator) {

    // РЕНДЕР АВАТАРА
    avatar = (validator.avatar === '') ? noAvatar : validator.avatar;

    // РЕНДЕР РЕЙТИНГА
    rank = '#' + validator.rank.toString().padStart(3, '0');

    // РЕНДЕР МОНИКЕРА
    moniker = validator.description.moniker;

    // РЕНДЕР ВАЛОПЕРА
    valoper = validator.operator_address;

    // РЕНДЕР АКТИВНОСТИ
    activity = (validator.status === 'BOND_STATUS_BONDED') ? 'Active' : 'Inactive';

    // РЕНДЕР БОНДА
    activityStyle = (validator.status === 'BOND_STATUS_BONDED') ? 'validator__activity' : 'validator__activity validator__activity_inactive';
    if (validator.status === 'BOND_STATUS_BONDED') { bond = 'Bonded'; bondStyle = 'validator__bond' }
    if (validator.status === 'BOND_STATUS_UNBONDED') { bond = 'Unbonded'; bondStyle = 'validator__bond validator__bond_unbonded' }
    if (validator.status === 'BOND_STATUS_UNBONDING') { bond = 'Unbonding'; bondStyle = 'validator__bond validator__bond_unbonding' }

    // РЕНДЕР ТЮРЬМЫ
    jail = (validator.jailed) ? 'Jailed' : '';
    jailStyle = (validator.jailed) ? 'validator__jail' : 'validator__jail_hidden';

    // РЕНДЕР ВЫСОКОЙ КОМИССИИ
    highCommission = (validator.commission.commission_rates.rate > 0.05) ? 'High Commission' : '';
    highCommissionStyle = (validator.commission.commission_rates.rate > 0.05) ? 'validator__warning' : 'validator__warning_hidden';

    // РЕНДЕР СТЕЙКА
    stake = cutDecimals(validator.tokens, chain.decimals).toLocaleString('en');
    symbol = chain.symbol;

    // РЕНДЕР ВЕСА ГОЛОСА
    votingPower = validator.voting_power + '%';

    // РЕНДЕР КОМИССИИ
    commission = tweakCommission(validator.commission.commission_rates.rate) + '%';

    // РЕНДЕР ВЕБСАЙТА
    website = (validator.description.website === '')
      ? <p className="validator__data-text">—</p>
      : <a className="validator__data-link" href={validator.description.website} target="_blank">{validator.description.website}</a>

    // РЕНДЕР БЕЗОПАСНОГО КОНТАКТА
    securityContact = (validator.description.security_contact === '') ? '—' : validator.description.security_contact;

    // РЕНДЕР ОПИСАНИЯ
    details = (validator.description.details === '') ? '—' : validator.description.details;
  }

  return (
    <div className="validator">
      <div className="validator__container">
        <Link to={`/${chainPath}/validators`} className="validator__close-button">&#10006;</Link>
        <div className="validator__card">
          <div style={{ backgroundImage: `url(${avatar})` }} className="validator__avatar" />
          <div className="validator__header">
            <h1 className="validator__moniker">{moniker}</h1>
            <span className="validator__valoper">{valoper}</span>
            <div className="validator__statuses">
              <span className={activityStyle}>{activity}</span>
              <span className={bondStyle}>{bond}</span>
              <span className={jailStyle}>{jail}</span>
              <span className={highCommissionStyle}>{highCommission}</span>
            </div>
          </div>
          <span className="validator__rank">{rank}</span>
          <div className="validator__data">
            <p className="validator__data-heading">Tokens Bonded:</p>
            <span className="validator__data-text">{stake}<span className="validator__denom">{symbol}</span></span>
            <p className="validator__data-heading">Voting Power:</p>
            <span className="validator__data-text">{votingPower}</span>
            <p className="validator__data-heading">Commission:</p>
            <span className="validator__data-text">{commission}</span>
            <p className="validator__data-heading">Website:</p>
            {website}
            <p className="validator__data-heading">Security Contact:</p>
            <span className="validator__data-text">{securityContact}</span>
            <p className="validator__data-heading">Details:</p>
            <span className="validator__data-text">{details}</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Validator;
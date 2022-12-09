import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import Keybase from "../utils/Keybase";
import noAvatar from "../images/no-avatar.png";

function Validator() {

  const currentValoper = useParams().valoper; // из ссылки в браузерной строке получаем адрес текущего валидатора
  const [chain, allValidators] = useOutletContext([]);
  const [currentValidator, setCurrentValidator] = useState();
  const [avatar, setAvatar] = useState(noAvatar);
  const network = chain.isMain ? 'mainnet' : 'testnet';
  const chainPath = chain.name + '-' + network;
  const keybase = new Keybase();

  // ПОЛУЧАЕМ ОБЪЕКТ ТЕКУЩЕГО ВАЛИДАТОРА
  useEffect(() => {
    const validator = allValidators.find(val => val.operator_address === currentValoper);
    setCurrentValidator(validator);
  }, [chain, allValidators, currentValoper])

  // ПОЛУЧАЕМ АВАТАР
  useEffect(() => {
    if (currentValidator && currentValidator.description.identity) {
      keybase.getAvatar(currentValidator.description.identity)
        .then(result => setAvatar(result))
    }
  }, [currentValidator])

  // ДАННЫЕ ДЛЯ РЕНДЕРА И СТИЛИ
  const moniker = (currentValidator === undefined) ? '' : currentValidator.description.moniker;
  const valoper = (currentValidator === undefined) ? '' : currentValidator.operator_address;
  const rank = (currentValidator === undefined) ? '' : currentValidator.rank.toString().padStart(3, '0');
  const tokens = (currentValidator === undefined) ? '' : currentValidator.tokens_num.toLocaleString('en');
  const votingPower = (currentValidator === undefined) ? '' : currentValidator.voting_power;
  const commission = (currentValidator === undefined) ? '' : currentValidator.commission_num;
  const bond = (currentValidator === undefined) ? '' : currentValidator.status_short;
  let activity, warning, activityStyle, bondStyle, jailStyle, warningStyle;
  let details = (currentValidator === undefined) ? '' : currentValidator.description.details;
  let securityContact = (currentValidator === undefined) ? '' : currentValidator.description.security_contact;
  if (details === '') details = '—';
  if (securityContact === '') securityContact = '—';
  if (currentValidator !== undefined) {
    activity = (currentValidator.status_short === 'Bonded') ? 'Active' : 'Inactive';
    warning = (currentValidator.commission_num > 15) ? 'Commission > 15%' : '';
    activityStyle = (currentValidator.status_short === 'Bonded') ? 'validator__activity' : 'validator__activity validator__activity_inactive';
    if (currentValidator.status_short === 'Bonded') bondStyle = 'validator__bond';
    if (currentValidator.status_short === 'Unbonded') bondStyle = 'validator__bond validator__bond_unbonded';
    if (currentValidator.status_short === 'Unbonding') bondStyle = 'validator__bond validator__bond_unbonding';
    jailStyle = (currentValidator.jailed_str === 'Jailed') ? 'validator__jail' : 'validator__jail_hidden';
    warningStyle = (currentValidator.commission_num > 15) ? 'validator__warning' : 'validator__warning_hidden';
  }

  const websiteElement = () => {
    if (currentValidator === undefined || currentValidator.description.website === '') {
      return <p className="validator__data-text">—</p>
    } else {
      return <a href={currentValidator.description.website} target="_blank" className="validator__data-link">{currentValidator.description.website}</a>
    }
  }

  return (
    <div className="validator">
      <div className="validator__container">
        <Link to={`/${chainPath}/validators`} className="validator__close-button">&#10006;</Link>
        <div className="validator__card">
          <img src={avatar} alt="" className="validator__avatar" />
          <div className="validator__header">
            <h1 className="validator__moniker">{moniker}</h1>
            <span className="validator__valoper">{valoper}</span>
            <div className="validator__statuses">
              <span className={activityStyle}>{activity}</span>
              <span className={bondStyle}>{bond}</span>
              <span className={jailStyle}>Jailed</span>
              <span className={warningStyle}>{warning}</span>
            </div>
          </div>
          <span className="validator__rank">#{rank}</span>
          <div className="validator__data">
            <p className="validator__data-heading">Tokens Bonded:</p>
            <span className="validator__data-text">{tokens}<span className="validator__denom">{chain.symbol.toUpperCase()}</span></span>
            <p className="validator__data-heading">Voting Power:</p>
            <span className="validator__data-text">{votingPower}%</span>
            <p className="validator__data-heading">Commission:</p>
            <span className="validator__data-text">{commission}%</span>
            <p className="validator__data-heading">Website:</p>
            {websiteElement()}
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
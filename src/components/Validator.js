import React from 'react';
import { useParams, useLocation } from "react-router-dom";

import Keybase from '../utils/Keybase';

function Validator() {

  // АДРЕС ТЕКУЩЕГО ОПЕРАТОРА
  // Примечание: адрес получается из ссылки в адресной строке, так что, даже если я попал на страницу не "пошагово",
  // а введя готовый путь, у меня будет валопер, по которому можно делать дальнейшие запросы в блокчейн и получать нужную
  // мне информацию. Однако, данные будут необработанными, в том числе не будет веса голоса и рейтинга, поэтому пока что я
  // получаю информацию другим образом, но возможно позже мне придётся вернуться к этому варианту, так что пока пусть будет.
  const currentValoper = useParams().valoper;

  const currentValidator = useLocation().state;
  const [avatar, setAvatar] = React.useState('');
  const keybase = new Keybase();

  React.useEffect(() => {
    keybase.getAvatar(currentValidator.description.identity)
      .then(result => {
        setAvatar(result)
      })
  }, [currentValidator])




  return (
    <div className="validator">
      <h1 className="validator__heading">{currentValidator.description.moniker}</h1>
      <img className="validator__avatar" src={avatar} />
      <p className="validator__subheading">Valoper: <span className="validator__info">{currentValidator.operator_address}</span></p>
      <p className="validator__subheading">Rank: <span className="validator__info">{currentValidator.rank}</span></p>
      <p className="validator__subheading">Bonded tokens: <span className="validator__info">{currentValidator.tokens_num} EVMOS</span></p>
      <p className="validator__subheading">Voting Power: <span className="validator__info">{currentValidator.voting_power}%</span></p>
      <p className="validator__subheading">Status: <span className="validator__info">{currentValidator.status}</span></p>
      <p className="validator__subheading">Jail: <span className="validator__info">{currentValidator.jail_str}</span></p>
      <p className="validator__subheading">Commission: <span className="validator__info">{currentValidator.commission_num}%</span></p>
      <p className="validator__subheading">Description: <span className="validator__info">{currentValidator.description.details}</span></p>
      <p className="validator__subheading">Contact: <span className="validator__info">{currentValidator.description.security_contact}</span></p>
      <p className="validator__subheading">Website: <span className="validator__info">{currentValidator.description.website}</span></p>
    </div>
  )
}

export default Validator;
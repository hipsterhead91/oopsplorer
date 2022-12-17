import capitalize from "./utils";

// ДОБАВЛЯЕМ АВАТАРЫ
export function addAvatars(validators, avatars) {
  validators.forEach(validator => {
    const valoper = validator.operator_address;
    const match = avatars.find(obj => {
      return (obj.download_url.includes(valoper)) && (obj.download_url.includes('.png'))
    })
    match ? validator.avatar = match.download_url : validator.avatar = '';
  })
  return validators;
}

// УПОРЯДОЧИВАНИЕ ВАЛИДАТОРОВ ПО СТЕЙКУ
export function sortBytokens(validators) {
  validators.sort((x, y) => Number(x.tokens) - Number(y.tokens));
  validators.reverse();
  return validators;
}

// ВЕС ГОЛОСА
// Примечание: что tokens, что bondedTotal - это строки, полученные из блокчейна "как есть".
export function getVotingPower(tokens, bondedTotal) {
  const votingPower = tokens * 100 / bondedTotal;
  return Number(votingPower.toFixed(2)); // метод toFixed() возвращает строку, поэтому преобразуем результат в число
}

// ТОКЕНЫ ЧИСЛОМ
export function getTweakedTokens(tokens, decimals = 18) {
  return (tokens.length > decimals)
    ? Number(tokens.slice(0, -decimals))
    : 0
}

// КОМИССИЯ ЧИСЛОМ
export function getTweakedCommission(commission) {
  let num = Number(commission) * 100;
  return Number(num.toFixed(2)); // метод toFixed() возвращает строку, поэтому преобразуем результат в число
}

// ТЮРЬМА СТРОКОЙ
export function getTweakedJail(isJailed) {
  return isJailed ? 'Jailed' : '';
}

// ЧИТАБЕЛЬНЫЙ СТАТУС
export function getTweakedStatus(status) {
  if (status === 'BOND_STATUS_BONDED') { return 'Bonded' }
  else if (status === 'BOND_STATUS_UNBONDED') { return 'Unbonded' }
  else if (status === 'BOND_STATUS_UNBONDING') { return 'Unbonding' }
}

// ДОП. ПОЛЯ ПАКЕТОМ
export function getAdditionalProps(chain, validator, bondedTotal, decimals) {
  const val = validator;
  val.chain = chain;
  val.voting_power = getVotingPower(validator.tokens, bondedTotal);
  val.tokens_num = getTweakedTokens(validator.tokens, decimals);
  val.commission_num = getTweakedCommission(validator.commission.commission_rates.rate);
  val.jailed_str = getTweakedJail(validator.jailed);
  val.status_short = getTweakedStatus(validator.status);
  return val;
}

// ОТСЕВ АКТИВНЫХ/НЕАКТИВНЫХ
export function filterByActivity(validators, isActive) {
  return validators.filter(validator => {
    if (isActive) { return validator.status === 'BOND_STATUS_BONDED' }
    else { return validator.status !== 'BOND_STATUS_BONDED' }
  })
}

// РЕЙТИНГ
export function getRanks(validators, isActive, activeSetLength) {
  return validators.map(validator => {
    validator.rank = isActive ? validators.indexOf(validator) + 1 : validators.indexOf(validator) + 1 + activeSetLength;
    return validator;
  });
}
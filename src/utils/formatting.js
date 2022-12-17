// КАПИТАЛИЗИРОВАТЬ СТРОКУ
export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

// ОБРЕЗАТЬ КОПЕЙКИ
// Примечание: токены строкой, десятичные числом. Возвращает строку.
export function cutDecimals(tokens, decimals) {
  return (tokens.length > decimals)
    ? Number(tokens.slice(0, -decimals))
    : 0
}

// УПОРЯДОЧИТЬ ВАЛИДАТОРОВ ПО СТЕЙКУ
// Примечание: принимает массив валидаторов, возвращает его же, но в другом порядке.
export function sortByTokens(validators) {
  validators.sort((x, y) => Number(x.tokens) - Number(y.tokens));
  validators.reverse();
  return validators;
}

// ДОБАВИТЬ РЕЙТИНГ
// Примечание: принимает массив валидаторов (уже должны быть упорядочены по стейку!), возвращает его же,
// но с новым свойством rank (число) у каждого объекта.
export function addRanks(validators) {
  validators.forEach(validator => validator.rank = validators.indexOf(validator) + 1);
  return validators;
}

// ДОБАВИТЬ АВАТАРЫ
// Примечание 1: принимает массив валидаторов и массив объектов с аватарами; возвращает массив валидаторов, 
// но с новым свойством avatar (строка) у каждого объекта.
// Примечание 2: аватар является ссылкой, и сейчас проходит простейшую валидацию (ссылка должна содержать валопер
// и иметь формат PNG). В будущем валидацию можно прописать глубже - вероятно, существуют и готовые решения.
export function addAvatars(validators, avatarsData) {
  validators.forEach(validator => {
    const valoper = validator.operator_address;
    const match = avatarsData.find(object => {
      return (object.download_url.includes(valoper)) && (object.download_url.includes('.png'))
    })
    match ? validator.avatar = match.download_url : validator.avatar = '';
  });
  return validators;
}

// ДОБАВИТЬ ВЕС ГОЛОСА
// Примечание: принимает массив валидаторов и сумму всех застейканных монет в сети; возвращает массив валидаторов, 
// но с новым свойством voting_power () у каждого объекта.
export function addVotingPower(validators, bondedTotal) {
  validators.forEach(validator => {
    const votingPower = (validator.tokens * 100 / bondedTotal).toFixed(2); // метод toFixed() возвращает строку
    validator.voting_power = votingPower;
  });
  return validators;
}

// ОТФИЛЬТРОВАТЬ АКТИВНЫХ
// Примечание: принимает массив валидаторов, возвращает его же, не отфильтрованным.
export function filterActive(validators) {
  const active = validators.filter(validator => validator.status === 'BOND_STATUS_BONDED');
  return active;
}

// ОТФИЛЬТРОВАТЬ НЕАКТИВНЫХ
// Примечание: принимает массив валидаторов, возвращает его же, не отфильтрованным.
export function filterInactive(validators) {
  const inactive = validators.filter(validator => validator.status !== 'BOND_STATUS_BONDED');
  return inactive;
}

// ОТФОРМАТИРОВАТЬ КОМИССИЮ
// Примечание: принимает строку, возвращает строку.
export function tweakCommission(commission) {
  const commissionUpdated = (Number(commission) * 100).toFixed(2); // метод toFixed() возвращает строку
  const commissionAsNumber = Number(commissionUpdated);
  return commissionAsNumber.toString();
}
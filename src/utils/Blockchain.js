class Blockchain {

  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  // ВСЕ ВАЛИДАТОРЫ (BONDED + UNBONDED + UNBONDING)
  async getAllValidators() {
    const response = await fetch(`${this._baseUrl}/cosmos/staking/v1beta1/validators?pagination.limit=10000`);
    if (response.ok) {
      const result = await response.json();
      return result.validators;
    } else {
      return Promise.reject(`Something went wrong: ${response.status}`)
    }
  }

  // АКТИВНЫЕ ВАЛИДАТОРЫ (BONDED)
  async getActiveValidators() {
    const response = await fetch(`${this._baseUrl}/cosmos/staking/v1beta1/validators?pagination.limit=10000&status=BOND_STATUS_BONDED`);
    if (response.ok) {
      const result = await response.json();
      return result.validators;
    } else {
      return Promise.reject(`Something went wrong: ${response.status}`)
    }
  }

  // НЕАКТИВНЫЕ ВАЛИДАТОРЫ (UNBONDED + UNBONDING)
  async getInactiveValidators() {
    const unbondedResponse = await fetch(`${this._baseUrl}/cosmos/staking/v1beta1/validators?pagination.limit=10000&status=BOND_STATUS_UNBONDED`);
    const unbondingResponse = await fetch(`${this._baseUrl}/cosmos/staking/v1beta1/validators?pagination.limit=10000&status=BOND_STATUS_UNBONDING`);
    if (unbondedResponse.ok && unbondingResponse.ok) {
      const unbonded = await unbondedResponse.json();
      const unbonding = await unbondingResponse.json();
      return unbonded.validators.concat(unbonding.validators);
    } else {
      return Promise.reject(`Something went wrong: ${unbondedResponse.status}, ${unbondingResponse.status}`)
    }
  }

  // КОНКРЕТНЫЙ ВАЛИДАТОР
  async getValidator(operatorAddress) {
    const response = await fetch(`${this._baseUrl}/cosmos/staking/v1beta1/validators/${operatorAddress}`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return Promise.reject(`Something went wrong: ${response.status}`)
    }
  }

  // МОНЕТ В ОБРАЩЕНИИ ЗАСТЕЙКАНО
  async getBondedTokens() {
    const response = await fetch(`${this._baseUrl}/cosmos/staking/v1beta1/pool`);
    if (response.ok) {
      const result = await response.json();
      return result.pool.bonded_tokens;
    } else {
      return Promise.reject(`Something went wrong: ${response.status}`)
    }
  }

  // МОНЕТ В ОБРАЩЕНИИ
  async getCirculatingSupply() {
    const response = await fetch(`${this._baseUrl}/evmos/inflation/v1/circulating_supply`);
    if (response.ok) {
      const result = await response.json();
      return result.circulating_supply.amount;
    } else {
      return Promise.reject(`Something went wrong: ${response.status}`)
    }
  }

  // ПОСЛЕДНИЙ БЛОК
  async getLatestBlock() {
    const response = await fetch(`${this._baseUrl}/cosmos/base/tendermint/v1beta1/blocks/latest`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return Promise.reject(`Something went wrong: ${response.status}`)
    }
  }

};

export default Blockchain;
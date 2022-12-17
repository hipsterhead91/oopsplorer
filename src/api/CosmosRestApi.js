class CosmosRestApi {

  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  // ВСЕ ВАЛИДАТОРЫ, АКТИВНЫЕ И НЕАКТИВНЫЕ
  async getAllValidators() {
    const response = await fetch(`${this._baseUrl}/cosmos/staking/v1beta1/validators?pagination.limit=9999999`);
    if (response.ok) {
      const result = await response.json();
      return result.validators;
    } else {
      return Promise.reject(`Something went wrong: ${response.status}`)
    }
  }

  // МОНЕТ ЗАСТЕЙКАНО
  async getBondedTokens() {
    const response = await fetch(`${this._baseUrl}/cosmos/staking/v1beta1/pool`);
    if (response.ok) {
      const result = await response.json();
      return result.pool.bonded_tokens;
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

export default CosmosRestApi;
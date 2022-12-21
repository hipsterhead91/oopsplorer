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

  // ПУЛ СООБЩЕСТВА
  async getCommunityPool() {
    const response = await fetch(`${this._baseUrl}/cosmos/distribution/v1beta1/community_pool`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return Promise.reject(`Something went wrong: ${response.status}`)
    }
  }

  // ВСЕГО МОНЕТ
  async getTotalSupply() {
    const response = await fetch(`${this._baseUrl}/cosmos/bank/v1beta1/supply`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return Promise.reject(`Something went wrong: ${response.status}`)
    }
  }

  // ГОЛОСОВАНИЯ
  async getProposals() {
    const response = await fetch(`${this._baseUrl}/cosmos/gov/v1beta1/proposals`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return Promise.reject(`Something went wrong: ${response.status}`)
    }
  }

  // ИНФЛЯЦИЯ
  async getInflation() {
    const response = await fetch(`${this._baseUrl}/cosmos/mint/v1beta1/inflation`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return Promise.reject(`Something went wrong: ${response.status}`)
    }
  }

  // ПАРАМЕТРЫ МИНТА
  async getMintParams() {
    const response = await fetch(`${this._baseUrl}/cosmos/mint/v1beta1/params`);
    if (response.ok) {
      const result = await response.json();
      return result.params;
    } else {
      return Promise.reject(`Something went wrong: ${response.status}`)
    }
  }

  // ПАРАМЕТРЫ СТЕЙКИНГА (содержит срок анбондинга и максимальное количество активных валидаторов)
  async getStakingParams() {
    const response = await fetch(`${this._baseUrl}/cosmos/staking/v1beta1/params`);
    if (response.ok) {
      const result = await response.json();
      return result.params;
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
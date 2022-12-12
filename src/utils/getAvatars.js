import Keybase from "./Keybase";

const keybase = new Keybase();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getAvatars(validators) {

  for (let validator of validators) {

    const id = validator.description.identity;
    validator.avatar = '';

    if (id.length === 16) {
      try {
        const avatar = await keybase.getAvatar(id);
        validator.avatar = avatar;
        await sleep(0);
      } catch (error) {
        console.error(`Avatar for validator "${validator.description.moniker}" can't be loaded. Sorry.`);
      }
    }

  }

  return validators;
}
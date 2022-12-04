class Keybase {

  async getAvatar(identity) {
    const response = await fetch(`https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`, {mode: 'no-cors'});
    if (response.ok) {
      const result = await response.json();
      return result.them[0].pictures.primary.url;
    } else {
      return Promise.reject(`Something went wrong: ${response.status}`)
    }
  }
}

export default Keybase;
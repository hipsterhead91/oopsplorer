import React from "react";

function Homepage() {

  return (
    <section className="homepage">
      <h1 className="homepage__heading">Hello,</h1>
      <p className="homepage__paragraph">And welcome to <span className="homepage__bold"><span>Oops!</span>plorer</span>.</p>
      <p className="homepage__paragraph">This humble app is designed to browse blockchains built on <a className="homepage__link" href="https://v1.cosmos.network/sdk" target="_blank">Cosmos SDK</a>; also, it's a training project where I'm learning to JavaScript, React and some other technologies, so please don't be too hard on it.</p>
      <p className="homepage__paragraph">To start exploring, just <span className="homepage__bold">select a chain in the top right corner of your screen</span>.</p>
      <p className="homepage__paragraph">Now, a bit of information about this app:</p>
      <ul className="homepage__list">
        <li className="homepage__list-element">When you select a chain, it fetches an API and shows some statistics about it, such as inflation level, days to unbond, current block height (updating every few seconds), number of all bonded tokens, etc. If some of this data isn't available, you'll see an <span className="homepage__error">"Oops! something went wrong"</span> error — unfortunately, each blockchain has its own features that do not allow me to use some methods on it, so there's nothing I can do about it. The same error is possible if API doesn't work right now — in this case, you can switch to another chain or wait a little.</li>
        <li className="homepage__list-element">Also, it shows current token price in USD taken from <a className="homepage__link" href="https://www.coingecko.com/" target="_blank">CoinGecko</a> via their own API (the second one in this project).</li>
        <li className="homepage__list-element">Besides common chain info, you'll see a set of current validators presented as a table. You can switch between active and inactive set, sort table columns, filter validators by their monikers and, for quickness, fast scroll up and down using buttons in the bottom right corner.</li>
        <li className="homepage__list-element">You can click to any moniker to see its validator operator address and additional info (if it's provided by validator) such as website, security contact and other details.</li>
        <li className="homepage__list-element">Validator avatars are taken from <a className="homepage__link" href="https://github.com/cosmostation/cosmostation_token_resource/tree/master/moniker" target="_blank">Cosmostation repository</a> via <a className="homepage__link" href="https://github.com/octokit/octokit.js" target="_blank">octokit.js</a> — official GitHub REST API client, the third and the last one in <span className="homepage__bold"><span>Oops!</span>plorer</span> at this moment. Also, blockchain descriptions are from Cosmostation too, and to be honest, some logics and design elements of their <a className="homepage__link" href="https://www.mintscan.io/evmos/validators" target="_blank">Mintscan</a> were the things that inspired me to make my own explorer. I hope Cosmostation is not offended.</li>
        <li className="homepage__list-element">If selected chain has active proposals, you can click on it to see details (this feature is WIP). Click on validators number to return to data table.</li>
        <li className="homepage__list-element">This site is designed in "desktop first" paradigm for pretty wide screens like mine. However, I tried to made it adaptive for mobile devices, but as long as that wasn't my first priority, you may find it imperfect in some points — sorry for this.</li>
      </ul>
      <div className="homepage__divider" />
      <p className="homepage__paragraph">If you find some issues or if you have any suggestions about how to improve this website, feel free to send me an email: <a className="homepage__link" href="mailto: virtualxself@gmail.com">virtualxself@gmail.com</a>.</p>
      <p className="homepage__paragraph"><span className="homepage__bold">Thank you for reading this and have a good day!</span></p>
    </section>
  );
}

export default Homepage;
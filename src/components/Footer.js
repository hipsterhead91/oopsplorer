import React from 'react';

function Footer() {

  return (
    <footer className="footer">
      <div className="footer__container">
        <span className="footer__info">avatars provided by <a href="https://github.com/cosmostation/cosmostation_token_resource/tree/master/moniker" target="_blank">Cosmostation</a></span>
        {/* <span className="footer__date">2023</span> */}
        <span className="footer__info">Oops!plorer made by <a href="https://github.com/hipsterhead91" target="_blank">hipsterhead_91</a></span>
        <span className="footer__info">prices provided by <a href="https://www.coingecko.com/" target="_blank">CoinGecko API</a></span>
      </div>
    </footer>
  );
}

export default Footer;
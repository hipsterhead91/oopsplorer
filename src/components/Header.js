import React from 'react';
import { Link, NavLink } from "react-router-dom";

import evmosMainnet from '../chains/evmosMainnet';
import evmosTestnet from '../chains/evmosTestnet';
import CurrentChainContext from '../contexts/CurrentChainContext';
import { capitalize } from '../utils/formatting';

function Header(props) {

  const currentChain = React.useContext(CurrentChainContext);
  const chainList = React.useRef(null);
  const arrow = React.useRef(null);
  const overlay = React.useRef(null);

  const toggleChainList = () => {
    chainList.current.classList.toggle("header__chain-list_hidden");
    arrow.current.classList.toggle("header__switcher-arrow_up");
    overlay.current.classList.toggle("header__overlay_hidden");
  };

  const hideChainList = () => {
    chainList.current.classList.add("header__chain-list_hidden")
    arrow.current.classList.remove("header__switcher-arrow_up");
    overlay.current.classList.add("header__overlay_hidden");
  };

  const switchChain = (chain) => {
    props.setCurrentChain(chain);
    hideChainList();
    window.scrollTo(0, 0); // прокрутка страницы наверх
  }

  const chainText = (currentChain === null) ? 'Chain is not selected' : `${capitalize(currentChain.name)} ${currentChain.isMain ? 'Mainnet' : 'Testnet'}`;
  const chainButtonStyle = ({ isActive }) => isActive ? "header__chain header__chain_selected" : "header__chain";

  const chainFullName = (chain) => `${capitalize(chain.name)} ${chain.isMain ? 'Mainnet' : 'Testnet'}`;
  const chainPath = (chain) => `${chain.name}-${chain.isMain ? 'mainnet' : 'testnet'}`;

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" onClick={() => { switchChain(null) }} className="header__logo">
          <div className="header__logo-top"><span>OOPS</span>plorer</div>
          <div className="header__logo-bottom">Humblest blockchain explorer ever</div>
        </Link>
        <div className="header__chains">
          <div onClick={toggleChainList} className="header__chain-switcher">
            <span className="header__current-chain">{chainText}</span>
            <div className="header__switcher"><span ref={arrow} className="header__switcher-arrow" /></div>
          </div>
          <div ref={chainList} className="header__chain-list header__chain-list_hidden">

            <NavLink to={`/${chainPath(evmosMainnet)}/validators`} onClick={() => { switchChain(evmosMainnet) }} className={chainButtonStyle}>
              {chainFullName(evmosMainnet)} <span>({evmosMainnet.chain})</span>
            </NavLink>

            <NavLink to={`/${chainPath(evmosTestnet)}/validators`} onClick={() => { switchChain(evmosTestnet) }} className={chainButtonStyle}>
              {chainFullName(evmosTestnet)} <span>({evmosTestnet.chain})</span>
            </NavLink>

          </div>
        </div>
      </div>
      <div ref={overlay} onClick={hideChainList} className="header__overlay header__overlay_hidden" />
    </header>
  );
}

export default Header;
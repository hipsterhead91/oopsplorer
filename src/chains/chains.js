import cosmosMainnet from "./mainnets/cosmosMainnet";
import evmosMainnet from "./mainnets/evmosMainnet";
import evmosTestnet from "./testnets/evmosTestnet";
import osmosisMainnet from "./mainnets/osmosisMainnet";
import junoMainnet from "./mainnets/junoMainnet";
import kavaMainnet from "./mainnets/kavaMainnet";
import bandMainnet from "./mainnets/bandMainnet";
import akashMainnet from "./mainnets/akashMainnet";
import crescentMainnet from "./mainnets/crescentMainnet";
import chihuahuaMainnet from "./mainnets/chihuahuaMainnet";
import axelarMainnet from "./mainnets/axelarMainnet";
import kichainMainnet from "./mainnets/kichainMainnet";
import omniflixMainnet from "./mainnets/omniflixMainnet";
import passageMainnet from "./mainnets/passageMainnet";
import secretMainnet from "./mainnets/secretMainnet";

export const chains = [
  akashMainnet,
  axelarMainnet,
  bandMainnet,
  chihuahuaMainnet,
  cosmosMainnet, 
  crescentMainnet,
  evmosMainnet, 
  evmosTestnet,
  junoMainnet,
  kavaMainnet,
  kichainMainnet,
  omniflixMainnet,
  osmosisMainnet,
  passageMainnet,
  secretMainnet,
];

const getCoinGeckoIds = () => {
  const idList = [];
  chains.forEach(chain => {
    if (chain.coinGecko) idList.push(chain.coinGecko)
  });
  return idList.join('%2C%20');
}

export const coinGeckoIds = getCoinGeckoIds();
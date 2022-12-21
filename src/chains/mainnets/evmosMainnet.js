const evmosMainnet = {
  name: "Evmos",
  path: "evmos",
  cosmostation: "evmos",
  coinGecko: "evmos",
  chain: "evmos_9001-2",
  isMain: true,
  denom: "aevmos",
  symbol: "EVMOS",
  decimals: 18,
  api: [
    "https://rest.bd.evmos.org:1317",
    "https://evmos-lcd.stakely.io",
    "https://api.evmos.nodestake.top",
    "https://api.evmos.silknodes.io",
    "https://evmos-rest.publicnode.com",
  ],
  description: "A Cosmos SDK-based IBC & Ethereum Virtual Machine-compatible blockchain."
}

export default evmosMainnet;
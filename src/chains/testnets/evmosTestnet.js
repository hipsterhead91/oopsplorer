const evmosTestnet = {
  name: "Evmos",
  path: "evmos",
  cosmostation: "evmos",
  coinGecko: "",
  chain: "evmos_9001-4",
  isMain: false,
  denom: "atevmos",
  symbol: "TEVMOS",
  decimals: 18,
  api: [
    "https://api-t.evmos.nodestake.top",
    "https://rest.bd.evmos.dev:1317",
    "https://evmos-testnet-lcd.qubelabs.io",
  ],
  description: "A Cosmos SDK-based IBC & Ethereum Virtual Machine-compatible blockchain."
}

export default evmosTestnet;
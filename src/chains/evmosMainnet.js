const evmosMainnet = {
  name: "evmos",
  chain: "evmos_9001-2",
  isMain: true,
  denom: "aevmos",
  symbol: "evmos",
  decimals: 18,
  api: [
    "https://rest.bd.evmos.org:1317",
    "https://evmos-lcd.stakely.io",
    "https://api.evmos.nodestake.top",
    "https://api.evmos.silknodes.io",
    "https://evmos-rest.publicnode.com",
  ],
}

export default evmosMainnet;
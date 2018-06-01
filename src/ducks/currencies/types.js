// @flow

export type currencyDataRes = {|
  id: string,
  name: string,
  key?: string,
  symbol: string,
  rank: string,
  price_usd: number,
  percent_change_24h: number,
  market_cap_usd: number,
  available_supply: number,
  ['24h_volume_usd']: number,
|};

export type currencyData = {|
  id: string,
  name: string,
  key?: string,
  symbol: string,
  rank: string,
  priceUsd: number,
  percentChange24h: number,
  marketCapUsd: number,
  availableSupply: number,
  dailyValue: number,
|};

export type State = {|
  +currenciesList: currencyData[],
  +progressLoad: boolean,
  +progressReload: boolean,
  +error: null | string,
|};

// @flow

export type coinData = {|
  id: string,
  price_usd: number,
  percent_change_24h: number,
  market_cap_usd: number,
  available_supply: number,
  daily_value: number,
|}

export type chartDataPoint = {|
  time: number,
  price: number,
|}

export type chartFilters = 'All' | '3M' | '1M' | '1W' | '24H';

export type State = {|
  +data: null | coinData,
  +chartData: {
    market_cap_by_available_supply: chartDataPoint[],
    price_btc: chartDataPoint[],
    price_usd: chartDataPoint[],
    volume_usd: chartDataPoint[],
  },
  +chartActiveFilter: chartFilters,
  +progressLoad: boolean,
  +progressReload: boolean,
  +error: null | string,
|};

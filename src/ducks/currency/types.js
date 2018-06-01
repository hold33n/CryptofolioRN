// @flow

import type { currencyData } from 'ducks/currencies/types';

export type chartDataPoint = {|
  time: number,
  price: number,
|};

export type chartFilters = 'All' | '3M' | '1M' | '1W' | '24H';

export type State = {|
  +data: null | currencyData,
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

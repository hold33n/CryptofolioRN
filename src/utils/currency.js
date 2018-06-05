// @flow

import type { currencyDataRes, currencyData } from 'ducks/currencies/types';

export const formatPricePrecision = (price: number): string =>
  `$${price >= 1 ? price.toFixed(2) : price.toFixed(6)}`;

export const formatCurrencyData = (el: currencyDataRes): currencyData => ({
  id: el.id,
  name: el.name,
  key: el.id,
  symbol: el.symbol,
  rank: el.rank,
  priceUsd: el.price_usd,
  percentChange24h: el.percent_change_24h,
  marketCapUsd: el.market_cap_usd,
  availableSupply: el.available_supply,
  dailyValue: el['24h_volume_usd'],
});

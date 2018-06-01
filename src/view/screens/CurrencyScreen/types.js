// @flow

import type { chartFilters } from 'ducks/currency/types';
import type { currencyData } from 'ducks/currencies/types';

export type Props = {
  coinData: currencyData,
  progress: boolean,
  progressReload: boolean,
  activeFilter: chartFilters,
  navigator: Object,
};

// @flow

import type {coinData, chartFilters} from '../../../ducks/currency/types';

export type Props = {
  coinData: coinData;
  progress: boolean,
  progressReload: boolean,
  activeFilter: chartFilters,
  navigator: Object,
};
// @flow

import type {chartFilters, chartDataPoint} from 'ducks/currency/types';

export type State = {|
  opacity: 0 | 1
|}


export type Props = {|
  data: chartDataPoint[],
  activeFilter: chartFilters,
  coinId: string,
|}
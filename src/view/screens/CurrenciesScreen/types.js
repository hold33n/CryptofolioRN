// @flow

import type { State as CurrenciesState, currencyData } from 'ducks/currencies/types';

export type CurrencyRowItemProps = {
  item: currencyData,
  selectCurrency: Function,
  navigation: Object,
};

export type CurrenciesScreenProps = {
  ...CurrenciesState,
  searchPhrase: string,
  searchCurrenciesResults: currencyData[],
  navigation: Object,
};

// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { GREY_80 } from 'colors';
import { appName } from 'config';
import CurrencyBlock from 'blocks/CurrencyBlock';
import { styles } from './';
import type { CurrencyRowItemProps } from './types';

export default class CurrencyRowItem extends PureComponent<CurrencyRowItemProps, {}> {
  render() {
    const { item, selectCurrency, navigation } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          selectCurrency();

          navigation.push('CurrencyInfoScreen', {
            activeCurrencyName: item.name,
          });
        }}
        style={styles.item}
      >
        <CurrencyBlock item={item} />
      </TouchableOpacity>
    );
  }
}

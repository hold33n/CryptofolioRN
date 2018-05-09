// @flow
import React, {PureComponent} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import currencyFormatter from 'currency-formatter'
import { GREY_MARKER_BG, GREEN, RED } from 'colors'

type Props = {
  item : {
    name: string,
    symbol: string,
    price_usd: number,
    percent_change_24h: number
  }
}

class CurrencyBlock extends PureComponent<Props> {
  render() {
    
    const { item: {
      name,
      symbol,
      price_usd,
      percent_change_24h
    } } = this.props

    return (
      <View style={styles.currencyContainer}>
        <View style={styles.grid}>
          <View>
            <View style={styles.currencySymbol}>
              <Text style={styles.currencySymbolText}>{price_usd ? symbol : name}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.currencyPrice}>
              {price_usd ?
                (
                  (price_usd >= 1) ? (
                    currencyFormatter.format(price_usd, {
                      symbol: '$',
                      precision: 2,
                    })) : (currencyFormatter.format(price_usd, {
                      symbol: '$',
                      precision: 6,
                    }))
                ) : false}</Text>
            <Text style={styles.currencyChange}>{price_usd ?(
              (percent_change_24h > 0) ? (
                <Text style={styles.priceChangePlus}>+{percent_change_24h}%</Text>
              ) : (
                <Text style={styles.priceChangeMinus}>{percent_change_24h}%</Text>
              )) : false
            }</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currencyContainer: {
    marginBottom: 35,
    // shadowColor: '#242A43',
    // shadowOffset: {
    //   width: 5,
    //   height: 15,
    // },
    // shadowOpacity: .5,
    // shadowRadius: 20
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  currencySymbol: {
    backgroundColor: GREY_MARKER_BG,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 2,
  },
  currencySymbolText: {
    fontFamily: 'Rubik-Medium',
    color: '#fff',
    fontSize:  15,
    lineHeight: 17,
    fontWeight: '600',
  },
  currencyPrice: {
    fontFamily: 'Rubik-Medium',
    color: '#fff',
    fontSize:  17,
    lineHeight: 17,
    fontWeight: '600',
    textAlign: 'right'
  },
  currencyChange: {
    fontFamily: 'Rubik-Medium',
    color: '#8E97B6',
    fontSize:  13,
    lineHeight: 17,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'right'
  },
  priceChangePlus: {
    color: GREEN,
    fontWeight: '600'
  },
  priceChangeMinus: {
    color: RED,
    fontWeight: '600'
  }
})

export default CurrencyBlock

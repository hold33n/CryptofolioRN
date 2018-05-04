import {List, OrderedMap, OrderedSet} from 'immutable'

export function arrayToImmutable(jsArr, RecordType) {
  return jsArr.reduce((acc, el) => {
    return acc.push(new RecordType(el))
  }, new List([]))
}

export function arrayToOrderedMap(jsArr, RecordType) {
  return jsArr.reduce((acc, el) => {
    return acc.set(el.id, new RecordType(el))
  }, new OrderedMap({}))
}


export function chartDataToImmutable(chartData, RecordType) {
  let result = {
    market_cap_by_available_supply: null,
    price_btc: null,
    price_usd: null,
    volume_usd: null,
  }

  const convertChartData = (data) => data.reduce((acc, el) => {
    return acc.add(new RecordType({
      time: el[0],
      price: el[1],
    }))
  }, new OrderedSet([]))

  for (let key in chartData) {
    result[key] = convertChartData(chartData[key])
  }

  return new OrderedMap(result)
}

export function objectToImmutable(jsObj, RecordType) {
  return jsObj.reduce((acc, el) => {
    return acc.set(el.id, new RecordType(el))
  }, new OrderedMap({}))
}

export const filterMessage = (message) => !(/(has joined the channel)/).test(message.text)

export const filterMessagesArray = (messages) => messages.filter((el) => filterMessage(el))
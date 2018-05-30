// @flow


type transaction = {|
  date: number,
  coinId: string,
  type: 'buy' | 'sell',
  coinAmount: number,
  price: number,
  portfolioName: string,
  notes?: string,
|}


export type State = {|
  transactionHistory: transaction[],
  starredCoins: string[],
  portfolios: string[],
  progressLoad: boolean,
  error: null | string,
|}
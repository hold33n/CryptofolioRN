// @flow

export const formatPricePrecision = (price: number): string => {
  return `$${(price >= 1) ? price.toFixed(2) : price.toFixed(6)}`;
};
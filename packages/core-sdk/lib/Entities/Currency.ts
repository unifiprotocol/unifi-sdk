import BigNumber from 'bignumber.js'

import { BN } from '@root/Utils/BigNumber'

export class Currency {
  public readonly decimals: number
  public readonly symbol: string
  public readonly name: string
  public readonly address: string
  public readonly logoURI: string

  constructor(address: string, decimals: number, symbol: string, name: string, logoURI: string) {
    if (!BN(decimals).isInteger() || BN(decimals).isGreaterThan(18)) {
      throw Error('Wrong currency decimals')
    }
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
    this.address = address
    this.logoURI = logoURI
  }

  // human-readable
  toFactorized(amount: BigNumber.Value, decimalPlaces = this.decimals) {
    return BN(amount).dividedBy(BN(10).pow(this.decimals)).dp(decimalPlaces).toFixed()
  }

  // with all the decimals applied = Wei
  toPrecision(amount: BigNumber.Value) {
    return BN(amount).multipliedBy(BN(10).pow(this.decimals)).dp(0).toFixed()
  }

  equals(currency: Currency) {
    return this.address === currency.address
  }

  sortsBefore(other: Currency) {
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

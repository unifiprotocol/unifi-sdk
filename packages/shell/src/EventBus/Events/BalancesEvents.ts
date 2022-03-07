import { Currency } from "@unifiprotocol/utils";
import { BaseEvent } from "../BaseEvent";

export const RefreshBalancesEvent = Symbol("RefreshBalancesEvent");
export const WipeEvent = Symbol("WipeEvent");
export const AddCurrencyEvent = Symbol("AddCurrencyEvent");

export class RefreshBalances extends BaseEvent<void> {
  constructor() {
    super(RefreshBalancesEvent);
  }
}

export class Wipe extends BaseEvent<void> {
  constructor() {
    super(WipeEvent);
  }
}

export class AddCurrency extends BaseEvent<Currency> {
  constructor(currency: Currency) {
    super(AddCurrencyEvent, currency);
  }
}

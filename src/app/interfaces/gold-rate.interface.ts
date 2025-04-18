// src/app/api/gold-rate.interface.ts
export interface GoldRate {
    timestamp: number;
    metal: string;
    currency: string;
    exchange: string;
    symbol: string;
    open_time: number;
    ask: number;
    bid: number;
    price: number;
    ch: number;
    price_gram_24k: number;
    price_gram_22k: number;
    price_gram_21k: number;
    price_gram_20k: number;
    price_gram_18k: number;
    price_gram_16k: number;
    price_gram_14k: number;
    price_gram_10k: number;
  }

  /**
   *  why did we add here!
    creditSuppliers: number;
    creditCurrency: string;
    badDebts: number;
    badDebtsCurrency: string;
    partnershipWithdrawals: number;
    partnershipCurrency: string;
    loansFromFriends: number;
    friendsLoanCurrency: string;
    loansFromBanks: number;
    bankLoanCurrency: string;
    pendingTaxes: number;
    taxCurrency: string;
   */
  

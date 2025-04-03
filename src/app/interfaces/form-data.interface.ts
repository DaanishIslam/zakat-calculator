// src\app\interfaces\form-data.interface.ts
// Define an interface for your form data
export interface FormData {
  gold24K: number | null;
  gold22K: number | null;
  gold18K: number | null;
  miscGold: number | null;
  silver: number | null;
  preciousStones: number | null;
  cashInHand: number | null;
  cashCurrency: string;
  bankBalance: number | null;
  bankCurrency: string;
  loansReceived: number | null;
  loanCurrency: string;
  investmentsGross: number | null;
  investmentCurrency: string;
  ppfGross: number | null;
  ppfCurrency: string;
  cryptoGross: number | null;
  cryptoCurrency: string;
  creditSuppliers: number | null;
  creditCurrency: string;
  badDebts: number | null;
  badDebtsCurrency: string;
  partnershipWithdrawals: number | null;
  partnershipCurrency: string;
  loansFromFriends: number | null;
  friendsLoanCurrency: string;
  loansFromBanks: number | null;
  bankLoanCurrency: string;
  pendingTaxes: number | null;
  taxCurrency: string;
  animalOption: string;
  animalAmount: number | null;
  animalPrice: number | null;
  animalCurrency: string;
  agriRainValue: number | null;
  agriRainCurrency: string;
  agriHybridValue: number | null;
  agriHybridCurrency: string;

  agriIrrigationValue: number | null;
  agriIrrigationCurrency: string;
  firmCapital: number | null;
  firmCurrency: string;
  firmLoan: number | null;
  firmLoanCurrency: string;
  firmProfit: number | null;
  firmProfitCurrency: string;
  rentalCurrency: string;
  businessShares: number | null;
  sharesCurrency: string;
  deadStocks: number | null;
  deadStocksCurrency: string;
  creditSales: number | null;
  creditSalesCurrency: string;
  landCurrency: string;
  rentalRevenue: number | null;
  landValue: number | null;
  // Add additional fields if needed
}

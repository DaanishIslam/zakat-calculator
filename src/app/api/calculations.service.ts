// src\app\api\calculations.service.ts
import { Injectable } from "@angular/core";
import { GoldService } from "./gold.service";
import { FormDataService } from "./form-data.service";
import { Observable, forkJoin, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { GoldRate } from "../interfaces/gold-rate.interface";
import { FormData } from "../interfaces/form-data.interface";
import { CurrencyService } from "./currency.service";

export interface CalculationResult {
  netAssets: number;
  nisabValue: number;
  zakat: number;
}

@Injectable({
  providedIn: "root",
})
export class CalculationsService {
  private nisabThreshold: number = 87.48; // Nisab threshold in grams of gold

  private totalAssets: number = 0;
  private totalLiabilities: number = 0;

  constructor(
    private goldService: GoldService,
    private formDataService: FormDataService,
    private currencyService: CurrencyService
  ) {}

  // Getter methods to expose the private properties
  getTotalAssets(): number {
    return this.totalAssets;
  }

  getTotalLiabilities(): number {
    return this.totalLiabilities;
  }

  /**
   * Fetch required gold and silver rates, then compute Zakat
   */

  calculateZakat(): Observable<CalculationResult> {
    const defaultCurrency = this.formDataService.defaultCurrency;

    // Use stored values if available, otherwise call the API.
    const goldRates$ = this.goldService.goldRateData
      ? of(this.goldService.goldRateData)
      : this.goldService
          .getGoldRate("XAU", defaultCurrency)
          .pipe(catchError(() => of(null)));

    const silverRates$ = this.goldService.silverRateData
      ? of(this.goldService.silverRateData)
      : this.goldService
          .getGoldRate("XAG", defaultCurrency)
          .pipe(catchError(() => of(null)));

    return forkJoin({
      goldRates: goldRates$,
      silverRates: silverRates$,
    }).pipe(
      map(({ goldRates, silverRates }) => {
        if (!goldRates) throw new Error("Gold rate fetch failed");
        if (!silverRates) throw new Error("Silver rate fetch failed");

        const formData = this.formDataService.formData as FormData;
        this.totalAssets = this.calculateTotalAssets(
          formData,
          goldRates,
          silverRates
        );

        this.totalLiabilities = this.calculateTotalLiabilities(formData);

        const netAssets = this.totalAssets - this.totalLiabilities;

        // Determine the per-gram gold price.
        // If the primary API (GoldAPI) was used, goldRates will have a property "price_gram_24k".
        // Otherwise, if the alternative API was used, we assume its "Ask" property holds the per-gram price.
        const goldPrice24k = goldRates.price_gram_24k ?? (goldRates as any).Ask ??0;
        
        const nisabValue = this.nisabThreshold * goldPrice24k;

        // const nisabValue = this.nisabThreshold * goldRates.price_gram_24k;
        const zakat = netAssets * 0.025; // 2.5% Zakat calculation
        // alert(`total=${this.totalAssets}, liability=${this.totalLiabilities}`);

        return { netAssets, nisabValue, zakat };
      }),
      catchError(() => of({ netAssets: 0, nisabValue: 0, zakat: 0 }))
    );
  }

  private calculateTotalAssets(
    formData: FormData,
    goldRates: GoldRate,
    silverRates: GoldRate
  ): number {
    let total = 0;

    // Gold Assets
    // total += formData.gold24K ? formData.gold24K * goldRates.price_gram_24k : 0;
    // total += formData.gold22K ? formData.gold22K * goldRates.price_gram_22k : 0;
    // total += formData.gold18K ? formData.gold18K * goldRates.price_gram_18k : 0;
    // total += formData.miscGold? formData.miscGold * goldRates.price_gram_24k: 0;

    // Silver Assets
    // total += formData.silver ? formData.silver * silverRates.price_gram_24k : 0;

     // Retrieve per-gram prices for different gold purities.
     const price24k = goldRates.price_gram_24k ?? this.convertToDefault(((goldRates as any).Ask), 'USD' )?? 0;
     const price22k = goldRates.price_gram_22k ?? this.convertToDefault(((goldRates as any).Ask), 'USD' )?? 0;
     const price18k = goldRates.price_gram_18k ?? this.convertToDefault(((goldRates as any).Ask), 'USD' )?? 0;
 
     // Check if all returned values are identical.
     let goldPrice24k = price24k;
     let goldPrice22k = price22k;
     let goldPrice18k = price18k;
     if (goldPrice24k === goldPrice22k && goldPrice24k === goldPrice18k) {
       // Use a single price for all gold inputs.
       goldPrice22k = goldPrice18k = goldPrice24k;
     }
     
     // Gold Assets: multiply the number of grams by the appropriate per-gram rate.
     total += formData.gold24K ? formData.gold24K * goldPrice24k : 0;
     total += formData.gold22K ? formData.gold22K * goldPrice22k : 0;
     total += formData.gold18K ? formData.gold18K * goldPrice18k : 0;
     total += formData.miscGold ? formData.miscGold * goldPrice24k : 0;
 
     // Silver Assets: use the 24K rate (or Ask value) for silver.
     const silverPrice = silverRates.price_gram_24k ?? this.convertToDefault(((silverRates as any).Ask), 'USD' ) ?? 0;
     total += formData.silver ? formData.silver * silverPrice : 0;
     
    // Financial Assets
    total += this.convertToDefault(formData.cashInHand, formData.cashCurrency);
    total += this.convertToDefault(formData.bankBalance, formData.bankCurrency);
    total += this.convertToDefault(
      formData.loansReceived,
      formData.loanCurrency
    );
    total += this.convertToDefault(
      formData.investmentsGross,
      formData.investmentCurrency
    );
    total += this.convertToDefault(formData.ppfGross, formData.ppfCurrency);
    total += this.convertToDefault(
      formData.cryptoGross,
      formData.cryptoCurrency
    );

    // Business Assets
    total += this.convertToDefault(
      formData.businessShares,
      formData.sharesCurrency
    );
    total += this.convertToDefault(
      formData.deadStocks,
      formData.deadStocksCurrency
    );
    total += this.convertToDefault(
      formData.creditSales,
      formData.creditSalesCurrency
    );

    // Real Estate
    total += this.convertToDefault(formData.landValue, formData.landCurrency);
    total += this.convertToDefault(
      formData.rentalRevenue,
      formData.rentalCurrency
    );

    // Partnership
    total += this.convertToDefault(formData.firmCapital, formData.firmCurrency);
    total += this.convertToDefault(
      formData.firmProfit,
      formData.firmProfitCurrency
    );

    // Agriculture Calculations
    if (formData.agriRainValue) {
      total +=
        formData.agriRainValue *
        0.1 * // 10% rate
        this.convertToDefault(1, formData.agriRainCurrency);
    }
    if (formData.agriIrrigationValue) {
      total +=
        formData.agriIrrigationValue *
        0.05 * // 5% rate
        this.convertToDefault(1, formData.agriIrrigationCurrency);
    }
    if (formData.agriHybridValue) {
      total +=
        formData.agriHybridValue *
        0.075 * // 7.5% rate
        this.convertToDefault(1, formData.agriHybridCurrency);
    }

    // Livestock (assuming animalAmount is in SAR)
    total += this.convertToDefault(
      formData.animalPrice,
      formData.animalCurrency
    );

    return total;
  }

  private calculateTotalLiabilities(formData: FormData): number {
    let total = 0;

    // Debts and Loans
    total += this.convertToDefault(
      formData.creditSuppliers,
      formData.creditCurrency
    );
    total += this.convertToDefault(
      formData.badDebts,
      formData.badDebtsCurrency
    );
    total += this.convertToDefault(
      formData.partnershipWithdrawals,
      formData.partnershipCurrency
    );
    total += this.convertToDefault(
      formData.loansFromFriends,
      formData.friendsLoanCurrency
    );
    total += this.convertToDefault(
      formData.loansFromBanks,
      formData.bankLoanCurrency
    );
    total += this.convertToDefault(
      formData.firmLoan,
      formData.firmLoanCurrency
    );

    // Taxes
    total += this.convertToDefault(formData.pendingTaxes, formData.taxCurrency);

    return total;
  }

  private convertToDefault(amount: number | null, currency: string): number {
    if (!amount || !currency) return 0; // Return 0 if amount or currency is missing

    if (currency === this.formDataService.defaultCurrency) {
      return amount; // No conversion needed if it's already in the default currency
    }

    const rate = this.currencyService.storedConversions[currency];
    return rate ? amount * rate : amount; // Convert if rate exists, else return the amount
  }
}

/* /* Calculate total assets
   
  private calculateTotalAssets(
    formData: FormData,
    goldRates: GoldRate,
    silverRates: GoldRate
  ): number {
    let total = 0;
    total += formData.gold24K ? formData.gold24K * goldRates.price_gram_24k : 0;
    total += formData.gold22K ? formData.gold22K * goldRates.price_gram_22k : 0;
    total += formData.gold18K ? formData.gold18K * goldRates.price_gram_18k : 0;
    total += formData.silver ? formData.silver * silverRates.price_gram_24k : 0;
    total += this.convertToDefault(formData.cashInHand, formData.cashCurrency);
    total += this.convertToDefault(formData.bankBalance, formData.bankCurrency);
    total += this.convertToDefault(
      formData.investmentsGross,
      formData.investmentCurrency
    );
    return total;
  }

  
  //  * Calculate total liabilities
   
  private calculateTotalLiabilities(formData: FormData): number {
    let total = 0;
    total += this.convertToDefault(formData.loansFromFriends,formData.friendsLoanCurrency);
    total += this.convertToDefault(formData.loansFromBanks,formData.bankLoanCurrency);
    total += this.convertToDefault(formData.pendingTaxes, "SAR");
    return total;
  }

  
  //  * Convert currency to SAR (Mock function, replace with API call if needed)
   
  private convertToDefault(amount: number | null, currency: string): number {
    if (!amount || !currency) return 0;
    return amount * 1; // Placeholder conversion rate
  }
    */

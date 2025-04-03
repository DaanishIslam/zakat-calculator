// src\app\api\currency.service.ts
import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

// call the import for environmental file:
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  currencies: string[] = [
    "SAR",
    "INR",
    "USD",
    "AED",
    "BHD",
    "KWD",
    "OMR",
    "QAR",
    "EGP",
    "YER",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "FOK",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KID",
    "KMF",
    "KRW",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRU",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLE",
    "SOS",
    "SRD",
    "SSP",
    "STN",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TVD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "UYU",
    "UZS",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XCD",
    "XDR",
    "XOF",
    "XPF",
    "ZMW",
    "ZWL",
  ];

  getCurrencies(): string[] {
    return this.currencies;
  }

  constructor(private http: HttpClient) {}

  /**
   * Fetches the conversion rate and result between two currencies.
   * @param baseCurrency - The base currency code (e.g., EUR)
   * @param targetCurrency - The target currency code (e.g., GBP)
   * @param amount - (Optional) An amount to convert
   * @returns An Observable with the conversion data
   */

  getConversionRate(
    baseCurrency: string,
    targetCurrency: string,
    amount?: number
  ): Observable<any> {
    if (!baseCurrency || !targetCurrency) {
      return throwError(() => new Error("Base or target currency is missing"));
    }
    let url = `${environment.apiurls.exchangeBaseUrl}${environment.apikeys.exchangeapikey}/pair/${baseCurrency}/${targetCurrency}`;
    if (amount !== undefined) {
      url += `/${amount}`;
    }
    return this.http.get<any>(url);
  }

  // Object to store conversion rates by currency code.
  public storedConversions: { [currency: string]: number } = {};

  /**
   * Stores a conversion rate for later use.
   * @param currency The original currency code.
   * @param rate The conversion rate to the default currency.
   */
  storeConversionRate(currency: string, rate: number): void {
    this.storedConversions[currency] = rate;
  }
}

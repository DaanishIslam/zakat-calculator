// src\app\api\gold.service.ts

/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// call the import for environmental file:
import { environment } from '../../environments/environment';

// import goldrate interface:
import { GoldRate } from '../interfaces/gold-rate.interface';

@Injectable({
  providedIn: 'root'
})

export class GoldService {

  // private variable:
  private baseUrl = environment.apiurls.goldBaseUrl;
  private apiKey = environment.apikeys.goldapiKey;
  
  
  // Store fetched gold and silver rates for later use.
  public goldRateData: GoldRate | null = null;
  public silverRateData: GoldRate | null = null;

  // Set up headers as specified by the goldapi.io documentation:
  private headers = new HttpHeaders({
    'x-access-token': this.apiKey,
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  // method to get the gold rates:
  // default params: symbol 'XAU' and currency 'SAR'
  getGoldRate(symbol: string = "XAU", currency: string = "SAR"): Observable<GoldRate> {
    const URL = `${this.baseUrl}/${symbol}/${currency}`;
    return this.http.get<GoldRate>(URL, { headers: this.headers }).pipe(
      tap((data: GoldRate) => {
        if (symbol === 'XAU') {
          this.goldRateData = data;
        } else if (symbol === 'XAG') {
          this.silverRateData = data;
        }
      })
    );
  }
}


*/

// src/app/api/gold.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { GoldRate } from "../interfaces/gold-rate.interface";
import { FormDataService } from "./form-data.service";
import { CurrencyService } from "./currency.service";

@Injectable({
  providedIn: "root",
})

/*
export class GoldService {
  private baseUrl = environment.apiurls.goldBaseUrl;
  private apiKey = environment.apikeys.goldapiKey;
  private freeGoldPriceUrl = environment.apiurls.freeGoldPriceBaseUrl;
  private freeGoldPriceApiKey = "tryfree"; //environment.apikeys.freeGoldPriceApiKey; 

  public goldRateData: GoldRate | null = null;
  public silverRateData: GoldRate | null = null;
  public errorMessage: string | null = null;
  public goldPricePerGram = 0;
  public silverPricePerGram = 0;

  private headers = new HttpHeaders({
    "x-access-token": this.apiKey,
    "Content-Type": "application/json",
  });

  constructor(private http: HttpClient) {}

  getGoldRate(
    symbol: string = "XAU",
    currency: string = "SAR"
  ): Observable<GoldRate | null> {
    const cacheKey = `goldRateData_${symbol}_${currency}`;
    const cachedDataStr = localStorage.getItem(cacheKey);
    const today = new Date();

    if (cachedDataStr) {
      try {
        const cachedData = JSON.parse(cachedDataStr);
        const cachedDate = new Date(cachedData.timestamp * 1000);
        if (this.isSameDay(cachedDate, today) && cachedData.data) {
          return of(cachedData.data);
        }
      } catch (e) {
        console.error("Error parsing cached data:", e);
      }
    }

    const primaryUrl = `${this.baseUrl}/${symbol}/${currency}`;
    return this.http.get<GoldRate>(primaryUrl, { headers: this.headers }).pipe(
      tap((data: GoldRate) => {
        this.cacheGoldRate(data, cacheKey);
      }),
      catchError((err) => {
        console.error("Primary API failed:", err);
        this.errorMessage = "Primary API failed, trying alternative API.";
        return this.fetchFromFreeGoldPrice();
      })
    );
  }

  private fetchFromFreeGoldPrice(): Observable<any | null> {
    const url = `${this.freeGoldPriceUrl}?key=${this.freeGoldPriceApiKey}&action=GSJ`;

    let altGoldSilverData = this.http.get<any>(url);

    return altGoldSilverData.pipe(
      tap((response) => {
        if (response && response.GSJ) {
          const unit = response.GSJ.unit;
          const goldPricePerOunce = response.GSJ.Gold.USD.Ask;
          const silverPricePerOunce = response.GSJ.Silver.USD.Ask;

          this.goldPricePerGram = goldPricePerOunce;
          this.silverPricePerGram = silverPricePerOunce;

          if (unit === "ounce") {
            // alert(
            //   `Value in ounces: Gold: ${goldPricePerOunce}, Silver: ${silverPricePerOunce}`
            // );
            this.goldPricePerGram = goldPricePerOunce / 31.1034768;
            this.silverPricePerGram = silverPricePerOunce / 31.1034768;
            // alert(
            //   `Value converted in grams: Gold: ${goldPricePerGram}, Silver: ${silverPricePerGram}`
            // );
          }

          // Update the response object with converted values
          response.GSJ.Gold.USD.Ask = this.goldPricePerGram;
          response.GSJ.Silver.USD.Ask = this.silverPricePerGram;
          response.GSJ.unit = "gram"; // Updating unit for consistency

          // Store in localStorage
          localStorage.setItem(
            "goldRateData_GSJ",
            JSON.stringify({
              timestamp: Math.floor(Date.now() / 1000),
              data: response.GSJ.Gold.USD,
            })
          );
          localStorage.setItem(
            "silverRateData_GSJ",
            JSON.stringify({
              timestamp: Math.floor(Date.now() / 1000),
              data: response.GSJ.Silver.USD,
            })
          );

          // Assign values to class properties
          this.goldRateData = response.GSJ.Gold.USD;
          this.silverRateData = response.GSJ.Silver.USD;
        }
      }),
      catchError((err) => {
        console.error("Alternative API failed:", err);
        this.errorMessage = "Both primary and alternative API calls failed.";
        return of(null);
      })
    );
  }

  private cacheGoldRate(data: GoldRate, cacheKey: string): void {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ timestamp: Math.floor(Date.now() / 1000), data })
    );
    this.goldRateData = data;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}*/
export class GoldService {
  private baseUrl = environment.apiurls.goldBaseUrl;
  private apiKey = environment.apikeys.goldapiKey;
  private freeGoldPriceUrl = environment.apiurls.freeGoldPriceBaseUrl;
  private freeGoldPriceApiKey = "tryfree";

  public goldRateData: GoldRate | null = null;
  public silverRateData: GoldRate | null = null;
  public errorMessage: string | null = null; // ← declare it here

  private headers = new HttpHeaders({
    "x-access-token": this.apiKey,
    "Content-Type": "application/json",
  });

  constructor(
    private http: HttpClient,
    private formDataService: FormDataService,
    private currencyService: CurrencyService
  ) {}

  /** symbol = "XAU" or "XAG", currency e.g. "SAR" */
  getGoldRate(
    symbol: "XAU" | "XAG" = "XAU",
    currency: string = "SAR"
  ): Observable<GoldRate | null> {
    const cacheKey = `goldRateData_${symbol}_${currency}`;
    const cachedDataStr = localStorage.getItem(cacheKey);
    const today = new Date();

    if (cachedDataStr) {
      try {
        const { timestamp, data } = JSON.parse(cachedDataStr);
        if (this.isSameDay(new Date(timestamp * 1000), today)) {
          // use cached
          if (symbol === "XAU") this.goldRateData = data;
          else this.silverRateData = data;
          return of(data);
        }
      } catch {
        /* swallow parse errors */
      }
    }

    const primaryUrl = `${this.baseUrl}/${symbol}/${currency}`;
    return this.http.get<GoldRate>(primaryUrl, { headers: this.headers }).pipe(
      tap((data) => this.cacheGoldRate(symbol, data, cacheKey)),
      catchError((err) => {
        console.error("Primary API failed:", err);
        this.errorMessage = "Primary API failed, trying backup API.";
        // pass symbol & currency down so backup knows which metal to set
        return this.fetchFromFreeGoldPrice(symbol).pipe(
          // coerce to GoldRate|null
          map((backup) => backup as GoldRate | null)
        );
      })
    );
  }

  /**
   * Backup fetch; returns an object shaped like GoldRate but
   * only with the per‑gram Ask price injected.
   */
  // Modified fetchFromFreeGoldPrice method
  private fetchFromFreeGoldPrice(
    symbol: "XAU" | "XAG"
  ): Observable<Partial<GoldRate> | null> {
    const url = `${this.freeGoldPriceUrl}?key=${this.freeGoldPriceApiKey}&action=GSJ`;
    return this.http.get<any>(url).pipe(
      switchMap((response) => {
        if (!response?.GSJ) throw new Error("Invalid backup response");
  
        const defaultCurrency = this.formDataService.defaultCurrency || "USD";
        const unit = response.GSJ.unit;
        let rawGoldOunce = response.GSJ.Gold.USD.Ask;
        let rawSilverOunce = response.GSJ.Silver.USD.Ask;
  
        let goldPerGram = unit === "ounce" ? rawGoldOunce / 31.1034768 : rawGoldOunce;
        let silverPerGram = unit === "ounce" ? rawSilverOunce / 31.1034768 : rawSilverOunce;
  
        if (defaultCurrency !== "USD") {
          const conversionKey = `USD${defaultCurrency}`;
          const storedRate = this.currencyService.storedConversions[conversionKey];
  
          // If rate exists, use it immediately
          if (storedRate) {
            goldPerGram *= storedRate;
            silverPerGram *= storedRate;
            return of({ goldPerGram, silverPerGram, defaultCurrency, symbol, response });
          }
  
          // If rate doesn't exist, fetch it from exchange API
          return this.currencyService.getConversionRate('USD', defaultCurrency).pipe(
            switchMap(exchangeData => {
              const rate = exchangeData.conversion_rate;
              this.currencyService.storeConversionRate(conversionKey, rate);
              
              goldPerGram *= rate;
              silverPerGram *= rate;
              
              return of({ goldPerGram, silverPerGram, defaultCurrency, symbol, response });
            }),
            catchError(err => {
              console.error("Currency conversion failed, using USD:", err);
              return of({ goldPerGram, silverPerGram, defaultCurrency: "USD", symbol, response });
            })
          );
        }
  
        return of({ goldPerGram, silverPerGram, defaultCurrency, symbol, response });
      }),
      map(({ goldPerGram, silverPerGram, defaultCurrency, symbol, response }) => {
        const fallback: Partial<GoldRate> = {
          timestamp: Date.now(),
          metal: symbol,
          currency: defaultCurrency,
          exchange: "freegoldprice.org",
          symbol: symbol === "XAU" ? "GOLD" : "SILVER",
          price_gram_24k: goldPerGram,
          price_gram_22k: goldPerGram * (22 / 24),
          price_gram_18k: goldPerGram * (18 / 24),
          ask: goldPerGram,
          bid: goldPerGram,
          price: goldPerGram,
        };
  
        if (symbol === "XAU") {
          this.goldRateData = fallback as GoldRate;
        } else {
          this.silverRateData = {
            ...fallback,
            price_gram_24k: silverPerGram,
            ask: silverPerGram,
            bid: silverPerGram,
            price: silverPerGram,
          } as GoldRate;
        }
  
        return fallback;
      }),
      catchError((err) => {
        console.error("Backup API failed:", err);
        this.errorMessage = "Both primary and backup API calls failed.";
        return of(null);
      })
    );
  }

  private cacheGoldRate(
    symbol: "XAU" | "XAG",
    data: GoldRate,
    cacheKey: string
  ) {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ timestamp: Math.floor(Date.now() / 1000), data })
    );
    if (symbol === "XAU") this.goldRateData = data;
    else this.silverRateData = data;
  }

  private isSameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
}

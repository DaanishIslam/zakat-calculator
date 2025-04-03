// src\app\api\gold.service.ts

import { Injectable } from '@angular/core';
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

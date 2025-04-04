// src\app\components\results-display\results-display.component.ts
import { Component } from '@angular/core';
import { CalculationsService, CalculationResult } from '../../api/calculations.service';
import { GoldService } from '../../api/gold.service';
import { FormDataService } from '../../api/form-data.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.css'],
  imports:[CommonModule]
})
export class ResultsDisplayComponent {
  goldRate: any;
  silverRate: any;
  exchangeRates: { [currency: string]: number } = {};
  defaultCurrency: string = '';
  goldPricePerGram = 0;
  silverPricePerGram = 0;
  
  totalAssets: number = 0;
  totalLiabilities: number = 0;
  grossAssets: number = 0;
  netAssets: number = 0;
  nisabValue: number = 0;
  zakat: number = 0;

  constructor(
    private calcService: CalculationsService,
    private goldService: GoldService,
    private formDataService: FormDataService
  ) {}

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ngOnInit(): void {
    // Retrieve default currency and metal rates from services.
    this.defaultCurrency = this.formDataService.defaultCurrency;
    this.goldRate = this.goldService.goldRateData;
    this.silverRate = this.goldService.silverRateData;

    // get second api:
    this.goldPricePerGram = this.goldService.goldPricePerGram;
    this.silverPricePerGram = this.goldService.silverPricePerGram;

    this.totalAssets = this.calcService.getTotalAssets();
    this.totalLiabilities = this.calcService.getTotalLiabilities();
    
    // Assume that exchangeRates were stored in CurrencyService; 
    // for now, you can obtain them from a shared service or pass them via a route.
    // e.g., this.exchangeRates = this.currencyService.storedConversions;

    // Call the calculation service to get the final results.
    this.calcService.calculateZakat().subscribe((result: CalculationResult) => {
      this.netAssets = result.netAssets;
      this.nisabValue = result.nisabValue;
      this.zakat = result.zakat;
      // You can calculate totalAssets, totalLiabilities, and grossAssets similarly,
      // if you expose such helper methods or store them in your FormDataService.
    });
  }
}


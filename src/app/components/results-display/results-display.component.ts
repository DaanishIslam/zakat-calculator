// src\app\components\results-display\results-display.component.ts
import { Component } from "@angular/core";
import {
  CalculationsService,
  CalculationResult,
} from "../../api/calculations.service";
import { GoldService } from "../../api/gold.service";
import { FormDataService } from "../../api/form-data.service";
import { CommonModule } from "@angular/common";
import { CurrencyService } from "../../api/currency.service";
@Component({
  selector: "app-results-display",
  templateUrl: "./results-display.component.html",
  styleUrls: ["./results-display.component.css"],
  imports: [CommonModule],
})
export class ResultsDisplayComponent {
  goldRate: any;
  silverRate: any;
  exchangeRates: { [currency: string]: number } = {};
  defaultCurrency: string = "";
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
    private formDataService: FormDataService,
    private currencyService: CurrencyService
  ) {}

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ngOnInit(): void {
    // Load default currency and exchange rates
    this.defaultCurrency = this.formDataService.defaultCurrency;
    this.exchangeRates = this.currencyService.storedConversions || {};

    // Load gold and silver rate data
    this.goldRate = this.goldService.goldRateData;
    this.silverRate = this.goldService.silverRateData;

    // Convert metal rates to default currency if needed
    // this.convertRatesToDefaultCurrency();

    // Load financial data
    this.totalAssets = this.calcService.getTotalAssets();
    this.totalLiabilities = this.calcService.getTotalLiabilities();

    // Run Zakat calculation
    this.calcService.calculateZakat().subscribe((result: CalculationResult) => {
      this.netAssets = result.netAssets;
      this.nisabValue = result.nisabValue;
      this.zakat = result.zakat;
    });
  }
}

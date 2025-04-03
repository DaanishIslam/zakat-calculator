// src\app\form-steps\stepper-8\stepper-8.component.ts
import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionPanel } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import { FormDataService } from "../../api/form-data.service";
import { PanelService } from "../../api/panel.service";
import { CommonModule } from "@angular/common";
import { MatStepper } from "@angular/material/stepper";
import { CalculationsService } from "../../api/calculations.service";
import { CurrencyService } from "../../api/currency.service";
import { forkJoin, map } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-stepper-8",
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
  ],
  templateUrl: "./stepper-8.component.html",
  styleUrl: "./stepper-8.component.css",
  encapsulation: ViewEncapsulation.None,
})
export class Stepper8Component implements OnInit {
  @Input() stepper!: MatStepper;

  currencies: string[] = [];
  get currencylist() {
    return this.currencies;
  }
  get formData() {
    return this.fds.formData;
  }

  constructor(
    private fds: FormDataService,
    private panelService: PanelService,
    private calculationsService: CalculationsService,
    private currencyService: CurrencyService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Get currency list (pure array)
    this.currencies = this.currencyService.getCurrencies();
  }
  nextStep(): void {
    this.fds.nextStep(this.stepper);
  }
  previousStep(): void {
    this.fds.previousStep(this.stepper);
  }

  onSubmit(): void {
    console.log("Submitted Form Data:", this.fds.formData);
    const defaultCurrency = this.fds.defaultCurrency;
    // Cast formData as a Record for easier indexing.
    const formData = this.fds.formData as Record<string, any>;

    // Define a mapping of amount fields and their corresponding currency fields.
    const currencyMappings: Array<{
      amountField: string;
      currencyField: string;
    }> = [
      { amountField: "cashInHand", currencyField: "cashCurrency" },
      { amountField: "bankBalance", currencyField: "bankCurrency" },
      { amountField: "loansReceived", currencyField: "loanCurrency" },
      { amountField: "investmentsGross", currencyField: "investmentCurrency" },
      { amountField: "ppfGross", currencyField: "ppfCurrency" },
      { amountField: "cryptoGross", currencyField: "cryptoCurrency" },
      { amountField: "creditSuppliers", currencyField: "creditCurrency" },
      { amountField: "badDebts", currencyField: "badDebtsCurrency" },
      {
        amountField: "partnershipWithdrawals",
        currencyField: "partnershipCurrency",
      },
      { amountField: "loansFromFriends", currencyField: "friendsLoanCurrency" },
      { amountField: "loansFromBanks", currencyField: "bankLoanCurrency" },
      { amountField: "pendingTaxes", currencyField: "taxCurrency" },
    ];

    // Group fields that require conversion because their currency is not the default.
    const conversionGroups: {
      [key: string]: Array<{ field: string; amount: number }>;
    } = {};
    currencyMappings.forEach((mapping) => {
      const amount = formData[mapping.amountField];
      const currency = formData[mapping.currencyField];
      if (amount != null && currency && currency !== defaultCurrency) {
        if (!conversionGroups[currency]) {
          conversionGroups[currency] = [];
        }
        conversionGroups[currency].push({ field: mapping.amountField, amount });
      }
    });

    // Create an observable for each distinct currency needing conversion.
    const conversionObservables = Object.keys(conversionGroups).map(
      (currencyCode) =>
        this.currencyService
          .getConversionRate(currencyCode, defaultCurrency, 1)
          .pipe(
            map((response) => ({
              currency: currencyCode,
              rate: response.conversion_rate || response.conversion_result,
              fields: conversionGroups[currencyCode],
            }))
          )
    );

    if (conversionObservables.length > 0) {
      forkJoin(conversionObservables).subscribe({
        next: (results) => {
          // Build a map of conversion rates and log each rate.
          results.forEach(({ currency, rate, fields }) => {
            console.log(
              `Exchange rate for ${currency} to ${defaultCurrency}: ${rate}`
            );
            // Store the conversion rate in the CurrencyService for later use.
            this.currencyService.storeConversionRate(currency, rate);
            // Update each field in this currency group.
            fields.forEach(({ field }) => {
              const originalAmount = formData[field];
              formData[field] = originalAmount * rate;
              // Update the corresponding currency field to the default currency.
              const mapping = currencyMappings.find(
                (m) => m.amountField === field
              );
              if (mapping) {
                formData[mapping.currencyField] = defaultCurrency;
              }
            });
          });
          // After all conversions, calculate Zakat.
          this.calculationsService.calculateZakat().subscribe({
            next: (result) => {
              console.log("Net Assets:", result.netAssets);
              console.log("Nisab Value:", result.nisabValue);
              console.log("Zakat Calculated:", result.zakat);
              this.router.navigate(["/results"]);
            },
            error: (error) => console.error("Error calculating Zakat:", error),
            complete: () => console.log("Zakat calculation complete."),
          });
        },
        error: (error) => {
          console.error("Error during currency conversions:", error);
          // If conversion fails, calculate Zakat without conversion.
          this.calculationsService.calculateZakat().subscribe({
            next: (result) => {
              console.log("Net Assets:", result.netAssets);
              console.log("Nisab Value:", result.nisabValue);
              console.log("Zakat Calculated:", result.zakat);
            },
            error: (error) => console.error("Error calculating Zakat:", error),
            complete: () => console.log("Zakat calculation complete."),
          });
        },
      });
    } else {
      // No conversion needed; directly calculate Zakat.
      this.calculationsService.calculateZakat().subscribe({
        next: (result) => {
          console.log("Net Assets:", result.netAssets);
          console.log("Nisab Value:", result.nisabValue);
          console.log("Zakat Calculated:", result.zakat);
          this.router.navigate(["/results"]);
        },
        error: (error) => console.error("Error calculating Zakat:", error),
        complete: () => console.log("Zakat calculation complete."),
      });
    }
  }

  openLiabilitiesPanel(): void {
    this.panelService.openLiabilitiesPanel();
  }
}

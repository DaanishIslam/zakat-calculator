// src\app\api\form-data.service.ts
import { Injectable } from "@angular/core";
import { MatExpansionPanel } from "@angular/material/expansion";
import { MatStepper } from "@angular/material/stepper";
import { FormData } from "../interfaces/form-data.interface";

@Injectable({
  providedIn: "root",
})
export class FormDataService {
  // Default currency value; updated from HomeComponent
  defaultCurrency: string = "";

  // Object to store all form input values.
  formData: FormData = {
    gold24K: null,
    gold22K: null,
    gold18K: null,
    miscGold: null,
    silver: null,
    preciousStones: null,

    cashInHand: null,
    cashCurrency: "", // will be updated to defaultCurrency if empty

    bankBalance: null,
    bankCurrency: "", // will be updated to defaultCurrency if empty

    loansReceived: null,
    loanCurrency: "", // will be updated to defaultCurrency if empty

    investmentsGross: null,
    investmentCurrency: "", // will be updated to defaultCurrency if empty

    ppfGross: null,
    ppfCurrency: "", // will be updated to defaultCurrency if empty

    cryptoGross: null,
    cryptoCurrency: "", // will be updated to defaultCurrency if empty

    creditSuppliers: null,
    creditCurrency: "", // will be updated to defaultCurrency if empty

    badDebts: null,
    badDebtsCurrency: "", // will be updated to defaultCurrency if empty

    partnershipWithdrawals: null,
    partnershipCurrency: "", // will be updated to defaultCurrency if empty

    loansFromFriends: null,
    friendsLoanCurrency: "", // will be updated to defaultCurrency if empty

    loansFromBanks: null,
    bankLoanCurrency: "", // will be updated to defaultCurrency if empty

    pendingTaxes: null,
    taxCurrency: "", // will be updated to defaultCurrency if empty

    animalAmount: null,
    animalOption: "",
    animalPrice: null,
    animalCurrency:"",

    agriRainValue: null,
    agriRainCurrency: "",

    agriHybridValue: null,
    agriHybridCurrency: "",

    agriIrrigationValue: null,
    agriIrrigationCurrency: "",

    firmCapital: null,
    firmCurrency: "",

    firmLoan: null,
    firmLoanCurrency: "",

    firmProfit: null,
    firmProfitCurrency: "",

    rentalCurrency: "",
    businessShares: null,

    sharesCurrency: "",
    deadStocks: null,

    deadStocksCurrency: "",
    creditSales: null,

    creditSalesCurrency: "",
    landCurrency: "",

    rentalRevenue: null,
    landValue: null,
  };

  onSubmit(): void {
    console.log("Submitted Form Data:", this.formData);
    // Further processing of formData as needed
    alert("form Submitted");
  }

  // Update all currency fields with the provided default currency if they are empty.
  // setDefaultCurrency(defaultCurrency: string): void {
  //   this.defaultCurrency = defaultCurrency;
  //   if (!this.formData.cashCurrency) {
  //     this.formData.cashCurrency = defaultCurrency;
  //   }
  //   if (!this.formData.bankCurrency) {
  //     this.formData.bankCurrency = defaultCurrency;
  //   }
  //   if (!this.formData.loanCurrency) {
  //     this.formData.loanCurrency = defaultCurrency;
  //   }
  //   if (!this.formData.investmentCurrency) {
  //     this.formData.investmentCurrency = defaultCurrency;
  //   }
  //   if (!this.formData.ppfCurrency) {
  //     this.formData.ppfCurrency = defaultCurrency;
  //   }
  //   if (!this.formData.cryptoCurrency) {
  //     this.formData.cryptoCurrency = defaultCurrency;
  //   }
  //   if (!this.formData.creditCurrency) {
  //     this.formData.creditCurrency = defaultCurrency;
  //   }
  //   if (!this.formData.badDebtsCurrency) {
  //     this.formData.badDebtsCurrency = defaultCurrency;
  //   }
  //   if (!this.formData.partnershipCurrency) {
  //     this.formData.partnershipCurrency = defaultCurrency;
  //   }
  //   if (!this.formData.friendsLoanCurrency) {
  //     this.formData.friendsLoanCurrency = defaultCurrency;
  //   }
  //   if (!this.formData.bankLoanCurrency) {
  //     this.formData.bankLoanCurrency = defaultCurrency;
  //   }
  //   if (!this.formData.taxCurrency) {
  //     this.formData.taxCurrency = defaultCurrency;
  //   }
  // }

  // Update all currency fields with the provided default currency if they are empty.

  setDefaultCurrency(defaultCurrency: string): void {
    this.defaultCurrency = defaultCurrency;

    // List of all currency fields to update
    const currencyFields: (keyof FormData)[] = [
      "cashCurrency",
      "bankCurrency",
      "loanCurrency",
      "investmentCurrency",
      "ppfCurrency",
      "cryptoCurrency",
      "creditCurrency",
      "badDebtsCurrency",
      "partnershipCurrency",
      "friendsLoanCurrency",
      "bankLoanCurrency",
      "taxCurrency",
      "agriRainCurrency",
      "agriHybridCurrency",
      "agriIrrigationCurrency",
      "firmCurrency",
      "firmLoanCurrency",
      "firmProfitCurrency",
      "rentalCurrency",
      "sharesCurrency",
      "deadStocksCurrency",
      "creditSalesCurrency",
      "landCurrency",
    ];

    // Cast formData as any for dynamic property access
    currencyFields.forEach((field) => {
      if (!this.formData[field]) {
        (this.formData as any)[field] = defaultCurrency;
      }
    });
  }

  // Access the expansion panel via its template variable references.
  togglePanel(panel: MatExpansionPanel): void {
    if (panel) {
      panel.toggle(); // Toggles the panel: opens it if closed, and vice versa
    }
  }

  openPanel(panel: MatExpansionPanel): void {
    if (panel && !panel.expanded) {
      panel.open();
    }
  }

  // Stepper next and back button:
  nextStep(stepper: MatStepper): void {
    if (stepper) {
      stepper.next();
    }
  }

  previousStep(stepper: MatStepper): void {
    if (stepper) {
      stepper.previous();
    }
  }
}

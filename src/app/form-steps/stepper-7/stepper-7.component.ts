import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";

// Angular Material Modules:
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
import { CurrencyService } from "../../api/currency.service";

@Component({
  selector: "app-stepper-7",
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
  templateUrl: "./stepper-7.component.html",
  styleUrl: "./stepper-7.component.css",
  encapsulation: ViewEncapsulation.None,
})
export class Stepper7Component implements OnInit {
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
    private currencyService: CurrencyService,
    private panelService: PanelService
  ) {}
  ngOnInit(): void {
    // Get currency list (pure array)
    this.currencies = this.currencyService.getCurrencies();
  }
  nextStep(): void {
    // Optionally, you can calculate animal zakat before proceeding
    this.calculateAnimalZakat();
    this.fds.nextStep(this.stepper);
  }
  previousStep(): void {
    this.fds.previousStep(this.stepper);
  }

  openAnimalsPanel(): void {
    this.panelService.openAnimalsPanel();
  }

  /**
   * Calculate animal zakat based on the selected option.
   * - For "donate": returns the number of animals to donate.
   * - For "pay": returns the monetary equivalent (number of animals due multiplied by the price per animal).
   */
  calculateAnimalZakat(): void{
    const count = this.formData.animalAmount || 0;
    const sets = Math.floor(count / 40); // one animal for every 40 animals
    const price = this.formData.animalPrice || 0;
    this.formData.animalPrice= sets * price;
    console.log(`${sets} animals @ ${this.formData.animalPrice} ${this.formData.animalCurrency}`);

    
  }
}

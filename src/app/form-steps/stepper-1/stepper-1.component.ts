// src\app\form-steps\stepper-1\stepper-1.component.ts

import { Component, ViewChild, Input, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// Angular Material Modules:
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionPanel } from "@angular/material/expansion";

import { FormDataService } from "../../api/form-data.service";
import { GoldService } from "../../api/gold.service";
import { PanelService } from "../../api/panel.service";
import { MatStepper } from "@angular/material/stepper";
import { HomeComponent } from "../../components/home/home.component";
import { CurrencyService } from "../../api/currency.service";

@Component({
  selector: "app-stepper-1",
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
  ],
  templateUrl: "./stepper-1.component.html",
  styleUrl: "./stepper-1.component.css",
  encapsulation: ViewEncapsulation.None,
})
export class Stepper1Component {
  @Input() stepper!: MatStepper;

  

  get formData() {
    return this.fds.formData;
  }

  constructor(
    private fds: FormDataService,
    private panelService: PanelService,
    private goldService: GoldService,
  ) {}

  openGoldPanel(): void {
    this.panelService.openGoldPanel();
  }

  openSilverPanel(): void {
    this.panelService.openSilverPanel();
  }

  // Instead of using matStepperNext, we use a custom method:
  nextStep(): void {
    // Fire both API calls independently, in the background.
    this.goldService.getGoldRate("XAU", this.fds.defaultCurrency).subscribe({
      next: () => console.log("Gold rate fetched and stored"),
      error: (err) => console.error("Error fetching gold rate:", err),
    });

    this.goldService.getGoldRate("XAG", this.fds.defaultCurrency).subscribe({
      next: () => console.log("Silver rate fetched and stored"),
      error: (err) => console.error("Error fetching silver rate:", err),
    });

    // Immediately proceed to the next step
    this.fds.nextStep(this.stepper);
  }
}

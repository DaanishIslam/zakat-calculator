// src\app\components\zakat-calculator\zakat-calculator.component.ts
import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Angular Material Modules:
import { MatStepper, MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

import { MatMenuModule } from "@angular/material/menu";
import { MatExpansionModule } from "@angular/material/expansion";


// import modular form components
import { Stepper1Component } from "../../form-steps/stepper-1/stepper-1.component";
import { Stepper2Component } from "../../form-steps/stepper-2/stepper-2.component";

// import service:
import { FormDataService } from "../../api/form-data.service";
import { DetailsPanelComponent } from "../details-panel/details-panel.component";
import { PanelService } from "../../api/panel.service";
import { Stepper3Component } from "../../form-steps/stepper-3/stepper-3.component";
import { Stepper4Component } from "../../form-steps/stepper-4/stepper-4.component";
import { Stepper5Component } from "../../form-steps/stepper-5/stepper-5.component";
import { Stepper6Component } from "../../form-steps/stepper-6/stepper-6.component";
import { Stepper7Component } from "../../form-steps/stepper-7/stepper-7.component";
import { Stepper8Component } from "../../form-steps/stepper-8/stepper-8.component";

@Component({
  selector: "app-zakat-calculator",
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatStepper,
    Stepper1Component,
    DetailsPanelComponent,
    Stepper2Component,
    Stepper3Component,
    Stepper4Component,
    Stepper5Component,
    Stepper6Component,
    Stepper7Component,
    Stepper8Component
],
  templateUrl: "./zakat-calculator.component.html",
  styleUrl: "./zakat-calculator.component.css",
  standalone: true,
})
export class ZakatCalculatorComponent {
  constructor(private formdataservice:FormDataService,
    private panelService: PanelService
  ){}
  
  // getter function:
  get formData() {
    return this.formdataservice.formData;
  }  

  // Access the expansion panel via its template variable references.
  togglePanel(panel: any): void {
    this.formdataservice.togglePanel;
  }

  openPanel(panel: any): void {
    this.formdataservice.openPanel;
  }
  
}

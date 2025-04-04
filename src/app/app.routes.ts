// src\app\app.routes.ts
import { Routes } from "@angular/router";

import { provideRouter } from "@angular/router";

import { GoldRateComponent } from "./components/gold-rate/gold-rate.component";
import { MainComponent } from "./main/main.component";
import { ZakatCalculatorComponent } from "./components/zakat-calculator/zakat-calculator.component";
import { HomeComponent } from "./components/home/home.component";
import { ResultsDisplayComponent } from "./components/results-display/results-display.component";
import { AboutComponent } from "./components/about/about.component";

export const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" }, // Redirect empty path to 'home'
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "zakat-calculator",
        component: ZakatCalculatorComponent,
      },
      // Add additional child routes here
      { path: "results", component: ResultsDisplayComponent },
      { path: "about", component: AboutComponent },
      { path: "gold-rate", component: GoldRateComponent},
    ],
  },
];

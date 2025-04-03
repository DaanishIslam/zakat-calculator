import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { CurrencyService } from "../../api/currency.service";
import { FormDataService } from "../../api/form-data.service";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  currencies: string[] = [];
  defaultCurrency: string = "";
  isHome: boolean = false;

  constructor(
    private currencyService: CurrencyService,
    private router: Router,
    private formDataService: FormDataService
  ) {}

  get currencylist(){
    return this.currencies;
  }
  ngOnInit(): void {
    // Get currency list (pure array)
    this.currencies = this.currencyService.getCurrencies();

    // Set the isHome flag based on current URL
    this.isHome = this.router.url === "/home" || this.router.url === "/";
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHome =
          event.urlAfterRedirects === "/home" ||
          event.urlAfterRedirects === "/";
      });
  }

  proceed(): void {
    // Set default currency on form data if not already set
    this.formDataService.setDefaultCurrency(this.defaultCurrency);
    // Navigate to Zakat Calculator page
    this.router.navigate(["/zakat-calculator"]);
  }
}

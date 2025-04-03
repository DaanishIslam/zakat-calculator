// src\app\components\gold-rate\gold-rate.component.ts

import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { RouterModule } from "@angular/router";

// import gold service and interface file:
import { GoldService } from "../../api/gold.service";
import { GoldRate } from "../../interfaces/gold-rate.interface";

@Component({
  selector: "app-gold-rate",
  imports: [CommonModule, RouterModule],
  templateUrl: "./gold-rate.component.html",
  styleUrl: "./gold-rate.component.css",
  standalone: true,
})
export class GoldRateComponent implements OnInit {
  // get gold rate variable:
  goldRate: GoldRate | null = null;
  errorOccured = false;

  constructor(private goldService: GoldService) {}

  ngOnInit(): void {
    this.fetchGoldRate();
    // alert(`gold rate fetch Successfully`);
    
  }

  fetchGoldRate(): void {
    this.goldService
      .getGoldRate()
      .pipe(
        catchError((error) => {
          console.error("Error Fetching Gold Rate", error);
          this.errorOccured = true;
          return of(null);
        })
      )
      .subscribe((goldData) => {
        if (goldData) {
          this.goldRate = goldData;
        } else {
          this.errorOccured = true;
        }
        
      });
  }

}

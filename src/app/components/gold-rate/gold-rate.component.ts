import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';

// Import GoldService and GoldRate interface
import { GoldService } from '../../api/gold.service';
import { GoldRate } from '../../interfaces/gold-rate.interface';

@Component({
  selector: 'app-gold-rate',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gold-rate.component.html',
  styleUrls: ['./gold-rate.component.css']
})
export class GoldRateComponent implements OnInit {
  goldRate: GoldRate | null = null;
  errorOccured = false;
  errorMessage: string | null = null;

  constructor(private goldService: GoldService) {}

  ngOnInit(): void {
    this.fetchGoldRate();
  }

  fetchGoldRate(): void {
    this.goldService.getGoldRate().pipe(
      tap(data => {
        console.log('Fetched Gold Data:', data);
        if (!data) {
          // If data is null, mark error and show message from service or a default message
          this.errorOccured = true;
          this.errorMessage = this.goldService.errorMessage || "No data available. The service may be warming up.";
        }
      }),
      catchError(error => {
        console.error('Error fetching gold rate:', error);
        this.errorOccured = true;
        this.errorMessage = "Error fetching gold rate: " + error.message;
        return of(null);
      })
    ).subscribe((data: GoldRate | null) => {
      this.goldRate = data;
    });
  }
}

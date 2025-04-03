import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isHome: boolean = false;
  isAbout: boolean = false; // New flag for the About page

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set initial flags based on current URL
    this.setRouteFlags(this.router.url);

    // Update flags on navigation changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setRouteFlags(event.urlAfterRedirects);
      });
  }

  private setRouteFlags(url: string): void {
    this.isHome = (url === '/home' || url === '/');
    this.isAbout = (url === '/about');
  }
}

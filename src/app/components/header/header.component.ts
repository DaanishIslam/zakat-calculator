import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterModule,MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
})
export class HeaderComponent implements OnInit{

    // adding logic to show app name if the route is not home in the nav bar:
    isHome: boolean = false;

    constructor(private router: Router){}
  ngOnInit(): void {
    this.isHome = this.router.url =='/home' || this.router.url =='/';
    this.router.events.pipe(
      filter(event=> event instanceof NavigationEnd)
    ).subscribe(
      (event: NavigationEnd) => {
        this.isHome = event.urlAfterRedirects === '/home' || event.urlAfterRedirects === '/'
      }
    );
  }

}

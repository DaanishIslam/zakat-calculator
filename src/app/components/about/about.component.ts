import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-about",
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.css",
})
export class AboutComponent {
  isAbout: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set the isHome flag based on current URL
    this.isAbout = this.router.url === "/about";
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isAbout =
          event.urlAfterRedirects === "/about" ||
          event.urlAfterRedirects === "/";
      });
  }
}

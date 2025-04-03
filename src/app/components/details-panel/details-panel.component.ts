// src\app\components\details-panel\details-panel.component.ts

import {
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  ViewEncapsulation,
} from "@angular/core";

import {
  MatExpansionModule,
  MatExpansionPanel,
} from "@angular/material/expansion";

import { PanelService } from "../../api/panel.service";
import { MatStepper, MatStepperModule } from "@angular/material/stepper";
import { ScrollHostDirective } from "../../directives/scroll-host.directive";

@Component({
  selector: "app-details-panel",
  standalone: true,
  imports: [MatExpansionModule, MatStepperModule, ScrollHostDirective],
  templateUrl: "./details-panel.component.html",
  styleUrl: "./details-panel.component.css",
  encapsulation: ViewEncapsulation.None,
})
export class DetailsPanelComponent implements AfterViewInit {
  goldPanelExpanded = false;
  silverPanelExpanded = false;
  stonePanelExpanded = false;
  cashandbankExpanded = false;

  loansandinvestmentExpanded = false;
  landpropertyExpanded = false;
  businessExpanded = false;
  partnershipfirmsExpanded = false;
  agricultureExpanded = false;
  animalsExpanded = false;
  liabilitiesExpanded = false;
  currentStep: number = 0;

  constructor(
    private panelService: PanelService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.panelService.goldPanelState.subscribe((state) => {
      // Defer the update to avoid ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.goldPanelExpanded = state;
        this.cdr.detectChanges();
      }, 0);
    });

    this.panelService.silverPanelState.subscribe((state) => {
      setTimeout(() => {
        this.silverPanelExpanded = state;
        this.cdr.detectChanges();
      }, 0);
    });

    this.panelService.stonePanelState.subscribe((state) => {
      setTimeout(() => {
        this.stonePanelExpanded = state;
        this.cdr.detectChanges();
      }, 0);
    });

    // rest to do:
    this.panelService.cashandbankState.subscribe((state) => {
      setTimeout(() => {
        this.cashandbankExpanded = state;
        this.cdr.detectChanges();
      }, 0);
    });

    this.panelService.loansandinvestmentState.subscribe((state) => {
      setTimeout(() => {
        this.loansandinvestmentExpanded = state;
        this.cdr.detectChanges();
      }, 0);
    });

    this.panelService.landpropertyState.subscribe((state) => {
      setTimeout(() => {
        this.landpropertyExpanded = state;
        this.cdr.detectChanges();
      }, 0);
    });

    this.panelService.businessState.subscribe((state) => {
      setTimeout(() => {
        this.businessExpanded = state;
        this.cdr.detectChanges();
      }, 0);
    });

    this.panelService.partnershipfirmsState.subscribe((state) => {
      setTimeout(() => {
        this.partnershipfirmsExpanded = state;
        this.cdr.detectChanges();
      }, 0);
    });

    this.panelService.agricultureState.subscribe((state) => {
      setTimeout(() => {
        this.agricultureExpanded = state;
        this.cdr.detectChanges();
      }, 0);
    });

    this.panelService.animalsState.subscribe((state) => {
      setTimeout(() => {
        this.animalsExpanded = state;
        this.cdr.detectChanges();
      }, 0);
    });

    this.panelService.liabilitiesState.subscribe((state) => {
      setTimeout(() => {
        this.liabilitiesExpanded = state;
        this.cdr.detectChanges();
      }, 0);
    });
  }

  // scrollToPanel(panelDirective: ScrollHostDirective): void {
  //   setTimeout(() => {
  //     panelDirective.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }, 0);
  // }
  // Add ViewChild reference to the scroll container
  @ViewChild("scrollContainer") scrollContainer!: ElementRef<HTMLElement>;

  // Modified scrollToPanel function
  scrollToPanel(panelDirective: ScrollHostDirective): void {
    setTimeout(() => {
      const panelElement = panelDirective.el.nativeElement;
      const container = this.scrollContainer.nativeElement;

      // Calculate positions
      const panelTop = panelElement.offsetTop;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      // Calculate new scroll position with offset
      const scrollToPosition = panelTop - container.offsetTop; // 20px offset

      // Smooth scroll within the container
      container.scrollTo({
        top: scrollToPosition,
        behavior: "smooth",
      });
    }, 150); // Slightly longer timeout for animation sync
  }
}

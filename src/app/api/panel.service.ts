// src\app\api\panel.service.ts

import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PanelService {
  constructor() {}

  private goldPanelSource = new BehaviorSubject<boolean>(false);
  goldPanelState = this.goldPanelSource.asObservable();

  private silverPanelSource = new BehaviorSubject<boolean>(false);
  silverPanelState = this.silverPanelSource.asObservable();

  private stonePanelSource = new BehaviorSubject<boolean>(false);
  stonePanelState = this.stonePanelSource.asObservable();

  // --------------------------

  private cashandbankSource = new BehaviorSubject<boolean>(false);
  cashandbankState = this.cashandbankSource.asObservable();

  private loansandinvestmentSource = new BehaviorSubject<boolean>(false);
  loansandinvestmentState = this.loansandinvestmentSource.asObservable();

  private landpropertySource = new BehaviorSubject<boolean>(false);
  landpropertyState = this.landpropertySource.asObservable();

  private businessSource = new BehaviorSubject<boolean>(false);
  businessState = this.businessSource.asObservable();

  private partnershipfirmsSource = new BehaviorSubject<boolean>(false);
  partnershipfirmsState = this.partnershipfirmsSource.asObservable();

  private agricultureSource = new BehaviorSubject<boolean>(false);
  agricultureState = this.agricultureSource.asObservable();

  private animalsSource = new BehaviorSubject<boolean>(false);
  animalsState = this.animalsSource.asObservable();

  private liabilitiesSource = new BehaviorSubject<boolean>(false);
  liabilitiesState = this.liabilitiesSource.asObservable();

  openGoldPanel() {
    this.goldPanelSource.next(true);
  }

  closeGoldPanel() {
    this.goldPanelSource.next(false);
  }

  // -------------------

  openSilverPanel() {
    this.silverPanelSource.next(true);
  }

  closeSilverPanel() {
    this.silverPanelSource.next(false);
  }

  // -------------------
  

  openStonePanel() {
    this.stonePanelSource.next(true);
  }

  closeStonePanel() {
    this.stonePanelSource.next(false);
  }

  // -------------------
  // -------------------
  
  openCashAndBankPanel() { this.cashandbankSource.next(true); }
  closeCashAndBankPanel() { this.cashandbankSource.next(false); }

  openLoansAndInvestmentPanel() { this.loansandinvestmentSource.next(true); }
  closeLoansAndInvestmentPanel() { this.loansandinvestmentSource.next(false); }

  openLandPropertyPanel() { this.landpropertySource.next(true); }
  closeLandPropertyPanel() { this.landpropertySource.next(false); }

  openBusinessPanel() { this.businessSource.next(true); }
  closeBusinessPanel() { this.businessSource.next(false); }

  openPartnershipFirmsPanel() { this.partnershipfirmsSource.next(true); }
  closePartnershipFirmsPanel() { this.partnershipfirmsSource.next(false); }

  openAgriculturePanel() { this.agricultureSource.next(true); }
  closeAgriculturePanel() { this.agricultureSource.next(false); }

  openAnimalsPanel() { this.animalsSource.next(true); }
  closeAnimalsPanel() { this.animalsSource.next(false); }

  openLiabilitiesPanel() { this.liabilitiesSource.next(true); }
  closeLiabilitiesPanel() { this.liabilitiesSource.next(false); }

  // -------------------
  
}

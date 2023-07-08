import {Component, OnInit} from '@angular/core';
import {CustomerInformationService} from "../service/customer-information.service";
import {CustomerInformation} from "../cart/customer-Information";
import {faBoxOpen} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  customerInformation: CustomerInformation = new CustomerInformation();
  protected readonly faBoxOpen = faBoxOpen;
  constructor(private customerInformationService: CustomerInformationService) {
  }

  ngOnInit(): void {
    this.initializeCustomerInformation();
  }

  private initializeCustomerInformation() {
    this
      .customerInformationService
      .getCustomerInformation()
      .subscribe(value => this.customerInformation = value);
  }
}

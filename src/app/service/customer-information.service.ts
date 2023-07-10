import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerInformation } from '../model/customer-Information';

@Injectable({
  providedIn: 'root',
})
export class CustomerInformationService {
  private behaviorSubject: BehaviorSubject<CustomerInformation> =
    new BehaviorSubject<CustomerInformation>(new CustomerInformation());
  private customerInformationObservable: Observable<CustomerInformation> =
    this.behaviorSubject.asObservable();

  constructor() {}

  getCustomerInformation(): Observable<CustomerInformation> {
    return this.customerInformationObservable;
  }

  setCustomerInformation(customerInformation: CustomerInformation): void {
    this.behaviorSubject.next(customerInformation);
  }
}

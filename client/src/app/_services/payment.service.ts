import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../_models/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPaymentMethods() {
    return this.http.get<PaymentMethod[]>(this.baseUrl + 'payments/payment-method');
  }

  getPaymentMethodById(id: number) {
    return this.http.get<PaymentMethod>(this.baseUrl + 'payments/payment-method/' + id);
  }

  addPaymentMethod(paymentMethod: PaymentMethod) {
    return this.http.post(this.baseUrl + 'payments/payment-method', paymentMethod);
  }

  updatePaymentMethod(paymentMethod: PaymentMethod) {
    return this.http.put(this.baseUrl + 'payments/payment-method', paymentMethod);
  }

  removePaymentMethod(id: number) {
    return this.http.delete(this.baseUrl + 'payments/payment-method/' + id);
  }
}
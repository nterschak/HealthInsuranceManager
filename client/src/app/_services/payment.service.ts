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
}
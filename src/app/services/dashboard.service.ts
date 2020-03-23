import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = 'http://localhost:5000/api';
  constructor( private http: HttpClient) { }

  getOrders() {
    return this.http.get(this.url + '/orders');
  }

  getOrderDetails() {
    return this.http.get(this.url + '/orderDetails');
  }
}

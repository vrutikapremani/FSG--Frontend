import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { Auth } from 'aws-amplify';
import { Event } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../services/dashboard.service';
import { DataSource } from '@angular/cdk/table';
// import { CdkTableModule } from '@angular/cdk';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource;
  [x: string]: any;
  public isCollapsed = [true, true, true, true];
  selectedAll: any;
  orders: any[] = [];
  orderDetails: any[] = [];

  constructor(private router: Router, private dashboardservice: DashboardService) {}

  ngOnInit() {
    this.dashboardservice.getOrders().subscribe((res) => {
      this.orders = this.orders.concat(res.recordsets[0]);
    });

    this.dashboardservice.getOrderDetails().subscribe((res) => {
      this.orderDetails = this.orderDetails.concat(res.recordsets[0]);
    });
  }

  onLogOut() {
    Auth.signOut()
      .then(data => {
        console.log(data);
        console.log('You are successfully logged out');
        this.router.navigate(['/login']);
      })
      .catch(err => console.log(err));
  }
}

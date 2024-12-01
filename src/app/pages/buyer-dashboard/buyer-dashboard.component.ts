import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button, ButtonDirective} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {ChipsModule} from 'primeng/chips';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [
    TableModule,
    ButtonDirective,
    FormsModule,
    ChipsModule,
    Button
  ],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.scss'
})
export class BuyerDashboardComponent implements OnInit{
  searchTerm!: string;
  products: any[] = [];

  ngOnInit() {
    this.searchProducts()
  }

  searchProducts() {
    // Implement search logic here
    this.products = [
      { name: 'Apples', category: 'Fruits', price: 2.99, location: 'Farm A' },
      { name: 'Carrots', category: 'Vegetables', price: 1.49, location: 'Farm B' }
    ];
  }

}

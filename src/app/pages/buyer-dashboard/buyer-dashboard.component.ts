import {Component, inject, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button, ButtonDirective} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {ChipsModule} from 'primeng/chips';
import {MessageService} from 'primeng/api';
import {BuyerService} from '../../shared/services/buyer.service';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProfileService} from '../../shared/services/profile.service';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [
    TableModule,
    ButtonDirective,
    FormsModule,
    ChipsModule,
    Button,
    DialogModule,
    DropdownModule
  ],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.scss'
})
export class BuyerDashboardComponent implements OnInit {
  searchTerm!: string;
  products: any[] = [];
  orderDialog = false;
  selectedProducts: any[] = [];
  buyerId: string = '';
  totalAmount: number = 0;
  profile!: any;
  order = {
    buyerId: '',
    products: [],
    totalAmount: 0
  };

  buyerService = inject(BuyerService)
  messageService = inject(MessageService)
  profileService = inject(ProfileService)

  ngOnInit() {
    this.searchProducts()
    this.profileService.getProfile().subscribe({
      next: (res: any) => {
        this.profile = res;
        console.log(this.profile)
        this.messageService.add({severity: 'success', summary: 'Profile successfully retrieved'});
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: err.message});
      }
    })
  }

  searchProducts() {
    this.buyerService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: err.message})
      }
    })

  }

  makeOrderDialog() {
    this.orderDialog = true;
  }

  addProduct() {
    this.selectedProducts.push({productId: '', quantity: 0, price: 0});
  }

  removeProduct(index: number) {
    this.selectedProducts.splice(index, 1);
  }

  calculateTotalAmount() {
    this.totalAmount = this.selectedProducts.reduce((sum, item) => {
      const product = this.products.find(p => p._id === item.productId);
      const price = product ? product.price : 0;
      return sum + (item.quantity * price);
    }, 0);
  }

  makeOrder() {
    this.selectedProducts = this.selectedProducts.map(item => {
      const product = this.products.find(p => p._id === item.productId);
      return {
        ...item,
        price: product ? product.price : 0
      };
    });
    this.calculateTotalAmount()
    const order = {
      buyerId: this.profile._id,
      products: this.selectedProducts,
      totalAmount: this.totalAmount
    };

    this.buyerService.makeOrder(order).subscribe({
      next: (res: any) => {
        this.messageService.add({severity: 'success', summary: 'Order Placed'})
        this.orderDialog = false;
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: err.message})
      }
    })
  }

  closeDialog() {
    this.orderDialog = false;
  }
}

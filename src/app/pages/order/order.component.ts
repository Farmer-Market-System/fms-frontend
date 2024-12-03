import {Component, inject, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {ProfileService} from '../../shared/services/profile.service';
import {OrderService} from '../../shared/services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{

  messageService = inject(MessageService)
  profileService = inject(ProfileService)
  orderService = inject(OrderService)
  ngOnInit() {

 }
}

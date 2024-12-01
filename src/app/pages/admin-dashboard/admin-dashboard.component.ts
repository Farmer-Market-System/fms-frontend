import {Component, inject, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {AdminService} from '../../shared/services/admin.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Button, ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    TableModule,
    ButtonDirective,
    Button
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];


  adminService = inject(AdminService)
  messageService = inject(MessageService)
  confirmationService = inject(ConfirmationService)

  ngOnInit(): void {

    this.loadUsers();
  }



  loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
        next: (data) => {
          this.users = data.data;
        },
        error: (err) => {
          console.error('Error loading users:', err);
        }
      }
    );
  }




}

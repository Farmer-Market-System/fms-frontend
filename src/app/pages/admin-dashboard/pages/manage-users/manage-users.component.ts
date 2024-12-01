import {Component, inject, OnInit} from '@angular/core';
import {AdminService} from '../../../../shared/services/admin.service';
import {ConfirmationService, MessageService, PrimeTemplate} from 'primeng/api';
import {Location} from '@angular/common';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    Button,
    PrimeTemplate,
    TableModule
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];

  adminService = inject(AdminService)
  messageService = inject(MessageService)
  confirmationService = inject(ConfirmationService)
  constructor(private _location: Location) {
  }

  ngOnInit() {
    this.loadUsers()
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

  editUser(userId: string): void {
    // Implement edit user logic
  }

  deleteUser(userId: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      accept: () => {
        this.adminService.deleteUser(userId).subscribe({
            next: (data) => {
              console.log(data)
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'User deleted successfully'});
              this.loadUsers();
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Server Error'
              });
              console.error('Error deleting user:', err);
            }
          }
        );
      }
    });
  }

  toggleUserStatus(userId: string, currentStatus: string): void {
    const newStatus = currentStatus === 'active' ? 'disabled' : 'active';
    this.confirmationService.confirm({
      message: `Are you sure you want to ${newStatus === 'active' ? 'enable' : 'disable'} this user?`,
      header: 'Confirm Status Change',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService.editUser(userId, {status: newStatus}).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `User status updated to ${newStatus}`
              });
              this.loadUsers();
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Server Error' + err.message
              });
              console.error('Error updating user status:', err);
            }
          }
        );
      }
    });
  }

  returnBack() {
    this._location.back();
  }
}

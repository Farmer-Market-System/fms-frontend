import {Component, inject, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {Location} from '@angular/common';
import {ConfirmationService, MessageService, PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {AdminService} from '../../../../shared/services/admin.service';

@Component({
  selector: 'app-pending-farmers',
  standalone: true,
  imports: [
    Button,
    PrimeTemplate,
    TableModule
  ],
  templateUrl: './pending-farmers.component.html',
  styleUrl: './pending-farmers.component.scss'
})
export class PendingFarmersComponent implements OnInit {
  pendingFarmers: any[] = [];
  adminService = inject(AdminService)
  messageService = inject(MessageService)
  confirmationService = inject(ConfirmationService)

  constructor(private _location: Location) {
  }
  ngOnInit() {
    this.loadPendingFarmers();
  }

  loadPendingFarmers(): void {
    this.adminService.getPendingFarmers().subscribe({
        next: (data) => {
          this.pendingFarmers = data.data;
        },
        error: (err) => {
          console.error('Error loading pending farmers:', err);
        }
      }
    );
  }

  approveFarmer(farmerId: string): void {
    console.log(farmerId)
    this.confirmationService.confirm({
      message: 'Are you sure you want to approve this farmer?',
      accept: () => {
        this.adminService.approveFarmer(farmerId).subscribe({
          next: () => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Farmer approved successfully'});
            this.loadPendingFarmers();
          }
          ,
          error: (err) => {
            console.error('Error approving farmer:', err.message);
          }
        });
      }
    });
  }

  rejectFarmer(farmerId: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to reject this farmer?',
      accept: () => {
        const reason = prompt('Please provide a reason for rejection:');
        if (reason) {
          this.adminService.rejectFarmer(farmerId, {reason}).subscribe({
              next:
                () => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Farmer rejected successfully'
                  });
                  this.loadPendingFarmers();
                },
              error: (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Server Error'
                });
                console.error('Error rejecting farmer:', err);
              }
            }
          );
        }
      }
    });
  }

  returnBack() {
    this._location.back();
  }
}

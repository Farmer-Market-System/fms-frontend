import {Component, inject, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {Location} from '@angular/common';
import {AdminService} from '../../shared/services/admin.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ProfileService} from '../../shared/services/profile.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  adminService = inject(AdminService)
  messageService = inject(MessageService)
  authService = inject(AuthService)
  confirmationService = inject(ConfirmationService)
  profileService = inject(ProfileService)
  profile!: any;
  role!: string;

  constructor(private readonly _location: Location) {
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (res: any) => {
        this.profile = res;
        console.log(this.profile)
        this.role = this.authService.getUserRole();
        this.messageService.add({severity: 'success', summary: 'Profile successfully retrieved'});
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: err.message});
      }
    })
  }

  returnBack() {
    this._location.back();
  }
}

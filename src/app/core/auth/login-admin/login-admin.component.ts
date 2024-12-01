import {Component, inject} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FloatLabelModule} from 'primeng/floatlabel';
import {ChipsModule} from 'primeng/chips';
import {PasswordModule} from 'primeng/password';
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [
    Button,
    ReactiveFormsModule,
    FloatLabelModule,
    ChipsModule,
    PasswordModule,
    DialogModule,
    ButtonDirective
  ],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.scss'
})
export class LoginAdminComponent {

  authService: AuthService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);

  displayDialog = false
  recoverPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  protected loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.loginAdmin(this.loginForm.value).subscribe({
        next: (data: any) => {
          if (this.authService.isLoggedIn()) {
            this.router.navigate(['/admin-dashboard'])
          }
          console.log(data);
        }, error: (err) => {
          this.messageService.add({severity: 'error', summary: err.message})
        }
      })
    }
  }


  recoverPassword() {
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
  }

  sendRecoveryEmail() {
    this.authService.recoverPassword(this.recoverPasswordForm.value.email).subscribe({
      next: res => {
        console.log(res)
        this.messageService.add({severity: 'info', summary: 'Sent successful', detail: 'Look for message in emails.'})
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: err, detail: err.message})
      }
    })
  }
}

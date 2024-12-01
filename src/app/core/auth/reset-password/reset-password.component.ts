import {Component, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {AuthService} from '../../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonDirective
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  token: string = ''
  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null =>  {
    console.log(formGroup)
    console.log(formGroup.value['newPassword'], formGroup.value['confirmPassword'] )
    return formGroup.value['newPassword'] === formGroup.value['confirmPassword'] ? null : {mismatch: true};
  }

  authService: AuthService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);
  resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, {validators: this.passwordMatchValidator});

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }



  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.newPassword;
      this.authService.resetPassword(this.token, newPassword!).subscribe({
        next: res => {
          console.log(res)
          this.messageService.add({severity: 'success', summary: 'Password changed successfully.',})
        },
        error: err => {
          this.messageService.add({severity: 'error', summary: err.message})
        }
      });
    }
  }

}

import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    RadioButtonModule,
    FormsModule,
    ButtonDirective
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  implements OnInit{
  authService: AuthService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);

  ngOnInit() {
  }

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    personalDetails: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    }),
    farmDetails: new FormGroup({
      farmName: new FormControl(''),
      farmSize: new FormControl(''),
      location: new FormControl(''),
    }),
    deliveryPreferences: new FormGroup({
      preferredDeliveryTime: new FormControl(''),
      deliveryAddress: new FormControl(''),
    }),
  });

  userType: string = 'buyer';

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const formData = this.registerForm.value;
    this.authService.register(formData, this.userType).subscribe({
      next: (res:any) => {
        console.log(res)
        this.messageService.add({severity: 'success', summary: res.message})
        this.router.navigate(['/login'])
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: err.message})
      }
    })
  }
}

import {Routes} from '@angular/router';
import {LoginComponent} from './core/auth/login/login.component';
import {LoginAdminComponent} from './core/auth/login-admin/login-admin.component';
import {AdminDashboardComponent} from './pages/admin-dashboard/admin-dashboard.component';
import {authGuard} from './shared/guards/auth.guard';
import {FarmerDashboardComponent} from './pages/farmer-dashboard/farmer-dashboard.component';
import {roleGuard} from './shared/guards/role.guard';
import {PendingFarmersComponent} from './pages/admin-dashboard/pages/pending-farmers/pending-farmers.component';
import {ManageUsersComponent} from './pages/admin-dashboard/pages/manage-users/manage-users.component';
import {ResetPasswordComponent} from './core/auth/reset-password/reset-password.component';
import {BuyerDashboardComponent} from './pages/buyer-dashboard/buyer-dashboard.component';

export const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full',
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'admin-login', component: LoginAdminComponent
  },
  {
    path: 'login-admin', component: LoginAdminComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
  {
    path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard, roleGuard], data: {expectedRole: ['admin']}
  },
  {
    path: 'admin-dashboard/pending-farmers', component: PendingFarmersComponent, canActivate: [authGuard, roleGuard], data: {expectedRole: ['admin']}
  },
  {
    path: 'admin-dashboard/manage-users', component: ManageUsersComponent, canActivate: [authGuard, roleGuard], data: {expectedRole: ['admin']}
  },
  {
    path: 'farmer-dashboard', component: FarmerDashboardComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: ['farmer'] }
  },
  {
    path: 'buyer-dashboard', component: BuyerDashboardComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: ['buyer'] }
  }
];

import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { LoginComponent } from './+login';
import { SignupComponent } from './+signup';

const accountsRoutes: Routes = [
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

export const accountsRouting: ModuleWithProviders = RouterModule.forChild(accountsRoutes);

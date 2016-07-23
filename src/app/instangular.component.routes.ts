import { RouterConfig } from '@angular/router';
import { HomeComponent } from './+home';
import { LoginComponent } from './+login';
import { SignupComponent } from './+signup';

export const APP_ROUTES: RouterConfig = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

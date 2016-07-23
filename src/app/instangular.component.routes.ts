import { RouterConfig } from '@angular/router';
import { HomeComponent, LoginComponent, SignupComponent } from './components';

export const APP_ROUTES: RouterConfig = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

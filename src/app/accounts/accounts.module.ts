import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

/* declarations */
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  providers: []
})
export class ContactModule { }

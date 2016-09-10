import { NgModule, OpaqueToken } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
/* declarations */
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
/* effects */
import { SessionEffects } from './login/login.effects';

const EFFECTS = new OpaqueToken('Effects');

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  providers: [
     provide(EFFECTS, { multi: true, useClass: SessionEffects })
  ]
})
export class ContactModule { }

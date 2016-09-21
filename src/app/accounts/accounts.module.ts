import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
/* declarations */
import { LoginComponent } from './+login/login.component';
import { SignupComponent } from './+signup/signup.component';
/* effects */
import { SessionEffects } from './+login/login.effects';
import { routing } from '../app.routing';
/* services */
import { LoginActions } from './+login/login.actions';

@NgModule({
  imports: [
    SharedModule,
    EffectsModule.run(SessionEffects),
    routing
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  providers: [
    LoginActions
  ]
})
export class AccountsModule { }

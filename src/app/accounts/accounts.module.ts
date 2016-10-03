import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
/* declarations */
import { LoginComponent } from './+login/login.component';
import { SignupComponent } from './+signup/signup.component';
/* effects */
import { SessionEffects } from './+login/login.effects';
import { SignupEffects } from './+signup/signup.effects';
/* selectors */
import { SessionSelectors } from './+login/login.selector';
/* services */
import { LoginActions } from './+login/login.actions';
import { SignupActions } from './+signup/signup.actions';
/* routing */
import { accountsRouting } from './accounts.routing';

@NgModule({
  imports: [
    SharedModule,
    EffectsModule.run(SessionEffects),
    EffectsModule.run(SignupEffects),
    accountsRouting
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  providers: [
    LoginActions,
    SessionSelectors,
    SignupActions
  ]
})
export class AccountsModule { }

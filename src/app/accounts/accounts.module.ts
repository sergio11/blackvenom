import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
/* declarations */
import { LoginComponent } from './+login/login.component';
import { SignupComponent } from './+signup/signup.component';
/* effects */
import { SessionEffects } from './+login/login.effects';
/* selectors */
import { SessionSelectors } from './+login/login.selector';
/* services */
import { LoginActions } from './+login/login.actions';
/* routing */
import { accountsRouting } from './accounts.routing';

@NgModule({
  imports: [
    SharedModule,
    EffectsModule.run(SessionEffects),
    accountsRouting
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  providers: [
    LoginActions,
    SessionSelectors
  ]
})
export class AccountsModule { }

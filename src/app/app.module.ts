import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
/* App Root */
import { AppComponent } from './app.component';
/* Feature Modules */
import { AccountsModule } from './accounts/accounts.module';
/* root reducer */
import { appReducer } from './app.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AccountsModule,
    StoreModule.provideStore(appReducer)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

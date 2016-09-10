import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
/* App Root */
import { AppComponent } from './app.component';
/* Feature Modules */
import { AccountsModule } from './accounts/accounts.module';
/* root reducer */
import { appReducer } from './app.reducers';
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AccountsModule,
    StoreModule.provideStore(appReducer),
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

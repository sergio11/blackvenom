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
/* App declarations */
import { HomeComponent } from './components/+home/';
import { HeaderComponent } from './components/header/';
/* Shared Module */
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AccountsModule,
    StoreModule.provideStore(appReducer),
    SharedModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

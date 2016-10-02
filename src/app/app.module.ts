import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
/* App Root */
import { AppComponent } from './app.component';
/* Feature Modules */
import { AccountsModule } from './accounts/accounts.module';
/* root reducer */
import { appReducer } from './app.reducers';
/* initial state */
import { appInitialState } from './app.state';
/* routing */
import { routing, appRoutingProviders } from './app.routing';
/* App declarations */
import { HomeComponent } from './components/+home/';
import { HeaderComponent } from './components/header/';
/* Shared Module */
import { SharedModule } from './shared/shared.module';
/* dev tools */
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AccountsModule,
    StoreModule.provideStore(appReducer, appInitialState),
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: true,
        position: 'right'
      })
    }),
    StoreLogMonitorModule,
    SharedModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

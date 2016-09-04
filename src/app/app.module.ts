import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/* App Root */
import { AppComponent } from './app.component';
/* Feature Modules */
import { AccountsModule } from './accounts/accounts.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AccountsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

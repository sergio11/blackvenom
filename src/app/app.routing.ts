import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

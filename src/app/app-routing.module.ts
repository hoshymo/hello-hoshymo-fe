import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AccountComponent } from './pages/account.component';
import { AboutComponent } from './pages/about.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    // {
    //     path: '',
    //     component: AppComponent
    // },
    {
        path: 'account',
        component: AccountComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'about',
        // loadChildren: 'app/dashboard/dashboard.module#DashboardModule', // lazy loading
        component: AboutComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

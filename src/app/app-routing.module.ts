import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RuletaComponent } from './pages/ruleta/ruleta.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'ruleta',
    component: RuletaComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'ruleta'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

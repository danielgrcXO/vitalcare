import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import {PatientsComponent} from './modules/patients/patients.component';
import { MainComponent } from './modules/main/main.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: MainComponent
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'patients',
    component: PatientsComponent
  }]
}]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

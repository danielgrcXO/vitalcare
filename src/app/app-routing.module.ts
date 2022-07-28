//imports globales
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

//Imports de los componentes creados
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { PatientComponent } from './patient/patient.component';
import { NewComponent } from './patient/new/new.component';
import {PatientMedicineComponent} from './patientMedicine/patientMedicine.component';

/*===================================================================*/
/*===================================================================*/

//creando rutas a redirigir
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'patientLocation', component: PatientComponent},
  { path: 'patientLocation/new', component: NewComponent },
  { path: 'patientMedicine', component: PatientMedicineComponent }
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

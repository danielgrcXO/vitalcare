// Imports globales
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//imports de librerias instaladas
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http'; //Nueva linea
import { NgChartsModule } from 'ng2-charts'; //Nueva linea
import { FormsModule } from '@angular/forms'; //Nueva linea

//Imports de componentes creados
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { PatientComponent } from './patient/patient.component';
import { NewComponent } from './patient/new/new.component';
import { PatientMedicineComponent } from './patientMedicine/patientMedicine.component';

/*===================================================================*/
/*===================================================================*/

@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    DashboardComponent,
    PatientComponent,
    NewComponent,
      PatientMedicineComponent
   ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule, //Nueva linea
    FormsModule, // Nueva línea
    NgChartsModule //Nueva linea

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

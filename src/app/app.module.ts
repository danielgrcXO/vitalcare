// Imports globales
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//imports de librerias instaladas
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppRoutingModule } from './app-routing.module';

//Imports de componentes creados
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { PatientComponent } from './patient/patient.component';
import { NewComponent } from './patient/new/new.component';

/*===================================================================*/
/*===================================================================*/

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    PatientComponent,
    NewComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HighchartsChartModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

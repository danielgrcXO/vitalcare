//Imports globales
import { Component } from '@angular/core';
import { Router} from '@angular/router';
//import { MedicaldataService} from './services/medicaldata.service';

//Imports de iconos para el menu principal
import {faHouse} from '@fortawesome/free-solid-svg-icons';
import {faChartLine} from '@fortawesome/free-solid-svg-icons';
import {faHospitalUser} from '@fortawesome/free-solid-svg-icons';

/*===================================================================*/
/*===================================================================*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  
  constructor(private router: Router, /*protected medicaldata: MedicaldataService*/){}
  
  ngOnInit(): void{
  }

  //Titulos del menu principal
  Menu = 'Menu';
  HomeOption = 'Home';
  DashboardOption = 'Dashboard';
  patientLocationOption = "Patient's Location";
  footer = 'VitalCare®';

  //Iconos del menu principal
  title = 'vitalcare';
  HomeIcon = faHouse;
  ChartIcon = faChartLine;
  PatientIcon = faHospitalUser; 

 
  //Funciones para redirigir a componentes
  goHomePage(){ this.router.navigate(['/home']);}
  goDashboardPage(){ this.router.navigate(['/dashboard'])}
  goPatientLocation(){ this.router.navigate(['/patientLocation']);}
}





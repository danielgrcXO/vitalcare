//imports globales
import { Component, OnInit } from '@angular/core';

//imports de librerias utilizadas
import * as Highcharts from 'highcharts'
import {Options} from "highcharts";

//imports de iconos
import { faDroplet} from '@fortawesome/free-solid-svg-icons';
import { faHeartPulse} from '@fortawesome/free-solid-svg-icons';
import { faTemperatureHigh} from '@fortawesome/free-solid-svg-icons';
import { faLungs } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { faClipboard} from '@fortawesome/free-solid-svg-icons';

/*===================================================================*/
/*===================================================================*/


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //iconos
  bloodPressureIcon = faDroplet;
  heartPulseIcon = faHeartPulse;
  temperatureIcon = faTemperatureHigh; 
  oxygenIcon =  faLungs;
  reportIcon = faFileArrowDown;
  userIcon = faUser;
  statusIcon = faStethoscope;
  locationIcon = faMapPin;
  patientIcon = faClipboard;

  //Grafica a cambiar
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Options = {   
    chart: {
      borderRadius:10,
      width: 690,
      height: '250px',
      renderTo: 'graph'
   },
    title: {
      text: "Heartbeats by minute"
   },
   
   xAxis:{
      categories:["10:15 am", "10:16 am", "10:17 am", "10:18 am", "10:19 am", "10:20 am",
         "10:21 am", "10:22 am", "10:23 am", "10:24 am", "10:25 am", "10:26 am"]
   },
   yAxis: {          
      title:{
         text:"PPM"
      } 
   },
   tooltip: {
      valueSuffix:""
   },
   series: [{
      type: "spline",
      name: 'Hertbeat Value',
      data: [20, 24, 24.5, 60.5, 70, 80, 25.2,26.5, 23.3, 46.3, 13.9, 20.6]
   }]
};

}

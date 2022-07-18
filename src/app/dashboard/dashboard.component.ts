//imports globales
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { hearRateValues } from '../models/hearRateInterface';

//imports de librerias utilizadas
import { BaseChartDirective } from 'ng2-charts'; //Linea nueva
import {ChartDataset, ChartOptions} from 'chart.js'; //Linea nueva
import { Subscription } from 'rxjs'; //Linea nueva
import { HttpClient } from '@angular/common/http'; //Linea nueva


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
import {faCakeCandles} from '@fortawesome/free-solid-svg-icons';

/*===================================================================*/
/*===================================================================*/


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit , OnDestroy {
    
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
  yeardOldIcon = faCakeCandles;

  //Estructura de grafica
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  private sub: Subscription;
  public loadData = false;

  public chartData: ChartDataset[] = [
    {data: [], label: 'Heart Rate By Minute', backgroundColor: 'rgba(124, 218, 124, 0.993)'}
  ];
  public labels: string[] = ['12:15 PM','12:16 PM','12:17 PM','12:18 PM', '12:19 PM','12:20 PM','12:21 PM','12:22 PM','12:22 PM','12:23 PM','12:24 PM','12:25 PM','12:26 PM','12:27 PM','12:28 PM','12:29 PM','12:30 PM'];
  public options : ChartOptions = {
    scales: {
      x: {
        grid: {
          color: ''
        },
        ticks: {
          color: '#7a7a7a'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#EAECEE'
        }, 
        ticks: {
          color: '#7a7a7a'
        }
      }
    }
  };
 
  //Constructor que inyecta el http para peticiones
  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.getData();
  }

  //Funcion que llama a los datos a interface
  getData(){
    this.sub = this.http.get<hearRateValues[]>('http://localhost:3050/pacient/heartRate')
    .subscribe((data: hearRateValues[]) => {
      data.map((x) => {
        this.chartData[0].data.push(x.heartRate);
      })
      console.log(this.chartData);
      this.loadData = true;
    });
  }

  //Cancela observacion
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

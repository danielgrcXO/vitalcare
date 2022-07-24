//imports globales
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { hearRateValues } from '../models/hearRateInterface'; //Nueva Linea
import { DatePipe } from '@angular/common'; // Nueva linea

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
    
  //Variables con titulos
  heartRateTitle = 'Heart Rate by minute';
  bloodPressureTitle = 'Blood Pressure';
  heartPulseTitle = 'Heart Rate';
  temperatureTitle = 'Temperature';
  oxygenTitle = 'Blood Oxygenation';

  //Obtener fecha actual
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe: any;

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
    {data: [], label: 'Heart Rate Value'}
  ];
  public labels: string[] = [];

  public options : ChartOptions = {
    responsive: true,
    scales: {  
      x: { 
          //display: false,
        grid: {
          color: ''
        },
        ticks: {
          color: '#7a7a7a',
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
    //recargar datos de component dashboard
    setInterval(() =>{
      location.reload();
    }, 10000);

    this.getData();
    this.getDate();
  }

  //Funcion que llama a los datos a interface
  getData(){
    this.sub = this.http.get<hearRateValues[]>('http://localhost:3050/pacient/heartRate')
    .subscribe((data: hearRateValues[]) => {
      data.map((x) => {
        this.chartData[0].data.push(x.heartRate);
        this.labels.push(x.Hora);
        

        if(x.heartRate === 136){
          this.chartData[0].backgroundColor = 'rgba(124, 218, 124, 0.993)';
        }

      })
      console.log(this.chartData);
      this.loadData = true;
    });
  }
  

  //Funcion para traer fecha actual
  getDate(){
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
  }

  //Cancela observacion
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

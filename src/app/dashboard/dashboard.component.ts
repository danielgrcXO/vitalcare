//imports globales
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { hearRateValues } from '../models/hearRateInterface'; //Nueva Linea
import { bloodPressureValues} from '../models/bloodPressureInterface' //Nueva Linea
import { temperatureValues} from '../models/temperatureInterface'; //Nueva Linea
import { oxygenValues} from '../models/oxygenInterface' //Nueva linea
import { DatePipe } from '@angular/common'; // Nueva linea

//imports de librerias utilizadas
import { BaseChartDirective } from 'ng2-charts'; //Linea nueva
import {ChartDataset, ChartOptions} from 'chart.js'; //Linea nueva
import { Subscription } from 'rxjs'; //Linea nueva
import { HttpClient } from '@angular/common/http'; //Linea nueva
import { jsPDF } from 'jspdf'; //Linea nueva
import * as XLSX from 'xlsx';


//imports de iconos
import { faDroplet} from '@fortawesome/free-solid-svg-icons';
import { faHeartPulse} from '@fortawesome/free-solid-svg-icons';
import { faTemperatureHigh} from '@fortawesome/free-solid-svg-icons';
import { faLungs } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { faClipboard} from '@fortawesome/free-solid-svg-icons';
import {faCakeCandles} from '@fortawesome/free-solid-svg-icons'; //Nueva linea
import {faFilePdf} from '@fortawesome/free-solid-svg-icons'; //Nueva linea
import {faFileCsv} from '@fortawesome/free-solid-svg-icons'; //Nueva linea

/*===================================================================*/
/*===================================================================*/


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit , OnDestroy {
    
  //Variables para widgets
  bloodPressureArray: number[] = [];
  bloodPressure: number = 0;
  heartRateArray: number[] = [];
  heartRate: number = 0;
  temperatureArray: number[] = [];
  temperature: number = 0;
  oxygenArray: number[] = [];
  oxygen: number = 0;


  //Variables para reportes
  dateArray: string[] = [];
  hourArray: string[] = [];
  //x: any = 0;


  //Variables con titulos
  heartRateTitle = 'Heart Rate by minute';
  bloodPressureTitle = 'Blood Pressure';
  heartPulseTitle = 'Heart Rate';
  temperatureTitle = 'Temperature';
  oxygenTitle = 'Blood Oxygenation';
  reportTitle = 'Medical Reports';
  reportDescription = 'Select a type of file to download the report';
  buttonTitlePdf = 'Download PDF';
  buttonTitleExcel = 'Download Excel';
  company = 'Vitalcare';

  //Obtener fecha actual
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe: any;

  //iconos
  bloodPressureIcon = faDroplet;
  heartPulseIcon = faHeartPulse;
  temperatureIcon = faTemperatureHigh; 
  oxygenIcon =  faLungs;
  userIcon = faUser;
  statusIcon = faStethoscope;
  locationIcon = faMapPin;
  patientIcon = faClipboard;
  yeardOldIcon = faCakeCandles;
  pdfIcon = faFilePdf;
  excelIcon = faFileCsv;

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
        min: 0,
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
    this.getBloodPressure();
    this.getHeartRate();
    this.getTemperature();
    this.getOxygen();
  }

  //Funcion que llama a los datos heartrate a grafica
  getData(){
    this.sub = this.http.get<hearRateValues[]>('http://localhost:3050/pacient/heartRate')
    .subscribe((data: hearRateValues[]) => {
      data.map((x) => {
        this.chartData[0].data.push(x.heartRate);
        this.labels.push(x.Hora);
        this.dateArray.push(x.Fecha);
        this.hourArray.push(x.Hora);

        if(x.heartRate === 136){
          this.chartData[0].backgroundColor = 'rgba(124, 218, 124, 0.993)';
        }
      })
      console.log(this.chartData);
      this.loadData = true;
    });
  }

  //Funcion que llama  datos de bloodPressure
  getBloodPressure(){
    this.sub = this.http.get<bloodPressureValues[]>('http://localhost:3050/pacient/bloodPressure')
    .subscribe((data: bloodPressureValues[]) => {
        data.map((i) => {
          this.bloodPressureArray.push(i.bloodPressure);
        });
      this.bloodPressure = this.bloodPressureArray[this.bloodPressureArray.length - 1];
    });
  }

  getHeartRate(){
    this.sub = this.http.get<hearRateValues[]>('http://localhost:3050/pacient/heartrate')
    .subscribe((data: hearRateValues[]) => {
        data.map((z) => {
          this.heartRateArray.push(z.heartRate);
        });
      this.heartRate = this.heartRateArray[this.heartRateArray.length - 1];
    });
  }

  //Funcion que llama datos de temperature
  getTemperature(){
    this.sub = this.http.get<temperatureValues[]>('http://localhost:3050/pacient/temperature')
    .subscribe((data: temperatureValues[]) => {
        data.map((v) => {
          this.temperatureArray.push(v.temperature);
        });
      this.temperature = this.temperatureArray[this.temperatureArray.length - 1];
    });
  }

  //Funcion que llama datos oxygen
  getOxygen(){
    this.sub = this.http.get<oxygenValues[]>('http://localhost:3050/pacient/oxygen')
    .subscribe((data: oxygenValues[]) => {
        data.map((q) => {
          this.oxygenArray.push(q.oxygen);
        });
      this.oxygen = this.oxygenArray[this.oxygenArray.length - 1];
    });
  }

  //Funcion para traer fecha actual
  getDate(){
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
  }

  //Funcion generar pdf
  printPdf(){
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(4);
    doc.html(document.getElementById('pdfFormat'),{
        callback: function (doc) {
          doc.save('Historial Medico Karely Hernandez Gonsales');
        }
    });
  }

  //Funcion para imprimir excel
  name = 'MedicalReport-Karely-Hernandez-Gonzales.xlsx';
  printExcel(): void {
    let element = document.getElementById('tableDate');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    let element2 = document.getElementById('tableMinute');
    const worksheet2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element2);
    let element3 = document.getElementById('tableBloodPressure');
    const worksheet3: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element3);
    let element4 = document.getElementById('tableHeartRate');
    const worksheet4: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element4);
    let element5 = document.getElementById('tableTemperature');
    const worksheet5: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element5);
    let element6 = document.getElementById('tableOxygen');
    const worksheet6: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element6);
    
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    const book2: XLSX.WorkBook = XLSX.utils.book_new();
    const book3: XLSX.WorkBook = XLSX.utils.book_new();
    const book4: XLSX.WorkBook = XLSX.utils.book_new();
    const book5: XLSX.WorkBook = XLSX.utils.book_new();
    const book6: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(book, worksheet, 'Date');
    XLSX.utils.book_append_sheet(book, worksheet2, 'Minute' );
    XLSX.utils.book_append_sheet(book, worksheet3, 'Blood Pressure');
    XLSX.utils.book_append_sheet(book, worksheet4, 'Heart Rate');
    XLSX.utils.book_append_sheet(book, worksheet5, 'Temperature');
    XLSX.utils.book_append_sheet(book, worksheet6, 'Oxygen' );


    XLSX.writeFile(book, this.name);
  }

  //Cancela observacion
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

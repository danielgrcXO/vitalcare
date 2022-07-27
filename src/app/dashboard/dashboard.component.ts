//imports globales
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { hearRateValues } from '../models/hearRateInterface'; 
import { bloodPressureValues} from '../models/bloodPressureInterface' 
import { temperatureValues} from '../models/temperatureInterface'; 
import { oxygenValues} from '../models/oxygenInterface'
import { DatePipe } from '@angular/common'; 

//imports de librerias utilizadas
import { BaseChartDirective } from 'ng2-charts'; 
import {ChartDataset, ChartOptions} from 'chart.js';
import { Subscription } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf'; 
import * as XLSX from 'xlsx';
import { DomSanitizer} from '@angular/platform-browser';


//imports de iconos
import { faDroplet} from '@fortawesome/free-solid-svg-icons';
import { faHeartPulse} from '@fortawesome/free-solid-svg-icons';
import { faTemperatureHigh} from '@fortawesome/free-solid-svg-icons';
import { faLungs } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { faClipboard} from '@fortawesome/free-solid-svg-icons';
import {faCakeCandles} from '@fortawesome/free-solid-svg-icons'; 
import {faFilePdf} from '@fortawesome/free-solid-svg-icons'; 
import {faFileCsv} from '@fortawesome/free-solid-svg-icons'; 

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

  //endpoints variables
  dashboardUrl: string = 'http://localhost:3050/pacient/heartRate';
  bloodPressureUrl : string = 'http://localhost:3050/pacient/bloodPressure';
  heartRateUrl : string = 'http://localhost:3050/pacient/heartrate';
  temperatureUrl : string = 'http://localhost:3050/pacient/temperature';
  oxygenUrl : string = 'http://localhost:3050/pacient/oxygen';

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
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    //sanitizar endpoints
     console.log(this.sanitizer.bypassSecurityTrustResourceUrl(this.dashboardUrl));
     console.log(this.sanitizer.bypassSecurityTrustResourceUrl(this.bloodPressureUrl));
     console.log(this.sanitizer.bypassSecurityTrustResourceUrl(this.heartRateUrl));
     console.log(this.sanitizer.bypassSecurityTrustResourceUrl(this.temperatureUrl));
     console.log(this.sanitizer.bypassSecurityTrustResourceUrl(this.oxygenUrl));

     //Sanitizar variables que se colocan en html
     console.log(this.sanitizer.bypassSecurityTrustHtml(this.heartRateTitle));
     console.log(this.sanitizer.bypassSecurityTrustHtml(this.bloodPressureTitle));
     console.log(this.sanitizer.bypassSecurityTrustHtml(this.heartPulseTitle));
     console.log(this.sanitizer.bypassSecurityTrustHtml(this.temperatureTitle));
     console.log(this.sanitizer.bypassSecurityTrustHtml(this.oxygenTitle));
     console.log(this.sanitizer.bypassSecurityTrustHtml(this.reportTitle));
     console.log(this.sanitizer.bypassSecurityTrustHtml(this.reportDescription));
     console.log(this.sanitizer.bypassSecurityTrustHtml(this.buttonTitlePdf));
     console.log(this.sanitizer.bypassSecurityTrustHtml(this.buttonTitleExcel));
     console.log(this.sanitizer.bypassSecurityTrustHtml(this.company));
     
     //Sanitizando variables de widgets
     console.log(this.sanitizer.bypassSecurityTrustHtml(String(this.bloodPressure)));
     console.log(this.sanitizer.bypassSecurityTrustHtml(String(this.heartRate)));
     console.log(this.sanitizer.bypassSecurityTrustHtml(String(this.temperature)));
     console.log(this.sanitizer.bypassSecurityTrustHtml(String(this.oxygen)));
    }


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
    this.sub = this.http.get<hearRateValues[]>(this.dashboardUrl)
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
    this.sub = this.http.get<bloodPressureValues[]>(this.bloodPressureUrl)
    .subscribe((data: bloodPressureValues[]) => {
        data.map((i) => {
          this.bloodPressureArray.push(i.bloodPressure);
        });
      this.bloodPressure = this.bloodPressureArray[this.bloodPressureArray.length - 1];
    });
  }

  getHeartRate(){
    this.sub = this.http.get<hearRateValues[]>(this.heartRateUrl)
    .subscribe((data: hearRateValues[]) => {
        data.map((z) => {
          this.heartRateArray.push(z.heartRate);
        });
      this.heartRate = this.heartRateArray[this.heartRateArray.length - 1];
    });
  }

  //Funcion que llama datos de temperature
  getTemperature(){
    this.sub = this.http.get<temperatureValues[]>(this.temperatureUrl)
    .subscribe((data: temperatureValues[]) => {
        data.map((v) => {
          this.temperatureArray.push(v.temperature);
        });
      this.temperature = this.temperatureArray[this.temperatureArray.length - 1];
    });
  }

  //Funcion que llama datos oxygen
  getOxygen(){
    this.sub = this.http.get<oxygenValues[]>(this.oxygenUrl)
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

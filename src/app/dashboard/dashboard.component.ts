//imports globales
import { Component, OnInit, ViewChild, OnDestroy, IterableDiffers } from '@angular/core';
import { hearRateValues } from '../models/hearRateInterface'; 
import { bloodPressureValues} from '../models/bloodPressureInterface' 
import { temperatureValues} from '../models/temperatureInterface'; 
import { oxygenValues} from '../models/oxygenInterface'
import {patientInformation, patientStatus} from '../models/patientInterface';
import { bloodPressureSimulated } from '../models/bloodPressureInterface';
import { heartRateSimulated } from '../models/hearRateInterface';
import {temperatureSimulated } from '../models/temperatureInterface';
import {oxygenSimulated } from '../models/oxygenInterface';
import {patientStatusSimulated} from '../models/patientInterface';
import { DatePipe } from '@angular/common'; 
import { Router} from '@angular/router';

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
import { faBedPulse } from '@fortawesome/free-solid-svg-icons';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';

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
  patientNameArray: string[] = [];
  patientName: string;
  locationArray: number[] = [];
  locationValue : number;
  bedNumberArray: number[] = [];
  bedNumberValue: number;
  bloodTypeArray: string[] = [];
  bloodTypeValue: string;
  patientStatusArray: string[] = [];
  patientStatus: string;

  //Variables Paciente Simulado.
  bloodPressureArraySimulated: number[] = [];
  heartRateArraySimulated: number[] = [];
  temperatureArraySimulated: number[] = [];
  oxygenArraySimulated: number[] = [];
  patientStatusArraySimulated: string[] = [];

  //Variables para reportes
  dateArray: string[] = [];
  hourArray: string[] = [];
  

  //Variables con titulos
  headerTitle = 'VitalCare®';
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
  statusTitle = 'Status: ';
  location = 'Location:';
  bedNumber = 'Bed Number:';
  bloodTypeTitle = 'Blood Type';
  patientStatusMenu = "Patient's Status";

  //endpoints variables
  dashboardUrl: string = 'http://localhost:3050/pacient/heartRate';
  bloodPressureUrl : string = 'http://localhost:3050/pacient/bloodPressure';
  heartRateUrl : string = 'http://localhost:3050/pacient/heartrate';
  temperatureUrl : string = 'http://localhost:3050/pacient/temperature';
  oxygenUrl : string = 'http://localhost:3050/pacient/oxygen';
  patientInformationUrl: string = 'http://localhost:3050/pacient/patientInfo';
  patientStatusUrl : string = 'http://localhost:3050/pacient/patientStatus';

  //endpoints simulados
  bloodPressureUrlSimulated: string = 'http://localhost:3050/pacient/bloodPressureSimulated';
  heartRateUrlSimulated : string = 'http://localhost:3050/pacient/heartRateSimulated';
  temperatureUrlSimulated: string = 'http://localhost:3050/pacient/temperatureSimulated';
  oxygenUrlSimulated: string = 'http://localhost:3050/pacient/oxygenSimulated';
  patientStatusUrlSimulated: string = 'http://localhost:3050/pacient/patientStatusSimulated';


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
  bedIcon = faBedPulse;

  //Estructura de grafica
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  private sub: Subscription;
  public loadData = false;

  public chartData: ChartDataset[] = [
    {data: [], label: 'Heart Rate Value'},
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
  constructor(private http: HttpClient, private sanitizer: DomSanitizer,private router: Router ) {
    //sanitizar endpoints
     this.sanitizer.bypassSecurityTrustResourceUrl(this.dashboardUrl);
     this.sanitizer.bypassSecurityTrustResourceUrl(this.bloodPressureUrl);
     this.sanitizer.bypassSecurityTrustResourceUrl(this.heartRateUrl);
     this.sanitizer.bypassSecurityTrustResourceUrl(this.temperatureUrl);
     this.sanitizer.bypassSecurityTrustResourceUrl(this.oxygenUrl);
     this.sanitizer.bypassSecurityTrustResourceUrl(this.patientInformationUrl);
     this.sanitizer.bypassSecurityTrustResourceUrl(this.patientStatusUrl);

     //Sanitizar variables que se colocan en html
     this.sanitizer.bypassSecurityTrustHtml(this.headerTitle);
     this.sanitizer.bypassSecurityTrustHtml(this.statusTitle);
     this.sanitizer.bypassSecurityTrustHtml(this.location);
     this.sanitizer.bypassSecurityTrustHtml(this.bedNumber);
     this.sanitizer.bypassSecurityTrustHtml(this.bloodTypeTitle);
     this.sanitizer.bypassSecurityTrustHtml(this.heartRateTitle);
     this.sanitizer.bypassSecurityTrustHtml(this.bloodPressureTitle);
     this.sanitizer.bypassSecurityTrustHtml(this.heartPulseTitle);
     this.sanitizer.bypassSecurityTrustHtml(this.temperatureTitle);
     this.sanitizer.bypassSecurityTrustHtml(this.oxygenTitle);
     this.sanitizer.bypassSecurityTrustHtml(this.reportTitle);
     this.sanitizer.bypassSecurityTrustHtml(this.reportDescription);
     this.sanitizer.bypassSecurityTrustHtml(this.buttonTitlePdf);
     this.sanitizer.bypassSecurityTrustHtml(this.buttonTitleExcel);
     this.sanitizer.bypassSecurityTrustHtml(this.company);
     
     //Sanitizando variables de widgets
     this.sanitizer.bypassSecurityTrustHtml(String(this.bloodPressure));
     this.sanitizer.bypassSecurityTrustHtml(String(this.heartRate));
     this.sanitizer.bypassSecurityTrustHtml(String(this.temperature));
     this.sanitizer.bypassSecurityTrustHtml(String(this.oxygen));
     this.sanitizer.bypassSecurityTrustHtml(this.patientName);
     this.sanitizer.bypassSecurityTrustHtml(String(this.locationValue));
     this.sanitizer.bypassSecurityTrustHtml(String(this.bedNumberValue));
     this.sanitizer.bypassSecurityTrustHtml(this.bloodTypeValue);
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
    this.getPatientInformation();
    this.getStatus();
    document.getElementById("pdfButton").addEventListener("click", this.printPdf);
  }

  //Funcion que llama a los datos heartrate a grafica
  getData(){
    this.loadData = false;
    this.chartData[0].data = [];
    this.labels = [];
    this.dateArray = [];
    this.hourArray = [];

    this.sub = this.http.get<hearRateValues[]>(this.dashboardUrl)
    .subscribe((data: hearRateValues[]) => {
      data.map((x) => {
        this.chartData[0].data.push(x.heartRate);
        this.labels.push(x.Hora);
        this.dateArray.push(x.Fecha);
        this.hourArray.push(x.Hora);

        if(x.heartRate > 59 && x.heartRate < 151) {
          this.chartData[0].backgroundColor  = 'rgb(45, 189, 53)';
        }else{
          this.chartData[0].backgroundColor  = '#e45866';
        }
      })
      console.log(this.chartData);
      this.loadData = true;
    });
  }

  //Funcion que llama  datos de bloodPressure
  getBloodPressure(){
    this.bloodPressureArray = [];
    this.sub = this.http.get<bloodPressureValues[]>(this.bloodPressureUrl)
    .subscribe((data: bloodPressureValues[]) => {
        data.map((i) => {
          this.bloodPressureArray.push(i.bloodPressure);
        });
      this.bloodPressure = this.bloodPressureArray[this.bloodPressureArray.length - 1];
      if(this.bloodPressure > 109 && this.bloodPressure < 116){
        document.getElementById("bloodPressure-value").setAttribute("class","bloodPressure-value-good");
        document.getElementById("bloodPressureIcon").setAttribute("class","bloodPressureIcon-good");
      }
    });
  }

  getHeartRate(){
    this.heartRateArray = [];
    this.sub = this.http.get<hearRateValues[]>(this.heartRateUrl)
    .subscribe((data: hearRateValues[]) => {
        data.map((z) => {
          this.heartRateArray.push(z.heartRate);
        });
      this.heartRate = this.heartRateArray[this.heartRateArray.length - 1];
      if(this.heartRate > 59 && this.heartRate < 151){
        document.getElementById("heartPulseIcon").setAttribute("class","heartPulseIcon-good");
        document.getElementById("heartRate-value").setAttribute("class","heartRate-value-good");
      }
    });
  }

  //Funcion que llama datos de temperature
  getTemperature(){
    this.temperatureArray = [];
    this.sub = this.http.get<temperatureValues[]>(this.temperatureUrl)
    .subscribe((data: temperatureValues[]) => {
        data.map((v) => {
          this.temperatureArray.push(v.temperature);
        });
      this.temperature = this.temperatureArray[this.temperatureArray.length - 1];
      if(this.temperature > 95 && this.temperature < 100){
        document.getElementById("temperatureIcon").setAttribute("class","temperatureIcon-good");
        document.getElementById("temperature-value").setAttribute("class","temperature-value-good");
      }
    });
  }

  //Funcion que llama datos oxygen
  getOxygen(){
    this.oxygenArray = [];
    this.sub = this.http.get<oxygenValues[]>(this.oxygenUrl)
    .subscribe((data: oxygenValues[]) => {
        data.map((q) => {
          this.oxygenArray.push(q.oxygen);
        });
      this.oxygen = this.oxygenArray[this.oxygenArray.length - 1];
      if(this.oxygen > 69 && this.oxygen < 121 ){
        document.getElementById("oxygenIcon").setAttribute("class","oxygenIcon-good");
        document.getElementById("oxygen-value").setAttribute("class","oxygen-value-good");
      }
    });
  }

  getPatientInformation(){
    this.sub = this.http.get<patientInformation[]>(this.patientInformationUrl)
    .subscribe((data: patientInformation[]) => {
        data.map((z) => {
          this.patientNameArray.push(z.name);
          this.locationArray.push(z.roomNumber);
          this.bedNumberArray.push(z.bedNumber);
          this.bloodTypeArray.push(z.bloodType);
        });
      this.patientName = this.patientNameArray[0];
      this.locationValue = this.locationArray[0];
      this.bedNumberValue = this.bedNumberArray[0];
      this.bloodTypeValue = this.bloodTypeArray[0];
    });
  }

  getStatus(){
    this.sub = this.http.get<patientStatus[]>(this.patientStatusUrl)
    .subscribe((data: patientStatus[]) => {
        data.map((z) => {
          this.patientStatusArray.push(z.patientStatus);
        });
        this.patientStatus = this.patientStatusArray[this.patientStatusArray.length - 1];
        if(this.patientStatus === 'Normal'){
          document.getElementById("patientStatus").setAttribute("class","normal-good");
          //document.getElementById("patientLocation").setAttribute("class","normal-good");
          //document.getElementById("bedNumber").setAttribute("class","normal-good");
          document.getElementById("patientIcon").setAttribute("class","patientIcon-good")
        }
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

  /*==============Funciones para paciente simulado=============*/
  /*===========================================================*/


  getBloodPressureSimulated(){
    this.bloodPressureArraySimulated = [];
    this.sub = this.http.get<bloodPressureSimulated[]>(this.bloodPressureUrlSimulated)
    .subscribe((data: bloodPressureSimulated[]) => {
        data.map((i) => {
          this.bloodPressureArraySimulated.push(i.bloodPressure);
        });
      this.bloodPressure = this.bloodPressureArraySimulated[this.bloodPressureArraySimulated.length - 1];
      if(this.bloodPressure > 109 && this.bloodPressure < 116){
        document.getElementById("bloodPressure-value").setAttribute("class","bloodPressure-value-good");
        document.getElementById("bloodPressureIcon").setAttribute("class","bloodPressureIcon-good");
      }
    });
  }

  getHeartRateSimulated(){
    this.heartRateArraySimulated = [];
    this.sub = this.http.get<heartRateSimulated[]>(this.heartRateUrlSimulated)
    .subscribe((data: heartRateSimulated[]) => {
        data.map((z) => {
          this.heartRateArraySimulated.push(z.heartRate);
        });
      this.heartRate = this.heartRateArraySimulated[this.heartRateArraySimulated.length - 1];
      if(this.heartRate > 59 && this.heartRate < 151){
        document.getElementById("heartPulseIcon").setAttribute("class","heartPulseIcon-good");
        document.getElementById("heartRate-value").setAttribute("class","heartRate-value-good");
      }
    });
  }

  getTemperatureSimulated(){
    this.temperatureArraySimulated  = [];
    this.sub = this.http.get<temperatureSimulated[]>(this.temperatureUrlSimulated)
    .subscribe((data: temperatureSimulated[]) => {
        data.map((v) => {
          this.temperatureArraySimulated.push(v.temperature);
        });
      this.temperature = this.temperatureArraySimulated[this.temperatureArraySimulated.length - 1];
      if(this.temperature > 95 && this.temperature < 100){
        document.getElementById("temperatureIcon").setAttribute("class","temperatureIcon-good");
        document.getElementById("temperature-value").setAttribute("class","temperature-value-good");
      }
    });
  }

  getOxygenSimulated(){
    this.oxygenArraySimulated = [];
    this.sub = this.http.get<oxygenSimulated[]>(this.oxygenUrlSimulated)
    .subscribe((data: oxygenSimulated[]) => {
        data.map((q) => {
          this.oxygenArraySimulated.push(q.oxygen);
        });
      this.oxygen = this.oxygenArraySimulated[this.oxygenArraySimulated.length - 1];
      if(this.oxygen > 69 && this.oxygen < 121 ){
        document.getElementById("oxygenIcon").setAttribute("class","oxygenIcon-good");
        document.getElementById("oxygen-value").setAttribute("class","oxygen-value-good");
      }
    });
  }

  getDataSimulated(){
    this.loadData = false;
    this.chartData[0].data = [];
    this.labels = [];
    this.dateArray = [];
    this.hourArray = [];

    this.sub = this.http.get<heartRateSimulated[]>(this.heartRateUrlSimulated)
    .subscribe((data: heartRateSimulated[]) => {
      data.map((x) => {
        this.chartData[0].data.push(x.heartRate);
        this.labels.push(x.Hora);
        this.dateArray.push(x.Fecha);
        this.hourArray.push(x.Hora);

        if(x.heartRate > 59 && x.heartRate < 151) {
          this.chartData[0].backgroundColor  = 'rgb(45, 189, 53)';
        }else{
          this.chartData[0].backgroundColor  = '#e45866';
        }

      })
      console.log(this.chartData);
      this.loadData = true;
     
    });
  }

  getPatientStatusSimulated(){
    this.sub = this.http.get<patientStatusSimulated[]>(this.patientStatusUrlSimulated)
    .subscribe((data: patientStatusSimulated[]) => {
        data.map((z) => {
          this.patientStatusArraySimulated.push(z.patientStatus);
        });
        this.patientStatus = this.patientStatusArraySimulated[this.patientStatusArraySimulated.length - 1];
        if(this.patientStatus === 'Normal'){
          document.getElementById("patientStatus").setAttribute("class","normal-good");
          //document.getElementById("patientLocation").setAttribute("class","normal-good");
          //document.getElementById("bedNumber").setAttribute("class","normal-good");
          document.getElementById("patientIcon").setAttribute("class","patientIcon-good")
        }
    });
  }

  printPdfSimulated(){
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(4);
    doc.html(document.getElementById('pdfFormatSimulated'),{
        callback: function (doc) {
          doc.save('Historial Medico Oscar Garcia Carranza');
        }
    });
  }

  //Funcion para cargar dash x user
  loadPatient(patient){
     if(patient == "Karely Hernandez Gonzales"){
        this.patientName = this.patientNameArray[0];
        this.locationValue = this.locationArray[0];
        this.bedNumberValue = this.bedNumberArray[0];
        this.bloodTypeValue = this.bloodTypeArray[0];

        this.getBloodPressure();
        this.getHeartRate();
        this.getTemperature();
        this.getOxygen();
        this.getData();
        this.getStatus();

        document.getElementById("pdfButton").removeEventListener("click",this.printPdfSimulated);
        document.getElementById("pdfButton").addEventListener("click", this.printPdf);
     }
     else
        if(patient == "Oscar Garcia Carranza"){
          this.patientName = this.patientNameArray[1];
          this.locationValue = this.locationArray[1];
          this.bedNumberValue = this.bedNumberArray[1];
          this.bloodTypeValue = this.bloodTypeArray[1];

          this.getBloodPressureSimulated();
          this.getHeartRateSimulated();
          this.getTemperatureSimulated();
          this.getOxygenSimulated();
          this.getDataSimulated();
          this.getPatientStatusSimulated();

          document.getElementById("pdfButton").removeEventListener("click",this.printPdf);
          document.getElementById("pdfButton").addEventListener("click", this.printPdfSimulated);
     }
   }

 

  //Cancela observacion
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

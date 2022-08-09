import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer} from '@angular/platform-browser';
import { patientInformation, patientStatus, patientStatusSimulated } from '../models/patientInterface';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
/*===================================================================*/
/*===================================================================*/

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  private sub: Subscription;


  //Iconos.
  userIcon = faUser;

  headerTitle ="VitalCare®";
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
  patientStatusArraySimulated: string[] = [];
  statusLayout: string;
  statusLayoutSimulated: string;
  lastPatientStatusArray: string[] = [];
  lastPatientStatus: string;


  patientInformationUrl: string = 'http://localhost:3050/pacient/patientInfo';
  patientStatusUrl : string = 'http://localhost:3050/pacient/patientStatus';
  patientStatusUrlSimulated: string = 'http://localhost:3050/pacient/patientStatusSimulated';
  lastPatientStatusUrl: string = 'http://localhost:3050/patient/lastPatient';

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private sanitizer: DomSanitizer
  ) {
        this.sanitizer.bypassSecurityTrustHtml(this.patientName);
        this.sanitizer.bypassSecurityTrustHtml(String(this.locationValue));
        this.sanitizer.bypassSecurityTrustHtml(String(this.bedNumberValue));
        this.sanitizer.bypassSecurityTrustHtml(this.bloodTypeValue);
   }

  ngOnInit(): void {
    this.sub = this.http.get<patientInformation[]>(this.patientInformationUrl)
    .subscribe((data: patientInformation[]) => {
        data.map((z) => {
          this.patientNameArray.push(z.name);
          this.locationArray.push(z.roomNumber);
          this.bedNumberArray.push(z.bedNumber);
          this.bloodTypeArray.push(z.bloodType);
        });
    });

    this.sub = this.http.get<patientStatus[]>(this.patientStatusUrl)
    .subscribe((data: patientStatus[]) => {
        data.map((z) => {
          this.patientStatusArray.push(z.patientStatus);
        });
        this.statusLayout = this.patientStatusArray[this.patientStatusArray.length -1];
    });

    this.sub = this.http.get<patientStatusSimulated[]>(this.patientStatusUrlSimulated)
    .subscribe((data: patientStatusSimulated[]) => {
        data.map((z) => {
          this.patientStatusArraySimulated.push(z.patientStatus);
        });
        this.statusLayoutSimulated = this.patientStatusArraySimulated[this.patientStatusArraySimulated.length - 1];
    });

    this.sub = this.http.get<patientStatus[]>(this.lastPatientStatusUrl)
    .subscribe((data: patientStatus[])=>{
      data.map((z)=>{
        this.lastPatientStatusArray.push(z.patientStatus);
      })
    });
        this.lastPatientStatus = this.lastPatientStatusArray[0];
  }

  public open(){
    this.router.navigateByUrl('/patientLocation/new');
  }

  AddUserIcon = faUserPlus;

}

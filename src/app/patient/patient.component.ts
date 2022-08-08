import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer} from '@angular/platform-browser';
import {patientInformation} from '../models/patientInterface';

/*===================================================================*/
/*===================================================================*/

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  private sub: Subscription;

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

  patientInformationUrl: string = 'http://localhost:3050/pacient/patientInfo';

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

  }

  public open(){
    this.router.navigateByUrl('/patientLocation/new');
  }

}

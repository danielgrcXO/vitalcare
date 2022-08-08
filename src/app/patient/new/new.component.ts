import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { faCake } from '@fortawesome/free-solid-svg-icons';
import { faRulerVertical } from '@fortawesome/free-solid-svg-icons';
import { faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  private sub: Subscription;
  name: string  = '';
  LastName: string = '' ;
  age: number  = null;
  bloodType: string = '';
  height: number = null;
  weight: number = null;
  Reason: string = '';
  Extras: string = '';

  patientInformationUrl: string = 'http://localhost:3050/patient/newPatient';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  savePatient(data:any){
    this.http.post(this.patientInformationUrl, data).subscribe((result)=>{
      console.log(result);
      console.warn(result);
    });
    alert("Registered Successfully");
    this.router.navigateByUrl('/home');
  };

  UserIcon = faUser;
  Place = faBuilding;
  Email = faEnvelope;
  Phone = faPhone;
  Location = faLocation;
  Birthday = faCake;
  HeightIcon = faRulerVertical;
  WeightIcon = faWeightHanging;
  Visit = faNotesMedical;
  Comment = faCommentMedical;
  SaveIcon = faUserPlus;
}
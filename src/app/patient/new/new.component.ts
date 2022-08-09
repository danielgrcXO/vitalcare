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
import { ThisReceiver } from '@angular/compiler';

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
  

  //Validation
  firstNameValidation: any;
  lastNameValidation: any;
  ageValidation: any;
  bloodTypeValidation: any;
  heightValidation: any;
  weightValidation:any;
  reasonVisitValidation: any;
  extraInformationValidation: any;

  validationCorrect: boolean;


  patientInformationUrl: string = 'http://localhost:3050/patient/newPatient';

  constructor(private router: Router, private http: HttpClient) {}

  headerTitle = 'VitalCare®';


  ngOnInit(): void {
  }

  savePatient(data:any){
    this.firstNameValidation = document.getElementById('inFirstName');
    this.lastNameValidation = document.getElementById("inLastName");
    this.ageValidation = document.getElementById("inAge");
    this.bloodTypeValidation = document.getElementById("inBloodType");
    this.heightValidation = document.getElementById("inHeight");
    this.weightValidation = document.getElementById("inWeight");
    this.reasonVisitValidation = document.getElementById("inReason");
    this.extraInformationValidation = document.getElementById("inExtras");

    if(this.firstNameValidation.value == ''  || this.lastNameValidation.value == '' || this.ageValidation.value == '' || this.bloodTypeValidation.value == '' || this.heightValidation.value == '' || 
       this.weightValidation.value == '' ||this.reasonVisitValidation.value == '' || this.extraInformationValidation.value == '' ) {
          this.validationCorrect = false;
    }else{
          this.validationCorrect = true;
    }

    if(this.validationCorrect == true){
    this.http.post(this.patientInformationUrl, data).subscribe((result)=>{
      console.log(result);
      console.log(result)
      console.warn(result);
    });
    alert("Registered Successfully");
    this.router.navigateByUrl('/dashboard');
  }else{
    alert("Empty fields, please complete all");
  }
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
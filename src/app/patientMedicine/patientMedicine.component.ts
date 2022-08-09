import { Component, OnInit } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


declare var doSearch: any;
declare var openModal: any;


@Component({
  selector: 'app-patientMedicine',
  templateUrl: './patientMedicine.component.html',
  styleUrls: ['./patientMedicine.component.css']
})
export class PatientMedicineComponent implements OnInit {
  deleteIcon = faTrashCan;

  headerTitle = 'VitalCare®';

  constructor() { }

  ngOnInit() {
  }

  onClick1(){
    doSearch(); 
  }
  
  onClick2(){
    openModal(); 
  }
  


}






import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { faCake } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public register(){
    alert("Registered Successfully");
    this.router.navigateByUrl('/home');
  }

  UserIcon = faUser;
  Place = faBuilding;
  Email = faEnvelope;
  Phone = faPhone;
  Location = faLocation;
  Birthday = faCake;
}
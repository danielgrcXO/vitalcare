//imports globales
import { Component, OnInit } from '@angular/core';

//imports de iconos
import {faHeartPulse} from '@fortawesome/free-solid-svg-icons';

/*===================================================================*/
/*===================================================================*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //iconos
  HeartIcon = faHeartPulse;

}

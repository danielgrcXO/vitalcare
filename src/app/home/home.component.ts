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

  //variables
  mainTitle = 'Vital Care';
  mainDescription = ' The best doctor is the one who best inspires hope. Consult and automate patient management in a matter of minutes!';

  //iconos
  HeartIcon = faHeartPulse;

  constructor() { }

  ngOnInit(): void {
  }
}

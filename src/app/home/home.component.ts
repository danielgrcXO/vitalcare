//imports globales
import { Component, OnInit } from '@angular/core';


//Imports de librerias
import { DomSanitizer} from '@angular/platform-browser';

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

  
  constructor(private sanitizer: DomSanitizer) { 
    this.sanitizer.bypassSecurityTrustHtml(this.mainTitle);
    this.sanitizer.bypassSecurityTrustHtml(this.mainDescription);
  }

  ngOnInit(): void {
  }
}

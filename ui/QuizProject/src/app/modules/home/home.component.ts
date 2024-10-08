import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router){

  }
  displaySpinner = false;

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationStart){
        this.displaySpinner = true;
      }
      if(event instanceof NavigationEnd ||
         event instanceof NavigationCancel ||
         event instanceof NavigationError){
          this.displaySpinner = false;
      }
    });
  }
}

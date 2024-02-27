import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router){

  }
  title = 'TestProject';
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

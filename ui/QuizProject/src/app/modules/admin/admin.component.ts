import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private router: Router){

  }
  displaySpinner: boolean = false;

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationStart){
        this.displaySpinner = true;
      }
      // setTimeout(() => {
      //   if(event instanceof NavigationEnd ||
      //     event instanceof NavigationCancel ||
      //     event instanceof NavigationError){
      //      this.displaySpinner = false;
      //  }
      // },2000)
      
    });
  }
}

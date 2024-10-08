import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

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

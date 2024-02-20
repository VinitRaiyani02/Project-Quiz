import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { UserRole } from 'src/app/shared/enums/userrole.enum';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  activeRoute: string = '';
  constructor(private router: Router,public helperService: HelperService,private tokenService: TokenService){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.activeRoute = event.urlAfterRedirects;
    });
   
  }
  
  userid: number = 0;

  Logout(){
    sessionStorage.removeItem("token");
    this.helperService.loggedIn.set(false);
    this.helperService.userRole.set('');
    this.router.navigate([""]);
  }
  Profile(){
      this.userid = this.tokenService.getCustomClaims().Id;
      let role = sessionStorage.getItem('role');

      if(role != null && role == UserRole.Admin.toString()){
        this.router.navigate(['admin','profile'],{queryParams: {id: this.userid}});
      }
      else {
        this.router.navigate(['user','profile'],{queryParams: {id: this.userid}});
      }
  }
  RedirectToHome(){
    let role = sessionStorage.getItem('role');
      if(role != null && role == UserRole.Admin.toString()){
        this.router.navigate(['admin']);
      }
      else if(role != null && role == UserRole.User.toString()) {
        this.router.navigate(['user']);
      }
      else{
        this.router.navigate(['']);
      }
  }
}

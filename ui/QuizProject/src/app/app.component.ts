import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';


declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,private authService: SocialAuthService){

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
    // const handleOauthResponse = (response: any) => {
    //   if (response.error) {
    //     console.error('Google One Tap error:', response.error);
    //   } else {
    //     const idToken = response.credential;
    //     console.log(idToken);
    //   }
    // };
    // window.onload = () => {
    //   google.accounts.id.initialize({
    //     client_id: '11835537092-jgohs6ve0fe6o42jni4ucl4209ca0hgr.apps.googleusercontent.com',
    //     callback: handleGoogleOneTapResponse
    //   });
    // };
  }
  user!: SocialUser;

  handleOauthResponse(response: any){
    console.log(response);
  }
 

}

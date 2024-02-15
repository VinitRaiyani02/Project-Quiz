import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  ngOnInit(): void {
    let btnid = document.getElementById("logoutbtn");
    if(btnid != null){
      btnid.style.display = "block";
    }
  }
}

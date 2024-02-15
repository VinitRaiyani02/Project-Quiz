import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ngOnInit(): void {
    let btnid = document.getElementById("logoutbtn");
    if(btnid != null){
      btnid.style.display = "block";
    }
  }
}

import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  jwtToken: string | null = "";
  decodedToken: any;

  constructor() {
  }

  setToken() {
    this.jwtToken = sessionStorage.getItem("token");
  }

  decodeToken() {
    if (this.jwtToken) {
    this.decodedToken = jwtDecode(this.jwtToken);
    }
  }

  getUserRole() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    let dat = new Date(expiryTime * 1000);
    if (expiryTime) {
      return dat.getTime() < Date.now();
    } else {
      return false;
    }
  }

}



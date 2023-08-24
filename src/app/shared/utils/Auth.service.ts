import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private jwtService: JwtHelperService) {}

  isLoggedIn(): boolean {
    let tokenDecoded = this.jwtService.decodeToken();

    if (!tokenDecoded || this.jwtService.isTokenExpired()) {
      return false;
    }

    return true;
  }
}

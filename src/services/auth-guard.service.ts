import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { LocalStorageHelper } from 'src/app/helpers/local-storage.helper';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router,
    private localStorageHelper: LocalStorageHelper) {}

  goToLogin(): void {
    this.localStorageHelper.clearStorage();
    this.router.navigate(['/login']);
  }


  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const result = this.localStorageHelper.getLoggedUserInfo();
    console.log(result);
    if (result !== null) {
      return true;
    } else {
      this.goToLogin();
    }

    return false;
  }
}

import { Component, OnInit, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
import { LocalStorageHelper } from 'src/app/helpers/local-storage.helper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  constructor(private router: Router, private socialAuthService: SocialAuthService, protected localStorageHelper: LocalStorageHelper) { }
  usuario:string;
  ngOnInit(): void {
    this.usuario = this.localStorageHelper.getLoggedUserInfo()?.Name!;
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  logOut(): void {
    this.localStorageHelper.clearStorage();
    this.router.navigate(['/login']);
  }
}

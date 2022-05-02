import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { LocalStorageHelper } from 'src/app/helpers/local-storage.helper';
import { User } from 'src/models/logged-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: SocialUser | undefined;
  isSignedin: any
  constructor(private router: Router, private route: ActivatedRoute, private socialAuthService: SocialAuthService, private StorageHelper: LocalStorageHelper,) { }

  ngOnInit(): void {
    if(this.StorageHelper.getLoggedUserInfo())
      this.router.navigate(['/home']);
  }

  facebookSignin(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedin = (user != null);
      console.log(this.user);
      if(this.isSignedin) {
        let data:User = {
          Id: user.id,
          Email: user.email,
          Name: `${user.name}`,
          Token: user.authToken
        };
        this.StorageHelper.setLoggedUserInfo(data);
        this.router.navigate(['/home']);
      }
    });
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}

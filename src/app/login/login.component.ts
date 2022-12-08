import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  message = '';

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    public router: Router) {
    this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
  }

  ngOnInit() {
    if (this.authService.user.username != null) {
      this.router.navigate(['/pages/dashboard']);
    }
  }

  submit(user) {
    this.authService.login(user)
      .subscribe(res => {
        if (res.success) {
          console.log(res);
          this.authService.user = res.account;
          localStorage.setItem('user', JSON.stringify(res.account));
          this.router.navigate(['/pages/dashboard']);
        } else {
          console.log(res);
          this.message = 'login failed';
        }
      });
  }
}

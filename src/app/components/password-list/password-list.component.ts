import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Password } from 'src/app/models/Password';
import { Site } from 'src/app/models/Site';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  site!: Site;

  passwordList!: Observable<Password[]>;

  constructor(
    private route: ActivatedRoute,
    private passwordService: PasswordService
  ) {
    this.route.queryParams.subscribe((values: any) => {
      this.site = {
        id: values.id,
        name: values.siteName,
        url: values.siteURL,
        imgURL: values.siteImgURL,
      };
    });

    this.loadPasswords();
  }

  loadPasswords() {
    this.passwordList = this.passwordService.loadPasswords(this.site.id);
  }

  onSubmit(values: object) {
    this.passwordService
      .addPassword(values, this.site.id)
      .then(() => {
        console.log('Password saved successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

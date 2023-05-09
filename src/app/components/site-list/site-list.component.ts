import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordManagerService } from 'src/app/services/password-manager.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {
  allSites!: Observable<Array<any>>;

  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;
  siteId!: string;

  formState: string = 'Add New';

  constructor(private passwordManager: PasswordManagerService) {
    this.loadSites();
  }

  loadSites() {
    this.allSites = this.passwordManager.loadSites();
  }

  onSubmit(values: object): void {
    if (this.formState === 'Add New') {
      this.passwordManager
        .addSite(values)
        .then(() => {
          console.log('Data saved successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState === 'Edit') {
      this.passwordManager
        .updateSite(this.siteId, values)
        .then(() => {
          this.resetForm();
          console.log('Data updated successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  editSite(siteName: string, siteURL: string, siteImgURL: string, id: string) {
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.siteImgURL = siteImgURL;
    this.siteId = id;

    this.formState = 'Edit';
  }

  resetForm() {
    this.siteName = '';
    this.siteURL = '';
    this.siteImgURL = '';
    this.siteId = '';

    this.formState = 'Add New';
  }
}

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

  formState: string = 'Add new';

  constructor(private passwordManager: PasswordManagerService) {
    this.loadSites();
  }

  onSubmit(values: object): void {
    this.passwordManager
      .addSite(values)
      .then(() => {
        console.log('Data save Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadSites() {
    this.allSites = this.passwordManager.loadSites();
  }

  editSite(siteName: string, siteURL: string, siteImgURL: string, id: string) {
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.siteImgURL = siteImgURL;
    this.siteId = id;
  }
}

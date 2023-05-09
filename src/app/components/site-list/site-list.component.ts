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

  isSuccess: boolean = false;
  successMessage!: string;

  constructor(private passwordManagerService: PasswordManagerService) {
    this.loadSites();
  }

  loadSites() {
    this.allSites = this.passwordManagerService.loadSites();
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;

    setTimeout(() => {
      this.isSuccess = false;
      this.successMessage = '';
    }, 3000);
  }

  onSubmit(values: object): void {
    if (this.formState === 'Add New') {
      this.passwordManagerService
        .addSite(values)
        .then(() => {
          this.showAlert('Data added successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState === 'Edit') {
      this.passwordManagerService
        .updateSite(this.siteId, values)
        .then(() => {
          this.showAlert('Data edited successfully');
          this.resetForm();
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

  deleteSite(id: string) {
    this.passwordManagerService
      .deleteSite(id)
      .then(() => {
        this.showAlert('Data deleted successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  resetForm() {
    this.siteName = '';
    this.siteURL = '';
    this.siteImgURL = '';
    this.siteId = '';

    this.formState = 'Add New';
  }
}

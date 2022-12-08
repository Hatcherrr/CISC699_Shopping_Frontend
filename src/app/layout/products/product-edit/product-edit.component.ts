import {Component, Inject, Provider} from '@angular/core';
import {ProductsService} from '../../../common/services/products.service';
import {UsersService} from '../../../common/services/users.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {ProvidersService} from '../../../common/services/providers.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {

  provider: Provider;

  constructor(public dialogRef: MatDialogRef<ProductEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private providerService: ProvidersService,
              private prodService: ProductsService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  loadProvider() {
    this.providerService.getProvider(this.data.providerid).subscribe(
      res => {
        console.log(res);
        if (res) {
          this.provider = res;
        } else {
          this.provider = null;
        }
      }
    );
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.prodService.updateProduct(this.data.id, this.data).subscribe(
      res => {
        if (res.success) {
          console.log('edit products success!');
        }
      }
    );
  }
}

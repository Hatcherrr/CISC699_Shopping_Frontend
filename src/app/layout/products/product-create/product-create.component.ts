import {Component, Inject, Provider} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {ProductsService} from '../../../common/services/products.service';
import {UsersService} from '../../../common/services/users.service';
import {User} from '../../../common/models/user';
import {ProvidersService} from '../../../common/services/providers.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {

  provider: Provider;

  myType;
  myProduct;

  constructor(public dialogRef: MatDialogRef<ProductCreateComponent>,
              private prodService: ProductsService,
              private providerService: ProvidersService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

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

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd() {
    // console.log(this.data);
    this.prodService.addProduct(this.data).subscribe(
      res => {
        if (res) {
          console.log('add successfully');
        } else {
          console.log('failed to add');
        }
      }
    );
  }
}

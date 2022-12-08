import {Component, Inject} from '@angular/core';
import {ProductsService} from '../../../common/services/products.service';
import {UsersService} from '../../../common/services/users.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent {

  constructor(public dialogRef: MatDialogRef<ProductDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private prodService: ProductsService,
              private userService: UsersService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.prodService.deleteProduct(this.data.id).subscribe(
      res => {
        if (res.success) {
          console.log('delete successfully');
        } else {
          console.log('failed to delete');
        }
      }
    );
  }
}

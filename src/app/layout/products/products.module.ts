import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageHeaderComponent} from '../../common/modules/page-header/page-header.component';
import {PageHeaderModule} from '../../common/modules';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule, MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatPaginatorModule
} from '@angular/material';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from './products.component';
import {ProductManageComponent} from './product-manage/product-manage.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductDeleteComponent} from './product-delete/product-delete.component';
import {ProductEditComponent} from './product-edit/product-edit.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductManageComponent,
    ProductCreateComponent,
    ProductDeleteComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    PageHeaderModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    ProductsRoutingModule
  ],
  entryComponents: [
    ProductCreateComponent,
    ProductDeleteComponent,
    ProductEditComponent
  ]
})
export class ProductsModule {}

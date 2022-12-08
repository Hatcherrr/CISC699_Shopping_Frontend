import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../../common/models/product';
import {Subscription} from 'rxjs';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material';
import {ProductsService} from '../../../common/services/products.service';
import {Router} from '@angular/router';
import {ProductCreateComponent} from '../product-create/product-create.component';
import {ProductDeleteComponent} from '../product-delete/product-delete.component';
import {ProductEditComponent} from '../product-edit/product-edit.component';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit, OnDestroy {

  products: Product[];
  subGet: Subscription;
  subDel: Subscription;

  dataSource;
  displayedColumns = ['id', 'providerid', 'createdon', 'lastupdate', 'name', 'description', 'price', 'number', 'tags', 'pictures', 'status', 'options'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public ps: ProductsService,
              private router: Router,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.subGet = this.ps.getProducts().subscribe(
      res => {
        console.log(res);
        this.products = res;
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'date': return new Date(item.time);
            default: return item[property];
          }
        };
      });
  }

  editProd(id: string, providerid: string, createdon: Date, lastupdate: Date, name: string, description: string, price: number, no: number, tags: string[], pictures: string[], status: string) {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      data: {id: id, providerid: providerid, createdon: createdon, lastupdate: lastupdate, name: name, description: description, price: price, amount: no, tags: tags, pictures: pictures, status: status}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    });
  }

  addNew() {
    let prod = new Product();
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: prod
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    });
  }

  deleteProd(id: string, providerid: string, createdon: Date, lastupdate: Date, name: string, description: string, price: number, no: number, tags: string[], pictures: string[], status: string) {
    // this.index = i;
    // this.id = id;
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      data: {id: id, providerid: providerid, createdon: createdon, lastupdate: lastupdate, name: name, description: description, price: price, amount: no, tags: tags, pictures: pictures, status: status}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    });
  }

  ngOnDestroy() {
    if (this.subGet) {
      this.subGet.unsubscribe();
    }
    if (this.subDel) {
      this.subDel.unsubscribe();
    }
  }
}

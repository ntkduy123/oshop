import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;

  product = <any>{};

  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private prodcutService: ProductService
  ) {
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.prodcutService.get(this.id).take(1).subscribe(p => this.product = p);
    }
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id) {
      this.prodcutService.update(this.id, product);
    } else {
      this.prodcutService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product ?')) {
      this.prodcutService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }

    return;
  }

}

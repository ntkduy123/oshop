import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  filteredProducts: Product[] = [];

  category;

  cart$: Observable<ShoppingCart>;

  constructor(private productService: ProductService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) { }

  private populateProducts() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }
}

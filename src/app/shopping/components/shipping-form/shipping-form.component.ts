import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  shipping = <any>{};

  userSubscription: Subscription;

  userId: string;

  @Input('cart') cart: ShoppingCart;

  constructor(private router: Router, private orderService: OrderService, private authService: AuthService) { }

  async ngOnInit() {
    this.userSubscription = await this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

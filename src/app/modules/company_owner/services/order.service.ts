import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private apiService: ApiService,
  ) { }

  getOrders(customer_id:string) {
    return this.apiService.post("/order/get_orders_by_customer_id", {customer_id:customer_id})
  }
  getOrderById(id:string) {
    return this.apiService.post("/order/get_order_by_id", {id:id})
  }
  addOrder(order:{}) {
    return this.apiService.post("/order/add_or_update_order", order)
  }
  addOrderDetail(detail:{}) {
    return this.apiService.post("/order/add_or_update_order_detail", detail)
  }
  updateOrder(order:{}) {
    return this.apiService.post("/order/add_or_update_order", order)
  }
  removeOrderDetail(id:string) {
    return this.apiService.post("/order/remove_order_detail", {id:id})
  }
  addTransaction(transaction:{}) {
    return this.apiService.post("/order/add_order_transaction", transaction)
  }
  updateTransaction(transaction:{}) {
    return this.apiService.post("/order/add_order_transaction", transaction)
  }
  removeTransaction(id:string) {
    return this.apiService.post("/order/remove_order_transaction", {id:id})
  }
  
}

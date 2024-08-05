import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(
    private apiService: ApiService,
  ) { }

  getCustomers(req:{}) {
    return this.apiService.post("/customer/get_customers_by_owner_id", req)
  }
  deleteCustomer(id:string) {
    return this.apiService.post("/customer/remove_customer", {id:id})
  }
  addCustomer(customer:{}){
    return this.apiService.post("/customer/add_or_update_customer",customer)
  }
  updateCustomer(customer:{}){
    return this.apiService.post("/customer/add_or_update_customer",customer)
  }
  getCustomerById(id:string){
    return this.apiService.post("/customer/get_customer_by_id",{id:id})
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private apiService: ApiService,
  ) { }

  getProducts(user_id:string) {
    return this.apiService.post("/product/get_products_by_user_id", {user_id:user_id})
  }
  addProduct(product:{}) {
    return this.apiService.post("/product/add_or_update_product", product);
  }
  updateProduct(product:{}) {
    return this.apiService.post("/product/add_or_update_product", product);
  }
  // deleteProduct(id:string){
  //   return this.apiService.post("/product/add_or_update_product", product);

  // }
}

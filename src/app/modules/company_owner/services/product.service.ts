import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private apiService: ApiService,
  ) { }

  getProducts(req:{}) {
    return this.apiService.post("/product/get_products_by_user_id", req)
  }
  addProduct(product:{}) {
    return this.apiService.post("/product/add_or_update_product", product);
  }
  updateProduct(product:{}) {
    return this.apiService.post("/product/add_or_update_product", product);
  }
  deleteProduct(id:string){
    return this.apiService.post("/product/remove_product", {id:id});
  }
  addStockToProduct(stock:{}){
    return this.apiService.post("/product/add_or_update_product_stock", stock);
  }
  // updateStockInProduct(stock:{}){
  //   return this.apiService.post("/product/add_or_update_product_stock", stock);
  // }
  getProduct(id:string){
    return this.apiService.post("/product/get_product_by_id", {id:id});
  }
  deleteProductStock(id:string){
    return this.apiService.post("/product/remove_product_stock", {id:id});
  }
  getProductBuyerDetails(product_id:string){
    return this.apiService.post("/product/get_product_buyer_details", {product_id:product_id});
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { SweetalertService } from 'src/app/modules/shared/services/sweetalertservice.service';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrl: './productslist.component.scss'
})
export class ProductslistComponent implements OnInit{
  constructor(
    private userService:UserService,
    private productService:ProductService,
    private router:Router,
    private toastService:ToastService,
    private sweetAlertService:SweetalertService
  ){}

  userId:string |null=null;
  productsList:any=[];
  addEditProductDialog:boolean=false;
  addOrEditProductDialogHeader:string="Add Product";
  product:any={product_type:""};
  boolEditProduct:boolean=false;
  productsType:any={};
  productToEditIndex:number | null=null;
  addStockDialog:boolean=false;
  idToAddStock:string | null=null;
  addStockIndex:number | null=null;
  stock:any={};
  ngOnInit() {
    this.userId=this.userService.getUserId();
    this.productsType=Constants.PRODUCT_TYPES;
    this.productService.getProducts(this.userId!).subscribe({
      next:(data)=>{
        this.productsList=data.products;

      },
      error:(error)=>{

      }
    })
    
  }
  AddProduct(){
    this.addEditProductDialog=true;
  }
  canceladdOrEditProduct(){
    this.product={product_type:""};
    this.addEditProductDialog=false;
    this.boolEditProduct=false;
    this.addOrEditProductDialogHeader="Add Product";
  }
  updateProductFeetAmount(event:any){
    this.productsList[this.addStockIndex!].total_feet=event.total_feet;
    this.productsList[this.addStockIndex!].total_amount=event.total_amount;
  }
  addNewProduct(){
    this.product.owner_id=this.userId;
    this.productService.addProduct(this.product).subscribe({
      next:(data)=>{        
        this.toastService.showToast("Product Aded Sucessfully","succes");
        this.productsList.push(data);
        this.product={product_type:""};
        this.addEditProductDialog=false;
      },
      error:(error)=>{
        this.toastService.showToast(error,"error");
      }
    })
  }
  editProduct(product:any,index:number){
    this.boolEditProduct=true;
    this.addOrEditProductDialogHeader="Edit Product";
    this.product={... product};
    this.addEditProductDialog=true;
    this.productToEditIndex=index;
  }
  updateProductDetails(){
    this.productService.updateProduct(this.product).subscribe({
      next:(data)=>{
        this.toastService.showToast("Poduct Updated Successfully","success");
        this.productsList[this.productToEditIndex!]=data;
        this.product={product_type:""};
        this.boolEditProduct=false;
        this.addEditProductDialog=false;
      },
      error:(error)=>{

      }
    })

  }
  async delete(id: string, index: number) {
    var x = await this.sweetAlertService.warning("Warning", "Are you sure you want to delete the Product");
    if (x.value) {
      this.productService.deleteProduct(id).subscribe({
        next: (data) => {
          this.productsList.splice(index, 1);
          this.toastService.showToast("Product Deleted Successfully", "success");
        },
        error: (error) => {
          return;
        }
      })
    }
  }
  addStock(product:any,index:number){
    this.addStockIndex=index;
    this.idToAddStock=product.id;
    this.addStockDialog=true;
  }
  cancelAddStock(event:any){
    this.addStockDialog=false;
    this.idToAddStock=null;
    this.stock={};
    this.addStockIndex=null;
  }
  goTo(url:string){
    this.router.navigate([url]);
  }

}

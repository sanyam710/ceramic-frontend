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
  // async delete(id: number, index: number) {
  //   var x = await this.sweetAlertService.warning("Warning", "Are you sure you want to delete the Client");
  //   if (x.value) {
  //     this.productService.deleteProduct(id).subscribe({
  //       next: (data) => {
  //         this.clientList.splice(index, 1);
  //         this.toastService.showToast("Client Deleted Successfully", "success");
  //       },
  //       error: (error) => {
  //         return;
  //       }
  //     })
  //   }
  // }
  goTo(url:string){
    this.router.navigate([url]);
  }

}

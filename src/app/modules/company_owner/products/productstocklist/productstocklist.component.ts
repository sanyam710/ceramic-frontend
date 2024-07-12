import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetalertService } from 'src/app/modules/shared/services/sweetalertservice.service';

@Component({
  selector: 'app-productstocklist',
  templateUrl: './productstocklist.component.html',
  styleUrl: './productstocklist.component.scss'
})
export class ProductstocklistComponent implements OnInit {
  constructor(
    private userService:UserService,
    private toastService:ToastService,
    private productService:ProductService,
    private router:Router,
    private route:ActivatedRoute,
    private sweetAlertService:SweetalertService
  ){}
  stockList:any=[];
  productId:string | null=null;
  idToAddStock:string | null=null;
  addEditStockDialog:boolean=false;
  // boolEditStock:boolean=false;
  stock:any={};
  stockToEditIndex:number | null=null;
  ngOnInit() {
    this.route.params.subscribe(({id})=>{
      this.productId=id;
    })
    this.productService.getProduct(this.productId!).subscribe({
      next:(data)=>{
        this.stockList=data.product_stocks;
      },
      error:(error)=>{

      }
    })
    
  }
  addStock(){
    this.idToAddStock=this.productId;
    this.addEditStockDialog=true;
  }
  // editStock(stock:any,index:number){
  //   this.boolEditStock=true;
  //   this.addEditStockDialog=true;
  //   this.stock={... stock};
  //   this.stockToEditIndex=index;
  // }
  addOrUpdateStock(event:any){
    // if(this.boolEditStock){
    //   this.stockList[this.stockToEditIndex!]=event;
    // }
    // else{
      this.stockList.push(event);
    // }
    this.cancelAddEditStock(false);
  }
  cancelAddEditStock(event:any){
    // this.boolEditStock=false;
    this.addEditStockDialog=false;
    this.stockToEditIndex=null;
    this.stock={};
  }
  async delete(id: string, index: number) {
    var x = await this.sweetAlertService.warning("Warning", "Are you sure you want to delete the Stock");
    if (x.value) {
      this.productService.deleteProductStock(id).subscribe({
        next: (data) => {
          this.stockList.splice(index, 1);
          this.toastService.showToast("Stock Deleted Successfully", "success");
        },
        error: (error) => {
          return;
        }
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetalertService } from 'src/app/modules/shared/services/sweetalertservice.service';
import { Constants } from 'src/app/constants/constants';

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
  viewStockDialog:boolean=false;
  selectedStock:any={};
  // boolEditStock:boolean=false;
  product:any={};
  stockTypes:any={};
  stock:any={};
  stockToEditIndex:number | null=null;
  ngOnInit() {
    this.route.params.subscribe(({id})=>{
      this.productId=id;
    })
    this.stockTypes=Constants.STOCK_TYPE;
    this.productService.getProduct(this.productId!).subscribe({
      next:(data)=>{
        this.stockList=data.product_stocks;
        this.product=data.product;
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
    console.log(event.length);
    if(event.length==1){
      this.stockList.push(event[0]);
    }
    if(event.length==2){
      this.stockList.push(event[0]);
      this.stockList.push(event[1]);
    }
    if(event.length==3){
      this.stockList.push(event[0]);
      this.stockList.push(event[1]);
      this.stockList.push(event[2]);
    }
      
      this.stock={};
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
  viewDetails(index:number){
    this.viewStockDialog=true;
    this.selectedStock=this.stockList[index];
  }
  closeViewDetails(){
    this.viewStockDialog=false;
    this.selectedStock={};
    this.stock={};
  }

}

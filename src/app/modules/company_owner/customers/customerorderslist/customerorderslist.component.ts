import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetalertService } from 'src/app/modules/shared/services/sweetalertservice.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-customerorderslist',
  templateUrl: './customerorderslist.component.html',
  styleUrl: './customerorderslist.component.scss'
})
export class CustomerorderslistComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private orderService: OrderService,
    private sweetAlertService: SweetalertService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  customerId:string | null=null;
  ordersList:any=[];
  order:any={};
  addOrEditOrderDialog:boolean=false;
  boolEditOrder:boolean=false;
  orderToEditIndex:number | null=null;
  orderIdToAddDetail:string | null=null;
  addOrderDetailDialog:boolean=false;
  addTransactionDialog:boolean=false;
  orderIdToAddTransaction:string | null=null;
  ngOnInit() {
    this.route.params.subscribe(({id})=>{
      this.customerId=id;
    })
    this.orderService.getOrders(this.customerId!).subscribe({
      next:(data)=>{
        this.ordersList=data;

      },
      error:(error)=>{

      }
    })
  }
  printBill(id:string){
    var req={"order_id":id}
    this.orderService.generateInvoice(req).subscribe({
      next:(data)=>{
        this.toastService.showToast("Invoice generated Successfully","success");
      },
      error:(error)=>{
        
      }
    })
  }
  AddOrder(){
    this.addOrEditOrderDialog=true;
  }
  AddTransaction(id:string) {
    this.addTransactionDialog = true;
    this.orderIdToAddTransaction=id;
  }
  goTo(url:string){
    this.router.navigate([url]);
  }
  showAddOrderDetailDialog(order:any){
    this.orderIdToAddDetail=order.id;
    this.addOrderDetailDialog=true;
  }
  closeAddTransaction(event:any){
    this.addTransactionDialog = false;
    this.orderIdToAddTransaction=null;
  }
  editOrder(order:any,index:number){
    this.order={... order};
    this.orderToEditIndex=index;
    this.boolEditOrder=true;  
    this.addOrEditOrderDialog=true;
  }
  closeAddEditOrder(event:any){
    this.addOrEditOrderDialog=false;
    this.orderToEditIndex=null;
    this.boolEditOrder=false;
  }
  closeAddEditOrderDetail(event:any){
    this.addOrderDetailDialog=false;
    this.orderIdToAddDetail=null;
  }
  addOrUpdatedOrder(event:any){
    if(this.boolEditOrder){
      this.ordersList[this.orderToEditIndex!]=event;
    }
    else{
      this.ordersList.push(event);
    }
    this.closeAddEditOrder("close");

  }

}

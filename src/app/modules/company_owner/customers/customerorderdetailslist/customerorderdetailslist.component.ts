import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetalertService } from 'src/app/modules/shared/services/sweetalertservice.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-customerorderdetailslist',
  templateUrl: './customerorderdetailslist.component.html',
  styleUrl: './customerorderdetailslist.component.scss'
})
export class CustomerorderdetailslistComponent {

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private orderService: OrderService,
    private sweetAlertService: SweetalertService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  customerId:string | null=null;
  orderDetailsList:any=[];
  orderDetail:any={product_id:null};
  addOrEditOrderDetailDialog:boolean=false;
  boolEditOrderDetail:boolean=false;
  orderDetailToEditIndex:number | null=null;
  orderIdToAddDetail:string | null=null;
  orderId:string | null=null;
  productsList:any=[];
  userId:string | null=null;
  ngOnInit() {
    this.route.params.subscribe(({customer_id,order_id})=>{
      this.customerId=customer_id;
      this.orderId=order_id;
    })
    console.log("sdfdsf");
    this.orderService.getOrderById(this.orderId!).subscribe({
      next:(data)=>{
        this.orderDetailsList=data.order_details;

      },
      error:(error)=>{

      }
    })
  }
  AddOrderDetail(){
    this.addOrEditOrderDetailDialog=true;
    this.boolEditOrderDetail=false;
  }
  editOrderDetail(orderDetail:any,index:number){
    this.orderDetail={... orderDetail};
    this.boolEditOrderDetail=true;
    this.addOrEditOrderDetailDialog=true;
    this.orderDetailToEditIndex=index;

  }
  closeAddEditOrderDetail(event:any){
    this.orderDetail={product_id:null};
    this.boolEditOrderDetail=false;
    this.addOrEditOrderDetailDialog=false;
    this.orderDetailToEditIndex=null;

  }
  addOrUpdateOrderDetail(event:any){
    if(this.boolEditOrderDetail){
      this.orderDetailsList[this.orderDetailToEditIndex!]=event;
    }
    else{
      this.orderDetailsList.push(event);
    }
    this.closeAddEditOrderDetail("false");
  }
  async delete(id: string, index: number) {
    var x = await this.sweetAlertService.warning("Warning", "Are you sure you want to delete the Detail");
    if (x.value) {
      this.orderService.removeOrderDetail(id).subscribe({
        next: (data) => {
          this.orderDetailsList.splice(index, 1);
          this.toastService.showToast("Detail Deleted Successfully", "success");
        },
        error: (error) => {
          return;
        }
      })
    }
  }

}

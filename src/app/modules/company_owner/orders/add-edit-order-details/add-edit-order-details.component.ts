import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { OrderService } from '../../services/order.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-edit-order-details',
  templateUrl: './add-edit-order-details.component.html',
  styleUrl: './add-edit-order-details.component.scss'
})
export class AddEditOrderDetailsComponent {
  constructor(
    private orderService: OrderService,
    private toastService: ToastService,
    private userService:UserService,
    private productService:ProductService
  ) { }

  @Input() orderDetail: any = {product_id:null};
  @Input() orderId: string | null = null;
  @Input() addEditOrderDetailDiaog: boolean = false;
  @Output() close = new EventEmitter<any>();
  @Output() newOrUpdatedOrderDetail = new EventEmitter<any>();
  productsList:any=[];
  userId:string | null=null;

  // ngOnInit() {
  //   this.userId=this.userService.getUserId();
  //   this.productService.getProducts(this.userId!).subscribe({
  //     next:(data)=>{
  //       this.productsList=data.products;

  //     },
  //     error:(error)=>{

  //     }
  //   })
    
  // }

  closeDialog(){
    this.orderDetail={product_id:null};
    this.close.emit(false);
  }
  addNewOrderDetail(){
    this.orderDetail.order_id=this.orderId;
    this.orderService.addOrderDetail(this.orderDetail).subscribe({
      next: (data) => {
        this.toastService.showToast("Order Detail Added Succesfully", "success");
        this.newOrUpdatedOrderDetail.emit(data);
        this.closeDialog();
      },
      error:(error)=>{
      }
    })

  }
  // updateOrderDetailDetails(){
  //   console.log(this.orderDetail);
  //   this.orderDetail=this.orderDetail.order_detail;
  //   console.log("dsfsd",this.orderDetail);
  //   this.orderService.updateOrderDetail(this.orderDetail).subscribe({
  //     next: (data) => {
  //       this.toastService.showToast("Order Detail Updated Succesfully", "success");
  //       this.newOrUpdatedOrderDetail.emit(data);
  //       this.closeDialog();
  //     },
  //     error:(error)=>{
  //     }
  //   })
  // }

}

import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { OrderService } from '../../services/order.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { ProductService } from '../../services/product.service';
import { Constants } from 'src/app/constants/constants';

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
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dropdown', { static: true }) dropdown!: ElementRef<HTMLElement>;
  // @ViewChild('emptyMessage', { static: true }) emptyMessage!: ElementRef<HTMLElement>;
  @ViewChild('dropdownList', { static: true }) dropdownList!: ElementRef<HTMLElement>;
  @ViewChild('searchInput_products', { static: true }) searchInputProducts!: ElementRef<HTMLInputElement>;
  @ViewChild('dropdown_products', { static: true }) dropdownProducts!: ElementRef<HTMLElement>;
  @ViewChild('dropdownList_products', { static: true }) dropdownListProducts!: ElementRef<HTMLElement>;
  @Input() orderDetail: any = {product_id:null,unit_type:""};
  @Input() orderId: string | null = null;
  @Input() addEditOrderDetailDiaog: boolean = false;
  @Output() close = new EventEmitter<any>();
  @Output() newOrUpdatedOrderDetail = new EventEmitter<any>();
  productsList:any=[];
  userId:string | null=null;
  unitType=Constants.UNIT_TYPE;
  customerSearch:string | null=null;
  req:any={};
  selectedProduct:any={};
  productTypes:any=Constants.PRODUCT_TYPES;
  ngOnInit() {
    this.userId=this.userService.getUserId();
    this.req.user_id = this.userId;
    this.productService.getProducts(this.req).subscribe(
      (data) => {
        this.productsList = data.products;
        console.log(this,this.productsList);
      },
      (error) => {

      }
    )
    this.initializeEventListeners();    
  }

  closeDialog(){
    this.orderDetail={product_id:null,unit_type:""};
    this.customerSearch=null;
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
  initializeEventListeners() {
    this.searchInput.nativeElement.addEventListener('focus', this.onFocus.bind(this));
    this.searchInput.nativeElement.addEventListener('blur', this.onBlur.bind(this));
    this.searchInput.nativeElement.addEventListener('keyup', this.onKeyUp.bind(this));
    this.searchInputProducts.nativeElement.addEventListener('focus', this.onFocusProduct.bind(this));
    this.searchInputProducts.nativeElement.addEventListener('blur', this.onBlurProduct.bind(this));
    this.searchInputProducts.nativeElement.addEventListener('keyup', this.onKeyUpProduct.bind(this));
  }

  onFocus() {
    this.dropdown.nativeElement.classList.add('active');
    this.dropdownList.nativeElement.style.display = 'block';

    // this.emptyMessage.nativeElement.style.display = 'none';
  }
  onFocusProduct() {
    this.dropdownProducts.nativeElement.classList.add('active');
    this.dropdownListProducts.nativeElement.classList.add('active');
  }
  onBlurProduct() {
    setTimeout(() => {
      this.dropdownProducts.nativeElement.classList.remove('active');
      this.dropdownListProducts.nativeElement.style.display = 'none';
    }, 150);
  }
  onKeyUpProduct() {
    const inputValue = this.searchInputProducts.nativeElement.value.toLowerCase();
    const listItems = this.dropdownListProducts.nativeElement.querySelectorAll('li');
    listItems.forEach((li: Element) => {
      const listItem = li as HTMLElement;
      listItem.style.display = 'list-item';

      // if (inputValue && !listItem.dataset['searchValue']?.toLowerCase().includes(inputValue)) {
      //   listItem.style.display = 'none';
      // }
    });
    this.dropdownListProducts.nativeElement.style.display = 'block';
    // const visibleItems = this.dropdownList.nativeElement.querySelectorAll('li:not([style*="display: none"])');
    // 
    // if (visibleItems.length > 0) {
    //   this.emptyMessage.nativeElement.style.display = 'none';
    // } else {
    //   // this.emptyMessage.nativeElement.style.display = 'block';
    // }
  }
  onBlur() {
    setTimeout(() => {
      this.dropdown.nativeElement.classList.remove('active');
      this.dropdownList.nativeElement.style.display = 'none';
    }, 150);

  }

  onKeyUp() {
    const inputValue = this.searchInput.nativeElement.value.toLowerCase();
    const listItems = this.dropdownList.nativeElement.querySelectorAll('li');
    console.log(listItems);
    listItems.forEach((li: Element) => {
      const listItem = li as HTMLElement;
      listItem.style.display = 'list-item';

      // if (inputValue && !listItem.dataset['searchValue']?.toLowerCase().includes(inputValue)) {
      //   listItem.style.display = 'none';
      // }
    });
    this.dropdownList.nativeElement.style.display = 'block';
    // const visibleItems = this.dropdownList.nativeElement.querySelectorAll('li:not([style*="display: none"])');
    // 
    // if (visibleItems.length > 0) {
    //   this.emptyMessage.nativeElement.style.display = 'none';
    // } else {
    //   // this.emptyMessage.nativeElement.style.display = 'block';
    // }
  }

  onItemClick(event: any, type: string) {
   
      this.customerSearch = event.name;
      // this.selectedProduct.push(event);
      this.orderDetail.description=`${this.productTypes[event.product_type]} ${event.size}`;
      this.orderDetail.product_id=event.id;
  }
  searchProduct(event:any) {
    console.log("fd",event);
    this.req.query = event;
    this.req.user_id = this.userId;
    this.productService.getProducts(this.req).subscribe(
      (data) => {
        this.productsList = data.products;
        console.log(this,this.productsList);
      },
      (error) => {

      }
    )
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

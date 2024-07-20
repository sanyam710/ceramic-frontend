import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { CustomerService } from '../../services/customer.service';
import { SweetalertService } from 'src/app/modules/shared/services/sweetalertservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerslist',
  templateUrl: './customerslist.component.html',
  styleUrl: './customerslist.component.scss'
})
export class CustomerslistComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private customerService: CustomerService,
    private sweetAlertService: SweetalertService,
    private router:Router
  ) { }

  userId: string | null = null;
  customersList: any = [];
  customer: any = {};
  boolEditCustomer: boolean = false;
  addEditCustomerDialog: boolean = false;
  customerToEditIndex:number | null=null;
  customerToAddOrder:any={};
  addOrderDialog:boolean=false;
  customersCount: number | null = null;
  noOfPages: number = 0;
  selectedPage: number = 0;
  typingTimer: any;
  searchText: string = '';
  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.selectedPage = 1;
    var req = { user_id: this.userId!, page: 1 };
    this.customerService.getCustomers(req).subscribe({
      next: (data) => {
        this.customersList = data.customers;
        this.customersCount = data.customers_count;
        this.noOfPages = Math.ceil(this.customersCount! / 100)
      },
      error: (error) => {

      }
    })
  }
  onPageChange(page: number) {
    var req = { user_id: this.userId!, page: page };
    this.customerService.getCustomers(req).subscribe(
      (data) => {
        this.customersList = data.customers;
      },
      (error) => {
      }
    );
    this.selectedPage = page;
  }
  onSearchInputChange(event: any) {
    clearTimeout(this.typingTimer); // Clear the previous timer
    this.typingTimer = setTimeout(() => {
      this.filterProducts();
    }, 300);
  }
  filterProducts() {
    var req = { intimation_type: 1, user_id: this.userId!, query: this.searchText };
    this.customerService.getCustomers(req).subscribe(
      (data) => {
        this.customersList = data.customers;
        this.customersCount = data.customers_count;
        this.noOfPages = Math.ceil(this.customersCount! / 100)
      },
      (error) => {

      }
    )
  }
  addNewCustomer() {
    this.customerService.addCustomer(this.customer).subscribe({
      next:(data)=>{
        this.customersList.push(data);
        this.toastService.showToast("Customer Added Successfully","success");
        this.closeAddOrEditCustomer();
      }
    })
  }
  updateCustomerDetails() {
    this.customerService.updateCustomer(this.customer).subscribe({
      next:(data)=>{
        this.customersList[this.customerToEditIndex!]=data;
        this.toastService.showToast("Customer Updated Successfully","success");
        this.closeAddOrEditCustomer();
      }
    })

  }
  editCustomer(customer: any, index: number) {
    this.customer={... customer};
    this.addEditCustomerDialog=true;
    this.customerToEditIndex=index; 
    this.boolEditCustomer=true;
  }
  AddCustomer() {
    this.addEditCustomerDialog = true;
  }
  async delete(id: string, index: number) {
    var x = await this.sweetAlertService.warning("Warning", "Are you sure you want to delete the Product");
    if (x.value) {
      this.customerService.deleteCustomer(id).subscribe({
        next: (data) => {
          this.customersList.splice(index, 1);
          this.toastService.showToast("Customer Deleted Successfully", "success");
        },
        error: (error) => {
          return;
        }
      })
    }
  }
  closeAddOrEditCustomer() {
    this.addEditCustomerDialog = false;
    this.boolEditCustomer = false;
    this.customer = {};
    this.customerToEditIndex=null;
  }
  showAddOrderDialog(customer:any){
    this.addOrderDialog=true;
    this.customerToAddOrder=customer;
  }
  goTo(url:string){
    this.router.navigate([url]);
  }
  closeAddOrder(event:any){
    this.addOrderDialog=false;
    this.customerToAddOrder={};
  }

}

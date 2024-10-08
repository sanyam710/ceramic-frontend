import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ToastComponent } from "./components/toast/toast.component";
import { TooltipModule } from "primeng/tooltip";
import { DialogModule } from "primeng/dialog";
import { AddEditOrderComponent } from "../company_owner/orders/add-edit-order/add-edit-order.component";
import { AddEditOrderDetailsComponent } from "../company_owner/orders/add-edit-order-details/add-edit-order-details.component";
import { PaginationComponent } from "../company_owner/shared/components/pagination/pagination.component";

@NgModule({
    declarations: [
        ToastComponent,
        AddEditOrderComponent,
        AddEditOrderDetailsComponent,
        PaginationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        DialogModule
    ],
    providers: [],
    exports: [
        ToastComponent,
        TooltipModule,
        DialogModule,
        AddEditOrderComponent,
        AddEditOrderDetailsComponent,
        PaginationComponent
    ]
})
export class SharedModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ToastComponent } from "./components/toast/toast.component";
import { TooltipModule } from "primeng/tooltip";
import { DialogModule } from "primeng/dialog";





@NgModule({
    declarations: [ToastComponent],
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        DialogModule
    ],
    providers: [],
    exports: [ToastComponent,TooltipModule,DialogModule]
})
export class SharedModule { }

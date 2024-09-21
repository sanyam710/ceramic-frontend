import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-productbuyerdetails',
  templateUrl: './productbuyerdetails.component.html',
  styleUrl: './productbuyerdetails.component.scss'
})
export class ProductbuyerdetailsComponent implements OnInit {

  constructor(
    private productService:ProductService,
    private route:ActivatedRoute
  ){}

  buyerList:any=[];
  productId:string | null=null;
  unitTypes:any=Constants.UNIT_TYPE
  ngOnInit() {
    this.route.params.subscribe(({id})=>{
      this.productId=id;
    })
    this.productService.getProductBuyerDetails(this.productId!).subscribe({
      next:(data)=>{
        this.buyerList=data;
      },
      error:(error)=>{

      }
    })
    
  }

}

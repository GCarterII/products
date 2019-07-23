import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;



  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts(){
    this._httpService.getProducts().subscribe( data =>{
      console.log("got products", data);
      this.products = data['data'];
    })
  }
  showEdit(id){
    this._router.navigate(['products', id, 'edit'])
  }
  showOne(id){
    this._router.navigate(['products', id])
  }


}

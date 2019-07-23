import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  newProduct = {
    'name': "",
    'quantity': "",
    price: 0,
    strPrice:''
  }
  errProduct = {

  }

  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
  }
  createNewProduct(){
    console.log(this.newProduct)
    // this.newProduct.price = this.newProduct.price.replace(/\$/g, '');
    // console.log(this.newProduct)
    this.newProduct.price = parseFloat(this.newProduct.strPrice)
    this._httpService.newProduct(this.newProduct).subscribe( data =>{
      this.errProduct = {
        'name': "",
        'quantity': "",
        'price': ""
      }
      if(data['message'] == "Error"){
        if(data['error']['errors']['name']){
          this.errProduct['name'] = data['error']['errors']['name']['message']
        }
        if(data['error']['errors']['price']){
          this.errProduct['price'] = data['error']['errors']['price']['message']
        }
        if(data['error']['errors']['quantity']){
          this.errProduct['quantity'] = data['error']['errors']['quantity']['message']
        }
        console.log(this.errProduct)
      }
      else {
        this.returnToHome();
      }


    })
  }
  returnToHome(){
    this._router.navigate(['/products']);
  }


}

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  currentProductId;

  updateProduct = {
    'name': "",
    'quantity': "",
    price: 0,
    strPrice:''
  }
  errProduct = {
    name: "",
    quantity: "",
    price: '',
  }


  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe( params =>{
      this.currentProductId = params.get('id');
      this.getOneProduct(this.currentProductId)
    })
  }

  getOneProduct(id){
    this._httpService.getOneProduct(id).subscribe( data =>{
      console.log("got one item");
      console.log(data['data']['0']);
      this.updateProduct = data['data']['0'];
    })
  }
  reloadItem(){
    this.getOneProduct
  }

  updateOneProduct(){
    console.log(this.updateProduct)
    // this.newProduct.price = this.newProduct.price.replace(/\$/g, '');
    // console.log(this.newProduct)
    // this.updateProduct.price = parseFloat(this.updateProduct.strPrice)
    this._httpService.updateProduct(this.updateProduct).subscribe( data =>{
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

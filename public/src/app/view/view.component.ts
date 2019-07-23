import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  currentProductId;
  product = {
    'name': "",
    'quantity': "",
    price: 0,
    strPrice:''
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
      this.product = data['data']['0'];
    })
  }
  deleteOneProduct(id){
    this._httpService.deleteProduct(id).subscribe( data =>{
      console.log("deleted that SOB");
      this.returnToHome();
    })
  }
  returnToHome(){
    this._router.navigate(['/products']);
  }


}

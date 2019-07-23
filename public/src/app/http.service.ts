import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getProducts(){
    return this._http.get('/productsList')
  }
  newProduct(newProd){
    return this._http.post('/productsList', newProd)
  }
  updateProduct(updateProd){
    return this._http.put('/productsList/'+updateProd._id, updateProd)
  }
  deleteProduct(id){
    return this._http.delete('/productsList/'+id)
  }
  getOneProduct(id){
    return this._http.get('/productsList/'+id)
  }
}

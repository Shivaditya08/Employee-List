import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GlobaleService {
  baseUrl="http://localhost:8888";
  mongoDBUrl="http://localhost:9999/product"

 
 
  constructor(private _http:HttpClient,private router:Router) { }
  getRequestMongo(){
    return this._http.get(this.mongoDBUrl)
  }
  
  //get request
  getReq(tableName:any){
    return this._http.get(`${this.baseUrl}/${tableName}`);
  }
 
  //deleteRequest
  delReq(tableName:any,id:any){
    return this._http.delete(`${this.baseUrl}/${tableName}/${id}`);
  }
 
  //post request
  addReq(tableName:any,data:any){
    return this._http.post(`${this.baseUrl}/${tableName}`,data);
  }
 
  //single user get data
  getsingleReq(tableName:any,id:any){
    return this._http.get(`${this.baseUrl}/${tableName}/${id}`);
  }
 
  //single user put data
  putsingleReq(tableName:any,id:any,data:any){
    return this._http.put(`${this.baseUrl}/${tableName}/${id}`,data);
  }
 
  //add user into session storage
  signIn(user:any){
    sessionStorage.setItem("user",user);
  }
 
  //remove user from session storage
  signOut(){
    sessionStorage.clear();
   
  }
 
 
}
  


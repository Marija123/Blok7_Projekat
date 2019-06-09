import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricelistServiceService {

  base_url = "http://localhost:52295"
  constructor(private http: Http, private httpClient:HttpClient) { }

  addPricelist(pricelist): any{
    return this.httpClient.post(this.base_url+"/api/Pricelists/Add",pricelist);
  }
  addTicketPrices(ticketprices): any{
    return this.httpClient.post(this.base_url+"/api/TicketPrices/AddTicketPrices",ticketprices);
  }
  getValidPrices(id){
    return this.httpClient.get(this.base_url+"/api/TicketPrices/GetValidPrices?id=" + id);
  }

  getAllPricelists() {
    return this.httpClient.get(this.base_url+"/api/Pricelists/GetPricelists");
  }
getPricelist(){
  return this.httpClient.get(this.base_url+"/api/Pricelists/GetPricelist");
}

getPricelistLast(){
  return this.httpClient.get(this.base_url+"/api/Pricelists/GetPricelistLast");
}
  deletePricelist(id){
    return this.httpClient.delete(this.base_url+"/api/Pricelists/Delete?id=" + id);
  }

  changePricelist(id,pricelist): Observable<any>{
    return this.httpClient.put(this.base_url+"/api/Pricelists/Change?id=" + id,pricelist);
  }

}

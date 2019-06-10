import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  uploadFile(selectedFiles: File[]){
    const fd = new FormData();
    for (let selectedFile of selectedFiles){
      fd.append(selectedFile.name, selectedFile)
    }    
    return this.httpClient.post("http://localhost:52295/api/Account/PostImage", fd);
  }  
  
}

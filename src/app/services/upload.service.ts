import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const END_POINT = `http://localhost:3001/v1/user/upload`;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }

  uploadFiles(formData: FormData) {
    return this.http.post(`${END_POINT}`, formData)
  }

}

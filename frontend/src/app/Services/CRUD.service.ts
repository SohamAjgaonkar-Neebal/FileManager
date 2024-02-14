import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
    
    providedIn: 'root',
  })
export class CRUD{

    constructor(private http: HttpClient){}

    deleteFile(File:String)
    {
        return this.http.delete(`http://127.0.0.1:3000/delete/${File}`);
    }

    listFiles(): Observable<any> 
    {
        return this.http.get('http://127.0.0.1:3000/list');
    }

    downloadFile(File:String)
    {
        return this.http.get(`http://127.0.0.1:3000/download/${File}`,{
        responseType:'arraybuffer',});
    }

    uploadFile(File:FormData)
    {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        return this.http.post(
            `http://localhost:3000/upload`,File,
            {
                headers,
                reportProgress: true, // enable progress tracking
                observe: 'events', // receive events to track progress
            });
    }
    // uploadFile(file: File): Observable<any> {
    //     const formObj = new FormData();
    //     formObj.append('File', file);
      
    //     return this.http.post('http://localhost:3000/upload', formObj, { responseType: 'text' });
    //   }
}
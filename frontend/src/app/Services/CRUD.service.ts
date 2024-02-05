import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// @Injectable({
//     // Already in providers array in app module. still getting error if decoarator not used. Why!
//     providedIn: 'root',
//   })
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
        return this.http.get(`http://127.0.0.1:3000/download/${File}`);
    }

    uploadFile(File:File)
    {
        return this.http.post(
            `http://127.0.0.1:3000/upload/`,{File});
    }
}
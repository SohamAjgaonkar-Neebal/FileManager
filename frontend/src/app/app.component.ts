import { Component } from '@angular/core';
import { CRUD } from './Services/CRUD.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  //providers:[CRUD] // provide list of dependencies . provided in app module
})
export class AppComponent {
  constructor(private crud:CRUD)
  {

  }

  uploadFile(event:any)
  {
    //const File=event.currentTarget.files[0];
    const File = event.target.files[0];
    const formObj=new FormData();
    formObj.append('File',File);
    this.crud.uploadFile(formObj).subscribe({
      next: (res)=> {
        console.log(res);
      },
      error: (err)=>
      {
        console.log(err);
      },
    });
  }
}







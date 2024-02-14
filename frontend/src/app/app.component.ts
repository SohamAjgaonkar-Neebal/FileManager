import { Component } from '@angular/core';
import { CRUD } from './Services/CRUD.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

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

  docs:any="";
  uploadFile(event:any)
  {
    //const File=event.currentTarget.files[0];
    const File = event.target.files[0];
    const formObj=new FormData();
    formObj.append('File',File);
    this.crud.uploadFile(formObj).subscribe({
      // next: (res)=> {
        
      //   console.log(res);
      //   this.updateList();
      // },
      next: (event: HttpEvent<Object>) => {
        if (event.type === HttpEventType.UploadProgress) {
          // handle upload progress
          const percentDone = Math.round((100 * event.loaded) / event.total||1) ;
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event.type === HttpEventType.Response) {
          // handle the response after the file is uploaded
          //console.log(event.body);
             console.log(event);
             this.updateList();
        }
      },
      error: (err)=>
      {
        console.log(err);
      },
    });
  }
  updateList()
  {
    this.crud.listFiles().subscribe({
      next:(res)=>{
        console.log(res);
        this.docs=res.files;
        console.log("I am in updateList app.ts");
      },
      error:(err)=>{
        console.log(err);
      },
    });
  }
}







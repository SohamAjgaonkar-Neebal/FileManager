import { Component, Input, OnChanges, OnInit,SimpleChanges} from '@angular/core';
import { CRUD } from '../Services/CRUD.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  //providers:[CRUD] // since list is a child component of app component we need not make a 
  //new instance of CRUD . We will inherite the same instance from parent. If we add provider 
  // array here we will override the instnace obtained from parent 
})
export class ListComponent implements OnInit{//, OnChanges{

  constructor(private crud:CRUD) // using private keyword we create a property in ListComponent 
  //class and it will be assigned an instance of CRUD class. By this we ask angular to create
  // an instance of dependency/service class and not create manually to avoid errors which may 
  // occur bcz service class code was changed (eg: constructor changed)
  {

  }
    @Input()
   docs:any=""; 
  //  ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['docs'])  {
  //     // Handle the updated document list
  //     console.log("I am in ngOnChnages list.ts");
  //    // this.listFiles();
  //   }
  // }

  ngOnInit(): void {
    this.listFiles();
    console.log("I am in ngOnInit() list.ts");
  }
  

  listFiles()
  {
    this.crud.listFiles().subscribe({
      next: (res)=> {
        console.log(res);
        this.docs=res.files;
        console.log("I am in listFiles()() list.ts");
      },
      error: (err)=>
      {
        console.log(err);
      },
    });
  }

  downloadFile(File:string)
  {
    this.crud.downloadFile(File).subscribe({
      next: (res : ArrayBuffer)=> {
        //       // The file has been received as a blob
        const blob = new Blob([res], { type: 'application/octet-stream' });

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = File;
        document.body.appendChild(link);

        // Trigger the click event to start the download
        link.click();

        // Remove the link element
        document.body.removeChild(link);
        //console.log(res);
      },
      error: (err)=>
      {
        console.log("ERROR DOWNLOADING FILE:---"+err);
      },
    });
    
  }


  deleteFile(File:String)
  {
    this.crud.deleteFile(File).subscribe({
      next: (res)=> {
        console.log(res);
        this.listFiles();
      },
      error: (err)=>
      {
        console.log(err);
      },
    });
  }

}

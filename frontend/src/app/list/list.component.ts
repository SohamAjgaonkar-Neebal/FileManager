import { Component } from '@angular/core';
import { CRUD } from '../Services/CRUD.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  //providers:[CRUD] // since list is a child component of app component we need not make a 
  //new instance of CRUD . We will inherite the same instance from parent. If we add provider 
  // array here we will override the instnace obtained from parent 
})
export class ListComponent {

  constructor(private crud:CRUD) // using private keyword we create a property in ListComponent 
  //class and it will be assigned an instance of CRUD class. By this we ask angular to create
  // an instance of dependency/service class and not create manually to avoid errors which may 
  // occur bcz service class code was changed (eg: constructor changed)
  {

  }


  listFiles()
  {
    this.crud.listFiles();
  }

  downloadFile()
  {
    this.crud.downloadFile()
    
  }

  deleteFile()
  {
    this.crud.deleteFile();
  }

}

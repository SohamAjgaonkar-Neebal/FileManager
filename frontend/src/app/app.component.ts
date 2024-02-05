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

  uploadFile()
  {
    this.crud.uploadFile();
  }
}

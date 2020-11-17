import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent implements OnInit {
  public usuario;
  constructor(
    private _uService : UserService,
    private _router: Router    
  ) { 
    this.usuario= _uService.getUser();
  }

  ngOnInit(): void {
  }


  cerrarSesion(){
    this._uService.logout();
    this._router.navigateByUrl('/crud/login');
  }
}

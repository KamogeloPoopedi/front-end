import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {email: string="";
password: string="";
userName: string="";
constructor(private http:HttpClient){

}
login(){
  let bodyData={
    "userName": this.userName,
    "password": this.password
  };
  this.http.post("http://localhost:8080/api/login", bodyData,{responseType: 'text'}).subscribe((resultData:any)=>{
    console.log(resultData);
    alert("user logged in");
  
  })
}
}

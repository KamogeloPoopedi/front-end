import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string="";
  password: string="";
  userName: string="";
  constructor(private http:HttpClient){

  }
  register(){
    let bodyData={
      "email": this.email,
      "password": this.password,
      "userName": this.userName
    };
    this.http.post("http://localhost:8080/api/register", bodyData,{responseType: 'text'}).subscribe((resultData:any)=>{
      console.log(resultData);
      alert("user registered");
    
    })
  }

}

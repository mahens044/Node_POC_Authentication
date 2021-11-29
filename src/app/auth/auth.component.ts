import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private http:HttpClient) { }
  url: string;

  httpHeaders = new HttpHeaders();
  ngOnInit(): void {

    this.url ='http://localhost:3000/';
    this.http.post(this.url+'details',this.httpHeaders).subscribe(res => {
      console.log("ONINIT ",res)
      if(res){
        console.log("res ",res)
      }else{
        console.log("res ",res)
      }
    },
    (error)=>{
      this.isLoggedIn = false;

      console.log("er",error);
    })
    if(localStorage.getItem('user').length > 0){
      this.isLoggedIn = true;
      this.loggedUser =  localStorage.getItem('user')
    }
  }
  isLoggedIn: boolean = false;
  loggedUser: string ;
  Login(username,password){
    this.http.post(this.url+'login',{
      username:username.value,
      password:password.value
    }).subscribe(res =>{
      if(res){
        this.isLoggedIn = true;
      }
      localStorage.setItem('token',res['token']);
      localStorage.setItem('user',res['data'])
      this.loggedUser =  localStorage.getItem('user');
    })

  }
}

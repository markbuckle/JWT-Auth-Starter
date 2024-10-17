import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerform', { static: false }) registerForm: NgForm = {} as NgForm;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  // Submits a post request to the /users/register route of our Express app
  onRegisterSubmit() {
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;

    const headers = new HttpHeaders({'Content-type': 'application/json'});

    const reqObject = {
      username: username,
      password: password
    };

    // when the submit button is pressed, the post request is sent to our express app
    this.http.post('http://localhost:3000/users/register', reqObject, { headers: headers }).subscribe(
      
      // The response data is received and passed to our local storage
      (response) => {
        console.log(response);
      },

      // If there is an error
      (error) => {
        console.log(error);
      },
      
      // When observable completes
      () => {
        console.log('done!');
        this.router.navigate(['login']);
      }

    );
  }

}

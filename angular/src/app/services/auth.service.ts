import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable()
export class AuthService {

    constructor() {}
    
    // the five methods below manage the JWT that was issued from the express server
    setLocalStorage(responseObj: any) {          
        const expires = moment().add(responseObj.expiresIn);

        localStorage.setItem('token', responseObj.token);
        localStorage.setItem("expires", JSON.stringify(expires.valueOf()));
        
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires');
    }

    isLoggedIn() {
        // if true, JWT is valid and we will still be logged in 
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        // get the item
        const expiration = localStorage.getItem("expires");
        // take the json object and make it javascript
        const expiresAt = JSON.parse(expiration || '""');
        // calculate the point in time which this JWT expires
        return moment(expiresAt);
    }    
}
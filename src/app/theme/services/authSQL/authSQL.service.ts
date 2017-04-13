import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class AuthSQLService {
    constructor (private http:Http){}

    checkExistingUser(username:any, email: any){
        return this.http.get('https://analystprep.com/slimapp/public/api/auth/'+username+'/'+email)
        .map((response: Response)=> response.json());
    }

    registerUser(username:any, email:any){
        return this.http.get('https://analystprep.com/slimapp/public/api/auth/'+username+'/'+email+'/register')
        .map((response: Response)=> response.json());
    }

    socialIdentify(email:any){
        return this.http.get('https://analystprep.com/slimapp/public/api/auth/'+email+'/social')
        .map((response: Response)=> response.json());
    }

    loginUser(username:any, email:any){
        return this.http.get('https://analystprep.com/slimapp/public/api/auth/'+username+'/'+email+'/login')
        .map((response: Response)=> response.json());
    }
}
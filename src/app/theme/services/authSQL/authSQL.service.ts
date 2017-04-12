import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class authSQLService {
    constructor (private http:Http){}

    checkExistingUser(){
        this.http.get('https://analystprep.com/slimapp/public/api/auth/Matt.Vx/analystprep@gmail.comxdfdgfgf');
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';

const expressHost = environment.expressServer ||  'localhost';
const expressPort = environment.expressPort || 3000;
const expressServer = `http://${expressHost}:${expressPort}`;

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(private http: HttpClient) { }
	getSodas() {
		return this.http.get(expressServer + '/api/customer/sodas');
	}

	loginUser(username: string) {
		return this.http.post(expressServer + '/api/customer/login', { username });
	}
}

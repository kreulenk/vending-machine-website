import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import { User } from './models/user';
import { SodaBrand } from './models/soda';

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

	purchaseSoda(purchasingCustomer: User, sodaToPurchase: SodaBrand) {
		const putObject = { customerId: purchasingCustomer._id, sodaId: sodaToPurchase._id };
		return this.http.put(expressServer + '/api/customer/sodas', putObject);
	}

	getUser(name: string) {
		return this.http.post(expressServer + '/api/customer/get-user', { name });
	}
}

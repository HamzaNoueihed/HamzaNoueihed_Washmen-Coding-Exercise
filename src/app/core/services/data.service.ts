import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ICustomer, IPagedResults, IApiResponse } from '../../shared/interfaces';
import { UtilitiesService } from './utilities.service';

@Injectable()
export class DataService {
    baseUrl = this.utilitiesService.getApiUrl();
    customersBaseUrl = this.baseUrl + '/api/customers';

    constructor(private http: HttpClient, private utilitiesService: UtilitiesService) {  }

    getCustomersPage(page: number, pageSize: number): Observable<IPagedResults<ICustomer[]>> {
        return this.http.get<ICustomer[]>(
            `${this.customersBaseUrl}/page/${page}/${pageSize}`,
            { observe: 'response' })
            .pipe(
                map(res => {
                    const totalRecords = +res.headers.get('X-InlineCount');
                    const customers = res.body as ICustomer[];
                    return {
                        results: customers,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }

    getCustomers(): Observable<ICustomer[]> {
        return this.http.get<ICustomer[]>(this.customersBaseUrl)
            .pipe(
                map(customers => {
                    return customers;
                }),
                catchError(this.handleError)
            );
    }

    getCustomer(id: number): Observable<ICustomer> {
        return this.http.get<ICustomer>(this.customersBaseUrl + '/' + id)
            .pipe(
                map(customer => {
                    return customer;
                }),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Node.js server error');
    }
}

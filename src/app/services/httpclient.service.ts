import  { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpClient extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  post(url: string, body: any, options?: RequestOptionsArgs) : Observable<Response> {
    console.log('Usando en Custom HttpClient');
    return super.post(url, options);
  }

}

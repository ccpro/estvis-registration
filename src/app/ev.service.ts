import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigInfo } from '../app/data/formData.model';
import { Console } from '@angular/core/src/console';

@Injectable()
export class EvService {

  private baseUrl = environment.api_url;

  constructor(private http: Http) { }

  getInsuranceList(): Observable<ConfigInfo> {
    const list = this.http
      .get(`${this.baseUrl}/cfg`, { headers: this.getHeaders() })
      .map(mapInsuranceInfoList)
      .catch(handleError);

    return list;
  }

  saveCompanyInfo(data: any) {
    const options = new RequestOptions({ headers: this.getHeaders() });
    return this.http.post(`${this.baseUrl}/ac`, data, options)
      .catch(handleError);
  }

  private getHeaders() {
    // I included these headers because otherwise FireFox will request text/html
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}

function mapInsuranceInfoList(response: Response): ConfigInfo {
  // The response of the API has a results
  // property with the actual results

  return <ConfigInfo>response.json();
}

function handleError(error: any) {
  // log error
  // could be something more sofisticated
  const errorMsg = error.message;
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}

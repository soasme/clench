import { Injectable  }    from '@angular/core';
import { Headers, Http  } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Audio, Series } from './data';


@Injectable()
export class APIService {
  apis: any;

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl= 'http://127.0.0.1:8000/api/';

  constructor(private http: Http) {  }

  ngOnInit(): void {
  }

  getApis(): Promise<any> {
    if (this.apis) {
      return new Promise(resolve => this.apis);
    } else {
      return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
    }
  }

  getApi(resource: string, id: number): Promise<string> {
    return this.getApis().then(apis => {
      var url: string;
      if (id) {
        url = `${ apis[resource] }${ id }/`;
      } else {
        url = `${ apis[resource] }`;
      }
      return url;
    })
  }

  getResource(url: string): Promise<any> {
    return this.http.get(url)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  getAudio(url: string): Promise<Audio> {
    return this.http.get(url)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  handleError(): void {
    alert("Sorry, we have some problems.");
  }

}


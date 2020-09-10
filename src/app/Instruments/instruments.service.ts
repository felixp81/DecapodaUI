import { IAsset } from './interfaces/IAsset';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEventType,
  HttpResponse,
  HttpParams,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InstrumentsService {


  constructor(private http: HttpClient) {}

  getBaseUrl()
  {
    return "https://localhost:5001";
  }

  getAllAssets(): Subject<IAsset[]>
  {
    const result: Subject<IAsset[]> = new Subject<IAsset[]>();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

      this.http.get<IAsset[]>(this.getBaseUrl() + '/api/getAllAssets').subscribe(
          (res: IAsset[]) => {
            result.next(res);
          },
          (error: Error) => {
            result.error(error);
          }
        );

      return result;
    }
  }

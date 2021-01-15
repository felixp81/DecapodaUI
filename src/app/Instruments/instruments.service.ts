import { IAccountStatement } from './interfaces/iaccount-statement';
import { ITrade } from './interfaces/itrade';
import { IAssetTick } from './interfaces/iasset-tick';
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




  getTrades(instIdent: string): Subject<ITrade[]>
  {
    const result: Subject<ITrade[]> = new Subject<ITrade[]>();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append("assetSymbol", instIdent );
    let params = new HttpParams();
    params.append("assetSymbol", instIdent);
      this.http.get<ITrade[]>(this.getBaseUrl() + '/api/trades/getAllTrades', {headers: headers, params: params}).subscribe(
          (res: any) => {
            result.next(res);
          },
          (error: Error) => {
            result.error(error);
          }
        );

      return result;
  }


  getAccountStatements(): Subject<IAccountStatement[]>
  {
    const result: Subject<IAccountStatement[]> = new Subject<IAccountStatement[]>();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
      this.http.get<ITrade[]>(this.getBaseUrl() + '/api/trades/getAccountStatement', {headers: headers, params: params}).subscribe(
          (res: any) => {
            result.next(res);
          },
          (error: Error) => {
            result.error(error);
          }
        );

      return result;
  }


getNavs(instIdent: string): Subject<IAssetTick[]>
{
  const result: Subject<IAssetTick[]> = new Subject<IAssetTick[]>();
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append("assetSymbol", instIdent );
  let params = new HttpParams();
  params.append("assetSymbol", instIdent);
    this.http.get<IAssetTick[]>(this.getBaseUrl() + '/api/fin/getTicksForIdent', {headers: headers, params: params}).subscribe(
        (res: any) => {
          result.next(res);
        },
        (error: Error) => {
          result.error(error);
        }
      );

    return result;
  }




updateInstrument(instIdent: string): Subject<any>
{
  const result: Subject<any> = new Subject<any>();
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append("assetSymbol", instIdent );
  let params = new HttpParams();
  params.append("assetSymbol", instIdent);
    this.http.get<IAsset[]>(this.getBaseUrl() + '/api/fin/doUpdate', {headers: headers, params: params}).subscribe(
        (res: any) => {
          result.next(res);
        },
        (error: Error) => {
          result.error(error);
        }
      );

    return result;
  }


  getAllAssets(): Subject<IAsset[]>
  {
    const result: Subject<IAsset[]> = new Subject<IAsset[]>();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

      this.http.get<IAsset[]>(this.getBaseUrl() + '/api/fin/getAllIdents').subscribe(
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

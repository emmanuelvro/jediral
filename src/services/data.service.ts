import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EndpointEnum } from 'src/models/EndpointEnum';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sidenav: MatSidenav | undefined;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }

  constructor(private http: HttpClient){}

  public close() {
    const element = document.getElementsByClassName("mat-drawer-backdrop")[0];
    element.classList.remove("mat-drawer-shown");
    return this.sidenav!.close();
  }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  get(endpoint:EndpointEnum, id:string = "")
    {
        let urlPoint = endpoint.toString();
        urlPoint = urlPoint.replace("{id}", id);
        return this.http.get(`${environment.baseUrl}${urlPoint}`, this.httpOptions)
              .pipe((response: any) => {
                  return response;
              },catchError(this.handleError));
    }

    post(endpoint:EndpointEnum, body:any){
        return this.http.post(`${environment.baseUrl}${endpoint.toString()}`, JSON.stringify(body), this.httpOptions)
              .pipe((response: any) => {
                //console.log(response);
                  return response;
              },catchError(this.handleError));
    }

    handleError(error:any) {
      let errorMessage:any;
      if(error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = {};
        errorMessage.Code = error.status;
        errorMessage.Message = error.message;
        //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      //window.alert(errorMessage);
      return throwError(errorMessage);
  }

}

import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../environments/environment";
import { LoaderService } from "../modules/shared/services/loader.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private router:Router
  ) { }

  post(endpoint: string, data: any): Observable<any> {
    this.loaderService.setLoading(true);
    const url = `${environment.API_URL}${endpoint}`;
    if (window.localStorage.getItem("token")) {
      data.token = window.localStorage.getItem("token");
    }
    return this.http.post(url, data)
      .pipe(
        map((response: any) => {
          if (response && response.status === 'success') {
            this.loaderService.setLoading(false);
            return response.contents;
          }
          else {
            this.loaderService.setLoading(false);
            if(response.message=="Unauthenticated request"){
              this.router.navigate(['/login'])
              window.localStorage.clear();
            }
            throw new Error(response.message);
          }

        }),
      );
  }
  postPdf(endpoint: string, data: any, fileName: string): Observable<any> {
    this.loaderService.setLoading(true);
    const url = `${environment.API_URL}${endpoint}`;
    if (window.localStorage.getItem("token")) {
      data.token = window.localStorage.getItem("token");
    }
    const headers = new HttpHeaders({
      'Accept': 'application/pdf',
      'Content-Type': 'application/json'
    });

    return this.http.post(url, data, { headers, responseType: 'blob' as 'json' })
      .pipe(
        map((response: any) => {
          this.loaderService.setLoading(false);
          // Handle the PDF file here
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${fileName}.pdf`;
          document.title = `${fileName}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          return response;
        })
      );
  }
}

import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../environments/environment";
import { LoaderService } from "../modules/shared/services/loader.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private loaderService: LoaderService
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
            throw new Error(response.message);
          }

        }),
      );
  }
}

import { Injectable } from "@angular/core";
import { Promotion } from "../shared/promotion";
import { PROMOTIONS } from "../shared/promotions";
import { of, Observable } from "rxjs";
import { delay, map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { baseURL } from "../shared/baseUrl";
import { ProcessHTTPmsgService } from "./process-httpmsg.service";

@Injectable({
  providedIn: "root",
})
export class PromotionService {
  constructor(
    private http: HttpClient,
    private processHTTPmsg: ProcessHTTPmsgService
  ) {}

  getPromotions(): Observable<Promotion[]> {
    // return this.http
    //   .get<Promotion[]>(baseURL + "/promotions")
    //   .pipe(catchError(this.processHTTPmsg.handleError));
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion> {
    // return this.http
    //   .get<Promotion>(baseURL + "/promotions/" + id)
    //   .pipe(catchError(this.processHTTPmsg.handleError));
    return of(PROMOTIONS.filter((promo) => promo.id === id)[0]).pipe(
      delay(2000)
    );
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return this.http
    //   .get<Promotion[]>(baseURL + "/promotions?featured=true")
    //   .pipe(map((promotions) => promotions[0]))
    //   .pipe(catchError(this.processHTTPmsg.handleError));
    return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(
      delay(2000)
    );
  }
}

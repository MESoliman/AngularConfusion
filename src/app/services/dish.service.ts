import { Injectable } from "@angular/core";
import { Dish } from "../shared/dish";
import { Observable, of } from "rxjs";
import { delay, map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseUrl";
import { ProcessHTTPmsgService } from "./process-httpmsg.service";
import { DISHES } from "../shared/dishes";

@Injectable({
  providedIn: "root",
})
export class DishService {
  constructor(
    private http: HttpClient,
    private processHTTPmsg: ProcessHTTPmsgService
  ) {}

  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
    // return this.http
    //   .get<Dish[]>(baseURL + "/dishes")
    //   .pipe(catchError(this.processHTTPmsg.handleError));
  }

  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.id === id)[0]).pipe(delay(2000));
    // return this.http
    //   .get<Dish>(baseURL + "/dishes/" + id)
    //   .pipe(catchError(this.processHTTPmsg.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    // return this.http
    //   .get<Dish[]>(baseURL + "/dishes?featured=true")
    //   .pipe(map((dishes) => dishes[0]))
    //   .pipe(catchError(this.processHTTPmsg.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes()
      .pipe(map((dishes) => dishes.map((dish) => dish.id)))
      .pipe(catchError((error) => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http.put<Dish>(
      baseURL + "/dishes/" + dish.id,
      dish,
      httpOptions
    );
  }
}

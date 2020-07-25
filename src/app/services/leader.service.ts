import { Injectable } from "@angular/core";
import { Leader } from "../shared/leader";
import { LEADERS } from "../shared/leaders";
import { delay, map, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { baseURL } from "../shared/baseUrl";
import { ProcessHTTPmsgService } from "./process-httpmsg.service";

@Injectable({
  providedIn: "root",
})
export class LeaderService {
  constructor(
    private http: HttpClient,
    private processHTTPmsg: ProcessHTTPmsgService
  ) {}

  getLeaders(): Observable<Leader[]> {
    // return this.http
    //   .get<Leader[]>(baseURL + "/leadership")
    //   .pipe(catchError(this.processHTTPmsg.handleError));
    return of(LEADERS).pipe(delay(2000));
    /*new Promise(resolve => {
      setTimeout(() => resolve(LEADERS), 2000);
    });*/
  }

  getFeaturedLeader(): Observable<Leader> {
    // return this.http
    //   .get<Leader[]>(baseURL + "/leadership?featured=true")
    //   .pipe(map((leaders) => leaders[0]))
    //   .pipe(catchError(this.processHTTPmsg.handleError));
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    /*new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter(leader => leader.featured)[0]), 2000);
    });*/
  }
}

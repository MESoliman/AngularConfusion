import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseUrl";
import { Feedback } from "../shared/feedback";
import { ProcessHTTPmsgService } from "./process-httpmsg.service";
import { Observable, of } from "rxjs";
import { FEEDBACKS } from "../shared/feedbacks";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  constructor(
    private http: HttpClient,
    private processHTTPmsg: ProcessHTTPmsgService
  ) {}

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return of(feedback).pipe(delay(2000));
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //   }),
    // };
    // return this.http.post<Feedback>(
    //   baseURL + "/feedback",
    //   feedback,
    //   httpOptions
    // );
  }
}

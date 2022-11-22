import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

    constructor()
    {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const request = req.clone({
            headers: req.headers.set("X-Parse-Application-Id", "project-tesla")
        });
        console.log(request);
        return next.handle(request);
    }
}
import { Observable } from "rxjs";
import { iUser } from "../Domain/Interfaces";


export abstract class SessionPort {
    abstract signup(value: iUser): Observable<iUser>;
    abstract login(value: iUser): Observable<iUser>;
}